const { Pool } = require('pg');
require('dotenv').config()

const devConfig = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
}

const proConfig = {
    connectionStrong: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig)

module.exports = pool;