
const db = require('../config/db');
const user = require('../models/user');

const getUsers = (req, res) => {
  db.query(user.getUsers, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const {username, email, password } = req.body;

  if (!username){
    return res.status(400).send({
      success:false,
      message: "username required"
    })
  }
  if (!email){
    return res.status(400).send({
      success:false,
      message: "email required"
    })
  }
  if (!password){
    return res.status(400).send({
      success:false,
      message: "password required"
    })
  }

  db.query(user.checkEmail, [email], (err, results)=> {
    if (results.rows.length) {
      return res.status(500).send({
        success:false,
        message:'email already exists'
      })
    }
    
    db.query(user.createUser, [username, email, password], (err, results) => {
      if (err) throw err;
      return res.status(201).send({
        success:true,
        message:'account created successfully'
      });
    })

  });
};


const userLogin = (req, res) => {
   const {username, password} = req.body;
   if (!username || !password){
    return res.status(500).send({
      success:false,
      message: 'Please provide username or password'
    });
   };

   db.query(user.checkUserExists, [username, password], (err, results) => {
    if (err) throw err;

    const count = parseInt(results.rows[0].count);
    if (results.rows[0] != "null") {
       return res.status(201).send({
        success:true,
        message:'login successful',
        user: { 
          id: results.rows[0].id,
          username: results.rows[0].username,
          email: results.rows[0].email,
          vegeterian: results.rows[0].vegeterian,
          vegan: results.rows[0].vegan,
          halal: results.rows[0].halal,
          kosher: results.rows[0].kosher,
          lactose: results.rows[0].lactose,
          gluten: results.rows[0].gluten,
          nut: results.rows[0].nut,
          shellfish: results.rows[0].shellfish,
          pescatarian: results.rows[0].pescatarian,
          saved_ingredients: results.rows[0].saved_ingredients,
        }
      });
    };
    
    return res.status(404).send({
      success:false,
      message:'login unsuccessful'
    })

  });
};


module.exports = {
  getUsers,
  createUser,
  userLogin,
};