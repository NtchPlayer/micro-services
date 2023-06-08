import mysql from 'mysql2'

// create the connection to database
export const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'authors-service'
})
