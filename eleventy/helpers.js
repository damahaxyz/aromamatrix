const nunjucks = require('nunjucks');
const site = require('../config/site.config');
const locales = require('../config/locales');
const PAGE_ROUTES = require('../config/routes');
const translations = require('../src/_data/translations');

const templateEnvironment = nunjucks.configure({
  autoescape: true,
  throwOnUndefined: true
});

function validateSiteConfig(config = site) {
  const requiredStrings = [
    ['site.origin', config.site?.origin],
    ['brand.name', config.brand?.name],
    ['brand.positioning.en', config.brand?.positioning?.en],
    ['brand.positioning.zh', config.brand?.positioning?.zh],
    ['manufacturer.legalName', config.manufacturer?.legalName],
    ['transaction.entityNotice.en', config.transaction?.entityNotice?.en],
    ['transaction.entityNotice.zh', config.transaction?.entityNotice?.zh],
    ['contact.email', config.contact?.email],
    ['contact.whatsapp.number', config.contact?.whatsapp?.number],
    ['contact.whatsapp.url', config.contact?.whatsapp?.url]
  ];
  for (const [key, value] of requiredStrings) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(`Invalid site configuration: ${key} must be a non-empty string`);
    }
  }
  if (!/^https:\/\/[^/]+$/.test(config.site.origin)) {
    throw new Error('Invalid site configuration: site.origin must be an HTTPS origin without a trailing slash');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contact.email)) {
    throw new Error('Invalid site configuration: contact.email is invalid');
  }
  if (!/^\d+$/.test(config.contact.whatsapp.number)) {
    throw new Error('Invalid site configuration: contact.whatsapp.number must contain digits only');
  }
  if (config.contact.whatsapp.url !== `https://wa.me/${config.contact.whatsapp.number}`) {
    throw new Error('Invalid site configuration: WhatsApp URL must match the configured number');
  }
  const privateLabelMoq = config.services?.privateLabel?.moq?.value;
  const odmMoq = config.services?.odm?.moq?.value;
  const threshold = config.services?.lowQuantityReview?.threshold;
  if (![privateLabelMoq, odmMoq, threshold].every(value => Number.isInteger(value) && value > 0)) {
    throw new Error('Invalid site configuration: MOQ values must be positive integers');
  }
  if (threshold !== privateLabelMoq) {
    throw new Error('Invalid site configuration: low-quantity threshold must match private-label MOQ');
  }
  return config;
}

validateSiteConfig();

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function translate(locale, key) {
  const dictionary = translations[locale];
  if (!dictionary) throw new Error(`Unsupported or disabled translation locale: ${locale}`);
  const value = key.split('.').reduce((current, part) => current?.[part], dictionary);
  if (value === undefined) throw new Error(`Missing translation: ${locale}.${key}`);
  return replaceTranslationVariables(value);
}

function replaceTranslationVariables(value) {
  if (typeof value === 'string') return value.replaceAll('{brand}', site.brand.name);
  if (Array.isArray(value)) return value.map(replaceTranslationVariables);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, replaceTranslationVariables(item)])
    );
  }
  return value;
}

function localeUrl(pageKey, locale) {
  const route = PAGE_ROUTES[pageKey];
  const localeConfig = locales[locale];
  if (!route) throw new Error(`Unknown page route: ${pageKey}`);
  if (!localeConfig?.enabled) throw new Error(`Disabled locale route requested: ${locale}`);
  if (!localeConfig.path) return route;
  if (route === '/') return `/${localeConfig.path}/`;
  return `/${localeConfig.path}${route}`;
}

