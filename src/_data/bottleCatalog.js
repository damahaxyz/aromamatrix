'use strict';

const pdfOrder = require('./bottlePdfOrder.json');
const products = require('./bottleProducts.json');

const productsByModel = new Map();
for (const product of products) {
  const matchingProducts = productsByModel.get(product.model) || [];
  matchingProducts.push(product);
  productsByModel.set(product.model, matchingProducts);
}

const items = pdfOrder.map((sku, index) => {
  const matchingProducts = productsByModel.get(sku) || [];
  const product = matchingProducts.shift();

  return product
    ? {
      position: index + 1,
      sku,
      model: product.model,
      image: `assets/images/bottles/${product['产品图片']}`,
      capacity: product.capacity,
      neck: product.neck,
      size: product.size,
      isPlaceholder: false
    }
    : {
      position: index + 1,
      sku,
      model: sku,
      image: null,
      capacity: null,
      neck: null,
      size: null,
      isPlaceholder: true
    };
});

const unmatchedProducts = [...productsByModel.values()].flat();
if (unmatchedProducts.length > 0) {
  throw new Error(`Bottle catalogue contains ${unmatchedProducts.length} product record(s) absent from the PDF order.`);
}

module.exports = {
  items,
  total: items.length,
  placeholderCount: items.filter(item => item.isPlaceholder).length
};
