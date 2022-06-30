const users = require("./../Users/users.querries");
const bcrypt = require('bcrypt')
const pool = require("../../db");

const auth = async (req, res, next) => {
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  const userFromDB = await getUser(username);

  // TODO username or email as login
  if (userFromDB === undefined) {
    res.status(401).send('Unauthorized');
    return;
  }
  const compare = await bcrypt.compare(password, userFromDB.password);
  if (!compare) {
    res.status(401).send('Unauthorized');
    return;
  }
  next();
}

const getUser = async (username) => {
  const data = await pool.query(users.getByUsername, [username]);
  if (data.rows[0] === undefined) {
    return
  }
  const user = data.rows[0];
  return user;
}
module.exports = auth;
