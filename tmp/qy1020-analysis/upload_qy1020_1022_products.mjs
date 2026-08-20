import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const imageDir = "/Users/dodo/Project/AROMAMATRIX/assets/images/shop-fragrances";
const resultPath = "/Users/dodo/Project/AROMAMATRIX/tmp/qy1020-analysis/qy1020-1022-upload-results.json";

const products = [
  { sku: "AM-FR-1020-01", factoryModel: "QY1020-1", productNote: "HABIK紫色", name: "Aromatic Crown", slug: "aromatic-crown", image: "am-fr-1020-01-aromatic-crown.webp", category: "green-aromatic", familyTerms: ["Aromatic", "Woody", "Amber"], positioning: "Masculine", characterTerms: ["Fresh", "Warm", "Rich"], tags: ["Cardamom", "Black Pepper", "Bergamot", "Lavender", "Cinnamon", "Sandalwood"], top: "Cardamom, pepper, artemisia, bergamot", heart: "Sage, lavender, cinnamon", base: "Sandalwood, patchouli, tonka bean, amberwood, musk", summary: "A confident aromatic-woody direction opening with cardamom, pepper, artemisia and bergamot, developing through sage, lavender and cinnamon into sandalwood, patchouli, tonka bean, amberwood and musk.", marketDirection: "Potential fit for masculine European, North American, Gulf and Southeast Asian collections seeking a polished spicy-aromatic profile for daily wear, evening and cooler-season assortments." },
  { sku: "AM-FR-1020-02", factoryModel: "QY1020-2", productNote: "HABIK红色", name: "Rose Ember", slug: "rose-ember", image: "am-fr-1020-02-rose-ember.webp", category: "floral", familyTerms: ["Floral", "Fruity", "Musk"], positioning: "Feminine", characterTerms: ["Fresh", "Sweet", "Elegant"], tags: ["Bergamot", "Pear", "Jasmine", "Lily of the Valley", "Freesia", "Oakmoss"], top: "Bergamot, pear", heart: "Jasmine, lily of the valley, freesia", base: "Musk, dry amber, oakmoss", summary: "A luminous floral-fruity direction pairing bergamot and pear with jasmine, lily of the valley and freesia over a soft musk, dry amber and oakmoss base.", marketDirection: "Potential fit for feminine European, North American, Gulf and Southeast Asian collections seeking a clean, graceful floral-fruity profile for daily wear, gifting and spring-summer positioning." },
  { sku: "AM-FR-1021-01", factoryModel: "QY1021", productNote: "VICTORIA", name: "Lemon Veil", slug: "lemon-veil", image: "am-fr-1021-01-lemon-veil.webp", category: "sweet-gourmand", familyTerms: ["Citrus", "Floral", "Gourmand"], positioning: "Feminine", characterTerms: ["Fresh", "Sweet", "Creamy"], tags: ["Lemon", "Meringue", "Neroli", "Vanilla"], top: "Lemon meringue pie", heart: "Neroli", base: "Vanilla", summary: "A bright citrus-gourmand direction that opens with lemon meringue pie, softens into neroli and settles on a smooth vanilla finish.", marketDirection: "Potential fit for feminine European, North American, Gulf and Southeast Asian collections seeking a playful yet polished citrus gourmand for daytime, gifting and warm-weather edits." },
  { sku: "AM-FR-1022-01", factoryModel: "QY1022", productNote: "ATHEERI蜂巢", name: "Honeyed Orchid", slug: "honeyed-orchid", image: "am-fr-1022-01-honeyed-orchid.webp", category: "sweet-gourmand", familyTerms: ["Floral", "Gourmand", "Amber"], positioning: "Feminine", characterTerms: ["Fresh", "Creamy", "Elegant"], tags: ["Passionflower", "Dewdrop", "Orchid", "Jasmine", "Vanilla", "Amberwood"], top: "Passionflower, dewdrop", heart: "Orchid, jasmine", base: "Vanilla, amberwood", summary: "A soft floral-gourmand direction that opens with dewy passionflower, unfolds through orchid and jasmine, and settles into creamy vanilla and amberwood.", marketDirection: "Potential fit for feminine European, North American, Gulf and Southeast Asian collections seeking an ethereal floral gourmand for daily wear, gifting and refined occasion assortments." },
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
const requiredCategories = Object.fromEntries([...new Set(products.map((p) => p.category))].map((slug) => { const category = categories.find((item) => item.slug === slug && item.parent === parent.id); if (!category) throw new Error(`Category ${slug} is required`); return [slug, category]; }));
const requiredAttributes = Object.fromEntries([["family", "Fragrance Family"], ["positioning", "Positioning"], ["character", "Scent Character"]].map(([key, name]) => { const attribute = attributes.find((item) => item.name === name); if (!attribute) throw new Error(`Attribute ${name} is required`); return [key, attribute]; }));
const tags = {};
for (const name of [...new Set(products.flatMap((p) => p.tags))]) {
  let tag = existingTags.find((item) => item.name.toLowerCase() === name.toLowerCase());
  if (!tag) { try { tag = await api("/wp-json/wc/v3/products/tags", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) }); } catch (error) { if (!String(error).includes("term_exists")) throw error; const matches = await api(`/wp-json/wc/v3/products/tags?search=${encodeURIComponent(name)}&per_page=100`); tag = matches.find((item) => item.name.toLowerCase() === name.toLowerCase()); if (!tag) throw error; } }
  tags[name] = tag;
}
const results = [];
for (const product of products) {
  const mediaMatches = await api(`/wp-json/wp/v2/media?search=${encodeURIComponent(product.sku)}&per_page=100`);
  let media = mediaMatches.find((item) => item.slug?.includes(product.sku.toLowerCase()));
  if (!media) {
    const bytes = await fs.readFile(path.join(imageDir, product.image));
    const uploaded = await api("/wp-json/wp/v2/media", { method: "POST", headers: { "Content-Type": "image/webp", "Content-Disposition": `attachment; filename="${product.image}"` }, body: bytes });
    media = await api(`/wp-json/wp/v2/media/${uploaded.id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: `${product.sku} — ${product.name}`, alt_text: `${product.name} fragrance direction with an original AM perfume bottle`, caption: "Original AROMAMATRIX fragrance-direction image for B2B sample presentation." }) });
  }
  const body = JSON.stringify({ name: product.name, slug: product.slug, type: "simple", status: "publish", catalog_visibility: "visible", regular_price: "0", description: profile(product), short_description: `<p>${product.summary}</p>`, sku: product.sku, manage_stock: false, sold_individually: false, weight: "", dimensions: { length: "", width: "", height: "" }, categories: [{ id: parent.id }, { id: requiredCategories[product.category].id }], tags: product.tags.map((name) => ({ id: tags[name].id })), images: [{ id: media.id, alt: `${product.name} fragrance direction` }], attributes: [{ id: requiredAttributes.family.id, visible: true, variation: false, options: product.familyTerms }, { id: requiredAttributes.positioning.id, visible: true, variation: false, options: [product.positioning] }, { id: requiredAttributes.character.id, visible: true, variation: false, options: product.characterTerms }], meta_data: [{ key: "_aromamatrix_factory_reference", value: product.factoryModel }, { key: "_aromamatrix_product_note", value: product.productNote }, { key: "catalog_purpose", value: "B2B fragrance sample presentation" }] });
  const matches = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(product.sku)}&per_page=100`); if (matches.length > 1) throw new Error(`${product.sku}: duplicate products`);
  const saved = await api(matches.length ? `/wp-json/wc/v3/products/${matches[0].id}` : "/wp-json/wc/v3/products", { method: matches.length ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body });
  results.push({ id: saved.id, sku: saved.sku, name: saved.name, status: saved.status, permalink: saved.permalink, imageId: media.id, productNote: product.productNote });
  console.log(`${saved.status.toUpperCase()} ${saved.sku} ${saved.permalink}`);
}
await fs.writeFile(resultPath, `${JSON.stringify({ products: results }, null, 2)}\n`);
