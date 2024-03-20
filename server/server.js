const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const {Pool} = require('pg');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.get('',(req,res) => {
    res.status(200).json({
        successs:true,
        message:'Home Page'
    })
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Server Running on localhost:${PORT}`);
});

const dbpool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});


app.get('/recipes', (req, res) => {
    let recipes = []
    //const {username} = req.body;
    username = 'bob';
    Promise.all([
        dbpool.query('SELECT * FROM recipes LIMIT 10;'),
        dbpool.query('SELECT * FROM users WHERE username = $1::text;', [username])
    ]).then(([recipesResult, usersResult]) => {
        for (let i = 0; i < recipesResult.rowCount; i++) {
            recipes.push(recipesResult.rows[i]);
        }
        let user = usersResult.rows;

        if (user.length === 0) {
            res.status(401).send("Invalid username.");
            return;
        }
        
        user = user[0];

        if(user.vegan === true){
            recipes = recipes.filter(recipes => recipes.vegan);
        }
        if(user.vegetarian === true){
            recipes = recipes.filter(recipes => recipes.vegetarian);
        }
        if(user.lactose === true){
            recipes = recipes.filter(recipes => recipes.lactose);
        }
        if(user.gluten === true){
            recipes = recipes.filter(recipes => recipes.gluten);
        }
        if(user.halal === true){
            recipes = recipes.filter(recipes => recipes.halal);
        }
        if(user.kosher === true){
            recipes = recipes.filter(recipes => recipes.kosher);
        }
        if(user.nut === true){
            recipes = recipes.filter(recipes => recipes.nut);
        }
        if(user.shellfish === true){
            recipes = recipes.filter(recipes => recipes.shellfish);
        }
        if(user.pescatarian === true){
            recipes = recipes.filter(recipes => recipes.pescatarian);
        }
        
        const data = {recipes};
        res.json(data);
    }).catch(err => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    });
});
