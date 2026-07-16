const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const site = require('../config/site.config');
const locales = require('../config/locales');
const blogPosts = require('../src/_data/blogPosts');
const { PAGE_ROUTES, pageAlternateUrl, validateSiteConfig } = require('../eleventy/helpers');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'docs');

function filesUnder(directory, extension) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesUnder(item, extension);
    return path.extname(entry.name) === extension ? [item] : [];
  });
}

function outputFile(pageKey, locale) {
  const route = PAGE_ROUTES[pageKey];
  const prefix = locales[locale].path ? `${locales[locale].path}/` : '';
  if (route === '/') return path.join(OUTPUT, prefix, 'index.html');
  return path.join(OUTPUT, prefix, route.slice(1));
}

test.before(() => {
  assert.ok(Number(process.versions.node.split('.')[0]) >= 22, 'the build requires Node.js 22 or newer');
  execFileSync(process.execPath, ['node_modules/@11ty/eleventy/cmd.cjs'], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: 'pipe'
  });
});

test('site configuration validation rejects invalid public facts', () => {
  const invalid = structuredClone(site);
  invalid.contact.whatsapp.number = '12 34';
  assert.throws(() => validateSiteConfig(invalid), /digits only/);

  const invalidThreshold = structuredClone(site);
  invalidThreshold.services.lowQuantityReview.threshold += 1;
  assert.throws(() => validateSiteConfig(invalidThreshold), /threshold/);
});

test('Eleventy generates English, Chinese, and English blog routes', () => {
  const htmlFiles = filesUnder(OUTPUT, '.html');
  assert.ok(htmlFiles.length >= 75, 'expected bilingual core pages and all blog detail pages');

  for (const pageKey of Object.keys(PAGE_ROUTES)) {
    assert.ok(fs.existsSync(outputFile(pageKey, 'en')), `missing English ${pageKey}`);
    assert.ok(fs.existsSync(outputFile(pageKey, 'zh-CN')), `missing Chinese ${pageKey}`);
  }

  assert.ok(fs.existsSync(path.join(OUTPUT, 'blog', 'private-label-perfume-for-startups.html')));
  assert.ok(fs.existsSync(path.join(OUTPUT, 'zh', 'blog', 'private-label-perfume-for-startups.html')));
});

test('blog content uses stable article directories and independently published translations', () => {
  const articlesRoot = path.join(ROOT, 'src', 'content', 'blog', 'articles');
  const articleDirectories = fs.readdirSync(articlesRoot, { withFileTypes: true }).filter(entry => entry.isDirectory());
  assert.equal(articleDirectories.length, 59);
  assert.equal(blogPosts.filter(post => post.locale === 'en').length, 59);
  assert.equal(blogPosts.filter(post => post.locale === 'zh-CN').length, 59);
  assert.equal(fs.existsSync(path.join(ROOT, 'src', 'content', 'blog', 'en')), false);

  const translations = new Set();
  const routes = new Set();
  for (const post of blogPosts) {
    assert.equal(post.status, 'published');
    assert.ok(post.articleId);
    assert.ok(post.categoryKey);
    assert.ok(post.categoryLabel);
    assert.ok(post.seoTitle && post.seoDescription && post.body);
    assert.ok(fs.existsSync(path.join(articlesRoot, post.articleId, 'article.js')));
    assert.ok(fs.existsSync(path.join(articlesRoot, post.articleId, `${post.locale}.njk`)));
    const translationId = `${post.articleId}:${post.locale}`;
    assert.equal(translations.has(translationId), false, `duplicate blog translation ${translationId}`);
    assert.equal(routes.has(post.permalink), false, `duplicate blog route ${post.permalink}`);
    translations.add(translationId);
    routes.add(post.permalink);
  }

  assert.equal(
    pageAlternateUrl('blogDetail', 'zh-CN', 'en', { translations: [{ locale: 'zh-CN', url: '/zh/blog/example.html' }] }),
    '/zh/blog/example.html'
  );
  assert.equal(pageAlternateUrl('blogDetail', 'zh-CN', 'en', { translations: [] }), '/zh/blog.html');
});

