const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const expected = [
  ["AM-FR-1025-01", "Cyan Oasis", "QY1025", "Pepper lemon, orange oil, Italian bergamot, grapefruit-pineapple", "Patchouli, vetiver, cedarwood, musk leather, amber"],
  ["AM-FR-1027-28", "Amber Vanilla", "QY1027-28", "Vanilla orchid, creamy jasmine", "Brown sugar, musk, patchouli, amber"],
  ["AM-FR-1027-01", "Juicy Orchard", "QY1027-01", "Juicy red apple, blackcurrant, pink grapefruit, lychee", "Vanilla flower, sugared moss, sensual musk, amber"],
  ["AM-FR-1027-81", "Marshmallow Bloom", "QY1027-81", "Pink Lady apple, nectarine blossom, freesia, Italian lemon", "Whipped vanilla, raspberry sugar, pink musk, ambrox"],
  ["AM-FR-1027-33", "Pistachio Cloud", "QY1027-33", "Pistachio gelato, hazelnut, Italian bergamot, sweet rum, cardamom", "Whipped cream, marshmallow, cotton candy, Turkish delight, cocoa, cedarwood, sandalwood, tonka"],
  ["AM-FR-1027-39", "Lychee Gleam", "QY1027-39", "Blackcurrant, Italian lemon, sparkling lychee, juicy red apple", "Sugared amber, cedarwood, musk, vanilla absolute"],
  ["AM-FR-1028-01", "Whiskey Cashmere", "QY1028-1", "Whiskey, coriander seed, mandarin, orange", "Benzoin, patchouli, vanilla"],
  ["AM-FR-1028-02", "Mango Ember", "QY1028-2", "Ginger, mango, lemon, rhubarb", "Cedarwood, ambergris accord, tonka beans, moss"],
  ["AM-FR-1028-03", "Raspberry Current", "QY1028-3", "Bergamot, rosemary, blackcurrant", "Amber, musk, patchouli, sandalwood, olibanum"],
  ["AM-FR-1029-01", "Cinnamon Reserve", "QY1029", "Cinnamon, bergamot, cardamom, orange blossom", "Musk, praline, ambroxan, guaiac wood"],
  ["AM-FR-1030-01", "Cosmic Cedar", "QY1030", "Bergamot, mandarin, ginger, mint", "Cedarwood, amber, musk"],
  ["AM-FR-1031-01", "Blue Meridian", "QY1031-1", "Bergamot, mandarin", "Musk, patchouli, fresh spice"],
  ["AM-FR-1031-02", "Umber Meridian", "QY1031-2", "Patchouli, amber, ozonic and woody accords", "Balsamic notes, rose, aquatic accords"],
  ["AM-FR-1031-03", "Electric Meridian", "QY1031-3", "Bergamot, pink grapefruit, pear, mandarin orange", "Vanilla, dry amber, musk, ambroxan"],
  ["AM-FR-1032-01", "Smoke Atlas", "QY1032", "Bergamot, lavender, saffron", "Woody notes, patchouli, leather, resins, musk"],
  ["AM-FR-1033-01", "Mosaic Bloom", "QY1033", "Tangerine, grapefruit", "Vanilla, sandalwood, white musk, amber"],
];
async function api(endpoint) {
  const response = await fetch(`${baseUrl}${endpoint}`, { headers: { Authorization: auth } });
  const data = await response.json();
  if (!response.ok) throw new Error(`GET ${endpoint} failed (${response.status}): ${JSON.stringify(data)}`);
  return data;
}
const output=[];
for (const [sku,name,factoryModel,top,base] of expected) {
  const matches=await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}&per_page=100`);
  if(matches.length!==1) throw new Error(`${sku}: expected one product, found ${matches.length}`);
  const product=matches[0];
  const meta=Object.fromEntries(product.meta_data.map((item)=>[item.key,item.value]));
  if(product.name!==name||product.status!=="publish"||product.catalog_visibility!=="visible"||product.regular_price!=="0") throw new Error(`${sku}: public fields incorrect`);
  if(meta._aromamatrix_factory_reference!==factoryModel) throw new Error(`${sku}: factory model incorrect`);
  if(product.weight||product.dimensions.length||product.dimensions.width||product.dimensions.height||product.variations.length) throw new Error(`${sku}: logistics or variation data should be empty`);
  if(!product.images.length||product.images[0].alt!==`${name} fragrance direction`) throw new Error(`${sku}: image or alt text incorrect`);
  if(!product.description.includes("Fragrance Profile")||!product.description.includes("Suggested Market Direction")||!product.description.includes(top)||!product.description.includes(base)) throw new Error(`${sku}: profile content incomplete`);
  if([product.name,product.slug,product.short_description,product.description].some((text)=>text.includes(factoryModel))) throw new Error(`${sku}: factory model exposed publicly`);
  output.push({sku,name,permalink:product.permalink,image:product.images[0].src,audit:"passed"});
}
console.log(JSON.stringify({products:output},null,2));
