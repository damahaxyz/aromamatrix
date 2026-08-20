import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://shop.aromamatrix.com";
const username = "damaha";
const password = process.env.WP_APP_PASSWORD;

if (!password) {
  throw new Error("WP_APP_PASSWORD is required");
}

const auth = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
const imageDir = "/Users/dodo/Project/AROMAMATRIX/assets/images/shop-fragrances";
const resultPath = "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/qy1002-upload-results.json";

const products = [
  {
    sku: "AM-FR-1002-01",
    factoryModel: "QY1002-1",
    productNote: "卡姆拉黑色100ml",
    name: "Spiced Date",
    slug: "spiced-date",
    image: "am-fr-1002-01-spiced-date.webp",
    familyTerms: ["Amber", "Spicy", "Gourmand"],
    positioning: "Unisex",
    characterTerms: ["Warm", "Sweet", "Rich"],
    category: "amber-spicy",
    tags: ["Bergamot", "Cinnamon", "Dates", "Praline", "Vanilla", "Roasted Tonka"],
    top: "Bergamot, cinnamon, nutmeg",
    heart: "Dates accord, lily of the valley, praline, tuberose",
    base: "Roasted tonka, benzoin, myrrh, vanilla, amber wood",
    summary: "A warm amber-gourmand direction where bergamot, cinnamon and nutmeg lead into dates and praline over a resinous vanilla-tonka base.",
    marketDirection: "Potential fit for Gulf and international unisex collections seeking a warm date-and-spice gourmand for evening or cooler-season concepts.",
  },
  {
    sku: "AM-FR-1002-02",
    factoryModel: "QY1002-2",
    productNote: "卡姆拉棕色100ml",
    name: "Coffee Praline",
    slug: "coffee-praline",
    image: "am-fr-1002-02-coffee-praline.webp",
    familyTerms: ["Amber", "Spicy", "Gourmand"],
    positioning: "Unisex",
    characterTerms: ["Warm", "Sweet", "Rich"],
    category: "sweet-gourmand",
    tags: ["Ginger", "Cardamom", "Praline", "Coffee", "Vanilla", "Tonka Bean"],
    top: "Ginger, cinnamon, cardamom",
    heart: "Praline, candied fruits, white flowers",
    base: "Coffee Arabica, tonka bean, musk, benzoin, vanilla",
    summary: "A coffee-led gourmand direction that pairs ginger, cinnamon and cardamom with praline and candied fruit over vanilla, tonka and benzoin.",
    marketDirection: "Potential fit for Gulf, European and North American collections seeking a rich coffee-vanilla gourmand with a warm unisex profile.",
  },
  {
    sku: "AM-FR-1002-03",
    factoryModel: "QY1002-3",
    productNote: "卡姆拉红色100ml",
    name: "Smoked Amber",
    slug: "smoked-amber",
    image: "am-fr-1002-03-smoked-amber.webp",
    familyTerms: ["Amber", "Spicy", "Woody"],
    positioning: "Masculine",
    characterTerms: ["Warm", "Smoky", "Rich"],
    category: "amber-spicy",
    tags: ["Mandarin", "Pimento", "Incense", "Tobacco", "Amber", "Benzoin"],
    top: "Mandarin, pimento, smoked spices",
    heart: "Cistus, orange flower, incense, patchouli",
    base: "Tobacco, amber, tonka bean, benzoin, praline",
    summary: "A smoky amber-spice direction that opens with mandarin and pimento, then deepens through incense and tobacco into benzoin, tonka and praline.",
    marketDirection: "Potential fit for Gulf and international masculine-leaning collections seeking tobacco, incense and amber depth for evening concepts.",
  },
  {
    sku: "AM-FR-1002-04",
    factoryModel: "QY1002-4",
    productNote: "卡姆拉黑红100ml",
    name: "Cherry Praline",
    slug: "cherry-praline",
    image: "am-fr-1002-04-cherry-praline.webp",
    familyTerms: ["Fruity", "Amber", "Gourmand"],
    positioning: "Unisex",
    characterTerms: ["Sweet", "Warm", "Rich"],
    category: "sweet-gourmand",
    tags: ["Black Cherry", "Red Berries", "Cinnamon", "Praline", "Vanilla", "Amber"],
    top: "Black cherry, red berries, bergamot",
    heart: "Cinnamon, praline, tuberose",
    base: "Vanilla, tonka bean, amber wood, myrrh",
    summary: "A deep cherry gourmand direction balancing black cherry and red berries with cinnamon praline, vanilla, tonka and amber wood.",
    marketDirection: "Potential fit for Gulf, European and North American collections seeking a rich cherry-praline gourmand for evening or cooler-season launches.",
  },
];

