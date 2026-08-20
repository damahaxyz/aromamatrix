const baseUrl = "https://shop.aromamatrix.com";
const username = "damaha";
const password = process.env.WP_APP_PASSWORD;

if (!password) throw new Error("WP_APP_PASSWORD is required");

const auth = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;

async function request(endpoint) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: { Authorization: auth },
  });
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: response.status, ok: response.ok, data };
}

const [plugins, themes, types, index] = await Promise.all([
  request("/wp-json/wp/v2/plugins?per_page=100"),
  request("/wp-json/wp/v2/themes?per_page=100"),
  request("/wp-json/wp/v2/types"),
  request("/wp-json/"),
]);

const relevantRoutes = index.ok
  ? Object.fromEntries(Object.entries(index.data.routes).filter(([route]) => /aromamatrix|plugin|code|deploy|snippet/i.test(route)))
  : {};

console.log(JSON.stringify({
  plugins: plugins.ok ? plugins.data.map(({ plugin, status, name, version }) => ({ plugin, status, name, version })) : plugins,
  themes: themes.ok ? themes.data.map(({ stylesheet, status, name, version }) => ({ stylesheet, status, name: name.raw, version })) : themes,
  typesStatus: types.status,
  relevantRoutes,
}, null, 2));
