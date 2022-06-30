// const pool = require('../db');
// const queries = require('../querries/productsQuerries');
// const logger = require('../logger');


// class ProductsController extends ControllerBase {

//   getRequest = async (req, res) => {
//     try {
//       const products = await pool.query(queries.getProducts);
//       logger.addLog("GET PRODUCTS");
//       res.json(products.rows);
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   getByIdRequest = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const product = await pool.query(queries.getProductById, [id]);
//       if (product.rows.length > 0) {
//         res.json(product.rows[0]);
//       } else {
//         console.log(product);
//         res.status(404);
//         res.send('NOT FOUND');
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
// }

// module.exports = new ProductsController();


// create product

// app.post("/products", async (req, res) => {
//   try {
//     const { name, kcal } = req.body;
//     const newProduct = await pool.query("INSERT INTO products (name, kcal) VALUES($1,$2) RETURNING *",
//       [name, kcal]
//     );
//     res.json(newProduct.rows[0]);

//   } catch (error) {
//     console.error(error.message);
//   }
// })

// // get products

// app.get("/products", async (req, res) => {
//   try {
//     const products = await pool.query("SELECT * FROM products ORDER BY id");
//     logger.addLog("GET PRODUCTS");
//     res.json(products.rows);
//   } catch (error) {
//     console.error(error.message);
//   }
// })

// // get product by id

// app.get("/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
//     if (product.rows.length > 0) {
//       res.json(product.rows[0]);
//     } else {
//       console.log(product);
//       res.status(404);
//       res.send('NOT FOUND');
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// })

// // update product

// app.put("/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, kcal } = req.body;

//     if (await checkProductExists(id)) {
//       const productUpdated = await pool.query(`UPDATE products SET name = '${name}', kcal = ${kcal} WHERE id = ${id} RETURNING *`);

//       res.json(productUpdated.rows[0]);
//     } else {
//       res.status(404);
//       res.send("NOT FOUND");
//     }
//   } catch (error) {
//     console.error(error.message);
//   }


// })

// // delete product

// app.delete("/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (await checkProductExists(id)) {
//       const deleteProduct = await pool.query(`DELETE FROM products WHERE id = ${id} RETURNING *`);
//       res.json(deleteProduct.rows[0]);
//     } else {
//       res.status(404);
//       res.send('NOT FOUND');
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// })

// async function checkProductExists(id) {
//   const product = await pool.query(`SELECT * FROM products WHERE id = ${id}`);
//   return product.rows[0] !== undefined ? true : false;
// }