const fs = require('node:fs');
const path = require('node:path');
const locales = require('../../config/locales');
const { interpolate, interpolateObject, translate } = require('../../eleventy/helpers');

const articlesDirectory = path.join(__dirname, '..', 'content', 'blog', 'articles');
const requiredLocalizedFields = ['locale', 'status', 'slug', 'title', 'description', 'coverAlt', 'seoTitle', 'seoDescription', 'dateModified'];
const allowedStatuses = new Set(['draft', 'review', 'published']);

function parseFrontMatter(file) {
  const source = fs.readFileSync(file, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`Missing blog front matter: ${file}`);
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const separator = line.indexOf(':');
    if (separator < 1) throw new Error(`Invalid blog front matter line in ${file}: ${line}`);
    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    try {
      data[key] = JSON.parse(rawValue);
    } catch {
      throw new Error(`Blog front matter values must be JSON literals (${file}, ${key})`);
    }
  }
  return { data, body: source.slice(match[0].length) };
}

function blogPostUrl(locale, slug) {
  const localeConfig = locales[locale];
  if (!localeConfig?.enabled) throw new Error(`Unsupported or disabled blog locale: ${locale}`);
  const prefix = localeConfig.path ? `/${localeConfig.path}` : '';
  return `${prefix}/blog/${slug}.html`;
}

function formattedDate(date, locale) {
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));
}

function loadArticles() {
  if (!fs.existsSync(articlesDirectory)) return [];
  const posts = [];
  const articleIds = new Set();
  const routes = new Set();

  for (const entry of fs.readdirSync(articlesDirectory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const directory = path.join(articlesDirectory, entry.name);
    const sharedFile = path.join(directory, 'article.js');
    if (!fs.existsSync(sharedFile)) throw new Error(`Missing shared blog data: ${sharedFile}`);
    const shared = require(sharedFile);
    if (!shared?.id || shared.id !== entry.name) throw new Error(`Blog article id must match its directory: ${entry.name}`);
    for (const field of ['coverImage', 'author', 'category', 'datePublished']) {
      if (!shared[field]) throw new Error(`Missing shared blog field ${field}: ${sharedFile}`);
    }
    if (articleIds.has(shared.id)) throw new Error(`Duplicate blog article id: ${shared.id}`);
    articleIds.add(shared.id);

    for (const translationEntry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (!translationEntry.isFile() || !translationEntry.name.endsWith('.njk')) continue;
      const file = path.join(directory, translationEntry.name);
      const { data, body } = parseFrontMatter(file);
      for (const field of requiredLocalizedFields) {
        if (data[field] === undefined || data[field] === '') throw new Error(`Missing blog field ${field}: ${file}`);
      }
      if (!locales[data.locale]) throw new Error(`Unknown blog locale ${data.locale}: ${file}`);
      if (!allowedStatuses.has(data.status)) throw new Error(`Invalid blog status ${data.status}: ${file}`);
      if (translationEntry.name !== `${data.locale}.njk`) throw new Error(`Blog translation filename must match locale: ${file}`);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) throw new Error(`Blog slug must use lowercase ASCII words: ${file}`);
      if (!body.trim()) throw new Error(`Blog body is empty: ${file}`);
      if (data.status !== 'published' || !locales[data.locale].enabled) continue;
      const permalink = blogPostUrl(data.locale, data.slug);
      if (routes.has(permalink)) throw new Error(`Duplicate blog route: ${permalink}`);
      routes.add(permalink);

      const localized = interpolateObject(data, data.locale);
      const sharedAuthor = interpolate(shared.author, data.locale);
      posts.push({
        ...shared,
        ...localized,
        articleId: shared.id,
        categoryKey: shared.category,
        categoryLabel: translate(data.locale, `blog.categories.${shared.category}`),
        author: sharedAuthor,
        authorLabel: localized.authorLabel || sharedAuthor,
        date: shared.datePublished,
        dateLabel: localized.dateLabel || formattedDate(shared.datePublished, data.locale),
        permalink,
        translationKey: `blog:${shared.id}`,
        body: interpolate(body, data.locale)
      });
    }
  }

  const byArticle = new Map();
  for (const post of posts) {
    if (!byArticle.has(post.articleId)) byArticle.set(post.articleId, []);
    byArticle.get(post.articleId).push({ locale: post.locale, slug: post.slug, url: post.permalink });
  }
  for (const post of posts) {
    post.translations = byArticle.get(post.articleId);
    post.xDefaultUrl = post.translations.find(item => item.locale === 'en')?.url || post.permalink;
  }
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

module.exports = loadArticles();
