const pool = require("../../db");
const bcrypt = require('bcrypt');

const users = require("./users.querries");
const UserModel = require("./user.model");

get = async (req, res) => {
  try {
    const data = await pool.query(users.get);
    if (data === undefined) {
      res.status(404).send('NOT FOUND');
    }

    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
  }
}

add = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log(username);

    // TODO check that email is used
    if (await userExist(username)) {
      res.status(409).send("USER ALREADY EXISTS");
      return;
    };

    const passwordHashed = await bcrypt.hash(password, 10);
    const data = await pool.query(users.add, [username, passwordHashed, email]);
    res.status(200).send("User Created");
  } catch (error) {
    console.error(error.message);
  }
}

getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query(users.getById, [id]);

    let user;
    {
      const { id, username, password, email } = data.rows[0];
      user = new UserModel(id, username, password, email);
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
  }
}

getByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const data = await pool.query(users.getByUsername, [username]);

    let user;
    {
      const { id, username, password, email } = data.rows[0];
      user = new UserModel(id, username, password, email);
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
  }
}

const userExist = async (username) => {
  try {
    const data = await pool.query(users.getByUsername, [username]);
    if (data.rows[0] !== undefined) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}


module.exports = {
  get,
  add,
  getById,
  getByUsername
}