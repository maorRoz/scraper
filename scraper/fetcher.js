const axios = require('axios');
const $ = require('cheerio');

const getPrices = (html) => {
    const amazonPrices = $('#priceblock_ourprice', html);
    const ebayPrices = $('#prcIsum', html);
    console.log(amazonPrices);
}

const fetch = async (url) => {
    const { data } = await axios.get(url);
    getPrices(data);
    //return data;
}

module.exports = { fetch };