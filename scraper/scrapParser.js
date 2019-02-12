const Product = require('../models/Product');

const parse = ($, properties = [], upload) => {
  const itemData = {};
  properties.forEach((property) => {
    const { field, id } = property;
    itemData[field] = $(id).text();
  });

  const product = new Product(itemData);
  return upload(product);
};

module.exports = {
  parse
};
