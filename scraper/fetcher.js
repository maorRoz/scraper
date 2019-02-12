const axios = require('axios');
const cheerio = require('cheerio');

const fetch = async (url, parse) => {
  let $;
  try {
    const { data } = await axios.get(url);
    $ = cheerio.load(data);
  } catch(e){
    // eslint-disable-next-line no-console
    console.log(`cannot download data from url : ${url}`);
  }
  return $ ? parse(url, $) : undefined;
};

module.exports = { fetch };
