const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const site = require('../config/site.config');
const locales = require('../config/locales');
const blogPosts = require('../src/_data/blogPosts');
const { PAGE_ROUTES, localeUrl, pageAlternateUrl, validateSiteConfig } = require('../eleventy/helpers');

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
  return path.join(OUTPUT, prefix, `${route.slice(1)}.html`);
}

function assertLocaleDataShape(english, chinese, location) {
  if (Array.isArray(english)) {
    assert.ok(Array.isArray(chinese), `${location} must be an array in Chinese`);
    assert.equal(chinese.length, english.length, `${location} must contain the same number of Chinese items`);
    english.forEach((item, index) => assertLocaleDataShape(item, chinese[index], `${location}[${index}]`));
    return;
  }

  if (english && typeof english === 'object') {
    assert.ok(chinese && typeof chinese === 'object' && !Array.isArray(chinese), `${location} must be an object in Chinese`);
    for (const key of Object.keys(english)) {
      assert.ok(Object.hasOwn(chinese, key), `missing Chinese page data: ${location}.${key}`);
      assertLocaleDataShape(english[key], chinese[key], `${location}.${key}`);
    }
    return;
  }

  assert.equal(typeof chinese, typeof english, `${location} must use the same value type in both locales`);
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
  assert.equal(site.services.privateLabel.moq.value, 500);
  assert.equal(site.services.lowQuantityReview.threshold, 500);
  assert.equal(site.services.quantityRanges.privateLabel.value, '500 - 2999 pcs');
  assert.equal(Object.hasOwn(site.brand, 'legalEntity'), false);
  assert.match(site.brand.positioning.en, /international B2B perfume manufacturing program/i);
  assert.match(site.brand.positioning.zh, /国际 B2B 香水制造项目/);
  assert.match(site.transaction.entityNotice.en, /quotation, contract, proforma invoice and payment documents/);
  assert.match(site.transaction.entityNotice.zh, /报价、合同、形式发票及收款文件/);

  const invalid = structuredClone(site);
  invalid.contact.whatsapp.number = '12 34';
  assert.throws(() => validateSiteConfig(invalid), /digits only/);

  const invalidThreshold = structuredClone(site);
  invalidThreshold.services.lowQuantityReview.threshold += 1;
  assert.throws(() => validateSiteConfig(invalidThreshold), /threshold/);
});

test('Eleventy generates every enabled locale and its blog routes', () => {
  const htmlFiles = filesUnder(OUTPUT, '.html');
  const enabledLocales = Object.values(locales).filter(locale => locale.enabled);
  assert.ok(htmlFiles.length >= enabledLocales.length * (Object.keys(PAGE_ROUTES).length + 59), 'expected all localized core pages and blog detail pages');

  for (const pageKey of Object.keys(PAGE_ROUTES)) {
    for (const locale of enabledLocales) {
      assert.ok(fs.existsSync(outputFile(pageKey, locale.key)), `missing ${locale.key} ${pageKey}`);
    }
  }

  for (const locale of enabledLocales) {
    assert.equal(blogPosts.filter(post => post.locale === locale.key).length, 59);
  }
});

test('blog content uses stable article directories and independently published translations', () => {
  const articlesRoot = path.join(ROOT, 'src', 'content', 'blog', 'articles');
  const articleDirectories = fs.readdirSync(articlesRoot, { withFileTypes: true }).filter(entry => entry.isDirectory());
  assert.equal(articleDirectories.length, 59);
  assert.equal(blogPosts.filter(post => post.locale === 'en').length, 59);
  for (const locale of Object.values(locales).filter(item => item.enabled)) {
    assert.equal(blogPosts.filter(post => post.locale === locale.key).length, 59);
  }
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
    assert.equal(routes.has(post.publicUrl), false, `duplicate blog route ${post.publicUrl}`);
    translations.add(translationId);
    routes.add(post.publicUrl);
  }

  assert.equal(
    pageAlternateUrl('blogDetail', 'es', 'en', { translations: [{ locale: 'es', url: '/es/blog/example' }] }),
    '/es/blog/example'
  );
  assert.equal(pageAlternateUrl('blogDetail', 'es', 'en', { translations: [] }), '/es/blog');
});

