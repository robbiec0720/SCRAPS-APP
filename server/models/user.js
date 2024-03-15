
const getUsers = "Select * from users";

const createUser = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

const checkEmail = "SELECT u from users u WHERE u.email = $1";

const checkUserExists = "SELECT * From users WHERE username = $1 AND password = $2";

module.exports = {
  getUsers,
  createUser,
  checkEmail,
  checkUserExists,
}
