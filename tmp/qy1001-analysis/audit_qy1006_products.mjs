const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const expected = new Map([
  ["AM-FR-1006-01", { note: "哈维紫色100ml", name: "Violet Aura" }],
  ["AM-FR-1006-02", { note: "哈维黑色100ml", name: "Obsidian Current" }],
  ["AM-FR-1006-03", { note: "哈维蓝色100ml", name: "Arctic Wave" }],
  ["AM-FR-1006-04", { note: "哈维红色100ml", name: "Crimson Ember" }],
  ["AM-FR-1006-05", { note: "哈维绿色100ml", name: "Tropical Verde" }],
  ["AM-FR-1006-06", { note: "哈维金色100ml", name: "Golden Elixir" }],
  ["AM-FR-1006-07", { note: "哈维深粉色100ml", name: "Rose Candy" }],
  ["AM-FR-1006-08", { note: "哈维浅粉色100ml", name: "Blush Eclat" }],
  ["AM-FR-1006-09", { note: "哈维黄色100ml", name: "Solar Grace" }],
  ["AM-FR-1006-10", { note: "哈维KOBRA黑100ml", name: "Desert Kobra" }],
  ["AM-FR-1006-11", { note: "哈维MALIBU蓝100ml", name: "Malibu Current" }],
  ["AM-FR-1006-12", { note: "哈维DIVA紫100ml", name: "Velvet Diva" }],
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
  console.log(`PASS ${sku} id=${product.id} image=${product.images[0].id}`);
}
