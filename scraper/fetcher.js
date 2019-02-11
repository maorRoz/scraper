const axios = require('axios');

const fetch = async (url) => {
  let fetchedData;
  try {
    const { data } = await axios.get(url);
    fetchedData = data;
  } catch(e){
    // eslint-disable-next-line no-console
    console.log(`cannot download data from url : ${url}`);
  }
  return fetchedData;
};

module.exports = { fetch };
