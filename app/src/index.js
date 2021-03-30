const express = require('express')
const app = express()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'db',
  user: 'toor',
  password: 'toor',
  database: 'nodedb'
})

const sqlCreateTable = 'CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY (id));'
connection.query(sqlCreateTable)

app.get("/",(req, res) => {
  const sqlInsert = `INSERT INTO people (name) values ('${'john ' + Math.random()}');`
  connection.query(sqlInsert)

  const sqlSelect = `SELECT * FROM people;`
  connection.query(sqlSelect, function (error, results, fields) {
  const data = results.map((data) => `<li>${data.name}</li>`)
  res.send(`<h1>Full Cycle Rocks!</h1><ul>${data.join("")}</ul>`)
  })
})

app.listen(3000, () => { console.log('Up and Running...') })
