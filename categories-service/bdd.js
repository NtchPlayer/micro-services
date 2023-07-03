import mysql from 'mysql2'

// create the connection to database
export const connection = mysql.createConnection({
  host: 'db_categories',
  // port: '3306',
  user: 'root',
  password: 'root',
  database: 'categories-service'
})
