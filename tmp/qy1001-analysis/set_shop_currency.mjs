const baseUrl = "https://shop.aromamatrix.com";
const username = "damaha";
const password = process.env.WP_APP_PASSWORD;

if (!password) {
  throw new Error("WP_APP_PASSWORD is required");
}

const auth = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;

async function updateSetting(id, value) {
  const response = await fetch(`${baseUrl}/wp-json/wc/v3/settings/general/${id}`, {
    method: "PUT",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`PUT ${id} failed (${response.status}): ${body}`);
  }
  return JSON.parse(body);
}

async function api(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      Authorization: auth,
      ...(options.headers ?? {}),
    },
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`${options.method ?? "GET"} ${endpoint} failed (${response.status}): ${body}`);
  }
  return JSON.parse(body);
}

const currency = await updateSetting("woocommerce_currency", "USD");
const position = await updateSetting("woocommerce_currency_pos", "left");
const pricedProducts = [];

for (let index = 1; index <= 9; index += 1) {
  const sku = `AM-FR-1001-${String(index).padStart(2, "0")}`;
  const products = await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}&per_page=100`);
  if (products.length !== 1) {
    throw new Error(`${sku}: expected one product, found ${products.length}`);
  }
  const product = await api(`/wp-json/wc/v3/products/${products[0].id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ regular_price: "0" }),
  });
  pricedProducts.push({ sku: product.sku, price: product.price, purchasable: product.purchasable });
}

console.log(JSON.stringify({
  currency: currency.value,
  currencyPosition: position.value,
  products: pricedProducts,
}, null, 2));
