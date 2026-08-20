import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const imageDir = "/Users/dodo/Project/AROMAMATRIX/assets/images/shop-fragrances";
const resultPath = "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/qy1011-upload-results.json";

const products = [
  { sku: "AM-FR-1011-01", factoryModel: "QY1011-1", productNote: "黑桃-黑 100ml", name: "Wildcard Noir", slug: "wildcard-noir", image: "am-fr-1011-01-wildcard-noir.webp", category: "amber-spicy", familyTerms: ["Floral", "Woody", "Amber"], positioning: "Unisex", characterTerms: ["Warm", "Rich", "Smooth"], tags: ["Bergamot", "Flowers", "Coriander", "Apple", "Ambroxan", "Vanilla", "Tonka Bean", "Ambergris", "Woody Notes"], top: "Bergamot, flowers, coriander", heart: "Apple, ambroxan, vanilla", base: "Tonka bean, ambergris, woody notes", summary: "A modern floral-woody direction with a bright bergamot opening, an apple and vanilla heart, and a warm tonka, ambergris and woods dry-down.", marketDirection: "Potential fit for unisex European, North American, Gulf and Southeast Asian collections seeking a versatile signature with strong evening and all-season appeal." },
  { sku: "AM-FR-1011-02", factoryModel: "QY1011-2", productNote: "黑桃-蓝 100ml", name: "Full House Azure", slug: "full-house-azure", image: "am-fr-1011-02-full-house-azure.webp", category: "fresh-aquatic", familyTerms: ["Fresh", "Amber", "Woody"], positioning: "Unisex", characterTerms: ["Fresh", "Vibrant", "Smooth"], tags: ["Sicilian Orange", "Citron", "Calabrian Bergamot", "Tunisian Neroli", "Ginger", "Ceylon Cinnamon", "Chinese Black Tea", "Olibanum", "Guaiac Wood", "Ambroxan"], top: "Sicilian orange, citron, Calabrian bergamot", heart: "Tunisian neroli, Nigerian ginger, Ceylon cinnamon", base: "Chinese black tea, guaiac wood, olibanum, ambroxan", summary: "A bright citrus-spicy direction that moves from orange, citron and bergamot into neroli, ginger and cinnamon, then settles over tea, incense and woods.", marketDirection: "Potential fit for unisex European, North American, Gulf and Southeast Asian collections seeking a clean, energetic and contemporary daily-wear profile." },
  { sku: "AM-FR-1011-03", factoryModel: "QY1011-3", productNote: "黑桃-白 100ml", name: "Royale Pearl", slug: "royale-pearl", image: "am-fr-1011-03-royale-pearl.webp", category: "sweet-gourmand", familyTerms: ["Gourmand", "Woody", "Floral"], positioning: "Unisex", characterTerms: ["Sweet", "Creamy", "Rich"], tags: ["Hazelnut", "Cacao", "Jasmine Sambac", "Cedar", "Caramel", "Ambroxan", "Moss"], top: "Hazelnut, cacao", heart: "Jasmine sambac, cedar", base: "Caramel, ambroxan, moss", summary: "A cozy gourmand-woody direction pairing hazelnut and cacao with jasmine sambac and cedar before a smooth caramel, ambroxan and moss base.", marketDirection: "Potential fit for unisex European, North American, Gulf and Southeast Asian collections seeking a rich premium gourmand for gifting, evenings and cooler seasons." },
  { sku: "AM-FR-1011-04", factoryModel: "QY1011-4", productNote: "黑桃-浅蓝 100ml", name: "Moon Aqua", slug: "moon-aqua", image: "am-fr-1011-04-moon-aqua.webp", category: "sweet-gourmand", familyTerms: ["Floral", "Gourmand", "Fresh"], positioning: "Unisex", characterTerms: ["Sweet", "Creamy", "Smooth"], tags: ["Jasmine", "Gardenia", "Carnation", "Flowers", "Sea Notes", "Patchouli", "Sandalwood", "Caramel", "Coffee"], top: "Jasmine, gardenia, carnation", heart: "Flowers, sea notes, patchouli, sandalwood", base: "Caramel, coffee", summary: "A floral-gourmand direction opening with jasmine, gardenia and carnation, unfolding through soft blossoms and marine notes before caramel and coffee.", marketDirection: "Potential fit for unisex European, North American, Gulf and Southeast Asian collections seeking a distinctive sweet-floral profile with a cool aquatic contrast." },
  { sku: "AM-FR-1011-05", factoryModel: "QY1011-5", productNote: "黑桃-金 100ml", name: "King Gold", slug: "king-gold", image: "am-fr-1011-05-king-gold.webp", category: "amber-spicy", familyTerms: ["Fruity", "Amber", "Gourmand"], positioning: "Masculine", characterTerms: ["Fresh", "Warm", "Sweet"], tags: ["Orange", "Lemon", "Bergamot", "Fruits", "Amber", "Madagascar Vanilla", "White Musk"], top: "Orange, lemon, bergamot", heart: "Fruits", base: "Amber, Madagascar vanilla, white musk", summary: "A warm citrus-fruity direction opening with orange, lemon and bergamot, moving through ripe fruit into amber, vanilla and white musk.", marketDirection: "Potential fit for masculine European, North American, Gulf and Southeast Asian collections seeking a polished citrus-amber signature for daily wear and evening occasions." },
];

async function api(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, { ...options, headers: { Authorization: auth, ...(options.headers ?? {}) } });
  const text = await response.text(); let data; try { data = text ? JSON.parse(text) : null; } catch { data = text; }
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
  results.push({ id: saved.id, sku: saved.sku, name: saved.name, status: saved.status, permalink: saved.permalink, imageId: media.id, productNote: product.productNote }); console.log(`${saved.status.toUpperCase()} ${saved.sku} ${saved.permalink}`);
}
await fs.writeFile(resultPath, `${JSON.stringify({ products: results }, null, 2)}\n`);
