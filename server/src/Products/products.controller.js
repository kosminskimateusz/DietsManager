const pool = require('../../db');
const products = require('./products.querries');


get = async (req, res) => {
  try {
    const data = await pool.query(products.get);
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
  }
}

getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query(products.getById, [id]);
    if (data.rows.length > 0) {
      res.json(data.rows[0]);
    } else {
      res.status(404).send('NOT FOUND');
    }
  } catch (error) {
    console.error(error.message);
  }
}

add = async (req, res) => {
  try {
    const { name, kcal } = req.body;
    const data = await pool.query(products.add, [name, kcal]);
    res.status(200).send();
  } catch (error) {
    console.error(error.message);
  }
}


update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, kcal } = req.body;

    if (!await checkProductExists(id)) {
      res.status(404);
      res.send("NOT FOUND");
    }
    const productUpdated = await pool.query(products.update, [id, name, kcal]);
    res.status(200).json(productUpdated.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
};

remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!await checkProductExists(id))
      res.status(404).send('NOT FOUND');

    const deleteProduct = await pool.query(products.delete, [id]);
    res.status(200).send();
  } catch (error) {
    console.error(error.message);
  }
}

async function checkProductExists(id) {
  const product = await pool.query(products.getById, [id]);
  return product.rows[0] !== undefined ? true : false;
}

module.exports = {
  get,
  getById,
  add,
  update,
  remove
}