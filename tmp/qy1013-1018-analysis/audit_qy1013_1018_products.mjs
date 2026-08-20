const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const expected = [
  ["AM-FR-1013-01", "Golden Melon", "QY1013-1"],
  ["AM-FR-1013-02", "Saffron Ember", "QY1013-2"],
  ["AM-FR-1014-01", "Praline Pear", "QY1014"],
  ["AM-FR-1015-01", "Frosted Ember", "QY1015"],
  ["AM-FR-1016-01", "Lagoon Cream", "QY1016-1"],
  ["AM-FR-1016-02", "Cherry Mousse", "QY1016-2"],
  ["AM-FR-1017-01", "Velvet Tuberose", "QY1017-1"],
  ["AM-FR-1017-02", "Cedar Resolve", "QY1017-2"],
  ["AM-FR-1018-01", "Berry Cloud", "QY1018"],
];

async function api(endpoint) {
  const response = await fetch(`${baseUrl}${endpoint}`, { headers: { Authorization: auth } });
  const data = await response.json();
  if (!response.ok) throw new Error(`GET ${endpoint} failed (${response.status}): ${JSON.stringify(data)}`);
  return data;
}

const output = [];
for (const [sku, name, factoryModel] of expected) {
  const matches = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}&per_page=100`);
  if (matches.length !== 1) throw new Error(`${sku}: expected one product, found ${matches.length}`);
  const product = matches[0];
  const meta = Object.fromEntries(product.meta_data.map((item) => [item.key, item.value]));
  if (product.name !== name || product.status !== "publish" || product.catalog_visibility !== "visible" || product.regular_price !== "0") throw new Error(`${sku}: public fields are incorrect`);
  if (meta._aromamatrix_factory_reference !== factoryModel) throw new Error(`${sku}: factory model is incorrect`);
  if (product.weight || product.dimensions.length || product.dimensions.width || product.dimensions.height || product.variations.length) throw new Error(`${sku}: fragrance logistics or variation data should be empty`);
  if (!product.images.length || product.images[0].alt !== `${name} fragrance direction`) throw new Error(`${sku}: product image is missing or has an incorrect alt`);
  if (!product.description.includes("Fragrance Profile") || !product.description.includes("Suggested Market Direction")) throw new Error(`${sku}: required description sections are missing`);
  if ([product.name, product.slug, product.short_description, product.description].some((text) => text.includes(factoryModel))) throw new Error(`${sku}: factory model is exposed in public copy`);
  output.push({ sku, name, permalink: product.permalink, image: product.images[0].src, audit: "passed" });
}
console.log(JSON.stringify({ products: output }, null, 2));
