const { expect } = require('chai');
const sinon = require('sinon');
const cheerio = require('cheerio');
const Product = require('../../models/Product');
const scrapParser = require('../../scraper/scrapParser');

const createProductAndCompare = (html, properties, expectedProduct) => {
  const upload = sinon.spy();
  const $ = cheerio.load(html);
  scrapParser.parse($, properties, upload);
  expect(upload.calledWith(expectedProduct)).to.equal(true);
};

const createAmazonProductAndComapre = (html, expectedProduct) => {
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
  return createProductAndCompare(html, properties, expectedProduct);
};

const createEbayProductAndComapre = (html, expectedProduct) => {
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
  return createProductAndCompare(html, properties, expectedProduct);
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

    return createProductAndCompare(html, [], new Product({}));
  });
});
