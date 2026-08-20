const baseUrl = "https://shop.aromamatrix.com";
const password = process.env.WP_APP_PASSWORD;
if (!password) throw new Error("WP_APP_PASSWORD is required");
const auth = `Basic ${Buffer.from(`damaha:${password}`).toString("base64")}`;
const expected = [
  ["AM-FR-1035-01","Citrus Veil","QY1035-1","Citrus, bergamot","Jasmine, musk, blonde woods, oud"],
  ["AM-FR-1035-02","Spice Meridian","QY1035-2","Mint, cardamom, basil","Cedarwood, patchouli, sandalwood, musk, amber"],
  ["AM-FR-1035-03","Rose Velvet","QY1035-3","Strawberry, grapes, orange","Tonka bean, amber, sandalwood"],
  ["AM-FR-1035-04","Saffron Atlas","QY1035-4","Bergamot, saffron, cardamom","Amber, sandalwood, musk, resins"],
  ["AM-FR-1037-01","Rose Dawn","QY1037","Mandarin orange, pink pepper","Patchouli, tonka bean, vanilla"],
  ["AM-FR-1038-01","Cloud Cocoa","QY1038-1","Toffee, coconut, lemon","Vanilla, soft musk, marshmallow"],
  ["AM-FR-1038-02","Pistachio Cream","QY1038-2","Bergamot, toffee, raspberry, peach","Vanilla"],
  ["AM-FR-1038-03","Cocoa Ember","QY1038-3","Vanilla, chocolate","Sandalwood, oriental woods, rose"],
];
async function api(endpoint){const response=await fetch(`${baseUrl}${endpoint}`,{headers:{Authorization:auth}});const data=await response.json();if(!response.ok)throw new Error(`GET ${endpoint} failed (${response.status}): ${JSON.stringify(data)}`);return data;}
const output=[];
for(const [sku,name,factoryModel,top,base] of expected){
  const matches=await api(`/wp-json/wc/v3/products?sku=${encodeURIComponent(sku)}&per_page=100`); if(matches.length!==1)throw new Error(`${sku}: expected one product, found ${matches.length}`);
  const p=matches[0], meta=Object.fromEntries(p.meta_data.map(x=>[x.key,x.value]));
  if(p.name!==name||p.status!=="publish"||p.catalog_visibility!=="visible"||p.regular_price!=="0")throw new Error(`${sku}: public fields incorrect`);
  if(meta._aromamatrix_factory_reference!==factoryModel)throw new Error(`${sku}: factory model incorrect`);
  if(p.weight||p.dimensions.length||p.dimensions.width||p.dimensions.height||p.variations.length)throw new Error(`${sku}: logistics or variation data should be empty`);
  if(!p.images.length||p.images[0].alt!==`${name} fragrance direction`)throw new Error(`${sku}: image or alt text incorrect`);
  if(!p.description.includes("Fragrance Profile")||!p.description.includes("Suggested Market Direction")||!p.description.includes(top)||!p.description.includes(base))throw new Error(`${sku}: profile content incomplete`);
  if([p.name,p.slug,p.short_description,p.description].some(text=>text.includes(factoryModel)))throw new Error(`${sku}: factory model exposed publicly`);
  output.push({sku,name,permalink:p.permalink,image:p.images[0].src,audit:"passed"});
}
console.log(JSON.stringify({products:output},null,2));
