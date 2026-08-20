import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://shop.aromamatrix.com";
const username = "damaha";
const password = process.env.WP_APP_PASSWORD;

if (!password) {
  throw new Error("WP_APP_PASSWORD is required");
}

const auth = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
const imageDir = "/Users/dodo/Project/AROMAMATRIX/assets/images/shop-fragrances";
const resultPath = "/Users/dodo/Project/AROMAMATRIX/tmp/qy1001-analysis/upload-results.json";

const fragranceCategories = [
  { name: "Floral", slug: "floral", description: "Floral fragrance directions centered on rose, jasmine, violet, iris and other floral accords." },
  { name: "Fruity", slug: "fruity", description: "Fruity fragrance directions ranging from bright orchard fruits to berries and tropical fruits." },
  { name: "Sweet & Gourmand", slug: "sweet-gourmand", description: "Sweet and gourmand fragrance directions featuring vanilla, cream, cacao, caramel and dessert-like accords." },
  { name: "Fresh & Aquatic", slug: "fresh-aquatic", description: "Fresh, citrus, marine, mineral and aquatic fragrance directions." },
  { name: "Amber & Spicy", slug: "amber-spicy", description: "Warm amber and spicy fragrance directions with resinous, peppery or aromatic depth." },
  { name: "Woody & Leather", slug: "woody-leather", description: "Woody and leather fragrance directions featuring dry woods, sandalwood, oud, tobacco or leather facets." },
  { name: "Green & Aromatic", slug: "green-aromatic", description: "Green, herbal and aromatic fragrance directions with leafy, lavender or fougere-like freshness." },
  { name: "Musk & Powdery", slug: "musk-powdery", description: "Musk, powdery, soft-clean and cosmetic-style fragrance directions." },
];

const globalAttributes = [
  {
    key: "family",
    name: "Fragrance Family",
    slug: "fragrance-family",
    terms: ["Floral", "Fruity", "Gourmand", "Citrus", "Aquatic", "Amber", "Spicy", "Woody", "Leather", "Aromatic", "Musk", "Powdery"],
  },
  {
    key: "positioning",
    name: "Positioning",
    slug: "positioning",
    terms: ["Masculine", "Feminine", "Unisex"],
  },
  {
    key: "character",
    name: "Scent Character",
    slug: "scent-character",
    terms: ["Fresh", "Sweet", "Creamy", "Warm", "Dark", "Clean", "Elegant", "Playful", "Smoky", "Rich"],
  },
];

