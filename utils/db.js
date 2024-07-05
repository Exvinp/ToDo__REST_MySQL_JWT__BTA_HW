const mysql = require('mysql2')

const pool = mysql.createPool({
  host: `${process.env.SQL_HOST}`,
  user: `${process.env.SQL_USERNAME}`,
  database: `${process.env.SQL_DEFAULT_DATABASE}`,
  password: `${process.env.SQL_USER_PASSWORD}`,
})

module.exports = pool.promise()
