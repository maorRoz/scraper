const dbConnection = { save: () => undefined, get: () => undefined };

const saveProduct = (product) => {
  dbConnection.save(product);
};

const getProduct = title => dbConnection.get(title);

module.exports = {
  saveProduct,
  getProduct
};