const products = [
  {
    sku: "AM-FR-1001-01",
    factoryModel: "QY1001-1",
    name: "Tropical Vanilla",
    slug: "tropical-vanilla",
    image: "am-fr-1001-01-soft-tropical-vanilla.webp",
    family: "Amber Vanilla Gourmand",
    familyTerms: ["Amber", "Gourmand"],
    positioning: "Feminine",
    characterTerms: ["Sweet", "Creamy"],
    category: "sweet-gourmand",
    tags: ["Tangerine", "Orchid", "Tropical Fruit", "Vanilla", "Musk"],
    top: "Tangerine, heliotrope, orchid",
    heart: "Tropical fruits, gourmand accord",
    base: "Vanilla, sandalwood, musk",
    summary: "A soft, creamy tropical gourmand direction where luminous citrus and delicate florals melt into vanilla, sandalwood and clean musk.",
    marketDirection: "Potential fit for Gulf, Southeast Asian and international youth-focused collections seeking soft tropical gourmands, especially for warm-weather or body-mist concepts.",
  },
  {
    sku: "AM-FR-1001-02",
    factoryModel: "QY1001-2",
    name: "Black Amber",
    slug: "black-amber",
    image: "am-fr-1001-02-black-amber-spice.webp",
    family: "Amber Spicy Woody",
    familyTerms: ["Amber", "Spicy", "Woody"],
    positioning: "Masculine",
    characterTerms: ["Warm", "Dark", "Rich"],
    category: "amber-spicy",
    tags: ["Black Pepper", "Tobacco", "Coffee", "Amber", "Vanilla"],
    top: "Black pepper, pineapple, tobacco",
    heart: "Coffee, iris, patchouli",
    base: "Amber, vanilla, dry woods, benzoin, labdanum",
    summary: "A bold amber-spice direction with peppery lift, dark tobacco and coffee, rounded by vanilla, resin and dry woods.",
    marketDirection: "Potential fit for Gulf and Middle Eastern projects, as well as international evening collections seeking a bold masculine amber-spice profile.",
  },
  {
    sku: "AM-FR-1001-03",
    factoryModel: "QY1001-3",
    name: "Mango Cream",
    slug: "mango-cream",
    image: "am-fr-1001-03-tropical-mango-cream.webp",
    family: "Tropical Fruity Floral",
    familyTerms: ["Fruity", "Floral"],
    positioning: "Feminine",
    characterTerms: ["Fresh", "Sweet", "Creamy", "Playful"],
    category: "fruity",
    tags: ["Mango", "Coconut", "Passionfruit", "Jasmine", "Vanilla"],
    top: "Coconut, mango, passionfruit",
    heart: "Jasmine, heliotrope, orange blossom",
    base: "Cashmeran, vanilla, musk",
    summary: "A radiant tropical-fruit direction combining mango, coconut and passionfruit with white florals and a smooth vanilla-musk finish.",
    marketDirection: "Potential fit for Southeast Asian, Gulf and international warm-weather collections seeking bright tropical fruit with a creamy floral base.",
  },
  {
    sku: "AM-FR-1001-04",
    factoryModel: "QY1001-4",
    name: "Pear Jasmine",
    slug: "pear-jasmine",
    image: "am-fr-1001-04-pear-jasmine-almond.webp",
    family: "Fruity Floral Gourmand",
    familyTerms: ["Fruity", "Floral", "Gourmand"],
    positioning: "Feminine",
    characterTerms: ["Elegant", "Sweet", "Creamy"],
    category: "floral",
    tags: ["Pear", "Blackcurrant", "Jasmine", "Almond", "Vanilla"],
    top: "Pear, pink pepper, blackcurrant",
    heart: "Tuberose, jasmine, almond",
    base: "Vanilla, cashmeran, patchouli",
    summary: "An elegant fruity-floral direction with juicy pear and blackcurrant, creamy white flowers, almond and a velvety vanilla-cashmeran base.",
    marketDirection: "Potential fit for European, North American and Gulf feminine collections seeking an elegant fruity-floral gourmand with premium positioning.",
  },
  {
    sku: "AM-FR-1001-05",
    factoryModel: "QY1001-5",
    name: "Strawberry Candy",
    slug: "strawberry-candy",
    image: "am-fr-1001-05-strawberry-candy-bloom.webp",
    family: "Fruity Floral Gourmand",
    familyTerms: ["Fruity", "Floral", "Gourmand"],
    positioning: "Feminine",
    characterTerms: ["Sweet", "Playful"],
    category: "sweet-gourmand",
    tags: ["Strawberry", "Blackcurrant", "Gardenia", "Vanilla", "Amber"],
    top: "Green mandarin, blackcurrant",
    heart: "Strawberry candy accord, gardenia",
    base: "Sandalwood, vanilla syrup, musk, amber",
    summary: "A playful berry-candy direction brightened by green mandarin, softened with gardenia and finished with vanilla syrup, amber and musk.",
    marketDirection: "Potential fit for Southeast Asian, Gulf and international youth-focused collections seeking playful berry-candy sweetness.",
  },
  {
    sku: "AM-FR-1001-06",
    factoryModel: "QY1001-6",
    name: "Salted Coconut",
    slug: "salted-coconut",
    image: "am-fr-1001-06-salted-coconut-iris.webp",
    family: "Aromatic Marine Gourmand",
    familyTerms: ["Aquatic", "Aromatic", "Gourmand"],
    positioning: "Masculine",
    characterTerms: ["Fresh", "Creamy", "Smoky"],
    category: "fresh-aquatic",
    tags: ["Black Pepper", "Sea Lavender", "Coconut", "Iris", "Incense"],
    top: "Black pepper, sea lavender",
    heart: "Salted coconut water, iris",
    base: "Vanilla, incense",
    summary: "A distinctive fresh-spicy direction balancing pepper and sea lavender with salted coconut water, powdery iris, vanilla and incense.",
    marketDirection: "Potential fit for European, North American and warm-climate coastal collections seeking a distinctive fresh masculine profile with marine, coconut and iris facets.",
  },
  {
    sku: "AM-FR-1001-07",
    factoryModel: "QY1001-7",
    name: "Bourbon Vanilla",
    slug: "bourbon-vanilla",
    image: "am-fr-1001-07-bourbon-vanilla-cacao.webp",
    family: "Amber Spicy Gourmand",
    familyTerms: ["Amber", "Spicy", "Gourmand"],
    positioning: "Unisex",
    characterTerms: ["Warm", "Rich", "Sweet", "Dark"],
    category: "amber-spicy",
    tags: ["Lavender", "Plum", "Cacao", "Nutmeg", "Bourbon Vanilla"],
    top: "Pink pepper, lavender, mirabelle plum",
    heart: "Cacao, davana, nutmeg",
    base: "Vetiver, bourbon vanilla, amber",
    summary: "A warm unisex gourmand direction pairing aromatic lavender and plum with cacao, nutmeg, bourbon vanilla, amber and vetiver.",
    marketDirection: "Potential fit for Gulf, European and North American premium unisex collections seeking rich cacao-vanilla gourmands for evening or cooler-season launches.",
  },
  {
    sku: "AM-FR-1001-08",
    factoryModel: "QY1001-8",
    name: "Marine Mineral",
    slug: "marine-mineral",
    image: "am-fr-1001-08-deep-marine-mineral.webp",
    family: "Marine Aromatic Woody",
    familyTerms: ["Aquatic", "Aromatic", "Woody"],
    positioning: "Unisex",
    characterTerms: ["Fresh", "Clean", "Rich"],
    category: "fresh-aquatic",
    tags: ["Marine", "Violet", "Seaweed", "Amber", "Musk"],
    top: "Sea breeze, violet",
    heart: "Marine minerals, seaweed, salt accord",
    base: "Amber, dry woods, musk",
    summary: "A powerful marine-mineral direction with violet freshness, salty sea air, wet mineral facets and a persistent amber-wood trail.",
    marketDirection: "Potential fit for European, North American, East Asian and Gulf niche collections seeking a high-impact marine-mineral signature with modern unisex positioning.",
  },
  {
    sku: "AM-FR-1001-09",
    factoryModel: "QY1001-9",
    name: "Velvet Plum",
    slug: "velvet-plum",
    image: "am-fr-1001-09-velvet-plum-violet.webp",
    family: "Fruity Floral Musk",
    familyTerms: ["Fruity", "Floral", "Musk"],
    positioning: "Feminine",
    characterTerms: ["Sweet", "Elegant", "Creamy"],
    category: "fruity",
    tags: ["Plum", "Blackberry", "Violet", "Jasmine", "Musk"],
    top: "Purple plum, blackberry",
    heart: "Violet, jasmine",
    base: "Vanilla, amber, musk",
    summary: "A velvety purple-fruit direction where plum and blackberry meet soft violet and jasmine over a smooth vanilla, amber and musk base.",
    marketDirection: "Potential fit for European, North American and Gulf feminine collections seeking a polished dark-fruit floral with an evening or cooler-season character.",
  },
  {
    sku: "AM-FR-1002-01",
    factoryModel: "QY1002-1",
    productNote: "卡姆拉黑色100ml",
    name: "Spiced Date",
    slug: "spiced-date",
    image: "am-fr-1002-01-spiced-date.webp",
    family: "Amber Spicy Gourmand",
    familyTerms: ["Amber", "Spicy", "Gourmand"],
    positioning: "Unisex",
    characterTerms: ["Warm", "Sweet", "Rich"],
    category: "amber-spicy",
    tags: ["Bergamot", "Cinnamon", "Dates", "Praline", "Vanilla", "Roasted Tonka"],
    top: "Bergamot, cinnamon, nutmeg",
    heart: "Dates accord, lily of the valley, praline, tuberose",
    base: "Roasted tonka, benzoin, myrrh, vanilla, amber wood",
    summary: "A warm amber-gourmand direction where bergamot, cinnamon and nutmeg lead into dates and praline over a resinous vanilla-tonka base.",
    marketDirection: "Potential fit for Gulf and international unisex collections seeking a warm date-and-spice gourmand for evening or cooler-season concepts.",
  },
  {
    sku: "AM-FR-1002-02",
    factoryModel: "QY1002-2",
    productNote: "卡姆拉棕色100ml",
    name: "Coffee Praline",
    slug: "coffee-praline",
    image: "am-fr-1002-02-coffee-praline.webp",
    family: "Amber Spicy Gourmand",
    familyTerms: ["Amber", "Spicy", "Gourmand"],
    positioning: "Unisex",
    characterTerms: ["Warm", "Sweet", "Rich"],
    category: "sweet-gourmand",
    tags: ["Ginger", "Cardamom", "Praline", "Coffee", "Vanilla", "Tonka Bean"],
    top: "Ginger, cinnamon, cardamom",
    heart: "Praline, candied fruits, white flowers",
    base: "Coffee Arabica, tonka bean, musk, benzoin, vanilla",
    summary: "A coffee-led gourmand direction that pairs ginger, cinnamon and cardamom with praline and candied fruit over vanilla, tonka and benzoin.",
    marketDirection: "Potential fit for Gulf, European and North American collections seeking a rich coffee-vanilla gourmand with a warm unisex profile.",
  },
  {
    sku: "AM-FR-1002-03",
    factoryModel: "QY1002-3",
    productNote: "卡姆拉红色100ml",
    name: "Smoked Amber",
    slug: "smoked-amber",
    image: "am-fr-1002-03-smoked-amber.webp",
    family: "Amber Spicy Woody",
    familyTerms: ["Amber", "Spicy", "Woody"],
    positioning: "Masculine",
    characterTerms: ["Warm", "Smoky", "Rich"],
    category: "amber-spicy",
    tags: ["Mandarin", "Pimento", "Incense", "Tobacco", "Amber", "Benzoin"],
    top: "Mandarin, pimento, smoked spices",
    heart: "Cistus, orange flower, incense, patchouli",
    base: "Tobacco, amber, tonka bean, benzoin, praline",
    summary: "A smoky amber-spice direction that opens with mandarin and pimento, then deepens through incense and tobacco into benzoin, tonka and praline.",
    marketDirection: "Potential fit for Gulf and international masculine-leaning collections seeking tobacco, incense and amber depth for evening concepts.",
  },
  {
    sku: "AM-FR-1002-04",
    factoryModel: "QY1002-4",
    productNote: "卡姆拉黑红100ml",
    name: "Cherry Praline",
    slug: "cherry-praline",
    image: "am-fr-1002-04-cherry-praline.webp",
    family: "Fruity Amber Gourmand",
    familyTerms: ["Fruity", "Amber", "Gourmand"],
    positioning: "Unisex",
    characterTerms: ["Sweet", "Warm", "Rich"],
    category: "sweet-gourmand",
    tags: ["Black Cherry", "Red Berries", "Cinnamon", "Praline", "Vanilla", "Amber"],
    top: "Black cherry, red berries, bergamot",
    heart: "Cinnamon, praline, tuberose",
    base: "Vanilla, tonka bean, amber wood, myrrh",
    summary: "A deep cherry gourmand direction balancing black cherry and red berries with cinnamon praline, vanilla, tonka and amber wood.",
    marketDirection: "Potential fit for Gulf, European and North American collections seeking a rich cherry-praline gourmand for evening or cooler-season launches.",
  },
];

