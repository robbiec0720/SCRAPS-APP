
const getUsers = "Select * from users";

const createUser = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

const checkEmail = "SELECT u from users u WHERE u.email = $1";

const checkUserExistsByUsername = "SELECT * From users WHERE username = $1 AND password = $2";

const checkUserExistsByEmail = "SELECT * From users WHERE email = $1 AND password = $2";

const resetPassword = "UPDATE users SET password = $1 WHERE email = $2 AND password = $3";

const resetEmail = "UPDATE users SET email = $1 WHERE email = $2 AND password = $3";

module.exports = {
  getUsers,
  createUser,
  checkEmail,
  checkUserExistsByUsername,
  checkUserExistsByEmail,
  resetPassword,
  resetEmail,
}
