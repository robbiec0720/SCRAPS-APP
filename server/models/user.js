
const getUsers = "Select * from users";

const createUser = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

const checkEmail = "SELECT u from users u WHERE u.email = $1";

const checkUserExistsByUsername = "SELECT * From users WHERE username = $1 AND password = $2";

const checkUserExistsByEmail = "SELECT * From users WHERE email = $1 AND password = $2";

const resetPassword = "UPDATE users SET password = $1 WHERE email = $2 AND password = $3";

const resetEmail = "UPDATE users SET email = $1 WHERE email = $2 AND password = $3";

const updateDietaryRestrictions = `
    UPDATE users
    SET vegetarian = $1,
        vegan = $2,
        halal = $3,
        kosher = $4,
        lactose = $5,
        gluten = $6,
        nut = $7,
        shellfish = $8,
        pescatarian = $9
    WHERE id = $10;
`;

module.exports = {
  getUsers,
  createUser,
  checkEmail,
  checkUserExistsByUsername,
  checkUserExistsByEmail,
  resetPassword,
  resetEmail,
  updateDietaryRestrictions,
}