function localizedFact(locale, key) {
  const english = {
    privateLabelMoq: site.services.privateLabel.moq.pcs,
    customMoq: site.services.odm.moq.pcs,
    sampleSet: site.samples.setDisplay,
    sampleDays: site.samples.preparationDays.display,
    sampleDaysShort: site.samples.preparationDays.shortDisplay,
    founded: site.brand.founded.short,
    workshop: site.manufacturer.controlledWorkshop.display
  };
  const chinese = {
    privateLabelMoq: `${site.services.privateLabel.moq.value.toLocaleString('zh-CN')} 件`,
    customMoq: `${site.services.odm.moq.value.toLocaleString('zh-CN')} 件`,
    sampleSet: `${site.samples.count} × ${site.samples.volumeMl} 毫升`,
    sampleDays: `${site.samples.preparationDays.min}–${site.samples.preparationDays.max} 个工作日`,
    sampleDaysShort: `${site.samples.preparationDays.min}–${site.samples.preparationDays.max} 天`,
    founded: `${site.brand.founded.iso.slice(0, 4)}年${Number(site.brand.founded.iso.slice(5))}月`,
    workshop: '10万级'
  };
  const localized = {
    es: {
      privateLabelMoq: `${site.services.privateLabel.moq.value.toLocaleString('es-ES')} unidades`,
      customMoq: `${site.services.odm.moq.value.toLocaleString('es-ES')} unidades`,
      sampleSet: `${site.samples.count} × ${site.samples.volumeMl} ml`,
      sampleDays: `${site.samples.preparationDays.min}–${site.samples.preparationDays.max} días laborables`,
      sampleDaysShort: `${site.samples.preparationDays.min}–${site.samples.preparationDays.max} días`,
      founded: new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${site.brand.founded.iso}-01`)),
      workshop: 'Clase 100.000'
    },
    ar: {
      privateLabelMoq: `${site.services.privateLabel.moq.value.toLocaleString('ar')} قطعة`,
      customMoq: `${site.services.odm.moq.value.toLocaleString('ar')} قطعة`,
      sampleSet: `${site.samples.count} × ${site.samples.volumeMl} مل`,
      sampleDays: `${site.samples.preparationDays.min}–${site.samples.preparationDays.max} أيام عمل`,
      sampleDaysShort: `${site.samples.preparationDays.min}–${site.samples.preparationDays.max} أيام`,
      founded: new Intl.DateTimeFormat('ar', { year: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${site.brand.founded.iso}-01`)),
      workshop: 'الفئة 100,000'
    },
    fr: {
      privateLabelMoq: `${site.services.privateLabel.moq.value.toLocaleString('fr-FR')} unités`,
      customMoq: `${site.services.odm.moq.value.toLocaleString('fr-FR')} unités`,
      sampleSet: `${site.samples.count} × ${site.samples.volumeMl} ml`,
      sampleDays: `${site.samples.preparationDays.min}–${site.samples.preparationDays.max} jours ouvrés`,
      sampleDaysShort: `${site.samples.preparationDays.min}–${site.samples.preparationDays.max} jours`,
      founded: new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${site.brand.founded.iso}-01`)),
      workshop: 'Classe 100 000'
    }
  };
  const values = locale === 'zh-CN' ? chinese : (localized[locale] || english);
  if (!(key in values)) throw new Error(`Unknown localized fact: ${key}`);
  return values[key];
}

function pageAlternateUrl(pageKey, targetLocale, currentLocale = 'en', post = null) {
  if (pageKey === 'blogDetail') {
    return post?.translations?.find(item => item.locale === targetLocale)?.url || localeUrl('blog', targetLocale);
  }
  return localeUrl(pageKey, targetLocale || currentLocale);
}

function absoluteUrl(route) {
  return `${site.site.origin}${route === '/' ? '/' : route}`;
}

function stripHtml(value = '') {
  return String(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function organizationNodes(locale) {
  return [
    {
      '@type': 'WebSite',
      '@id': `${site.site.origin}/#website`,
      url: `${site.site.origin}/`,
      name: site.brand.name,
      inLanguage: locale,
      publisher: { '@id': `${site.site.origin}/#organization` }
    },
    {
      '@type': 'Organization',
      '@id': `${site.site.origin}/#organization`,
      name: site.manufacturer.legalName,
      alternateName: [site.brand.name, `${site.brand.name} ${site.brand.descriptor}`],
      url: `${site.site.origin}/`,
      foundingDate: site.brand.founded.iso,
      email: site.contact.email,
      logo: absoluteUrl(`/${site.site.logoPath}`),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.contact.email,
        url: site.contact.whatsapp.url,
        availableLanguage: Object.values(locales).filter(item => item.enabled).map(item => item.label),
        areaServed: 'Worldwide'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.manufacturer.location.locality,
        addressRegion: site.manufacturer.location.region,
        addressCountry: site.manufacturer.location.countryCode
      }
    }
  ];
}

