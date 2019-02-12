const Product = require('../models/Product');

const parse = ($, properties = []) => {
  const itemData = {};
  properties.forEach((property) => {
    const { field, id } = property;
    itemData[field] = $(id).text();
  });
  return new Product(itemData);
};

module.exports = {
  parse
};
