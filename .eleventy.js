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
  eleventyConfig.addFilter('assetUrl', value => `/${String(value).replace(/^\.\.\//, '').replace(/^\//, '')}`);

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
