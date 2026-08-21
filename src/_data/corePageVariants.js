const locales = require('../../config/locales');
const routes = require('../../config/routes');

const definitions = {
  index: require('../content/pages/index'),
  fragrances: require('../content/pages/fragrances'),
  bottles: require('../content/pages/bottles'),
  about: require('../content/pages/about'),
  process: require('../content/pages/process'),
  contact: require('../content/pages/contact'),
  blog: require('../content/pages/blog'),
  terms: require('../content/pages/terms'),
  privacy: require('../content/pages/privacy'),
  qa: require('../content/pages/qa')
};

function localizedRoute(pageKey, locale) {
  const route = routes[pageKey];
  const localePath = locales[locale].path;
  if (!localePath) return route;
  if (route === '/') return `/${localePath}/`;
  return `/${localePath}${route}`;
}

function outputPermalink(pageKey, locale) {
  const publicUrl = localizedRoute(pageKey, locale);
  if (publicUrl === '/') return '/index.html';
  if (publicUrl.endsWith('/')) return `${publicUrl}index.html`;
  return `${publicUrl}.html`;
}

module.exports = Object.entries(definitions).flatMap(([pageKey, translations]) =>
  Object.values(locales)
    .filter(locale => locale.enabled && translations[locale.key])
    .map(locale => ({
      pageKey,
      locale: locale.key,
      publicUrl: localizedRoute(pageKey, locale.key),
      permalink: outputPermalink(pageKey, locale.key),
      copy: translations[locale.key]
    }))
);