async function api(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      Authorization: auth,
      ...(options.headers ?? {}),
    },
  });
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!response.ok) {
    throw new Error(`${options.method ?? "GET"} ${endpoint} failed (${response.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

async function ensureParentCategory() {
  const categories = await api("/wp-json/wc/v3/products/categories?slug=fragrances&per_page=100");
  if (categories.length > 0) return categories[0];
  return api("/wp-json/wc/v3/products/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Fragrances",
      slug: "fragrances",
      description: "B2B fragrance directions available for sampling, private label development and customized production.",
    }),
  });
}

async function ensureChildCategories(parentId) {
  const result = {};
  for (const category of fragranceCategories) {
    const existing = await api(`/wp-json/wc/v3/products/categories?slug=${encodeURIComponent(category.slug)}&per_page=100`);
    const match = existing.find((item) => item.parent === parentId);
    const saved = match ?? await api("/wp-json/wc/v3/products/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...category, parent: parentId }),
    });
    result[category.slug] = saved;
  }
  return result;
}

async function ensureGlobalAttributes() {
  const existingAttributes = await api("/wp-json/wc/v3/products/attributes?per_page=100");
  const result = {};

  for (const definition of globalAttributes) {
    let attribute = existingAttributes.find((item) =>
      item.name === definition.name || item.slug === definition.slug || item.slug === `pa_${definition.slug}`,
    );
    if (!attribute) {
      attribute = await api("/wp-json/wc/v3/products/attributes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: definition.name,
          slug: definition.slug,
          type: "select",
          order_by: "menu_order",
          has_archives: true,
        }),
      });
    }

    const existingTerms = await api(`/wp-json/wc/v3/products/attributes/${attribute.id}/terms?per_page=100`);
    const terms = {};
    for (const termName of definition.terms) {
      let term = existingTerms.find((item) => item.name.toLowerCase() === termName.toLowerCase());
      if (!term) {
        term = await api(`/wp-json/wc/v3/products/attributes/${attribute.id}/terms`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: termName }),
        });
      }
      terms[termName] = term;
    }
    result[definition.key] = { ...attribute, terms };
  }
  return result;
}

async function ensureTags() {
  const tagNames = [...new Set(products.flatMap((product) => product.tags))];
  const existingTags = await api("/wp-json/wc/v3/products/tags?per_page=100");
  const result = {};
  for (const tagName of tagNames) {
    let tag = existingTags.find((item) => item.name.toLowerCase() === tagName.toLowerCase());
    if (!tag) {
      tag = await api("/wp-json/wc/v3/products/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: tagName }),
      });
    }
    result[tagName] = tag;
  }
  return result;
}

async function ensureMedia(product) {
  const existing = await api(`/wp-json/wp/v2/media?search=${encodeURIComponent(product.sku)}&per_page=100`);
  const match = existing.find((item) => item.slug?.includes(product.sku.toLowerCase()));
  if (match) return match;

  const filename = product.image;
  const bytes = await fs.readFile(path.join(imageDir, filename));
  const uploaded = await api("/wp-json/wp/v2/media", {
    method: "POST",
    headers: {
      "Content-Type": "image/webp",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
    body: bytes,
  });

  return api(`/wp-json/wp/v2/media/${uploaded.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: `${product.sku} — ${product.name}`,
      alt_text: `${product.name} fragrance direction with an original AM perfume bottle and representative scent materials`,
      caption: "Original AROMAMATRIX fragrance-direction image generated for B2B sample presentation.",
    }),
  });
}

