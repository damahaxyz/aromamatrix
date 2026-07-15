const SITE_URL = 'https://www.aromamatrix.com';
const SITE_NAME = 'AROMAMATRIX';
const DEFAULT_OG_IMAGE = 'assets/images/brand/aromamatrix-og.webp';
const LOGO_PATH = 'assets/images/brand/aromamatrix-logo-square.png';
const UPDATED_DATE = '2026-07-15';

const PAGE_SEO = {
  'index.html': {
    path: '/',
    title: 'Private Label Perfume Manufacturer in China | AROMAMATRIX',
    description: 'AROMAMATRIX supports private label, OEM and ODM perfume projects with fragrance development, filling, packaging and export coordination in China.',
    image: 'assets/images/seo/factory-og.webp',
    schemaType: 'WebPage',
    label: 'Home'
  },
  'about.html': {
    path: '/about.html',
    title: 'About Our Guangzhou Perfume Factory | AROMAMATRIX',
    description: 'Meet the AROMAMATRIX brand and sales team and see the Guangzhou manufacturing facility, production workflow, equipment and protected certificates.',
    image: 'assets/images/seo/factory-og.webp',
    schemaType: 'AboutPage',
    label: 'Factory & Certificates'
  },
  'process.html': {
    path: '/process.html',
    title: 'Perfume OEM, ODM & Private Label Services | AROMAMATRIX',
    description: 'Compare private label, ODM development and OEM perfume manufacturing routes, including typical quantities, sampling, packaging and production stages.',
    image: 'assets/images/seo/filling-line-og.webp',
    schemaType: 'WebPage',
    label: 'OEM / ODM Services'
  },
  'contact.html': {
    path: '/contact.html',
    title: 'Request a Perfume Factory Quote | AROMAMATRIX',
    description: 'Send your perfume project brief to AROMAMATRIX for a feasibility review, manufacturing quotation or free fragrance samples with buyer-paid courier cost.',
    image: 'assets/images/seo/team-office-og.webp',
    schemaType: 'ContactPage',
    label: 'Contact'
  },
  'qa.html': {
    path: '/qa.html',
    title: 'Perfume OEM/ODM FAQ: MOQ, Samples & Shipping | AROMAMATRIX',
    description: 'Read 41 practical answers about perfume private label, OEM and ODM services, typical MOQ, free samples, packaging, compliance and international shipping.',
    image: 'assets/images/seo/sample-showroom-og.webp',
    schemaType: 'FAQPage',
    label: 'FAQ'
  },
  'blog.html': {
    path: '/blog.html',
    title: 'Perfume Manufacturing Guides & Insights | AROMAMATRIX',
    description: 'Explore practical guides for perfume brand owners covering sourcing, fragrance development, MOQ, packaging, quality, compliance and international shipping.',
    image: 'assets/images/seo/blog-guides-og.webp',
    schemaType: 'CollectionPage',
    label: 'Blog'
  },
  'terms.html': {
    path: '/terms.html',
    title: 'Terms and Conditions | AROMAMATRIX',
    description: 'Review the terms governing AROMAMATRIX website use, B2B perfume inquiries, quotations, samples, manufacturing discussions and shipping information.',
    image: DEFAULT_OG_IMAGE,
    schemaType: 'WebPage',
    label: 'Terms and Conditions'
  },
  'privacy.html': {
    path: '/privacy.html',
    title: 'Business Inquiry Privacy Policy | AROMAMATRIX',
    description: 'Learn how AROMAMATRIX collects, uses, shares and protects contact details, project briefs and other information submitted through business inquiries.',
    image: DEFAULT_OG_IMAGE,
    schemaType: 'WebPage',
    label: 'Privacy Policy'
  }
};

function absoluteUrl(pathname = '/') {
  if (/^https?:\/\//i.test(pathname)) return pathname;
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

function stripHtml(value = '') {
  return value
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

function logoObject() {
  return {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: absoluteUrl(LOGO_PATH),
    contentUrl: absoluteUrl(LOGO_PATH),
    width: 512,
    height: 512,
    caption: 'AROMAMATRIX'
  };
}

function brandOrganization() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'AROMAMATRIX',
    legalName: '厦门香氛矩阵化妆品有限公司',
    alternateName: ['Xiamen Aroma Matrix Cosmetics Co., Ltd.', 'AROMAMATRIX Perfume Factory'],
    url: `${SITE_URL}/`,
    logo: { '@id': `${SITE_URL}/#logo` },
    image: { '@id': `${SITE_URL}/#logo` },
    foundingDate: '2024-11',
    description: 'AROMAMATRIX is a B2B perfume brand and international sales organization supporting private label, OEM and ODM fragrance projects.',
    email: 'sales@aromamatrix.com',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@aromamatrix.com',
      url: 'https://wa.me/85257633378',
      availableLanguage: ['English'],
      areaServed: 'Worldwide'
    }
  };
}

