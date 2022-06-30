const express = require("express");
const app = express();
const cors = require("cors");
const { parse } = require("pg-protocol");
const types = require("pg").types;
const logger = require("./src/Middlewares/logger");
const productsRoutes = require('./src/Products/products.routes');
const usersRoutes = require("./src/Users/users.routes");




// middleware

app.use(cors());
app.use(express.json());


// PG types

types.setTypeParser(types.builtins.NUMERIC, value =>
    value === null ? null : parseFloat(value)
);


app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', usersRoutes);

const port = 5000;
app.listen(port, () => {
    console.log("Server is running on port",
        [port]
    );
})

