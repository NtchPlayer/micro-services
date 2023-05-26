import express from  'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import { connection } from './bdd.js'

const app = express()

app.use(bodyParser.json())

let books = [
  {
    id: 1,
    title: 'Livre 1',
    authorId: 1,
    categoryId: 1
  },
  {
    id: 2,
    title: 'Livre 2',
    authorId: 2,
    categoryId: 2
  }
]

app.get('/books', async (req, res) => {
  connection.query('SELECT * FROM books', (err, results) => {
    res.json(results)
  })
})

app.get('/books/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  connection.query(`SELECT * FROM books WHERE id = ${id}`, async (err, results) => {
    const book = results[0]
    if (book) {
      const authorResponse = await axios.get(`http://localhost:4000/authors/${book.authorId}`)
      const categoryResponse = await axios.get(`http://localhost:5000/categories/${book.categoryId}`)

      const author = authorResponse.data
      const category = categoryResponse.data

      const bookDetails = {
        id: book.id,
        title: book.title,
        author: author.name,
        category: category.name
      }

      res.json(bookDetails)
    } else {
      res.status(404).json({ error: 'Livre non trouvé' })
    }
  })
})

app.post('/books/add', async (req, res) => {
  connection.query('INSERT INTO books (title, authorId, categoryId) VALUES(?,?,?)', [req.body.title, req.body.authorId, req.body.categoryId], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Une erreur est survenue.' })
    }
    res.status(201).json({ error: 'Livre ajouté.' })
  })
})

app.put('/books/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  connection.query(`UPDATE books SET title = ?, authorId = ?, categoryId = ? WHERE id = ${id}`, [req.body.title, req.body.authorId, req.body.categoryId], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Une erreur est survenue.' })
    }
    res.status(200).json({ error: 'Livre à mis à jour.' })
  })
})

app.listen(3000, () => {
  console.log('Microservice de gestion des livres démarré sur le port 3000')
})
