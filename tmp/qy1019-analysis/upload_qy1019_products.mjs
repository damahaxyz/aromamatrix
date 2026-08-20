import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const imageDir = "/Users/dodo/Project/AROMAMATRIX/assets/images/shop-fragrances";
const resultPath = "/Users/dodo/Project/AROMAMATRIX/tmp/qy1019-analysis/qy1019-upload-results.json";

const products = [
  {
    sku: "AM-FR-1019-01", factoryModel: "QY1019-1", productNote: "LATTAFA双开门红色", name: "Passion Tide", slug: "passion-tide", image: "am-fr-1019-01-passion-tide.webp", category: "sweet-gourmand",
    familyTerms: ["Fruity", "Floral", "Gourmand"], positioning: "Feminine", characterTerms: ["Fresh", "Sweet", "Playful"],
    tags: ["Mandarin", "Passion Fruit", "Orange Blossom", "Rose", "Sea Salt", "Toffee"],
    top: "Mandarin, ozonic accord, passion fruit", heart: "Orange blossom, rose, sea salt, raspberry", base: "Musk, vanilla, praline, toffee",
    summary: "A lively fruity-floral gourmand direction opening with mandarin, ozonic notes and passion fruit, moving through orange blossom, rose, sea salt and raspberry into vanilla, praline and toffee.",
    marketDirection: "Potential fit for feminine European, North American, Gulf and Southeast Asian collections seeking a bright fruity gourmand with a playful salty-floral contrast for daytime, gifting and warm-weather occasions.",
  },
  {
    sku: "AM-FR-1019-02", factoryModel: "QY1019-2", productNote: "LATTAFA双开门蓝色", name: "Azure Tuberose", slug: "azure-tuberose", image: "am-fr-1019-02-azure-tuberose.webp", category: "floral",
    familyTerms: ["Floral", "Citrus", "Woody"], positioning: "Feminine", characterTerms: ["Fresh", "Elegant", "Creamy"],
    tags: ["Orange Blossom", "Bergamot", "Blackcurrant", "Tuberose", "Jasmine", "Cedarwood"],
    top: "Orange blossom, bergamot, blackcurrant", heart: "Tuberose, marigold, jasmine", base: "Vanilla, white musk, cedarwood, patchouli",
    summary: "A polished floral-citrus direction that pairs orange blossom, bergamot and blackcurrant with tuberose, marigold and jasmine over vanilla, white musk, cedarwood and patchouli.",
    marketDirection: "Potential fit for feminine European, North American, Gulf and Southeast Asian collections seeking an elegant fresh floral for daily wear, business settings and social occasions.",
  },
  {
    sku: "AM-FR-1019-03", factoryModel: "QY1019-3", productNote: "LATTAFA双开门粉色", name: "Champagne Petal", slug: "champagne-petal", image: "am-fr-1019-03-champagne-petal.webp", category: "floral",
    familyTerms: ["Floral", "Fruity", "Amber"], positioning: "Feminine", characterTerms: ["Fresh", "Sweet", "Elegant"],
    tags: ["Champagne", "Strawberry", "Blood Orange", "Rose", "Gardenia", "Vanilla Orchid"],
    top: "Champagne, strawberry, blood orange, rose, tangerine", heart: "Gardenia, jasmine, vanilla orchid", base: "Amber, sandalwood, roasted chestnut",
    summary: "A sparkling fruity-floral direction that opens with champagne, strawberry, citrus and rose, blooms through gardenia and jasmine, then settles into vanilla orchid, amber, sandalwood and chestnut.",
    marketDirection: "Potential fit for feminine European, North American, Gulf and Southeast Asian collections seeking an uplifting floral-fruity profile for daytime, celebrations, gifting and spring-summer selections.",
  },
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
