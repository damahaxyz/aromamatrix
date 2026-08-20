const baseUrl = "https://shop.aromamatrix.com";
const username = "damaha";
const password = process.env.WP_APP_PASSWORD;

if (!password) {
  throw new Error("WP_APP_PASSWORD is required");
}

const auth = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;

async function api(endpoint) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: { Authorization: auth },
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`GET ${endpoint} failed (${response.status}): ${body}`);
  }
  return JSON.parse(body);
}

const bannedPublicPhrases = [
  "what you are selecting",
  "product focus",
  "recommended applications",
  "packaging selection",
  "available customization",
  "minimum order",
  "lead time",
  "compliance document",
  "internal factory reference",
  "qy1001-",
  "qy1002-",
  "aromamatrix sku",
  "fragrance sample",
];

const expectedProducts = [
  { sku: "AM-FR-1001-01", factoryModel: "QY1001-1", name: "Tropical Vanilla", slug: "tropical-vanilla" },
  { sku: "AM-FR-1001-02", factoryModel: "QY1001-2", name: "Black Amber", slug: "black-amber" },
  { sku: "AM-FR-1001-03", factoryModel: "QY1001-3", name: "Mango Cream", slug: "mango-cream" },
  { sku: "AM-FR-1001-04", factoryModel: "QY1001-4", name: "Pear Jasmine", slug: "pear-jasmine" },
  { sku: "AM-FR-1001-05", factoryModel: "QY1001-5", name: "Strawberry Candy", slug: "strawberry-candy" },
  { sku: "AM-FR-1001-06", factoryModel: "QY1001-6", name: "Salted Coconut", slug: "salted-coconut" },
  { sku: "AM-FR-1001-07", factoryModel: "QY1001-7", name: "Bourbon Vanilla", slug: "bourbon-vanilla" },
  { sku: "AM-FR-1001-08", factoryModel: "QY1001-8", name: "Marine Mineral", slug: "marine-mineral" },
  { sku: "AM-FR-1001-09", factoryModel: "QY1001-9", name: "Velvet Plum", slug: "velvet-plum" },
  { sku: "AM-FR-1002-01", factoryModel: "QY1002-1", productNote: "卡姆拉黑色100ml", name: "Spiced Date", slug: "spiced-date" },
  { sku: "AM-FR-1002-02", factoryModel: "QY1002-2", productNote: "卡姆拉棕色100ml", name: "Coffee Praline", slug: "coffee-praline" },
  { sku: "AM-FR-1002-03", factoryModel: "QY1002-3", productNote: "卡姆拉红色100ml", name: "Smoked Amber", slug: "smoked-amber" },
  { sku: "AM-FR-1002-04", factoryModel: "QY1002-4", productNote: "卡姆拉黑红100ml", name: "Cherry Praline", slug: "cherry-praline" },
];

const products = [];
for (const expected of expectedProducts) {
  const { sku } = expected;
  const matches = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}&per_page=100`);
  if (matches.length !== 1) {
    throw new Error(`${sku}: expected one product, found ${matches.length}`);
  }
  const product = matches[0];
  const publicCopy = `${product.short_description}\n${product.description}`.toLowerCase();
  const foundBanned = bannedPublicPhrases.filter((phrase) => publicCopy.includes(phrase));
  const factoryModel = product.meta_data.find((item) => item.key === "_aromamatrix_factory_reference")?.value;
  const productNote = product.meta_data.find((item) => item.key === "_aromamatrix_product_note")?.value;
  const checks = {
    published: product.status === "publish",
    descriptionSections:
      product.description.includes("Fragrance Profile") &&
      product.description.includes("Suggested Market Direction"),
    buyerAttributes: product.attributes.length === 3,
    noWeight: product.weight === "",
    noDimensions: Object.values(product.dimensions).every((value) => value === ""),
    noBannedPublicCopy: foundBanned.length === 0,
    backendFactoryModel: factoryModel === expected.factoryModel,
    backendProductNote: expected.productNote ? productNote === expected.productNote : true,
    conciseName: product.name === expected.name && product.name.split(/\s+/).length <= 3,
    cleanSlug: product.slug === expected.slug,
  };
  if (Object.values(checks).some((value) => !value)) {
    throw new Error(`${sku} failed audit: ${JSON.stringify({ checks, foundBanned, factoryModel, productNote })}`);
  }
  products.push({ sku, factoryModel, name: product.name, checks });
}

console.log(JSON.stringify({ audited: products.length, passed: products.length, products }, null, 2));
