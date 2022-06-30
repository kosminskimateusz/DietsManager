class User {
  id;
  username;
  #password;
  email;


  constructor(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.#password = password;
    this.email = email;
  }

  getPassword = () => {
    return this.#password;
  }
}

module.exports = User;