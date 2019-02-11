const { expect } = require('chai');
const cheerio = require('cheerio');
const Product = require('../../models/Product');
const ebayScraper = require('../../scraper/ebayScraper');

const createProductAndComapre = (html, expectedProduct) => {
  const $ = cheerio.load(html);
  const actualProduct = ebayScraper($);
  expect(actualProduct).to.deep.equal(expectedProduct);
};

describe('ebayScraper tests', () => {
  const itemTitle = 'test';
  const itemPrice = '19.99$';
  const divItemTitle = `<div id="itemTitle">${itemTitle}</div>`;
  const divItemPrice = `<div id="prcIsum">${itemPrice}</div>`;
  it('itemTitle && prcIsum', () => {
    const html = divItemTitle + divItemPrice;
    const expectedProduct = new Product(itemTitle, itemPrice);
    return createProductAndComapre(html, expectedProduct);
  });
  it('itemTitle only', () => {
    const html = divItemTitle;
    const expectedProduct = new Product(itemTitle, '');
    return createProductAndComapre(html, expectedProduct);
  });
  it('prcIsum only', () => {
    const html = divItemPrice;
    const expectedProduct = new Product('', itemPrice);
    return createProductAndComapre(html, expectedProduct);
  });
  it('no itemTitle or prcIsum', () => {
    const html = '';
    const expectedProduct = new Product('', '');
    return createProductAndComapre(html, expectedProduct);
  });
});
