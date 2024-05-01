const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

dotenv.config({path: '../.env'});

/**
 * @module server
 * @description Entry point of SCRAPS application
 */


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("",(req, res) => {
    res.status(200).json({
        success: true,
        message: "home page",
    });
});

/**
 * GET request handler for the home page.
 * @name GET /
 * @function
 * @memberof module:server
 * @inner
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 */
app.use('/api/v1/user', userRoutes);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Server Running on localhost:${PORT}`);
});
