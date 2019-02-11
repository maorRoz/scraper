The main component of the project is the scraper, which is built with 2 logic of web scraping: scarping of amazon webpage and eBay webpage. 
The reason for the separation between those 2 modules is to allow more logic to be added to it later on. they might seem very similar right now, but it might change in the future - a thing which justifies the separation.
I've also added the fetcher module to separate the downloading process from the rest of the logic(seems like two different actions which require a separation). 
the scraper, which is actually the index.js file in scraper folder, use all of those sub-modules inside of it, to enable the concurrent web scraping and saves the results to the DB.

I've decided to create a 'Product' class to enable modularity for the items which is saved to the DB. And also since its the main data object with no logic behind it.

I've decided to 'mock' the DB with a single module file(db/index.js) which basically support two simple methods - save product and get a product by title. I think that this mock can be easily replaced by a real working DB pointer / ORM framework. 

I've added tests for the scraper library, which seem the only thing which really worth testing in this project(the Product is just a data object and the DB is actually a mock of the real thing already). 

How to run it :

you can simply use 'yarn start/npm run start' command, which downloads and scrap the data from an Amazon product page and eBay product page concurrently. If you want to edit the URLs which were scrapped, simply modify the 'urls' array inside ./index.js file.

you can also use 'yarn test/ npm run test' and 'yarn coverage/ npm run coverage' in order to view the tests results and tests coverage of the project. 
