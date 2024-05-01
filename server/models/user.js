/**
 * @module Models
 * @description Defines user related queries.
 */

/**
 * SQL query to retrieve all users from the database.
 * @type {string}
 */
const getUsers = "Select * from users";

/**
 * SQL query to insert a new user into the database.
 * @type {string}
 */
const createUser = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

/**
 * SQL query to check if an email exists in the database.
 * @type {string}
 */
const checkEmail = "SELECT u from users u WHERE u.email = $1";

/**
 * SQL query to check if a user exists by username and password.
 * @type {string}
 */
const checkUserExistsByUsername = "SELECT * From users WHERE username = $1 AND password = $2";


/**
 * SQL query to check if a user exists by email and password.
 * @type {string}
 */
const checkUserExistsByEmail = "SELECT * From users WHERE email = $1 AND password = $2";

/**
 * SQL query to reset a user's password.
 * @type {string}
 */
const resetPassword = "UPDATE users SET password = $1 WHERE email = $2 AND password = $3";


/**
 * SQL query to reset a user's email address.
 * @type {string}
 */
const resetEmail = "UPDATE users SET email = $1 WHERE email = $2 AND password = $3";

/**
 * SQL query to update a user's dietary restrictions.
 * @type {string}
 */
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