function description(product) {
  return [
    "<h3>Fragrance Profile</h3>",
    "<ul>",
    `<li><strong>Top:</strong> ${product.top}</li>`,
    `<li><strong>Heart:</strong> ${product.heart}</li>`,
    `<li><strong>Base:</strong> ${product.base}</li>`,
    "</ul>",
    "<h3>Suggested Market Direction</h3>",
    `<p>${product.marketDirection}</p>`,
  ].join("");
}

function productPayload(product, mediaId, taxonomy) {
  const { parentCategory, childCategories, attributes, tags } = taxonomy;
  return {
    name: product.name,
    slug: product.slug,
    type: "simple",
    status: "publish",
    catalog_visibility: "visible",
    regular_price: "0",
    description: description(product),
    short_description: `<p>${product.summary}</p>`,
    sku: product.sku,
    virtual: false,
    manage_stock: false,
    sold_individually: false,
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    categories: [{ id: parentCategory.id }, { id: childCategories[product.category].id }],
    tags: product.tags.map((tagName) => ({ id: tags[tagName].id })),
    images: [{ id: mediaId, alt: `${product.name} fragrance direction` }],
    attributes: [
      { id: attributes.family.id, visible: true, variation: false, options: product.familyTerms },
      { id: attributes.positioning.id, visible: true, variation: false, options: [product.positioning] },
      { id: attributes.character.id, visible: true, variation: false, options: product.characterTerms },
    ],
    meta_data: [
      { key: "_aromamatrix_factory_reference", value: product.factoryModel },
      ...(product.productNote ? [{ key: "_aromamatrix_product_note", value: product.productNote }] : []),
      { key: "catalog_purpose", value: "B2B fragrance sample presentation" },
    ],
  };
}

