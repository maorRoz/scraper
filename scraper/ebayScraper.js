const Product = require('../models/Product');

module.exports = ($) => {
    const ebayTitle = $('#itemTitle').text();
    const ebayPrice = $('#prcIsum').text();
    const product = new Product(ebayTitle, ebayPrice);
    return product;
}