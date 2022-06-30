class ProductsQuerries {
  static get = "SELECT * FROM products ORDER BY id;";
  static getById = "SELECT * FROM products WHERE id = $1;";
  static add = "INSERT INTO products (name, kcal) VALUES($1,$2) RETURNING *";
  static update = "UPDATE products SET name = $2, kcal = $3 WHERE id = $1 RETURNING *";
  static delete = "DELETE FROM products WHERE id = $1";

  static logs = {
    getLog: "GET Products",
    getByIdLog: "GET Product by id",
    postLog: "POST Products",
    putLog: "PUT into Product with id: ",
    deleteLog: "DELETE Product with id: "
  }

}

// module.exports = {
//   httpGet: getProducts,
//   httpGetById: getProductById,
//   // httpPost: addProduct,
//   // httpPut: updateProduct,
//   // httpDelete: deleteProduct
// };

module.exports = ProductsQuerries;

