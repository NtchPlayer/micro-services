import mysql from 'mysql2'

// create the connection to database
export const connection = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'categories-service'
})
