const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const expected = new Map([
  ["AM-FR-1007-01", 123], ["AM-FR-1007-02", 124], ["AM-FR-1007-03", 125], ["AM-FR-1007-04", 126], ["AM-FR-1007-05", 127],
]);
for (const [sku, imageId] of expected) {
  const response = await fetch(`https://shop.aromamatrix.com/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}`, { headers: { Authorization: auth } });
  if (!response.ok) throw new Error(`${sku}: HTTP ${response.status}`);
  const products = await response.json();
  if (products.length !== 1) throw new Error(`${sku}: expected one product, got ${products.length}`);
  const product = products[0];
  if (product.status !== "publish" || product.images.length !== 1 || product.images[0].id !== imageId) throw new Error(`${sku}: refreshed image mismatch`);
  console.log(`PASS ${sku} image=${product.images[0].id} src=${product.images[0].src}`);
}