test('blog detail SEO and sitemap expose only real published translations', () => {
  const sample = blogPosts.find(post => post.slug === 'perfume-moq-explained' && post.locale === 'en');
  const html = fs.readFileSync(path.join(OUTPUT, sample.permalink.slice(1)), 'utf8');
  assert.ok(html.includes(`rel="canonical" href="${site.site.origin}${sample.publicUrl}"`));
  assert.ok(html.includes(`rel="alternate" hreflang="en" href="${site.site.origin}${sample.publicUrl}"`));
  assert.ok(html.includes(`rel="alternate" hreflang="es" href="${site.site.origin}/es/blog/moq-perfumes-cantidad-minima-pedido"`));
  assert.ok(html.includes(`rel="alternate" hreflang="x-default" href="${site.site.origin}${sample.publicUrl}"`));
  assert.match(html, /href="\/es\/blog\/moq-perfumes-cantidad-minima-pedido"[\s\S]*?hreflang="es"/);

  const schema = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(match => JSON.parse(match[1]))
    .flatMap(item => item['@graph'] || [])
    .find(item => item['@type'] === 'BlogPosting');
  assert.equal(schema.inLanguage, 'en');
  assert.equal(schema.articleSection, sample.categoryLabel);

  const sitemap = fs.readFileSync(path.join(OUTPUT, 'sitemap.xml'), 'utf8');
  assert.ok(sitemap.includes(`<loc>${site.site.origin}${sample.publicUrl}</loc>`));
  assert.ok(sitemap.includes(`hreflang="en" href="${site.site.origin}${sample.publicUrl}"`));
  assert.ok(sitemap.includes(`hreflang="es" href="${site.site.origin}/es/blog/moq-perfumes-cantidad-minima-pedido"`));

  const spanish = fs.readFileSync(path.join(OUTPUT, 'es', 'blog', 'moq-perfumes-cantidad-minima-pedido.html'), 'utf8');
  assert.match(spanish, /<html lang="es" dir="ltr">/);
  assert.ok(spanish.includes(`rel="alternate" hreflang="en" href="${site.site.origin}${sample.publicUrl}"`));
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
    assertLocaleDataShape(content.en, content['zh-CN'], pageKey);
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

    if (path.basename(file) === '404.html') {
      assert.ok(html.includes('<meta name="robots" content="noindex, follow">'));
      continue;
    }

    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.ok(schemas.length > 0, `missing JSON-LD in ${file}`);
    schemas.forEach(match => assert.doesNotThrow(() => JSON.parse(match[1]), `invalid JSON-LD in ${file}`));
  }
});

test('homepage JSON-LD distinguishes the brand, legal name, and multilingual website', () => {
  const html = fs.readFileSync(outputFile('index', 'en'), 'utf8');
  const graph = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(match => JSON.parse(match[1]))
    .flatMap(item => item['@graph'] || []);
  const website = graph.find(item => item['@type'] === 'WebSite');
  const organization = graph.find(item => item['@type'] === 'Organization');
  const enabledLanguageCodes = Object.values(locales)
    .filter(locale => locale.enabled)
    .map(locale => locale.code);

  assert.equal(website.name, site.brand.name);
  assert.equal(website.alternateName, site.brand.alternateName);
  assert.deepEqual(website.inLanguage, enabledLanguageCodes);
  assert.equal(organization.name, site.brand.name);
  assert.equal(organization.legalName, site.manufacturer.legalName);
  assert.equal(organization.alternateName, site.brand.alternateName);
  assert.equal(organization.description, site.brand.businessType);
  assert.equal(organization.telephone, `+${site.contact.whatsapp.number}`);
  assert.equal(organization.contactPoint.telephone, `+${site.contact.whatsapp.number}`);
  assert.equal(organization.logo, `${site.site.origin}/${site.site.logoPath}`);
});

