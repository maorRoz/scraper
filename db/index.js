const dbConnection = { save: () => undefined, get: () => undefined };

const saveProduct = (product) => {
  dbConnection.save(product);
  console.log('fuck');
};

const getProduct = title => dbConnection.get(title);

module.exports = {
  saveProduct,
  getProduct
};
