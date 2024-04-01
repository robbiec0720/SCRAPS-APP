
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

   db.query(user.checkUserExistsByUsername, [username, password], (err, results) => {
    if (err) throw err;

    //const count = parseInt(results.rows[0].count);
    if (results.rows.length != 0) {
       return res.status(201).send({
        success:true,
        message:'login successful',
        user: { 
          id: results.rows[0].id,
          username: results.rows[0].username,
          email: results.rows[0].email,
          vegetarian: results.rows[0].vegetarian,
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

const resetPassword = (req, res) => {
  const {oldPassword, email, newPassword} = req.body;
  if (!oldPassword || !email || !newPassword){
    return res.status(500).send({
      success:false,
      message: 'Please provide username or password'
    });
   };

  db.query(user.checkUserExistsByEmail, [email,oldPassword], (err, results) => {
    if (results.rows.length == 0) {
      return res.status(500).send({
        success:false,
        message:'user does not exist'
      });
    }
    db.query(user.resetPassword, [newPassword, email, oldPassword], (err, results) => {
      return res.status(201).send({
        success:true,
        message:'password reset successfully'
      })
    });
  }); 
};

const resetEmail = (req, res) => {
  const {oldEmail, newEmail, password} = req.body;

  if (!oldEmail || !newEmail || !password){
    return res.status(500).send({
      success:false,
      message: 'Please provide username or password'
    });
   };

  db.query(user.checkUserExistsByEmail, [oldEmail,password], (err, results) => {
    if (results.rows.length == 0) {
      return res.status(500).send({
        success:false,
        message:'user does not exist'
      });
    }
    db.query(user.resetEmail, [newEmail,oldEmail, password], (err, results) => {
      return res.status(201).send({
        success:true,
        message:'email reset successfully'
      })
    });
  }); 
};


module.exports = {
  getUsers,
  createUser,
  userLogin,
  resetPassword,
  resetEmail,
};