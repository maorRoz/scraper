const fetcher = require('./fetcher.js');

const doSomething = url => fetcher.fetch(url);

module.exports = {
    doSomething
}