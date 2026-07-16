# AROMAMATRIX website

Multilingual B2B fragrance manufacturing website built with Eleventy 3 and Nunjucks.

## Requirements

- Node.js 22 or newer
- npm

## Commands

```bash
npm install
npm run dev
npm run build
npm test
```

`npm run build` writes the complete static website to `docs/`. Do not edit generated files in `docs/` directly.

## Project structure

```text
config/                 Project-level business facts and locale registry
eleventy/               Eleventy helpers, filters, SEO and JSON-LD logic
src/
  _data/                Variant list and other derived Eleventy data
  _includes/pages/      One shared Nunjucks structure per core page
  _includes/            Shared layouts and site components
  content/pages/        Localized data for each core page
  content/blog/articles Blog articles grouped by stable article ID and locale
  generators/           Routable core, blog, sitemap and robots generators
  i18n/                 Interface translations and localized SEO metadata
assets/                 Public CSS, JavaScript, images and video
images/                 Source/reference media; only approved top-level files are published
test/                   Node.js build and output tests
docs/                   Generated deployment output
```

## Content and configuration

- Change shared public business facts in `config/site.config.js`.
- Enable or add locales in `config/locales.js`.
- Edit interface translations and localized SEO metadata in `src/i18n/{locale}.json`.
- Edit a core page's structure once in `src/_includes/pages/{page}.njk`; output entry templates live in `src/generators/`.
- Edit its localized content in `src/content/pages/{page}.js` under the locale key.
- Each blog article lives in `src/content/blog/articles/{article-id}/`: shared facts are in `article.js`, while localized metadata and body content are in `{locale}.njk`.
- Blog translations publish independently. Only enabled locales with `status: "published"` generate detail pages and appear in that locale's blog list.

Locale keys use BCP 47 names such as `en` and `zh-CN`. Public URL prefixes remain controlled by `config/locales.js`; adding a complete locale object to every core-page data file lets the shared generator build that language without copying templates.

## Validation

The test suite builds the site and checks bilingual routes, canonical and hreflang metadata, JSON-LD, runtime contact configuration, unresolved template tokens and publication boundaries.
