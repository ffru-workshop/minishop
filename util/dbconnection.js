const mysql = require('promise-mysql')
const fs = require('fs')

let connection

function setup () {
  return mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'secret',
    multipleStatements: true
  })
  .then((con) => {
    connection = con
    let schema = fs.readFileSync('./config/database/setup.sql', 'utf8')
    return connection.query(schema)
  })
  .then(() => connection)
}

function query (sql, values) {
  if (!connection) {
    return Promise.reject(new Error('no connection, call setup first'))
  }
  return connection.query(sql, values)
}

module.exports = {
  setup,
  query
}
