const fragrances = require('./fragrances');

module.exports = [...new Set(fragrances.map(product => product.category))]
  .sort((a, b) => a.localeCompare(b))
  .map(name => ({ name }));
