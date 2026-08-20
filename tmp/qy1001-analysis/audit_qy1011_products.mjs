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
  "AM-FR-1011-01": ["Wildcard Noir", "QY1011-1", "黑桃-黑 100ml"],
  "AM-FR-1011-02": ["Full House Azure", "QY1011-2", "黑桃-蓝 100ml"],
  "AM-FR-1011-03": ["Royale Pearl", "QY1011-3", "黑桃-白 100ml"],
  "AM-FR-1011-04": ["Moon Aqua", "QY1011-4", "黑桃-浅蓝 100ml"],
  "AM-FR-1011-05": ["King Gold", "QY1011-5", "黑桃-金 100ml"],
};
for (const [sku, [name, factoryModel, note]] of Object.entries(expected)) {
  const rows = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}&per_page=10`);
  if (rows.length !== 1) throw new Error(`${sku}: expected one product, got ${rows.length}`);
  const p = rows[0]; const meta = Object.fromEntries((p.meta_data ?? []).map((m) => [m.key, m.value]));
  const checks = [p.name === name, p.status === "publish", meta._aromamatrix_factory_reference === factoryModel, meta._aromamatrix_product_note === note, (p.images ?? []).length === 1, (p.attributes ?? []).length === 3, p.description.includes("Fragrance Profile")];
  if (!checks.every(Boolean)) throw new Error(`${sku}: failed checks ${JSON.stringify({ name: p.name, status: p.status, factory: meta._aromamatrix_factory_reference, note: meta._aromamatrix_product_note, images: p.images?.length, attributes: p.attributes?.length })}`);
  console.log(`PASS ${sku} id=${p.id} image=${p.images[0].id} note=${note} ${p.permalink}`);
}
