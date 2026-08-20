import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");

const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const imageDir = "/Users/dodo/Project/AROMAMATRIX/assets/images/shop-fragrances";
const resultPath = "/Users/dodo/Project/AROMAMATRIX/tmp/qy1012-analysis/qy1012-upload-results.json";

const product = {
  sku: "AM-FR-1012-01",
  factoryModel: "QY1012",
  productNote: "绿色岛屿 100ml",
  name: "Coconut Cypress",
  slug: "coconut-cypress",
  image: "am-fr-1012-01-coconut-cypress.webp",
  category: "sweet-gourmand",
  familyTerms: ["Fruity", "Woody", "Amber"],
  positioning: "Unisex",
  characterTerms: ["Fresh", "Sweet", "Creamy"],
  tags: ["Pineapple", "Cypress", "Ginger", "Coconut", "Tonka Bean", "Sandalwood"],
  top: "Pineapple, iris, ginger, cypress",
  heart: "Coconut, woody notes",
  base: "Amber, tonka bean, sandalwood",
  summary: "A tropical fruity-woody direction that layers pineapple, iris, ginger and cypress over creamy coconut, woods, tonka, amber and sandalwood.",
  marketDirection: "Potential fit for unisex European, North American, Gulf and Southeast Asian collections seeking a creamy tropical signature for warm-weather, resort and casual evening positioning.",
};

async function api(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: { Authorization: auth, ...(options.headers ?? {}) },
  });
  const text = await response.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) throw new Error(`${options.method ?? "GET"} ${endpoint} failed (${response.status}): ${JSON.stringify(data)}`);
  return data;
}

const profile = (item) => `<h3>Fragrance Profile</h3><ul><li><strong>Top:</strong> ${item.top}</li><li><strong>Heart:</strong> ${item.heart}</li><li><strong>Base:</strong> ${item.base}</li></ul><h3>Suggested Market Direction</h3><p>${item.marketDirection}</p>`;

const [parents, categories, attributes, existingTags] = await Promise.all([
  api("/wp-json/wc/v3/products/categories?slug=fragrances&per_page=100"),
  api("/wp-json/wc/v3/products/categories?per_page=100"),
  api("/wp-json/wc/v3/products/attributes?per_page=100"),
  api("/wp-json/wc/v3/products/tags?per_page=100"),
]);

const parent = parents[0];
if (!parent) throw new Error("Fragrances category is required");
const category = categories.find((item) => item.slug === product.category && item.parent === parent.id);
if (!category) throw new Error(`Category ${product.category} is required`);
const requiredAttributes = Object.fromEntries(
  [["family", "Fragrance Family"], ["positioning", "Positioning"], ["character", "Scent Character"]].map(([key, name]) => {
    const attribute = attributes.find((item) => item.name === name);
    if (!attribute) throw new Error(`Attribute ${name} is required`);
    return [key, attribute];
  }),
);

const tags = {};
for (const name of product.tags) {
  let tag = existingTags.find((item) => item.name.toLowerCase() === name.toLowerCase());
  if (!tag) {
    try {
      tag = await api("/wp-json/wc/v3/products/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    } catch (error) {
      if (!String(error).includes("term_exists")) throw error;
      const matches = await api(`/wp-json/wc/v3/products/tags?search=${encodeURIComponent(name)}&per_page=100`);
      tag = matches.find((item) => item.name.toLowerCase() === name.toLowerCase());
      if (!tag) throw error;
    }
  }
  tags[name] = tag;
}

const mediaMatches = await api(`/wp-json/wp/v2/media?search=${encodeURIComponent(product.sku)}&per_page=100`);
let media = mediaMatches.find((item) => item.slug?.includes(product.sku.toLowerCase()));
if (!media) {
  const bytes = await fs.readFile(path.join(imageDir, product.image));
  const uploaded = await api("/wp-json/wp/v2/media", {
    method: "POST",
    headers: {
      "Content-Type": "image/webp",
      "Content-Disposition": `attachment; filename="${product.image}"`,
    },
    body: bytes,
  });
  media = await api(`/wp-json/wp/v2/media/${uploaded.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: `${product.sku} — ${product.name}`,
      alt_text: `${product.name} fragrance direction with an original AM perfume bottle`,
      caption: "Original AROMAMATRIX fragrance-direction image for B2B sample presentation.",
    }),
  });
}

const payload = {
  name: product.name,
  slug: product.slug,
  type: "simple",
  status: "publish",
  catalog_visibility: "visible",
  regular_price: "0",
  description: profile(product),
  short_description: `<p>${product.summary}</p>`,
  sku: product.sku,
  manage_stock: false,
  sold_individually: false,
  weight: "",
  dimensions: { length: "", width: "", height: "" },
  categories: [{ id: parent.id }, { id: category.id }],
  tags: product.tags.map((name) => ({ id: tags[name].id })),
  images: [{ id: media.id, alt: `${product.name} fragrance direction` }],
  attributes: [
    { id: requiredAttributes.family.id, visible: true, variation: false, options: product.familyTerms },
    { id: requiredAttributes.positioning.id, visible: true, variation: false, options: [product.positioning] },
    { id: requiredAttributes.character.id, visible: true, variation: false, options: product.characterTerms },
  ],
  meta_data: [
    { key: "_aromamatrix_factory_reference", value: product.factoryModel },
    { key: "_aromamatrix_product_note", value: product.productNote },
    { key: "catalog_purpose", value: "B2B fragrance sample presentation" },
  ],
};

const matches = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(product.sku)}&per_page=100`);
if (matches.length > 1) throw new Error(`${product.sku}: duplicate products`);
const saved = await api(matches.length ? `/wp-json/wc/v3/products/${matches[0].id}` : "/wp-json/wc/v3/products", {
  method: matches.length ? "PUT" : "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const result = {
  id: saved.id,
  sku: saved.sku,
  name: saved.name,
  status: saved.status,
  permalink: saved.permalink,
  imageId: media.id,
  productNote: product.productNote,
};
await fs.writeFile(resultPath, `${JSON.stringify({ product: result }, null, 2)}\n`);
console.log(`${saved.status.toUpperCase()} ${saved.sku} ${saved.permalink}`);
