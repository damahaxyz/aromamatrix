import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const imageDir = "/Users/dodo/Project/AROMAMATRIX/assets/images/shop-fragrances";
const resultPath = "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/qy1003-upload-results.json";

const products = [
  { sku: "AM-FR-1003-01", factoryModel: "QY1003-1", productNote: "鱼鳞黑色100ml", name: "Ocean Violet", slug: "ocean-violet", image: "am-fr-1003-01-ocean-violet.webp", category: "fresh-aquatic", familyTerms: ["Aquatic", "Woody", "Aromatic"], positioning: "Masculine", characterTerms: ["Fresh", "Clean", "Elegant"], tags: ["Bergamot", "Orris", "Marine", "Violet", "Oak Moss", "Patchouli"], top: "Bergamot, orris, marine accord", heart: "Violet, amber", base: "Oak moss, patchouli", summary: "A fresh marine-woody direction where bergamot and orris meet violet and amber over oak moss and patchouli.", marketDirection: "Potential fit for European, North American and international masculine collections seeking a clean marine-woody profile for daily or warm-weather concepts." },
  { sku: "AM-FR-1003-02", factoryModel: "QY1003-2", productNote: "鱼鳞白色100ml", name: "Orange Tuberose", slug: "orange-tuberose", image: "am-fr-1003-02-orange-tuberose.webp", category: "floral", familyTerms: ["Floral", "Citrus", "Woody"], positioning: "Feminine", characterTerms: ["Fresh", "Elegant", "Rich"], tags: ["Orange Blossom", "Tuberose", "Jasmine", "Vetiver", "Patchouli"], top: "Orange blossom", heart: "Tuberose, jasmine", base: "Vetiver, patchouli", summary: "A luminous white-floral direction that opens with orange blossom, deepens through tuberose and jasmine, then settles into vetiver and patchouli.", marketDirection: "Potential fit for European, North American, Gulf and Southeast Asian feminine collections seeking polished orange-blossom and white-floral character." },
  { sku: "AM-FR-1003-03", factoryModel: "QY1003-3", productNote: "鱼鳞金色100ml", name: "Solar Leather", slug: "solar-leather", image: "am-fr-1003-03-solar-leather.webp", category: "woody-leather", familyTerms: ["Spicy", "Leather", "Amber"], positioning: "Unisex", characterTerms: ["Warm", "Rich", "Smoky"], tags: ["Pink Pepper", "Grapefruit", "Cardamom", "Tuberose", "Leather", "Amber"], top: "Pink pepper, grapefruit, cardamom", heart: "Solar accord, artemisia, tuberose", base: "Cashmeran, leather, cistus, amber", summary: "A radiant spicy-leather direction with pink pepper, grapefruit and cardamom over solar florals, cashmeran, cistus and amber.", marketDirection: "Potential fit for Gulf, European and North American premium unisex collections seeking a warm spicy-leather amber for evening concepts." },
];

async function api(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, { ...options, headers: { Authorization: auth, ...(options.headers ?? {}) } });
  const text = await response.text();
  let data; try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) throw new Error(`${options.method ?? "GET"} ${endpoint} failed (${response.status}): ${JSON.stringify(data)}`);
  return data;
}
const profile = (p) => `<h3>Fragrance Profile</h3><ul><li><strong>Top:</strong> ${p.top}</li><li><strong>Heart:</strong> ${p.heart}</li><li><strong>Base:</strong> ${p.base}</li></ul><h3>Suggested Market Direction</h3><p>${p.marketDirection}</p>`;

const [parents, categories, attributes, existingTags] = await Promise.all([
  api("/wp-json/wc/v3/products/categories?slug=fragrances&per_page=100"), api("/wp-json/wc/v3/products/categories?per_page=100"), api("/wp-json/wc/v3/products/attributes?per_page=100"), api("/wp-json/wc/v3/products/tags?per_page=100"),
]);
const parent = parents[0]; if (!parent) throw new Error("Fragrances category is required");
const requiredCategories = Object.fromEntries(["fresh-aquatic", "floral", "woody-leather"].map((slug) => { const category = categories.find((item) => item.slug === slug && item.parent === parent.id); if (!category) throw new Error(`Category ${slug} is required`); return [slug, category]; }));
const requiredAttributes = Object.fromEntries([["family", "Fragrance Family"], ["positioning", "Positioning"], ["character", "Scent Character"]].map(([key, name]) => { const attribute = attributes.find((item) => item.name === name); if (!attribute) throw new Error(`Attribute ${name} is required`); return [key, attribute]; }));
const tags = {};
for (const name of [...new Set(products.flatMap((p) => p.tags))]) {
  let tag = existingTags.find((item) => item.name.toLowerCase() === name.toLowerCase());
  if (!tag) tag = await api("/wp-json/wc/v3/products/tags", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
  tags[name] = tag;
}

const results = [];
for (const product of products) {
  const mediaMatches = await api(`/wp-json/wp/v2/media?search=${encodeURIComponent(product.sku)}&per_page=100`);
  let media = mediaMatches.find((item) => item.slug?.includes(product.sku.toLowerCase()));
  if (!media) {
    const bytes = await fs.readFile(path.join(imageDir, product.image));
    const uploaded = await api("/wp-json/wp/v2/media", { method: "POST", headers: { "Content-Type": "image/webp", "Content-Disposition": `attachment; filename="${product.image}"` }, body: bytes });
    media = await api(`/wp-json/wp/v2/media/${uploaded.id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: `${product.sku} — ${product.name}`, alt_text: `${product.name} fragrance direction with an original AM perfume bottle and representative scent materials`, caption: "Original AROMAMATRIX fragrance-direction image generated for B2B sample presentation." }) });
  }
  const body = JSON.stringify({ name: product.name, slug: product.slug, type: "simple", status: "publish", catalog_visibility: "visible", regular_price: "0", description: profile(product), short_description: `<p>${product.summary}</p>`, sku: product.sku, manage_stock: false, sold_individually: false, weight: "", dimensions: { length: "", width: "", height: "" }, categories: [{ id: parent.id }, { id: requiredCategories[product.category].id }], tags: product.tags.map((name) => ({ id: tags[name].id })), images: [{ id: media.id, alt: `${product.name} fragrance direction` }], attributes: [{ id: requiredAttributes.family.id, visible: true, variation: false, options: product.familyTerms }, { id: requiredAttributes.positioning.id, visible: true, variation: false, options: [product.positioning] }, { id: requiredAttributes.character.id, visible: true, variation: false, options: product.characterTerms }], meta_data: [{ key: "_aromamatrix_factory_reference", value: product.factoryModel }, { key: "_aromamatrix_product_note", value: product.productNote }, { key: "catalog_purpose", value: "B2B fragrance sample presentation" }] });
  const matches = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(product.sku)}&per_page=100`);
  if (matches.length > 1) throw new Error(`${product.sku}: duplicate products`);
  const saved = await api(matches.length ? `/wp-json/wc/v3/products/${matches[0].id}` : "/wp-json/wc/v3/products", { method: matches.length ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body });
  results.push({ id: saved.id, sku: saved.sku, name: saved.name, status: saved.status, permalink: saved.permalink, imageId: media.id });
  console.log(`${saved.status.toUpperCase()} ${saved.sku} ${saved.permalink}`);
}
await fs.writeFile(resultPath, `${JSON.stringify({ products: results }, null, 2)}\n`);
