require('dotenv').config();
const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    database: "diets"
});

module.exports = pool;

// user: "postgres",
//     password: "postgres",
//         host: "localhost",