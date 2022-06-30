const pool = require("../db");
const Logger = require("../src/Middlewares/logger");

class ControllerBase {
  #httpGet;
  #httpGetById;
  #httpPost;
  #httpPut;
  #httpDelete;


  constructor(queries) {
    const {
      httpGet,
      httpGetById,
      httpPost,
      httpPut,
      httpDelete
    } = queries;

    this.#httpGet = httpGet;
    this.#httpGetById = httpGetById;
    this.#httpPost = httpPost;
    this.#httpPut = httpPut;
    this.#httpDelete = httpDelete;
  }


  get = async (req, res) => {
    try {
      const data = await pool.query(this.#httpGet);
      res.json(data.rows);
    } catch (error) {
      console.error(error.message);
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await pool.query(this.#httpGetById, [id]);
      if (data.rows.length > 0) {
        res.json(data.rows[0]);
      } else {
        res.status(404);
        res.send('NOT FOUND');
        Logger.log("NOT FOUND");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  add = async (req, res) => {
    try {
      const body = req.body;
      const data = await pool.query(this.#httpPost, [body.name, body.kcal])
    } catch (error) {
      console.error(error.message);
    }
  }
}

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

module.exports = ControllerBase;