import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const imageDir = "/Users/dodo/Project/AROMAMATRIX/assets/images/shop-fragrances";

const replacements = [
  ["AM-FR-1007-01", "Mandarin Flare", "am-fr-1007-01-mandarin-flare-v2.webp"],
  ["AM-FR-1007-02", "Candy Veil", "am-fr-1007-02-candy-veil-v2.webp"],
  ["AM-FR-1007-03", "Solar Mega", "am-fr-1007-03-solar-mega-v2.webp"],
  ["AM-FR-1007-04", "White Lavender", "am-fr-1007-04-white-lavender-v2.webp"],
  ["AM-FR-1007-05", "Spectrum Pulse", "am-fr-1007-05-spectrum-pulse-v2.webp"],
];

async function api(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, { ...options, headers: { Authorization: auth, ...(options.headers ?? {}) } });
  const text = await response.text();
  let data; try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) throw new Error(`${options.method ?? "GET"} ${endpoint} failed (${response.status}): ${JSON.stringify(data)}`);
  return data;
}

for (const [sku, name, file] of replacements) {
  const mediaSearch = await api(`/wp-json/wp/v2/media?search=${encodeURIComponent(file.replace(/\.webp$/, ""))}&per_page=100`);
  let media = mediaSearch.find((item) => item.slug?.includes(file.replace(/\.webp$/, "").toLowerCase()));
  if (!media) {
    const bytes = await fs.readFile(path.join(imageDir, file.replace("-v2", "")));
    const uploaded = await api("/wp-json/wp/v2/media", { method: "POST", headers: { "Content-Type": "image/webp", "Content-Disposition": `attachment; filename="${file}"` }, body: bytes });
    media = await api(`/wp-json/wp/v2/media/${uploaded.id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: `${sku} — ${name} — refreshed`, alt_text: `${name} fragrance direction with an original AM perfume bottle`, caption: "Refreshed AROMAMATRIX fragrance-direction image for B2B sample presentation." }) });
  }
  const matches = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}&per_page=100`);
  if (matches.length !== 1) throw new Error(`${sku}: expected one product, got ${matches.length}`);
  const saved = await api(`/wp-json/wc/v3/products/${matches[0].id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ images: [{ id: media.id, alt: `${name} fragrance direction` }] }) });
  console.log(`UPDATED ${saved.sku} image=${media.id} ${saved.permalink}`);
}
