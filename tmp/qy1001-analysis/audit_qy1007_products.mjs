const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const expected = new Map([
  ["AM-FR-1007-01", { note: "保温杯橙色100ml", name: "Mandarin Flare" }],
  ["AM-FR-1007-02", { note: "保温杯粉色100ml", name: "Candy Veil" }],
  ["AM-FR-1007-03", { note: "保温杯黄色100ml", name: "Solar Mega" }],
  ["AM-FR-1007-04", { note: "保温杯紫色100ml", name: "White Lavender" }],
  ["AM-FR-1007-05", { note: "保温杯彩色100ml", name: "Spectrum Pulse" }],
]);
for (const [sku, target] of expected) {
  const response = await fetch(`https://shop.aromamatrix.com/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}`, { headers: { Authorization: auth } });
  if (!response.ok) throw new Error(`${sku}: HTTP ${response.status}`);
  const products = await response.json();
  if (products.length !== 1) throw new Error(`${sku}: expected one product, got ${products.length}`);
  const product = products[0];
  const note = product.meta_data.find((item) => item.key === "_aromamatrix_product_note")?.value;
  if (product.name !== target.name || product.status !== "publish" || note !== target.note) throw new Error(`${sku}: basic fields mismatch`);
  if (product.images.length !== 1 || product.attributes.length !== 3 || !product.description.includes("Fragrance Profile")) throw new Error(`${sku}: imagery, attributes, or profile mismatch`);
  console.log(`PASS ${sku} id=${product.id} image=${product.images[0].id} note=${note}`);
}
