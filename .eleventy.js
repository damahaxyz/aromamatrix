const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const site = require('./config/site.config');
const locales = require('./config/locales');
const translations = require('./src/_data/translations');
const {
  blogCategories,
  interpolate,
  localeUrl,
  localizedFact,
  localizedBlogPosts,
  pageAlternateUrl,
  renderRuntimeConfig,
  renderSeo,
  translate
} = require('./eleventy/helpers');

const assetVersionCache = new Map();

function cleanAssetPath(value) {
  return String(value).replace(/^\.\.\//, '').replace(/^\//, '');
}

function versionedAssetUrl(value) {
  const assetPath = cleanAssetPath(value);
  const assetsRoot = path.join(__dirname, 'assets');
  const absolutePath = path.resolve(__dirname, assetPath);

  if (!absolutePath.startsWith(`${assetsRoot}${path.sep}`)) {
    throw new Error(`Versioned assets must be inside assets/: ${assetPath}`);
  }

  const stat = fs.statSync(absolutePath);
  const signature = `${stat.mtimeMs}:${stat.size}`;
  const cached = assetVersionCache.get(absolutePath);
  if (cached?.signature === signature) return `/${assetPath}?v=${cached.hash}`;

  const hash = crypto.createHash('sha256').update(fs.readFileSync(absolutePath)).digest('hex').slice(0, 12);
  assetVersionCache.set(absolutePath, { signature, hash });
  return `/${assetPath}?v=${hash}`;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.setNunjucksEnvironmentOptions({
    autoescape: true,
    throwOnUndefined: true,
    trimBlocks: true,
    lstripBlocks: true
  });

  eleventyConfig.addGlobalData('site', site);
  eleventyConfig.addGlobalData('config', site);
  eleventyConfig.addGlobalData('locales', locales);
  eleventyConfig.addGlobalData('translations', translations);
  eleventyConfig.addGlobalData('post', null);

  eleventyConfig.addNunjucksGlobal('t', (locale, key) => translate(locale, key));
  eleventyConfig.addNunjucksGlobal('localeUrl', localeUrl);
  eleventyConfig.addNunjucksGlobal('fact', localizedFact);
  eleventyConfig.addNunjucksGlobal('pageAlternateUrl', pageAlternateUrl);
  eleventyConfig.addNunjucksGlobal('renderSeo', renderSeo);
  eleventyConfig.addNunjucksGlobal('runtimeConfig', renderRuntimeConfig);
  eleventyConfig.addNunjucksGlobal('blogCategories', blogCategories);
  eleventyConfig.addNunjucksGlobal('localizedBlogPosts', localizedBlogPosts);
  eleventyConfig.addFilter('interpolate', (value, locale) => interpolate(value, locale));
  eleventyConfig.addFilter('assetUrl', value => `/${cleanAssetPath(value)}`);
  eleventyConfig.addFilter('versionedAssetUrl', versionedAssetUrl);

  // Cloudflare Pages serves .html assets at extensionless canonical URLs.
  // Normalize legacy links embedded in localized rich-text content at build time.
  eleventyConfig.addTransform('extensionless-internal-urls', function(content) {
    if (this.page.outputPath?.endsWith('.html')) {
      return content.replace(/(href|action)=(["'])([^"']+)\2/g, (attribute, name, quote, url) => {
        const isInternal = !/^[a-z][a-z\d+.-]*:/i.test(url) || url.startsWith(`${site.site.origin}/`);
        if (!isInternal) return attribute;
        return `${name}=${quote}${url.replace(/\.html(?=([?#]|$))/g, '')}${quote}`;
      });
    }
    return content;
  });

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy({ CNAME: 'CNAME' });

  // Only assets/ is public. Root-level image source folders are private working
  // material and must never be copied into the deployment output.
  eleventyConfig.on('eleventy.before', () => {
    fs.rmSync(path.join(__dirname, 'docs', 'images'), { recursive: true, force: true });
  });

  eleventyConfig.ignores.add('src/content/blog/articles/**/*.njk');

  eleventyConfig.addWatchTarget('./config/');
  eleventyConfig.addWatchTarget('./eleventy/');
  eleventyConfig.addWatchTarget('./src/i18n/');
  eleventyConfig.addWatchTarget('./src/content/blog/');

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'docs'
    },
    templateFormats: ['njk', '11ty.js']
  };
};