function manufacturerOrganization() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#manufacturer`,
    name: 'Guangzhou Zhuoya Biotechnology Cosmetics Co., Ltd.',
    legalName: 'Guangzhou Zhuoya Biotechnology Cosmetics Co., Ltd.',
    url: `${SITE_URL}/about.html`,
    description: 'Perfume manufacturing entity operating the production facility shown by AROMAMATRIX in Baiyun District, Guangzhou.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Guangzhou',
      addressRegion: 'Guangdong',
      addressCountry: 'CN'
    }
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: 'AROMAMATRIX Perfume Factory',
    description: 'B2B perfume private label, OEM and ODM manufacturing website.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en'
  };
}

function breadcrumbNode(items, canonical) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

function extractFaqQuestions(content) {
  const questions = [];
  const pattern = /<details class="faq-item"[^>]*>\s*<summary>([\s\S]*?)<\/summary>\s*<div class="faq-answer">([\s\S]*?)<\/div>\s*<\/details>/gi;
  let match;
  while ((match = pattern.exec(content)) !== null) {
    questions.push({
      '@type': 'Question',
      name: stripHtml(match[1]),
      acceptedAnswer: { '@type': 'Answer', text: stripHtml(match[2]) }
    });
  }
  return questions;
}

function staticPageSchema(filename, content, posts) {
  const seo = PAGE_SEO[filename];
  const canonical = absoluteUrl(seo.path);
  const pageId = `${canonical}#webpage`;
  const graph = [websiteNode(), logoObject(), brandOrganization(), manufacturerOrganization()];
  const page = {
    '@type': seo.schemaType,
    '@id': pageId,
    url: canonical,
    name: seo.title,
    description: seo.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en'
  };

  if (filename !== 'index.html') {
    const breadcrumb = breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: seo.label, path: seo.path }
    ], canonical);
    page.breadcrumb = { '@id': breadcrumb['@id'] };
    graph.push(breadcrumb);
  }

  if (filename === 'about.html') {
    page.about = [{ '@id': `${SITE_URL}/#organization` }, { '@id': `${SITE_URL}/#manufacturer` }];
  }

  if (filename === 'contact.html') {
    page.mainEntity = { '@id': `${SITE_URL}/#organization` };
  }

  if (filename === 'process.html') {
    const services = [
      ['private-label', 'Private Label Perfume', 'Private label fragrance production using suitable standard components and approved branding.'],
      ['odm', 'ODM Fragrance Development', 'Fragrance and packaging development based on a buyer brief and confirmed project scope.'],
      ['oem', 'OEM Perfume Manufacturing', 'Contract perfume manufacturing based on approved formulas, components, artwork or specifications.']
    ].map(([id, name, description]) => ({
      '@type': 'Service',
      '@id': `${canonical}#${id}`,
      name,
      description,
      provider: { '@id': `${SITE_URL}/#manufacturer` },
      areaServed: 'Worldwide',
      serviceType: name
    }));
    page.mainEntity = services.map(service => ({ '@id': service['@id'] }));
    graph.push(...services);
  }

  if (filename === 'qa.html') {
    page.mainEntity = extractFaqQuestions(content);
  }

  if (filename === 'blog.html') {
    const itemList = {
      '@type': 'ItemList',
      '@id': `${canonical}#articles`,
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: absoluteUrl(`/blog/${post.slug}.html`)
      }))
    };
    page.mainEntity = { '@id': itemList['@id'] };
    graph.push(itemList);
  }

  graph.push(page);
  return { '@context': 'https://schema.org', '@graph': graph };
}

