import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const imageDir = "/Users/dodo/Project/AROMAMATRIX/assets/images/shop-fragrances";
const resultPath = "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/qy1005-upload-results.json";

// This script is intentionally scoped to QY1005-1 through QY1005-4 only.
const products = [
  { sku: "AM-FR-1005-01", factoryModel: "QY1005-1", productNote: "冰淇淋米色100ml", name: "Creamy Eclaire", slug: "creamy-eclaire", image: "am-fr-1005-01-creamy-eclaire.webp", category: "sweet-gourmand", familyTerms: ["Gourmand", "Floral", "Amber"], positioning: "Feminine", characterTerms: ["Sweet", "Creamy", "Rich"], tags: ["Caramel", "Milk", "Sugar", "White Flowers", "Honey", "Vanilla", "Praline", "Musk"], top: "Caramel, milk, sugar", heart: "White flowers, honey", base: "Vanilla, praline, musk", summary: "A creamy gourmand direction where caramel, milk and sugar melt into white flowers and honey over a smooth vanilla-praline musk base.", marketDirection: "Potential fit for European, North American, Gulf and Southeast Asian feminine collections seeking a sweet creamy gourmand for gifting, evening and cooler-weather concepts." },
  { sku: "AM-FR-1005-02", factoryModel: "QY1005-2", productNote: "冰淇淋黄色100ml", name: "Banana Souffle", slug: "banana-souffle", image: "am-fr-1005-02-banana-souffle.webp", category: "sweet-gourmand", familyTerms: ["Gourmand", "Fruity", "Amber"], positioning: "Feminine", characterTerms: ["Sweet", "Creamy", "Rich"], tags: ["Banana", "Whipped Cream", "Pastry", "Dulce de Leche", "Vanilla", "Praline", "Biscuit", "Musk"], top: "Banana cream, whipped cream, pastry cream", heart: "Banana, dulce de leche accord", base: "Vanilla, praline, biscuit crumble, musk", summary: "A playful banana gourmand direction that layers whipped cream and pastry with dulce de leche, vanilla, praline and biscuit.", marketDirection: "Potential fit for European, North American, Gulf and Southeast Asian feminine collections seeking a playful dessert-led gourmand with strong novelty and gifting appeal." },
  { sku: "AM-FR-1005-03", factoryModel: "QY1005-3", productNote: "冰淇淋绿色100ml", name: "Pistachio Cream", slug: "pistachio-cream", image: "am-fr-1005-03-pistachio-cream.webp", category: "sweet-gourmand", familyTerms: ["Gourmand", "Woody", "Floral"], positioning: "Unisex", characterTerms: ["Sweet", "Creamy", "Elegant"], tags: ["Pistachio Cream", "Toasted Pistachio", "Pastry Cream", "Coconut", "Cacao", "Vanilla", "Milk", "Musk"], top: "Pistachio cream, toasted pistachio", heart: "Pastry cream, coconut, cacao", base: "Vanilla, milk, musk", summary: "A creamy pistachio gourmand direction combining toasted nut facets with pastry cream, coconut and cacao over a milky vanilla musk base.", marketDirection: "Potential fit for European, North American, Gulf and Southeast Asian unisex collections seeking a contemporary nutty gourmand for discovery, gifting and year-round wear." },
  { sku: "AM-FR-1005-04", factoryModel: "QY1005-4", productNote: "冰淇淋套盒30ml", name: "Eclaire Trio Gift Set", slug: "eclaire-trio-gift-set", image: "am-fr-1005-04-eclaire-trio-gift-set.webp", category: "sweet-gourmand", familyTerms: ["Gourmand", "Floral", "Amber"], positioning: "Unisex", characterTerms: ["Sweet", "Creamy", "Elegant"], tags: ["Caramel", "Milk", "Sugar", "White Flowers", "Honey", "Banana", "Pistachio", "Vanilla", "Praline", "Musk", "Gift Set"], top: "Caramel, milk, sugar; banana cream; pistachio cream", heart: "White flowers, honey; banana, dulce de leche; pastry cream, coconut, cacao", base: "Vanilla, praline, biscuit, milk and musk", summary: "A discovery gift set bringing together creamy caramel, banana dessert and pistachio-cream gourmand directions in one coordinated AM presentation.", marketDirection: "Potential fit for giftable, travel and discovery collections across European, North American, Gulf and Southeast Asian markets seeking a coordinated gourmand trio." },
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
const requiredCategories = Object.fromEntries(["sweet-gourmand"].map((slug) => { const category = categories.find((item) => item.slug === slug && item.parent === parent.id); if (!category) throw new Error(`Category ${slug} is required`); return [slug, category]; }));
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
