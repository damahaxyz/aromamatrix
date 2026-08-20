const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
async function api(endpoint) {
  const response = await fetch(`${baseUrl}${endpoint}`, { headers: { Authorization: auth } });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(`${endpoint} failed (${response.status}): ${text}`);
  return data;
}
const expected = {
  "AM-FR-1009-01": ["Confection Aura", "巴黎角落彩色100ml"],
  "AM-FR-1009-02": ["Pistachio Bloom", "巴黎角落绿色100ml"],
  "AM-FR-1009-03": ["Fusion Bloom", "巴黎角落粉红100ml"],
  "AM-FR-1009-04": ["Khair Classic", "巴黎角落灰色100ml"],
  "AM-FR-1009-05": ["Felicity Glow", "巴黎角落金色100ml"],
  "AM-FR-1009-06": ["Vanilla Eclipse", "巴黎角落棕色100ml"],
  "AM-FR-1009-07": ["Peach Delight", "巴黎角落粉色100ml"],
};
for (const [sku, [name, note]] of Object.entries(expected)) {
  const rows = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}&per_page=10`);
  if (rows.length !== 1) throw new Error(`${sku}: expected one product, got ${rows.length}`);
  const p = rows[0];
  const meta = Object.fromEntries((p.meta_data ?? []).map((m) => [m.key, m.value]));
  const checks = [p.name === name, p.status === "publish", meta._aromamatrix_product_note === note, (p.images ?? []).length === 1, (p.attributes ?? []).length === 3, p.description.includes("Fragrance Profile")];
  if (!checks.every(Boolean)) throw new Error(`${sku}: failed checks ${JSON.stringify({ name: p.name, status: p.status, note: meta._aromamatrix_product_note, images: p.images?.length, attributes: p.attributes?.length })}`);
  console.log(`PASS ${sku} id=${p.id} image=${p.images[0].id} note=${note} ${p.permalink}`);
}