async function api(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: { Authorization: auth, ...(options.headers ?? {}) },
  });
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!response.ok) {
    throw new Error(`${options.method ?? "GET"} ${endpoint} failed (${response.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

function description(product) {
  return [
    "<h3>Fragrance Profile</h3>",
    "<ul>",
    `<li><strong>Top:</strong> ${product.top}</li>`,
    `<li><strong>Heart:</strong> ${product.heart}</li>`,
    `<li><strong>Base:</strong> ${product.base}</li>`,
    "</ul>",
    "<h3>Suggested Market Direction</h3>",
    `<p>${product.marketDirection}</p>`,
  ].join("");
}

async function readRequiredTaxonomy() {
  const [parents, categories, attributes] = await Promise.all([
    api("/wp-json/wc/v3/products/categories?slug=fragrances&per_page=100"),
    api("/wp-json/wc/v3/products/categories?per_page=100"),
    api("/wp-json/wc/v3/products/attributes?per_page=100"),
  ]);
  const parent = parents[0];
  if (!parent) throw new Error("Existing Fragrances parent category is required");

  const childCategories = Object.fromEntries(
    ["amber-spicy", "sweet-gourmand"].map((slug) => {
      const category = categories.find((item) => item.slug === slug && item.parent === parent.id);
      if (!category) throw new Error(`Existing category ${slug} is required`);
      return [slug, category];
    }),
  );

  const attributeDefinitions = [
    ["family", "Fragrance Family"],
    ["positioning", "Positioning"],
    ["character", "Scent Character"],
  ];
  const result = {};
  for (const [key, name] of attributeDefinitions) {
    const attribute = attributes.find((item) => item.name === name);
    if (!attribute) throw new Error(`Existing attribute ${name} is required`);
    result[key] = attribute;
  }
  return { parent, childCategories, attributes: result };
}

async function ensureOnlyRequiredTags() {
  const tagNames = [...new Set(products.flatMap((product) => product.tags))];
  const existing = await api("/wp-json/wc/v3/products/tags?per_page=100");
  const tags = {};
  for (const name of tagNames) {
    let tag = existing.find((item) => item.name.toLowerCase() === name.toLowerCase());
    if (!tag) {
      tag = await api("/wp-json/wc/v3/products/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    }
    tags[name] = tag;
  }
  return tags;
}

async function ensureOnlyProductMedia(product) {
  const existing = await api(`/wp-json/wp/v2/media?search=${encodeURIComponent(product.sku)}&per_page=100`);
  const match = existing.find((item) => item.slug?.includes(product.sku.toLowerCase()));
  if (match) return match;

  const bytes = await fs.readFile(path.join(imageDir, product.image));
  const uploaded = await api("/wp-json/wp/v2/media", {
    method: "POST",
    headers: {
      "Content-Type": "image/webp",
      "Content-Disposition": `attachment; filename="${product.image}"`,
    },
    body: bytes,
  });
  return api(`/wp-json/wp/v2/media/${uploaded.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: `${product.sku} — ${product.name}`,
      alt_text: `${product.name} fragrance direction with an original AM perfume bottle and representative scent materials`,
      caption: "Original AROMAMATRIX fragrance-direction image generated for B2B sample presentation.",
    }),
  });
}

function payload(product, mediaId, taxonomy, tags) {
  return {
    name: product.name,
    slug: product.slug,
    type: "simple",
    status: "publish",
    catalog_visibility: "visible",
    regular_price: "0",
    description: description(product),
    short_description: `<p>${product.summary}</p>`,
    sku: product.sku,
    manage_stock: false,
    sold_individually: false,
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    categories: [{ id: taxonomy.parent.id }, { id: taxonomy.childCategories[product.category].id }],
    tags: product.tags.map((name) => ({ id: tags[name].id })),
    images: [{ id: mediaId, alt: `${product.name} fragrance direction` }],
    attributes: [
      { id: taxonomy.attributes.family.id, visible: true, variation: false, options: product.familyTerms },
      { id: taxonomy.attributes.positioning.id, visible: true, variation: false, options: [product.positioning] },
      { id: taxonomy.attributes.character.id, visible: true, variation: false, options: product.characterTerms },
    ],
    meta_data: [
      { key: "_aromamatrix_factory_reference", value: product.factoryModel },
      { key: "_aromamatrix_product_note", value: product.productNote },
      { key: "catalog_purpose", value: "B2B fragrance sample presentation" },
    ],
  };
}

async function upsertOnlyProduct(product, mediaId, taxonomy, tags) {
  const matches = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(product.sku)}&per_page=100`);
  if (matches.length > 1) throw new Error(`${product.sku}: expected at most one existing product, found ${matches.length}`);
  const body = JSON.stringify(payload(product, mediaId, taxonomy, tags));
  if (matches.length === 1) {
    return api(`/wp-json/wc/v3/products/${matches[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });
  }
  return api("/wp-json/wc/v3/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

const taxonomy = await readRequiredTaxonomy();
const tags = await ensureOnlyRequiredTags();
const results = [];
for (const product of products) {
  const media = await ensureOnlyProductMedia(product);
  const saved = await upsertOnlyProduct(product, media.id, taxonomy, tags);
  results.push({ id: saved.id, sku: saved.sku, name: saved.name, status: saved.status, permalink: saved.permalink, imageId: media.id });
  console.log(`${saved.status.toUpperCase()} ${saved.sku} ${saved.permalink}`);
}
await fs.writeFile(resultPath, `${JSON.stringify({ products: results }, null, 2)}\n`, "utf8");
console.log(`Saved results to ${resultPath}`);
