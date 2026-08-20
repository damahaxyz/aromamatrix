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

const [products, categories, generalSettings, advancedSettings, gateways] = await Promise.all([
  api("/wp-json/wc/v3/products?per_page=100&status=publish"),
  api("/wp-json/wc/v3/products/categories?per_page=100"),
  api("/wp-json/wc/v3/settings/general"),
  api("/wp-json/wc/v3/settings/advanced"),
  api("/wp-json/wc/v3/payment_gateways"),
]);

const settingValue = (settings, id) => settings.find((setting) => setting.id === id)?.value;

console.log(JSON.stringify({
  commerce: {
    currency: settingValue(generalSettings, "woocommerce_currency"),
    currencyPosition: settingValue(generalSettings, "woocommerce_currency_pos"),
    cartPageId: settingValue(advancedSettings, "woocommerce_cart_page_id"),
    checkoutPageId: settingValue(advancedSettings, "woocommerce_checkout_page_id"),
    termsPageId: settingValue(advancedSettings, "woocommerce_terms_page_id"),
    enabledGateways: gateways.filter((gateway) => gateway.enabled).map((gateway) => ({ id: gateway.id, title: gateway.title })),
  },
  categories: categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    parent: category.parent,
    count: category.count,
  })),
  products: products.map((product) => ({
    id: product.id,
    sku: product.sku,
    name: product.name,
    type: product.type,
    price: product.price,
    regularPrice: product.regular_price,
    stockStatus: product.stock_status,
    purchasable: product.purchasable,
    virtual: product.virtual,
    categories: product.categories.map((category) => category.slug),
    attributes: product.attributes.map((attribute) => attribute.name),
  })),
}, null, 2));