function renderSeo(pageKey, locale, content, post = null) {
  const isBlogPost = pageKey === 'blogDetail' && post;
  const meta = isBlogPost
    ? {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.description,
        image: post.coverImage,
        label: post.title
      }
    : translate(locale, `pages.${pageKey}`);
  const route = isBlogPost ? post.permalink : localeUrl(pageKey, locale);
  const canonical = absoluteUrl(route);
  const imageUrl = absoluteUrl(`/${String(meta.image || site.site.defaultOgImage).replace(/^\//, '').replace(/^\.\.\//, '')}`);
  const enabledLocales = Object.values(locales).filter(item => item.enabled);
  const alternates = isBlogPost
    ? post.translations.map(item => ({ locale: locales[item.locale], url: absoluteUrl(item.url) }))
    : enabledLocales.map(item => ({ locale: item, url: absoluteUrl(localeUrl(pageKey, item.key)) }));
  const graph = organizationNodes(locale);
  const pageNode = {
    '@type': pageKey === 'about' ? 'AboutPage' : pageKey === 'contact' ? 'ContactPage' : pageKey === 'qa' ? 'FAQPage' : 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: meta.title,
    description: meta.description,
    inLanguage: locale,
    isPartOf: { '@id': `${site.site.origin}/#website` },
    about: { '@id': `${site.site.origin}/#organization` }
  };
  if (pageKey === 'qa') {
    pageNode.mainEntity = [...String(content).matchAll(/<details class="faq-item"[^>]*>\s*<summary>([\s\S]*?)<\/summary>\s*<div class="faq-answer">([\s\S]*?)<\/div>\s*<\/details>/gi)]
      .map(match => ({
        '@type': 'Question',
        name: stripHtml(match[1]),
        acceptedAnswer: { '@type': 'Answer', text: stripHtml(match[2]) }
      }));
  }
  graph.push(pageNode);

  if (isBlogPost) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      url: canonical,
      headline: post.title,
      description: meta.description,
      image: imageUrl,
      datePublished: post.date,
      dateModified: post.dateModified || post.date,
      author: { '@type': 'Organization', name: post.authorLabel, url: absoluteUrl('/about.html') },
      publisher: { '@id': `${site.site.origin}/#organization` },
      mainEntityOfPage: { '@id': `${canonical}#webpage` },
      articleSection: post.categoryLabel,
      inLanguage: locale
    });
  }

  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}">`,
    '<meta name="robots" content="index, follow">',
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    '<link rel="icon" type="image/png" sizes="64x64" href="/assets/images/brand/favicon-64.png">',
    '<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/brand/apple-touch-icon.png">',
    '<meta name="theme-color" content="#ffffff">',
    ...alternates.map(item => `<link rel="alternate" hreflang="${item.locale.hreflang}" href="${escapeHtml(item.url)}">`),
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(isBlogPost ? (alternates.find(item => item.locale.key === 'en')?.url || canonical) : absoluteUrl(localeUrl(pageKey, 'en')))}">`,
    `<meta property="og:type" content="${isBlogPost ? 'article' : 'website'}">`,
    `<meta property="og:site_name" content="${escapeHtml(site.brand.name)}">`,
    `<meta property="og:locale" content="${escapeHtml(locales[locale].ogLocale)}">`,
    ...alternates.filter(item => item.locale.key !== locale).map(item => `<meta property="og:locale:alternate" content="${escapeHtml(item.locale.ogLocale)}">`),
    `<meta property="og:title" content="${escapeHtml(meta.title)}">`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}">`,
    `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`
  ];
  return tags.join('\n  ');
}

function renderRuntimeConfig(locale) {
  const payload = {
    locale,
    brand: { name: site.brand.name },
    contact: {
      whatsapp: {
        number: site.contact.whatsapp.number,
        baseUrl: site.contact.whatsapp.url,
        defaultMessage: translate(locale, 'contact.whatsappMessage')
      }
    },
    ui: translate(locale, 'ui'),
    services: { lowQuantityReview: { threshold: site.services.lowQuantityReview.threshold } }
  };
  return JSON.stringify(payload).replace(/</g, '\\u003c');
}

function interpolate(value, locale = 'en') {
  if (value === null || value === undefined) return '';
  return templateEnvironment.renderString(replaceTranslationVariables(String(value)), {
    config: site,
    site,
    locale,
    fact: (...args) => localizedFact(locale, args.length > 1 ? args[1] : args[0])
  });
}

function interpolateObject(value, locale = 'en') {
  if (typeof value === 'string') return interpolate(value, locale);
  if (Array.isArray(value)) return value.map(item => interpolateObject(item, locale));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, interpolateObject(item, locale)]));
  }
  return value;
}

function blogCategories(posts) {
  return [...new Set((posts || []).map(post => post.categoryKey).filter(Boolean))].sort();
}

function localizedBlogPosts(posts, locale) {
  return (posts || []).filter(post => post.locale === locale);
}

module.exports = {
  PAGE_ROUTES,
  blogCategories,
  interpolate,
  interpolateObject,
  localeUrl,
  localizedFact,
  localizedBlogPosts,
  pageAlternateUrl,
  renderRuntimeConfig,
  renderSeo,
  translate,
  validateSiteConfig
};
