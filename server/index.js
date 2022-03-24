const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware

app.use(cors());
app.use(express.json());

// ROUTES

// create product

app.post("/products", async(req, res) => {
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

app.get("/products", async(req, res) => {
    try {
        const products = await pool.query("SELECT * FROM products");
        res.json(products.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// get product by id

app.get("/products/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]);

        res.json(product.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

// update product

app.put("products", async(req,res) => {
    console.log("ok");
        
    
})

// delete product

const port = 5000;
app.listen(5000, () => {
    console.log("Server is running on port",
    [port]
    );
})