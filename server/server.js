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

let recipes = []
app.get('/recipes', (req, res) => {
    dbpool
        .query('SELECT * FROM recipes limit 10;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                recipes.push(query_res.rows[i]);
            }
            const data = {recipes};
            //console.log(recipes);
            res.json(data);
        }).catch(err => console.log(err));
});

let filter_recipe = recipes;
app.post('/filter', (req, res) => {
    const{vegan, vegetarian, lactose, gluten, halal, kosher, nut, shellfish, pescatarian} = req.body;
    if(vegan === true){
        filter_recipe = filter_recipe.filter(filter_recipe => filter_recipe.vegan);
    }
    if(vegetarian === true){
        filter_recipe = filter_recipe.filter(filter_recipe => filter_recipe.vegetarian);
    }
    if(lactose === true){
        filter_recipe = filter_recipe.filter(filter_recipe => filter_recipe.lactose);
    }
    if(gluten === true){
        filter_recipe = filter_recipe.filter(filter_recipe => filter_recipe.gluten);
    }
    if(halal === true){
        filter_recipe = filter_recipe.filter(filter_recipe => filter_recipe.halal);
    }
    if(kosher === true){
        filter_recipe = filter_recipe.filter(filter_recipe => filter_recipe.kosher);
    }
    if(nut === true){
        filter_recipe = filter_recipe.filter(filter_recipe => filter_recipe.nut);
    }
    if(shellfish === true){
        filter_recipe = filter_recipe.filter(filter_recipe => filter_recipe.shellfish);
    }
    if(pescatarian === true){
        filter_recipe = filter_recipe.filter(filter_recipe => filter_recipe.pescatarian);
    }
    const data = {filter_recipe};
    console.log(filter_recipe);
    res.json(data);
});