async function upsertProduct(product, mediaId, taxonomy) {
  const existing = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(product.sku)}&per_page=100`);
  const payload = productPayload(product, mediaId, taxonomy);
  if (existing.length > 0) {
    const legacyFactoryMeta = existing[0].meta_data?.find((item) => item.key === "factory_reference");
    if (legacyFactoryMeta) {
      payload.meta_data = payload.meta_data.filter((item) => item.key !== "_aromamatrix_factory_reference");
      payload.meta_data.push({
        id: legacyFactoryMeta.id,
        key: "_aromamatrix_factory_reference",
        value: product.factoryModel,
      });
    }
    return api(`/wp-json/wc/v3/products/${existing[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }
  return api("/wp-json/wc/v3/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

const parentCategory = await ensureParentCategory();
const childCategories = await ensureChildCategories(parentCategory.id);
const attributes = await ensureGlobalAttributes();
const tags = await ensureTags();
const taxonomy = { parentCategory, childCategories, attributes, tags };
const results = [];

for (const product of products) {
  const media = await ensureMedia(product);
  const created = await upsertProduct(product, media.id, taxonomy);
  results.push({
    id: created.id,
    sku: created.sku,
    name: created.name,
    status: created.status,
    permalink: created.permalink,
    imageId: media.id,
  });
  console.log(`${created.status.toUpperCase()} ${created.sku} ${created.permalink}`);
}

await fs.writeFile(resultPath, `${JSON.stringify({
  parentCategory,
  childCategories,
  attributes: Object.fromEntries(Object.entries(attributes).map(([key, value]) => [key, {
    id: value.id,
    name: value.name,
    slug: value.slug,
    terms: Object.values(value.terms).map((term) => ({ id: term.id, name: term.name, slug: term.slug })),
  }])),
  tags: Object.values(tags).map((tag) => ({ id: tag.id, name: tag.name, slug: tag.slug })),
  products: results,
}, null, 2)}\n`, "utf8");
console.log(`Saved results to ${resultPath}`);
