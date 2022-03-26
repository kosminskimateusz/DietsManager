const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { parse } = require("pg-protocol");
const types = require("pg").types;



// middleware

app.use(cors());
app.use(express.json());

// PG types

types.setTypeParser(types.builtins.NUMERIC, value =>
    value === null ? null : parseFloat(value)
);

// ROUTES

// create product

app.post("/products", async (req, res) => {
    try {
        const { product_name, product_kcal } = req.body;
        const newProduct = await pool.query("INSERT INTO products (product_name, product_kcal) VALUES($1,$2) RETURNING *",
            [product_name, product_kcal]
        );
        res.json(newProduct.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
})

// get products

app.get("/products", async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM products");
        res.json(products.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// get product by id

app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]);
        if (product.rows.length > 0) {
            res.json(product.rows[0]);
        } else {
            console.log(product);
            res.status(404);
            res.send('Not found');
        }
    } catch (error) {
        console.error(error.message);
    }
})

// update product

app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, product_kcal } = req.body;

        if (await checkProductExists(id)) {
            const productUpdated = await pool.query(`UPDATE products SET product_name = '${product_name}', product_kcal = ${product_kcal} WHERE product_id = ${id} RETURNING *`);

            res.json(productUpdated.rows[0]);
        } else {
            res.status(404);
            res.send("Not found");
        }
    } catch (error) {
        console.error(error.message);
    }


})

// delete product

app.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (await checkProductExists(id)) {
            const deleteProduct = await pool.query(`DELETE FROM products WHERE product_id = ${id}`);
            res.json(deleteProduct.rows[0]);
        } else {
            res.status(404);
            res.send('Not found');
        }
    } catch (error) {
        console.error(error.message);
    }
})

const port = 5000;
app.listen(port, () => {
    console.log("Server is running on port",
        [port]
    );
})

async function checkProductExists(id) {
    const product = await pool.query(`SELECT * FROM products WHERE product_id = ${id}`);
    return product.rows[0] !== undefined ? true : false;
}