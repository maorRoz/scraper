const { expect } = require('chai');
const cheerio = require('cheerio');
const Product = require('../../models/Product');
const scrapParser = require('../../scraper/scrapParser');

const createAmazonProductAndComapre = (html, expectedProduct) => {
  const $ = cheerio.load(html);
  const properties = [
    {
      field: 'title',
      id: '#productTitle'
    },
    {
      field: 'price',
      id: '#priceblock_ourprice'
    }
  ];
  const actualProduct = scrapParser.parse($, properties);
  expect(actualProduct).to.deep.equal(expectedProduct);
};

const createEbayProductAndComapre = (html, expectedProduct) => {
  const $ = cheerio.load(html);
  const properties = [
    {
      field: 'title',
      id: '#itemTitle'
    },
    {
      field: 'price',
      id: '#prcIsum'
    }
  ];
  const actualProduct = scrapParser.parse($, properties);
  expect(actualProduct).to.deep.equal(expectedProduct);
};
describe('scrapParser tests', () => {
  const itemTitle = 'test';
  const itemPrice = '19.99$';

  describe('amazon', () => {
    const divItemTitle = `<div id="productTitle">${itemTitle}</div>`;
    const divItemPrice = `<div id="priceblock_ourprice">${itemPrice}</div>`;
    it('productTitle && priceblock_ourprice', () => {
      const html = divItemTitle + divItemPrice;
      const expectedProduct = new Product({ title: itemTitle, price: itemPrice });
      return createAmazonProductAndComapre(html, expectedProduct);
    });
    it('productTitle only', () => {
      const html = divItemTitle;
      const expectedProduct = new Product({ title: itemTitle });
      return createAmazonProductAndComapre(html, expectedProduct);
    });
    it('priceblock_ourprice only', () => {
      const html = divItemPrice;
      const expectedProduct = new Product({ price: itemPrice });
      return createAmazonProductAndComapre(html, expectedProduct);
    });
    it('no productTitle or priceblock_ourprice', () => {
      const html = '';
      const expectedProduct = new Product({});
      return createAmazonProductAndComapre(html, expectedProduct);
    });
  });

  describe('ebay', () => {
    const divItemTitle = `<div id="itemTitle">${itemTitle}</div>`;
    const divItemPrice = `<div id="prcIsum">${itemPrice}</div>`;
    it('itemTitle && prcIsum', () => {
      const html = divItemTitle + divItemPrice;
      const expectedProduct = new Product({ title: itemTitle, price: itemPrice });
      return createEbayProductAndComapre(html, expectedProduct);
    });
    it('itemTitle only', () => {
      const html = divItemTitle;
      const expectedProduct = new Product({ title: itemTitle });
      return createEbayProductAndComapre(html, expectedProduct);
    });
    it('prcIsum only', () => {
      const html = divItemPrice;
      const expectedProduct = new Product({ price: itemPrice });
      return createEbayProductAndComapre(html, expectedProduct);
    });
    it('no itemTitle or prcIsum', () => {
      const html = '';
      const expectedProduct = new Product({});
      return createEbayProductAndComapre(html, expectedProduct);
    });
  });

  it('no properties', () => {
    const divItemTitle = `<div id="productTitle">${itemTitle}</div>`;
    const divItemPrice = `<div id="priceblock_ourprice">${itemPrice}</div>`;
    const html = divItemTitle + divItemPrice;

    const $ = cheerio.load(html);
    const actualProduct = scrapParser.parse($);
    expect(actualProduct).to.deep.equal(new Product({}));
  });
});
