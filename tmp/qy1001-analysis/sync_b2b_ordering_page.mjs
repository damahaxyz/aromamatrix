const baseUrl = "https://shop.aromamatrix.com";
const username = "damaha";
const password = process.env.WP_APP_PASSWORD;

if (!password) {
  throw new Error("WP_APP_PASSWORD is required");
}

const auth = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
const slug = "b2b-ordering-information";

const content = [
  "<p>This page explains the sampling, quotation and order information that applies across the AROMAMATRIX B2B catalog.</p>",
  "<h2>1. Product Selection</h2>",
  "<p>Fragrance directions and packaging components are selected separately. Fragrance product pages describe the olfactive direction. Bottle, cap, fill volume, decoration and outer packaging are confirmed as a separate part of the project.</p>",
  "<h2>2. Sampling &amp; Approval</h2>",
  "<ol>",
  "<li>Select one or more fragrance directions and/or packaging options.</li>",
  "<li>Share the intended application, destination market and key project requirements.</li>",
  "<li>Evaluate the physical sample and request any agreed adjustments.</li>",
  "<li>Approve the final fragrance sample, concentration and packaging configuration before production quotation and order confirmation.</li>",
  "</ol>",
  "<h2>3. What to Include in Your Project Brief</h2>",
  "<ul>",
  "<li>Company name and destination country or market</li>",
  "<li>Selected product names or page links</li>",
  "<li>Intended product type and application</li>",
  "<li>Preferred concentration and fill volume, if known</li>",
  "<li>Estimated order quantity</li>",
  "<li>Bottle, cap, decoration and packaging requirements</li>",
  "<li>Target delivery date and required documentation</li>",
  "</ul>",
  "<h2>4. MOQ &amp; Quotation</h2>",
  "<p>MOQ and pricing depend on the approved fragrance formula, concentration, fill volume, component selection, decoration, packaging and total quantity. They are confirmed in the project quotation after the scope is defined.</p>",
  "<h2>5. Lead Time</h2>",
  "<p>Sampling and production lead times are confirmed after the project requirements, sample approval status, component availability, artwork and order quantity have been reviewed.</p>",
  "<h2>6. Compliance Documents</h2>",
  "<p>Documentation requirements depend on the approved formula, intended finished-product application and destination market. Depending on the confirmed project scope, the requested document set may include an SDS, COA, allergen declaration and a Certificate of Conformity to the IFRA Standards for the intended use. Document availability and format are confirmed before order placement.</p>",
  "<h2>7. Shipping &amp; Export</h2>",
  "<p>Shipping method, export documentation, dangerous-goods handling where applicable, Incoterms, freight cost and destination feasibility are confirmed for each order.</p>",
  '<p><a class="aroma-button" href="https://www.aromamatrix.com/contact">Send Your Project Brief</a></p>',
].join("");

async function api(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      Authorization: auth,
      ...(options.headers ?? {}),
    },
  });
  const body = await response.text();
  let data;
  try {
    data = body ? JSON.parse(body) : null;
  } catch {
    data = body;
  }
  if (!response.ok) {
    throw new Error(`${options.method ?? "GET"} ${endpoint} failed (${response.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

const existing = await api(`/wp-json/wp/v2/pages?slug=${slug}&context=edit&per_page=100`);
const payload = {
  title: "B2B Sampling & Ordering Information",
  slug,
  status: "publish",
  content,
  excerpt: "Catalog-wide guidance for fragrance sampling, project briefs, MOQ, quotation, lead time, documentation and shipping.",
};
const page = await api(
  existing.length > 0 ? `/wp-json/wp/v2/pages/${existing[0].id}` : "/wp-json/wp/v2/pages",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  },
);

console.log(`${existing.length > 0 ? "UPDATED" : "CREATED"} ${page.link}`);
