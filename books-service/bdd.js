import mysql from 'mysql2'

// create the connection to database
export const connection = mysql.createConnection({
  host: 'db_books',
  // port: '3306',
  user: 'root',
  password: 'root',
  database: 'books-service'
})
