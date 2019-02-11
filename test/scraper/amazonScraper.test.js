const { expect } = require('chai');
const cheerio = require('cheerio');
const Product = require('../../models/Product');
const amazonScraper = require('../../scraper/amazonScraper');

const createProductAndComapre = (html, expectedProduct) => {
  const $ = cheerio.load(html);
  const actualProduct = amazonScraper($);
  expect(actualProduct).to.deep.equal(expectedProduct);
};

describe('amazonScraper tests', () => {
  const itemTitle = 'test';
  const itemPrice = '19.99$';
  const divItemTitle = `<div id="productTitle">${itemTitle}</div>`;
  const divItemPrice = `<div id="priceblock_ourprice">${itemPrice}</div>`;
  it('productTitle && priceblock_ourprice', () => {
    const html = divItemTitle + divItemPrice;
    const expectedProduct = new Product(itemTitle, itemPrice);
    return createProductAndComapre(html, expectedProduct);
  });
  it('productTitle only', () => {
    const html = divItemTitle;
    const expectedProduct = new Product(itemTitle, '');
    return createProductAndComapre(html, expectedProduct);
  });
  it('priceblock_ourprice only', () => {
    const html = divItemPrice;
    const expectedProduct = new Product('', itemPrice);
    return createProductAndComapre(html, expectedProduct);
  });
  it('no productTitle or priceblock_ourprice', () => {
    const html = '';
    const expectedProduct = new Product('', '');
    return createProductAndComapre(html, expectedProduct);
  });
});