test('blog detail SEO and sitemap expose only real published translations', () => {
  const sample = blogPosts.find(post => post.slug === 'perfume-moq-explained' && post.locale === 'en');
  const html = fs.readFileSync(path.join(OUTPUT, sample.permalink.slice(1)), 'utf8');
  assert.ok(html.includes(`rel="canonical" href="${site.site.origin}${sample.permalink}"`));
  assert.ok(html.includes(`rel="alternate" hreflang="en" href="${site.site.origin}${sample.permalink}"`));
  assert.ok(html.includes(`rel="alternate" hreflang="zh-CN" href="${site.site.origin}/zh/blog/${sample.slug}.html"`));
  assert.ok(html.includes(`rel="alternate" hreflang="x-default" href="${site.site.origin}${sample.permalink}"`));
  assert.ok(html.includes(`href="/zh/blog/${sample.slug}.html" hreflang="zh-CN"`));

  const schema = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(match => JSON.parse(match[1]))
    .flatMap(item => item['@graph'] || [])
    .find(item => item['@type'] === 'BlogPosting');
  assert.equal(schema.inLanguage, 'en');
  assert.equal(schema.articleSection, sample.categoryLabel);

  const sitemap = fs.readFileSync(path.join(OUTPUT, 'sitemap.xml'), 'utf8');
  assert.ok(sitemap.includes(`<loc>${site.site.origin}${sample.permalink}</loc>`));
  assert.ok(sitemap.includes(`hreflang="en" href="${site.site.origin}${sample.permalink}"`));
  assert.ok(sitemap.includes(`hreflang="zh-CN" href="${site.site.origin}/zh/blog/${sample.slug}.html"`));

  const chinese = fs.readFileSync(path.join(OUTPUT, 'zh', 'blog', `${sample.slug}.html`), 'utf8');
  assert.match(chinese, /<html lang="zh-CN" dir="ltr">/);
  assert.match(chinese, /香水起订量详解/);
  assert.ok(chinese.includes(`rel="alternate" hreflang="en" href="${site.site.origin}${sample.permalink}"`));
});

test('all core pages use one generator and locale data instead of copied templates', () => {
  const generator = fs.readFileSync(path.join(ROOT, 'src', 'generators', 'core-pages.njk'), 'utf8');
  assert.match(generator, /pagination:\s*\n\s*data: corePageVariants/);

  for (const pageKey of Object.keys(PAGE_ROUTES)) {
    const pageTemplate = ['terms', 'privacy'].includes(pageKey) ? 'legal' : pageKey;
    assert.ok(fs.existsSync(path.join(ROOT, 'src', '_includes', 'pages', `${pageTemplate}.njk`)), `missing shared ${pageTemplate} template`);

    const content = require(path.join(ROOT, 'src', 'content', 'pages', `${pageKey}.js`));
    for (const locale of Object.values(locales).filter(item => item.enabled)) {
      assert.ok(content[locale.key], `missing ${locale.key} data for ${pageKey}`);
    }
  }

  assert.equal(fs.existsSync(path.join(ROOT, 'src', 'pages')), false, 'legacy pages directory should not exist');
  assert.equal(fs.existsSync(path.join(ROOT, 'src', 'system')), false, 'legacy system directory should not exist');
});

