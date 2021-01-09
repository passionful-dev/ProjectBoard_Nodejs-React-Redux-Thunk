const mysql = require("mysql2/promise")

const pool = mysql.createPool({
  user: "root",
  password: "12345",
  host: "localhost",
  port: 3306,
  database: "projectBoard_Backend"
})

module.exports = pool