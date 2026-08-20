const baseUrl = "https://shop.aromamatrix.com";
const username = "damaha";
const password = process.env.WP_APP_PASSWORD;

if (!password) throw new Error("WP_APP_PASSWORD is required");

const auth = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;

async function api(endpoint) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: { Authorization: auth },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`${endpoint} failed (${response.status}): ${JSON.stringify(data)}`);
  return data;
}

const parentMatches = await api("/wp-json/wc/v3/products/categories?slug=fragrances&per_page=100");
const parent = parentMatches[0];
const categories = await api(`/wp-json/wc/v3/products/categories?parent=${parent.id}&per_page=100`);
const attributes = await api("/wp-json/wc/v3/products/attributes?per_page=100");
const tags = await api("/wp-json/wc/v3/products/tags?per_page=100");

const productSkus = [
  ...Array.from({ length: 9 }, (_, index) => `AM-FR-1001-${String(index + 1).padStart(2, "0")}`),
  ...Array.from({ length: 4 }, (_, index) => `AM-FR-1002-${String(index + 1).padStart(2, "0")}`),
];

const products = [];
for (const sku of productSkus) {
  const matches = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}&per_page=100`);
  const product = matches[0];
  products.push({
    sku,
    categories: product.categories.map((item) => item.name),
    attributes: product.attributes.map((item) => ({ name: item.name, options: item.options })),
    tags: product.tags.map((item) => item.name),
    weight: product.weight,
    dimensions: product.dimensions,
    factoryReferencePublic: product.description.includes("QY1001-") || product.short_description.includes("QY1001-"),
  });
}

console.log(JSON.stringify({
  parent: { id: parent.id, name: parent.name, slug: parent.slug },
  childCategories: categories.map((item) => ({ id: item.id, name: item.name, slug: item.slug, count: item.count })),
  globalAttributes: attributes
    .filter((item) => ["Fragrance Family", "Positioning", "Scent Character"].includes(item.name))
    .map((item) => ({ id: item.id, name: item.name, slug: item.slug })),
  tagCount: tags.length,
  products,
}, null, 2));