test('generated HTML is complete and contains valid JSON-LD', () => {
  for (const file of filesUnder(OUTPUT, '.html')) {
    const html = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(html, /{{\s*(?:config|site)\./, `unresolved configuration token in ${file}`);
    assert.doesNotMatch(html, /{%[\s\S]*?%}/, `unresolved Nunjucks statement in ${file}`);
    assert.doesNotMatch(html, /\{brand\}/, `unresolved translation variable in ${file}`);
    assert.doesNotMatch(html, /\.\.\/https:\/\//, `prefixed absolute URL in ${file}`);

    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.ok(schemas.length > 0, `missing JSON-LD in ${file}`);
    schemas.forEach(match => assert.doesNotThrow(() => JSON.parse(match[1]), `invalid JSON-LD in ${file}`));
  }
});

test('core pages publish reciprocal language and canonical metadata', () => {
  for (const pageKey of Object.keys(PAGE_ROUTES)) {
    const en = fs.readFileSync(outputFile(pageKey, 'en'), 'utf8');
    const zh = fs.readFileSync(outputFile(pageKey, 'zh-CN'), 'utf8');
    const enRoute = PAGE_ROUTES[pageKey];
    const zhRoute = enRoute === '/' ? '/zh/' : `/zh${enRoute}`;

    assert.match(en, /<html lang="en" dir="ltr">/);
    assert.match(zh, /<html lang="zh-CN" dir="ltr">/);
    assert.ok(en.includes(`rel="canonical" href="${site.site.origin}${enRoute}"`));
    assert.ok(zh.includes(`rel="canonical" href="${site.site.origin}${zhRoute}"`));
    assert.ok(en.includes(`hreflang="zh-CN" href="${site.site.origin}${zhRoute}"`));
    assert.ok(zh.includes(`hreflang="en" href="${site.site.origin}${enRoute}"`));
  }
});

test('English and Chinese homepages publish the same core capability modules', () => {
  const english = fs.readFileSync(outputFile('index', 'en'), 'utf8');
  const chinese = fs.readFileSync(outputFile('index', 'zh-CN'), 'utf8');
  const moduleIds = [
    'fragrance-development',
    'manufacturing-capability',
    'quality-control',
    'project-example',
    'global-export',
    'home-faq',
    'inquiry'
  ];

  for (const id of moduleIds) {
    assert.ok(english.includes(`id="${id}"`), `missing English homepage module ${id}`);
    assert.ok(chinese.includes(`id="${id}"`), `missing Chinese homepage module ${id}`);
  }

  assert.match(chinese, /<form id="inquiry-form">/);
  assert.match(chinese, /生成 WhatsApp 询盘/);
  assert.match(chinese, /常见采购问题/);
});

test('contact links and public runtime configuration use shared configuration', () => {
  for (const locale of ['en', 'zh-CN']) {
    const contact = fs.readFileSync(outputFile('contact', locale), 'utf8');
    assert.ok(contact.includes(`mailto:${site.contact.email}`));
    assert.ok(contact.includes(site.contact.whatsapp.url));
    assert.ok(contact.includes(`"threshold":${site.services.lowQuantityReview.threshold}`));
    assert.ok(contact.includes(`"number":"${site.contact.whatsapp.number}"`));
  }

  const homepage = fs.readFileSync(outputFile('index', 'en'), 'utf8');
  assert.match(homepage, /<form id="inquiry-form">/);
  assert.match(homepage, /class="btn btn-gold home-inquiry-submit"/);

  const mainScript = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'main.js'), 'utf8');
  assert.match(mainScript, /encodeURIComponent\(msg\)/);
  assert.doesNotMatch(mainScript, new RegExp(site.contact.whatsapp.number));
  assert.doesNotMatch(mainScript, new RegExp(site.contact.email.replace('.', '\\.')));
});

test('deployment metadata and public asset boundaries are preserved', () => {
  assert.equal(fs.readFileSync(path.join(OUTPUT, 'CNAME'), 'utf8').trim(), 'www.aromamatrix.com');
  assert.ok(fs.readFileSync(path.join(OUTPUT, 'sitemap.xml'), 'utf8').includes('/zh/'));
  assert.ok(fs.readFileSync(path.join(OUTPUT, 'robots.txt'), 'utf8').includes('/sitemap.xml'));
  assert.equal(fs.existsSync(path.join(OUTPUT, 'images')), false, 'private root images must not be published');
  assert.ok(fs.existsSync(path.join(OUTPUT, 'assets', 'images')), 'public images must be served from assets');
});