test('core pages publish reciprocal language and canonical metadata', () => {
  const secondaryLocale = Object.values(locales).find(locale => locale.enabled && locale.key !== 'en');
  for (const pageKey of Object.keys(PAGE_ROUTES)) {
    const en = fs.readFileSync(outputFile(pageKey, 'en'), 'utf8');
    const secondary = fs.readFileSync(outputFile(pageKey, secondaryLocale.key), 'utf8');
    const enRoute = PAGE_ROUTES[pageKey];
    const secondaryRoute = enRoute === '/' ? `/${secondaryLocale.path}/` : `/${secondaryLocale.path}${enRoute}`;

    assert.match(en, /<html lang="en" dir="ltr">/);
    assert.ok(secondary.includes(`<html lang="${secondaryLocale.code}"`));
    assert.ok(en.includes(`rel="canonical" href="${site.site.origin}${enRoute}"`));
    assert.ok(secondary.includes(`rel="canonical" href="${site.site.origin}${secondaryRoute}"`));
    assert.ok(en.includes(`hreflang="${secondaryLocale.hreflang}" href="${site.site.origin}${secondaryRoute}"`));
    assert.ok(secondary.includes(`hreflang="en" href="${site.site.origin}${enRoute}"`));
  }
});

test('Arabic pages publish RTL direction and all new locales expose reciprocal alternates', () => {
  const enabledLocales = Object.values(locales).filter(locale => locale.enabled);
  for (const pageKey of Object.keys(PAGE_ROUTES)) {
    const arabic = fs.readFileSync(outputFile(pageKey, 'ar'), 'utf8');
    assert.match(arabic, /<html lang="ar" dir="rtl">/);

    const english = fs.readFileSync(outputFile(pageKey, 'en'), 'utf8');
    for (const locale of enabledLocales) {
      assert.ok(english.includes(`hreflang="${locale.hreflang}"`), `missing ${locale.key} alternate on ${pageKey}`);
    }
  }
});

test('English and Chinese homepages publish the same core capability modules', () => {
  const english = fs.readFileSync(outputFile('index', 'en'), 'utf8');
  const localized = fs.readFileSync(outputFile('index', 'es'), 'utf8');
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
    assert.ok(localized.includes(`id="${id}"`), `missing localized homepage module ${id}`);
  }

  assert.match(localized, /<form id="inquiry-form">/);
});

test('every enabled locale publishes the 500-piece private-label announcement', () => {
  for (const locale of Object.values(locales).filter(item => item.enabled).map(item => item.key)) {
    const homepage = fs.readFileSync(outputFile('index', locale), 'utf8');
    assert.match(homepage, /class="announcement-bar"/);
    assert.match(homepage, /500/);
    assert.ok(homepage.includes(`href="${localeUrl('contact', locale)}#inquiry-form"`));
  }
});

test('contact links and public runtime configuration use shared configuration', () => {
  for (const locale of Object.values(locales).filter(item => item.enabled).map(item => item.key)) {
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
  assert.ok(fs.readFileSync(path.join(OUTPUT, 'sitemap.xml'), 'utf8').includes('/es/'));
  assert.ok(fs.readFileSync(path.join(OUTPUT, 'robots.txt'), 'utf8').includes('/sitemap.xml'));
  assert.equal(fs.existsSync(path.join(OUTPUT, 'images')), false, 'private root images must not be published');
  assert.ok(fs.existsSync(path.join(OUTPUT, 'assets', 'images')), 'public images must be served from assets');
});

test('Cloudflare Pages receives localized custom 404 documents', () => {
  const sitemap = fs.readFileSync(path.join(OUTPUT, 'sitemap.xml'), 'utf8');
  assert.ok(fs.existsSync(path.join(OUTPUT, 'assets', 'css', 'not-found.css')));

  for (const locale of Object.values(locales).filter(item => item.enabled)) {
    const prefix = locale.path ? `${locale.path}/` : '';
    const file = path.join(OUTPUT, prefix, '404.html');
    assert.ok(fs.existsSync(file), `missing ${locale.key} 404 document`);

    const html = fs.readFileSync(file, 'utf8');
    assert.ok(html.includes('<meta name="robots" content="noindex, follow">'));
    assert.ok(html.includes('href="/assets/css/not-found.css"'));
    assert.doesNotMatch(html, /rel="canonical"/);
    assert.match(html, /<h1>[^<]+<\/h1>/);
    assert.ok(html.includes(`href="${localeUrl('index', locale.key)}"`));
    assert.ok(html.includes(`href="${localeUrl('contact', locale.key)}"`));
    assert.ok(html.includes(`<html lang="${locale.code}" dir="${locale.direction}">`));
  }

  assert.doesNotMatch(sitemap, /\/404(?:\.html)?</);
});
