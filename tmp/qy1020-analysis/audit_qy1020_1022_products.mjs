const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const expected = [
  ["AM-FR-1020-01", "Aromatic Crown", "QY1020-1", "Cardamom, pepper, artemisia, bergamot", "Sandalwood, patchouli, tonka bean, amberwood, musk"],
  ["AM-FR-1020-02", "Rose Ember", "QY1020-2", "Bergamot, pear", "Musk, dry amber, oakmoss"],
  ["AM-FR-1021-01", "Lemon Veil", "QY1021", "Lemon meringue pie", "Vanilla"],
  ["AM-FR-1022-01", "Honeyed Orchid", "QY1022", "Passionflower, dewdrop", "Vanilla, amberwood"],
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
