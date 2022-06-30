class UsersQuerries {
  static get = "SELECT * FROM users ORDER BY id;";
  static getById = "SELECT * FROM users WHERE id = $1;";
  static getByUsername = "SELECT * FROM users WHERE username = $1;";
  static add = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3);";
  static update = "UPDATE users SET username = $2, password = $3, email = $4 WHERE id = $1;";
  static delete = "DELETE FROM users WHERE id = $1;";
}

module.exports = UsersQuerries;