const Product = require('../models/Product');

module.exports = ($) => {
    const amazonTitle = $('#productTitle').text();
    const amazonPrice = $('#priceblock_ourprice').text();
    const product = new Product(amazonTitle, amazonPrice);
    return product;
}