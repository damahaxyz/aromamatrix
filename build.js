const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const LAYOUT_DIR = path.join(__dirname, 'layout');
const DIST_DIR = path.join(__dirname, 'docs');
const BLOG_POSTS_DIR = path.join(SRC_DIR, 'blog-posts');
const BLOG_TEMPLATE_PATH = path.join(SRC_DIR, '_blog-detail-template.html');
const PRIVATE_FACTORY_SOURCE_DIR = path.join(__dirname, 'images', '工厂实拍');
const PRIVATE_FACTORY_DIR_NAME = '工厂实拍';

function normalizedPath(value) {
  return path.resolve(value).normalize('NFC');
}

function decodeHtmlEntities(value) {
  const namedEntities = {
    amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' '
  };
  return value.replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const isHex = entity[1].toLowerCase() === 'x';
      const codePoint = Number.parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }
    return namedEntities[entity.toLowerCase()] || match;
  });
}

function stripHtml(value) {
  return decodeHtmlEntities(value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<\/(p|li|ul|ol)>|<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function buildFaqSchema(content) {
  const mainEntity = [];
  const faqPattern = /<details class="faq-item"[^>]*>\s*<summary>([\s\S]*?)<\/summary>\s*<div class="faq-answer">([\s\S]*?)<\/div>\s*<\/details>/gi;
  let match;

  while ((match = faqPattern.exec(content)) !== null) {
    mainEntity.push({
      '@type': 'Question',
      name: stripHtml(match[1]),
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(match[2])
      }
    });
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity
  };

  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isRelativePageUrl(value) {
  return value
    && !value.startsWith('#')
    && !value.startsWith('/')
    && !/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value);
}

function prefixRelativeUrls(content, prefix) {
  if (!prefix) return content;
  return content.replace(/\b(href|src)=["']([^"']+)["']/gi, (match, attr, value) => {
    if (!isRelativePageUrl(value) || value.startsWith(prefix)) return match;
    return `${attr}="${prefix}${value}"`;
  });
}

function readBlogPosts() {
  const postsPath = path.join(BLOG_POSTS_DIR, 'posts.json');
  if (!fs.existsSync(postsPath)) return [];

  try {
    const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
    if (!Array.isArray(posts)) {
      console.error('❌ Blog posts metadata must be an array.');
      return [];
    }

    return posts
      .filter(post => post && post.published === true && post.slug)
      .filter(post => fs.existsSync(path.join(BLOG_POSTS_DIR, `${post.slug}.html`)))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error('❌ Failed to read blog posts metadata:', err.message);
    return [];
  }
}

function renderBlogCards(posts) {
  if (posts.length === 0) {
    return '<p class="section-subtitle text-center" style="grid-column: 1 / -1; margin-bottom: 0;">New factory guides are being prepared. Contact our team if you need sourcing advice now.</p>';
  }

  return posts.map(post => `
        <article class="blog-card">
          <div class="blog-img">
            <img src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.coverAlt)}">
          </div>
          <div class="blog-card-content">
            <div class="blog-meta">${escapeHtml(post.dateLabel)} | ${escapeHtml(post.category)}</div>
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.description)}</p>
            <a href="blog/${escapeHtml(post.slug)}.html" class="blog-readmore">Read Full Guide</a>
          </div>
        </article>`).join('\n');
}

function applyLayoutIncludes(content, headerHtml, footerHtml, options = {}) {
  let output = content
    .replace(/<!--\s*@include\s+header\s*-->/g, headerHtml)
    .replace(/<!--\s*@include\s+footer\s*-->/g, footerHtml)
    .replace(/<!--\s*@include\s+faq-schema\s*-->/g, () => buildFaqSchema(content));

  if (options.blogPosts) {
    output = output.replace(/<!--\s*@blog-posts\s*-->/g, () => renderBlogCards(options.blogPosts));
  }

  if (options.pathPrefix) {
    output = prefixRelativeUrls(output, options.pathPrefix);
  }

  return output;
}

function renderBlogDetailPages(posts, headerHtml, footerHtml) {
  if (!fs.existsSync(BLOG_TEMPLATE_PATH)) return;

  const blogDistDir = path.join(DIST_DIR, 'blog');
  fs.rmSync(blogDistDir, { recursive: true, force: true });
  fs.mkdirSync(blogDistDir, { recursive: true });

  const template = fs.readFileSync(BLOG_TEMPLATE_PATH, 'utf8');

  posts.forEach(post => {
    const bodyHtml = fs.readFileSync(path.join(BLOG_POSTS_DIR, `${post.slug}.html`), 'utf8');
    let page = template
      .replace(/{{SEO_TITLE}}/g, escapeHtml(post.seoTitle || post.title))
      .replace(/{{SEO_DESCRIPTION}}/g, escapeHtml(post.seoDescription || post.description))
      .replace(/{{CANONICAL_PATH}}/g, `blog/${escapeHtml(post.slug)}.html`)
      .replace(/{{DATE_LABEL}}/g, escapeHtml(post.dateLabel))
      .replace(/{{CATEGORY}}/g, escapeHtml(post.category))
      .replace(/{{TITLE}}/g, escapeHtml(post.title))
      .replace(/{{AUTHOR}}/g, escapeHtml(post.author))
      .replace(/{{COVER_IMAGE}}/g, escapeHtml(post.coverImage))
      .replace(/{{COVER_ALT}}/g, escapeHtml(post.coverAlt))
      .replace(/{{ARTICLE_BODY}}/g, bodyHtml);

    page = applyLayoutIncludes(page, headerHtml, footerHtml, { pathPrefix: '../' });
    fs.writeFileSync(path.join(blogDistDir, `${post.slug}.html`), page, 'utf8');
  });
}

// 1. Helper to copy directories recursively
function copyDirSync(src, dest) {
  // Factory originals include full-resolution certificates and raw videos.
  // Only processed public derivatives under assets/ may enter the site build.
  const comparableSrc = normalizedPath(src);
  const comparablePrivateDir = normalizedPath(PRIVATE_FACTORY_SOURCE_DIR);
  if (comparableSrc === comparablePrivateDir || comparableSrc.startsWith(comparablePrivateDir + path.sep)) {
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    if (entry.name === '.DS_Store') continue;
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

  // Remove copies created by older builds before the private-source exclusion existed.
  const publicImagesDir = path.join(DIST_DIR, 'images');
  if (fs.existsSync(publicImagesDir)) {
    fs.readdirSync(publicImagesDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && entry.name.normalize('NFC') === PRIVATE_FACTORY_DIR_NAME)
      .forEach(entry => {
        fs.rmSync(path.join(publicImagesDir, entry.name), { recursive: true, force: true });
      });
  }

  function removeGeneratedDsStore(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) removeGeneratedDsStore(entryPath);
      else if (entry.name === '.DS_Store') fs.rmSync(entryPath, { force: true });
    });
  }

  function removeIgnoredRootHtml() {
    fs.readdirSync(DIST_DIR, { withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name.startsWith('_') && path.extname(entry.name).toLowerCase() === '.html')
      .forEach(entry => fs.rmSync(path.join(DIST_DIR, entry.name), { force: true }));
  }

  removeIgnoredRootHtml();
  fs.rmSync(path.join(DIST_DIR, 'blog-detail.html'), { force: true });

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

  const blogPosts = readBlogPosts();

  // Compile HTML files
  try {
    const files = fs.readdirSync(SRC_DIR);
    const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html' && !file.startsWith('_'));

    htmlFiles.forEach(filename => {
      const srcPath = path.join(SRC_DIR, filename);
      const distPath = path.join(DIST_DIR, filename);
      let content = fs.readFileSync(srcPath, 'utf8');

      content = applyLayoutIncludes(content, headerHtml, footerHtml, { blogPosts });

      fs.writeFileSync(distPath, content, 'utf8');
    });
    console.log(`✓ Compiled ${htmlFiles.length} HTML pages to docs/.`);
    renderBlogDetailPages(blogPosts, headerHtml, footerHtml);
    console.log(`✓ Generated ${blogPosts.length} blog detail page(s).`);
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
  removeGeneratedDsStore(DIST_DIR);
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
