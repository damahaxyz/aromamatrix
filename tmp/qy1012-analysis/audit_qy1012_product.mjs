const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;

async function api(endpoint) {
  const response = await fetch(`${baseUrl}${endpoint}`, { headers: { Authorization: auth } });
  const data = await response.json();
  if (!response.ok) throw new Error(`GET ${endpoint} failed (${response.status}): ${JSON.stringify(data)}`);
  return data;
}

const matches = await api("/wp-json/wc/v3/products?sku=AM-FR-1012-01&per_page=100");
if (matches.length !== 1) throw new Error(`Expected one product, found ${matches.length}`);
const product = matches[0];
const meta = Object.fromEntries(product.meta_data.map((item) => [item.key, item.value]));
const expected = {
  name: "Coconut Cypress",
  slug: "coconut-cypress",
  status: "publish",
  visibility: "visible",
  price: "0",
  factoryModel: "QY1012",
  productNote: "绿色岛屿 100ml",
};
const actual = {
  name: product.name,
  slug: product.slug,
  status: product.status,
  visibility: product.catalog_visibility,
  price: product.regular_price,
  factoryModel: meta._aromamatrix_factory_reference,
  productNote: meta._aromamatrix_product_note,
};
for (const [key, value] of Object.entries(expected)) if (actual[key] !== value) throw new Error(`${key}: expected ${value}, received ${actual[key]}`);
if (product.weight || product.dimensions.length || product.dimensions.width || product.dimensions.height) throw new Error("Fragrance dimensions or weight must be empty");
if (product.variations.length) throw new Error("Fragrance must not have variations");
if (!product.images.length || product.images[0].alt !== "Coconut Cypress fragrance direction") throw new Error("Missing or incorrect product image alt text");
if (!product.description.includes("Fragrance Profile") || !product.description.includes("Suggested Market Direction")) throw new Error("Required description sections are missing");
if (!product.description.includes("<strong>Base:</strong> Amber, tonka bean, sandalwood")) throw new Error("Published base notes are incorrect");
if (product.description.toLowerCase().includes("ambergris")) throw new Error("Ambergris remains in public copy");
if ([product.name, product.slug, product.short_description, product.description].some((text) => text.includes("QY1012"))) throw new Error("Factory model is exposed in public copy");
console.log(JSON.stringify({
  id: product.id,
  sku: product.sku,
  name: product.name,
  status: product.status,
  permalink: product.permalink,
  image: product.images[0].src,
  categories: product.categories.map((item) => item.name),
  attributes: product.attributes.map((item) => ({ name: item.name, options: item.options })),
  tags: product.tags.map((item) => item.name),
  audit: "passed",
}, null, 2));
