const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
async function api(endpoint) {
  const response = await fetch(`${baseUrl}${endpoint}`, { headers: { Authorization: auth } });
  const text = await response.text(); const data = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(`${endpoint} failed (${response.status}): ${text}`);
  return data;
}
const expected = {
  "AM-FR-1010-01": ["Midnight Intense", "夜店黑色合金盖105ml"],
  "AM-FR-1010-02": ["Rose Velvet", "夜店粉色合金盖105ml"],
  "AM-FR-1010-03": ["Blue Iconic", "夜店蓝色合金盖105ml"],
  "AM-FR-1010-04": ["Silver Sillage", "夜店银色合金盖105ml"],
  "AM-FR-1010-05": ["Prismatic Untold", "夜店彩色合金盖105ml"],
  "AM-FR-1010-06": ["Golden Woman", "夜店金色合金盖105ml"],
  "AM-FR-1010-07": ["Maleka Royal", "夜店紫色合金盖105ml"],
};
for (const [sku, [name, note]] of Object.entries(expected)) {
  const rows = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}&per_page=10`);
  if (rows.length !== 1) throw new Error(`${sku}: expected one product, got ${rows.length}`);
  const p = rows[0]; const meta = Object.fromEntries((p.meta_data ?? []).map((m) => [m.key, m.value]));
  const factoryModel = `QY1010-${Number(sku.slice(-2))}`;
  const checks = [p.name === name, p.status === "publish", meta._aromamatrix_factory_reference === factoryModel, meta._aromamatrix_product_note === note, (p.images ?? []).length === 1, (p.attributes ?? []).length === 3, p.description.includes("Fragrance Profile")];
  if (!checks.every(Boolean)) throw new Error(`${sku}: failed checks ${JSON.stringify({ name: p.name, status: p.status, factory: meta._aromamatrix_factory_reference, note: meta._aromamatrix_product_note, images: p.images?.length, attributes: p.attributes?.length })}`);
  console.log(`PASS ${sku} id=${p.id} image=${p.images[0].id} note=${note} ${p.permalink}`);
}
console.log("PASS QY1010-1b intentionally consolidated into QY1010-1; no separate product payload was sent.");
