import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const imageDir = "/Users/dodo/Project/AROMAMATRIX/assets/images/shop-fragrances";
const resultPath = "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/qy1004-upload-results.json";

// This script is intentionally scoped to QY1004-1 through QY1004-4 only.
const products = [
  { sku: "AM-FR-1004-01", factoryModel: "QY1004-1", productNote: "9PM黑色100ml", name: "Midnight Apple", slug: "midnight-apple", image: "am-fr-1004-01-midnight-apple.webp", category: "amber-spicy", familyTerms: ["Spicy", "Fruity", "Amber"], positioning: "Masculine", characterTerms: ["Warm", "Sweet", "Rich"], tags: ["Bergamot", "Apple", "Cinnamon", "Lavender", "Orange Blossom", "Vanilla", "Tonka Bean", "Amber", "Patchouli"], top: "Bergamot, lavandin, cinnamon, apple", heart: "Muguet, orange blossom", base: "Patchouli, amber, vanilla, tonka bean", summary: "A smooth spicy-fruity amber direction where crisp apple and bergamot meet cinnamon and lavender over a warm vanilla-tonka dry-down.", marketDirection: "Potential fit for European, North American, Gulf and Latin American masculine collections seeking a warm, sweet, after-dark spicy-fruity fragrance direction." },
  { sku: "AM-FR-1004-02", factoryModel: "QY1004-2", productNote: "9AM蓝色100ml", name: "Azure Current", slug: "azure-current", image: "am-fr-1004-02-azure-current.webp", category: "fresh-aquatic", familyTerms: ["Fresh", "Woody", "Aromatic"], positioning: "Unisex", characterTerms: ["Fresh", "Clean", "Vibrant"], tags: ["Lemon", "Pink Pepper", "Mint", "Black Currant", "Apple", "Incense", "Cedar", "Jasmine", "Ginger", "Sandalwood", "Patchouli"], top: "Lemon, pink pepper, mint, black currant", heart: "Apple, incense, cedar", base: "Patchouli, jasmine, ginger, sandalwood", summary: "A bright citrus-aromatic direction that blends lemon, mint and black currant with apple, incense and cedar over a clean woody base.", marketDirection: "Potential fit for European, North American, Southeast Asian and Gulf unisex collections seeking a fresh aquatic-woody profile for daily or warm-weather concepts." },
  { sku: "AM-FR-1004-03", factoryModel: "QY1004-3", productNote: "9PM灰色100ml", name: "Rebel Caramel", slug: "rebel-caramel", image: "am-fr-1004-03-rebel-caramel.webp", category: "amber-spicy", familyTerms: ["Fruity", "Woody", "Amber"], positioning: "Unisex", characterTerms: ["Warm", "Sweet", "Rich"], tags: ["Mandarin", "Pineapple", "Apple", "Cedar", "Oak Moss", "Vanilla", "Caramel", "Dry Woods", "Ambergris", "Musk"], top: "Mandarin, pineapple, Granny Smith apple", heart: "Cedarwood, oak moss, vanilla", base: "Caramel, dry woods, ambergris, musk", summary: "A modern fruity-woody amber direction with bright mandarin, pineapple and apple softened by vanilla, caramel and dry woods.", marketDirection: "Potential fit for European, North American, Gulf and Southeast Asian unisex collections seeking a youthful, gourmand-leaning woody amber for evening or cooler-weather concepts." },
  { sku: "AM-FR-1004-04", factoryModel: "QY1004-4", productNote: "9PM棕色100ml", name: "Ember Leather", slug: "ember-leather", image: "am-fr-1004-04-ember-leather.webp", category: "woody-leather", familyTerms: ["Leather", "Spicy", "Amber"], positioning: "Unisex", characterTerms: ["Warm", "Rich", "Smoky"], tags: ["Nutmeg", "Elemi", "Cardamom", "Pimento", "Lavandin", "Leather", "Labdanum", "Patchouli", "Vanilla"], top: "Nutmeg, elemi, cardamom", heart: "Pimento, lavandin, leather", base: "Cistus, labdanum, patchouli, vanilla", summary: "A deep amber-leather direction that layers luminous spice with aromatic lavender, supple leather, labdanum and creamy vanilla.", marketDirection: "Potential fit for Gulf, European and North American premium unisex collections seeking a rich spicy-leather amber for evening and autumn-winter concepts." },
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
const requiredCategories = Object.fromEntries(["amber-spicy", "fresh-aquatic", "woody-leather"].map((slug) => { const category = categories.find((item) => item.slug === slug && item.parent === parent.id); if (!category) throw new Error(`Category ${slug} is required`); return [slug, category]; }));
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
