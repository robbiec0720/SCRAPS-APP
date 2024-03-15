const { Pool } = require('pg');

const pool = new Pool({
    host: 'scraps.c54s8oiyq7zw.us-east-2.rds.amazonaws.com',
    port: 5432,
    database: 'scraps',
    user: 'squirtle',
    password: 'capstone24',
    ssl: {rejectUnauthorized: false}
});


module.exports = pool;