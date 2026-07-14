const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const LAYOUT_DIR = path.join(__dirname, 'layout');
const DIST_DIR = path.join(__dirname, 'docs');

// 1. Helper to copy directories recursively
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 2. Main Build Function
function runBuild() {
  // Ensure build/ directory exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  // Read layout templates
  let headerHtml = '';
  let footerHtml = '';
  try {
    headerHtml = fs.readFileSync(path.join(LAYOUT_DIR, 'header.html'), 'utf8');
    footerHtml = fs.readFileSync(path.join(LAYOUT_DIR, 'footer.html'), 'utf8');
  } catch (err) {
    console.error('❌ Error reading layout templates:', err.message);
    return;
  }

  // Compile HTML files
  try {
    const files = fs.readdirSync(SRC_DIR);
    const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html');

    htmlFiles.forEach(filename => {
      const srcPath = path.join(SRC_DIR, filename);
      const distPath = path.join(DIST_DIR, filename);
      let content = fs.readFileSync(srcPath, 'utf8');

      // Replace include tags: <!-- @include header --> or <!-- @include footer -->
      content = content.replace(/<!--\s*@include\s+header\s*-->/g, headerHtml);
      content = content.replace(/<!--\s*@include\s+footer\s*-->/g, footerHtml);

      fs.writeFileSync(distPath, content, 'utf8');
    });
    console.log(`✓ Compiled ${htmlFiles.length} HTML pages to docs/.`);
  } catch (err) {
    console.error('❌ HTML compilation failed:', err.message);
  }

  // Copy Static Assets
  const staticDirs = ['assets', 'images'];
  staticDirs.forEach(dir => {
    const srcPath = path.join(__dirname, dir);
    const destPath = path.join(DIST_DIR, dir);
    if (fs.existsSync(srcPath)) {
      try {
        // Skip copying the build directory itself inside build/js/build etc.
        if (dir === 'build') return;
        copyDirSync(srcPath, destPath);
      } catch (err) {
        console.error(`❌ Failed to copy static folder "${dir}":`, err.message);
      }
    }
  });
  console.log('🎉 Build completed successfully!');
}

// 3. Execution
console.log('⚡ Starting AROMAMATRIX Builder...');
runBuild();

// 4. Watch Mode
if (process.argv.includes('--watch')) {
  console.log('👁️ Watch mode active. Monitoring file changes...');

  let timer = null;
  function triggerRebuild() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('🔄 File change detected. Rebuilding...');
      runBuild();
    }, 150); // 150ms debounce
  }

  const watchDirs = ['src', 'layout', 'assets', 'images'];
  watchDirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
      fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
        // Exclude self docs folder loop
        if (filename && (filename.startsWith('docs') || filename.includes('docs/'))) return;
        triggerRebuild();
      });
    }
  });
}