function blogPageSchema(post, bodyHtml) {
  const canonical = absoluteUrl(`/blog/${post.slug}.html`);
  const pageId = `${canonical}#webpage`;
  const breadcrumb = breadcrumbNode([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog.html' },
    { name: post.title, path: `/blog/${post.slug}.html` }
  ], canonical);
  const cover = absoluteUrl(post.coverImage);
  const articleId = `${canonical}#article`;
  const authorName = post.author || 'AROMAMATRIX Project Team';
  const webPage = {
    '@type': 'WebPage',
    '@id': pageId,
    url: canonical,
    name: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    breadcrumb: { '@id': breadcrumb['@id'] },
    primaryImageOfPage: { '@id': `${canonical}#primaryimage` },
    inLanguage: 'en'
  };
  const image = {
    '@type': 'ImageObject',
    '@id': `${canonical}#primaryimage`,
    url: cover,
    contentUrl: cover,
    width: 1600,
    height: 900,
    caption: post.coverAlt
  };
  const article = {
    '@type': 'BlogPosting',
    '@id': articleId,
    url: canonical,
    headline: post.title,
    description: post.seoDescription || post.description,
    image: { '@id': image['@id'] },
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: `${SITE_URL}/about.html`
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@id': pageId },
    articleSection: post.category,
    keywords: [post.primaryKeyword, ...(post.secondaryKeywords || [])].filter(Boolean).join(', '),
    wordCount: stripHtml(bodyHtml).split(/\s+/).filter(Boolean).length,
    inLanguage: 'en'
  };
  return {
    '@context': 'https://schema.org',
    '@graph': [websiteNode(), logoObject(), brandOrganization(), webPage, image, breadcrumb, article]
  };
}

function seoTags({ title, description, path, image, ogType = 'website', imageWidth = 1200, imageHeight = 630, schema }) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image || DEFAULT_OG_IMAGE);
  const jsonLd = JSON.stringify(schema).replace(/</g, '\\u003c');
  return [
    '  <meta name="robots" content="index, follow">',
    `  <link rel="canonical" href="${canonical}">`,
    '  <link rel="icon" type="image/png" sizes="64x64" href="/assets/images/brand/favicon-64.png">',
    '  <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/brand/apple-touch-icon.png">',
    '  <meta name="theme-color" content="#ffffff">',
    `  <meta property="og:type" content="${ogType}">`,
    '  <meta property="og:site_name" content="AROMAMATRIX">',
    '  <meta property="og:locale" content="en_US">',
    `  <meta property="og:title" content="${escapeAttribute(title)}">`,
    `  <meta property="og:description" content="${escapeAttribute(description)}">`,
    `  <meta property="og:url" content="${canonical}">`,
    `  <meta property="og:image" content="${imageUrl}">`,
    `  <meta property="og:image:width" content="${imageWidth}">`,
    `  <meta property="og:image:height" content="${imageHeight}">`,
    `  <meta property="og:image:alt" content="${escapeAttribute(title)}">`,
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${escapeAttribute(title)}">`,
    `  <meta name="twitter:description" content="${escapeAttribute(description)}">`,
    `  <meta name="twitter:image" content="${imageUrl}">`,
    `  <meta name="twitter:image:alt" content="${escapeAttribute(title)}">`,
    `  <script type="application/ld+json">${jsonLd}</script>`
  ].join('\n');
}

function escapeAttribute(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applySeo(content, options) {
  let output = content
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(options.title)}</title>`)
    .replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeAttribute(options.description)}">`)
    .replace(/<!--\s*@include\s+faq-schema\s*-->/g, '')
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/\s*<meta\s+(?:name=["'](?:robots|twitter:[^"']+)["']|property=["']og:[^"']+["'])[^>]*>/gi, '')
    .replace(/\s*<link\s+rel=["'](?:icon|apple-touch-icon)["'][^>]*>/gi, '')
    .replace(/\s*<meta\s+name=["']theme-color["'][^>]*>/gi, '')
    .replace(/\s*<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  return output.replace('</head>', `${seoTags(options)}\n</head>`);
}

function xmlEscape(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderSitemap(posts) {
  const urls = [
    ...Object.values(PAGE_SEO).map(page => ({ loc: absoluteUrl(page.path), lastmod: UPDATED_DATE })),
    ...posts.map(post => ({ loc: absoluteUrl(`/blog/${post.slug}.html`), lastmod: post.dateModified || post.date }))
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(item => `  <url><loc>${xmlEscape(item.loc)}</loc><lastmod>${item.lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`;
}

function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

module.exports = {
  SITE_URL,
  PAGE_SEO,
  applySeo,
  staticPageSchema,
  blogPageSchema,
  renderSitemap,
  renderRobots
};
