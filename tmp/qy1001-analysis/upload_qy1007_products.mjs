import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const imageDir = "/Users/dodo/Project/AROMAMATRIX/assets/images/shop-fragrances";
const resultPath = "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/qy1007-upload-results.json";

// QY1007-1 through QY1007-5. Product notes are copied from the Excel product-name field.
const products = [
  {
    sku: "AM-FR-1007-01", factoryModel: "QY1007-1", productNote: "保温杯橙色100ml",
    name: "Mandarin Flare", slug: "mandarin-flare", image: "am-fr-1007-01-mandarin-flare.webp",
    category: "fresh-aquatic", familyTerms: ["Amber", "Woody", "Fresh"], positioning: "Masculine", characterTerms: ["Fresh", "Warm", "Sweet"],
    tags: ["Sage", "Mandarin", "Orange", "Saffron", "Caramel", "Tonka Bean", "Tagetes", "Vetiver", "Cedar", "Ambroxan"],
    top: "Sage, mandarin, orange, saffron", heart: "Caramel, tonka bean, tagetes", base: "Vetiver, cedar, ambroxan",
    summary: "A bright citrus-amber direction that opens with sage, mandarin, orange and saffron, then warms into caramel and tonka over a clean woody base.",
    marketDirection: "Potential fit for masculine European, North American, Gulf and Southeast Asian collections seeking a versatile citrus-amber signature for daily wear and warm climates.",
  },
  {
    sku: "AM-FR-1007-02", factoryModel: "QY1007-2", productNote: "保温杯粉色100ml",
    name: "Candy Veil", slug: "candy-veil", image: "am-fr-1007-02-candy-veil.webp",
    category: "sweet-gourmand", familyTerms: ["Floral", "Gourmand", "Fruity"], positioning: "Feminine", characterTerms: ["Sweet", "Creamy", "Playful"],
    tags: ["Green Notes", "Orange", "Honeysuckle", "Tuberose", "Egyptian Jasmine", "Vanilla", "Orris", "Sandalwood"],
    top: "Green notes, orange", heart: "Honeysuckle, tuberose, Egyptian jasmine", base: "Vanilla, orris, sandalwood",
    summary: "A playful sweet-floral direction combining green orange freshness with honeysuckle, tuberose and jasmine over a creamy vanilla-orris sandalwood base.",
    marketDirection: "Potential fit for feminine European, North American, Gulf and Southeast Asian collections seeking an easy-to-gift floral gourmand with year-round appeal.",
  },
  {
    sku: "AM-FR-1007-03", factoryModel: "QY1007-3", productNote: "保温杯黄色100ml",
    name: "Solar Mega", slug: "solar-mega", image: "am-fr-1007-03-solar-mega.webp",
    category: "fresh-aquatic", familyTerms: ["Aromatic", "Woody", "Fresh"], positioning: "Masculine", characterTerms: ["Fresh", "Clean", "Vibrant"],
    tags: ["Ginger", "Bergamot", "Orange", "Lemon", "Mint", "Pineapple", "Sage", "Juniper", "Geranium", "Musk", "Cedar", "Vetiver", "Tonka Bean"],
    top: "Ginger, bergamot, orange, lemon, mint", heart: "Pineapple, sage, juniper, geranium", base: "Musk, cedar, vetiver, tonka bean",
    summary: "A clean energetic aromatic-woody direction pairing citrus and mint with pineapple, sage and juniper over a musky cedar-vetiver tonka base.",
    marketDirection: "Potential fit for masculine European, North American, Gulf and Southeast Asian collections seeking a fresh blue-style fragrance for office, travel and warm-weather use.",
  },
  {
    sku: "AM-FR-1007-04", factoryModel: "QY1007-4", productNote: "保温杯紫色100ml",
    name: "White Lavender", slug: "white-lavender", image: "am-fr-1007-04-white-lavender.webp",
    category: "fresh-aquatic", familyTerms: ["Fresh", "Woody", "Amber"], positioning: "Masculine", characterTerms: ["Fresh", "Creamy", "Smooth"],
    tags: ["Mint", "Pink Pepper", "Cardamom", "Sage", "Pineapple", "Aquatic Accords", "Cedarwood", "Amberwood", "Vanilla"],
    top: "Mint, pink pepper, cardamom", heart: "Sage, pineapple, aquatic accords", base: "Cedarwood, amberwood, vanilla",
    summary: "A crisp fresh-woody direction opening with mint, pink pepper and cardamom, moving through sage and pineapple, and settling into cedarwood, amberwood and vanilla.",
    marketDirection: "Potential fit for masculine European, North American, Gulf and Southeast Asian collections seeking a polished everyday fresh fragrance with a creamy woody dry-down.",
  },
  {
    sku: "AM-FR-1007-05", factoryModel: "QY1007-5", productNote: "保温杯彩色100ml",
    name: "Spectrum Pulse", slug: "spectrum-pulse", image: "am-fr-1007-05-spectrum-pulse.webp",
    category: "amber-spicy", familyTerms: ["Leather", "Amber", "Gourmand"], positioning: "Masculine", characterTerms: ["Sweet", "Warm", "Rich"],
    tags: ["Cinnamon", "Bergamot", "Apple", "Lavender", "Lily of the Valley", "Orange Blossom", "Tobacco", "Amber", "Tonka Bean", "Patchouli", "Vanilla"],
    top: "Cinnamon, bergamot, apple", heart: "Lavender, cinnamon, lily-of-the-valley, orange blossom", base: "Tobacco, amber, tonka bean, patchouli, vanilla",
    summary: "A warm amber-leather direction blending cinnamon, bergamot and apple with aromatic florals before drying down through tobacco, amber, tonka, patchouli and vanilla.",
    marketDirection: "Potential fit for masculine European, North American, Gulf and Southeast Asian collections seeking a bold evening fragrance with strong gifting and cooler-weather appeal.",
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
  api("/wp-json/wc/v3/products/categories?slug=fragrances&per_page=100"),
  api("/wp-json/wc/v3/products/categories?per_page=100"),
  api("/wp-json/wc/v3/products/attributes?per_page=100"),
  api("/wp-json/wc/v3/products/tags?per_page=100"),
]);
const parent = parents[0];
if (!parent) throw new Error("Fragrances category is required");
const requiredCategories = Object.fromEntries([...new Set(products.map((p) => p.category))].map((slug) => {
  const category = categories.find((item) => item.slug === slug && item.parent === parent.id);
  if (!category) throw new Error(`Category ${slug} is required`);
  return [slug, category];
}));
const requiredAttributes = Object.fromEntries([["family", "Fragrance Family"], ["positioning", "Positioning"], ["character", "Scent Character"]].map(([key, name]) => {
  const attribute = attributes.find((item) => item.name === name);
  if (!attribute) throw new Error(`Attribute ${name} is required`);
  return [key, attribute];
}));
const tags = {};
for (const name of [...new Set(products.flatMap((p) => p.tags))]) {
  let tag = existingTags.find((item) => item.name.toLowerCase() === name.toLowerCase());
  if (!tag) {
    try {
      tag = await api("/wp-json/wc/v3/products/tags", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
    } catch (error) {
      if (!String(error).includes("term_exists")) throw error;
      const matches = await api(`/wp-json/wc/v3/products/tags?search=${encodeURIComponent(name)}&per_page=100`);
      tag = matches.find((item) => item.name.toLowerCase() === name.toLowerCase());
      if (!tag) throw error;
    }
  }
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
  const body = JSON.stringify({
    name: product.name, slug: product.slug, type: "simple", status: "publish", catalog_visibility: "visible", regular_price: "0",
    description: profile(product), short_description: `<p>${product.summary}</p>`, sku: product.sku, manage_stock: false, sold_individually: false,
    weight: "", dimensions: { length: "", width: "", height: "" }, categories: [{ id: parent.id }, { id: requiredCategories[product.category].id }],
    tags: product.tags.map((name) => ({ id: tags[name].id })), images: [{ id: media.id, alt: `${product.name} fragrance direction` }],
    attributes: [
      { id: requiredAttributes.family.id, visible: true, variation: false, options: product.familyTerms },
      { id: requiredAttributes.positioning.id, visible: true, variation: false, options: [product.positioning] },
      { id: requiredAttributes.character.id, visible: true, variation: false, options: product.characterTerms },
    ],
    meta_data: [
      { key: "_aromamatrix_factory_reference", value: product.factoryModel },
      { key: "_aromamatrix_product_note", value: product.productNote },
      { key: "catalog_purpose", value: "B2B fragrance sample presentation" },
    ],
  });
  const matches = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(product.sku)}&per_page=100`);
  if (matches.length > 1) throw new Error(`${product.sku}: duplicate products`);
  const saved = await api(matches.length ? `/wp-json/wc/v3/products/${matches[0].id}` : "/wp-json/wc/v3/products", { method: matches.length ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body });
  results.push({ id: saved.id, sku: saved.sku, name: saved.name, status: saved.status, permalink: saved.permalink, imageId: media.id, productNote: product.productNote });
  console.log(`${saved.status.toUpperCase()} ${saved.sku} ${saved.permalink}`);
}
await fs.writeFile(resultPath, `${JSON.stringify({ products: results }, null, 2)}\n`);
