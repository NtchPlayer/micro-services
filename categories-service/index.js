import express from  'express'
import bodyParser from 'body-parser'
import { connection } from './bdd.js'
import axios from 'axios'

const app = express()

app.use(bodyParser.json())

app.get('/categories', async (req, res) => {
  connection.query('SELECT * FROM categories', (err, results) => {
    res.json(results)
  })
})

app.get('/categories/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  connection.query(`SELECT * FROM categories WHERE id = ${id}`, async (err, results) => {
    const category = results[0]
    if (category) {
      res.json(category)
    } else {
      res.status(404).json({ error: 'Catégorie non trouvée' })
    }
  })
})

app.post('/categories/add', async (req, res) => {
  connection.query('INSERT INTO categories (name) VALUES(?)', [req.body.name], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Une erreur est survenue.' })
    }
    res.status(201).json({ message: 'Catégorie ajoutée.' })
  })
})

app.put('/categories/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  connection.query(`UPDATE categories SET name = ? WHERE id = ${id}`, [req.body.name], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Une erreur est survenue.' })
    }
    res.status(200).json({ message: 'Catégorie à mise à jour.' })
  })
})

app.delete('/categories/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  connection.query(`DELETE FROM categories WHERE id = ?`, [id], async (error) => {
    if (error) {
      return res.status(500).json({error: 'Une erreur est survenue.'})
    }
    await axios.put(`http://books:3000/books/delete-category/${id}`)
    res.status(200).json({ message: 'Catégorie supprimée.' })
  })
})

app.listen(5000, () => {
  console.log('Microservice de gestion des catégories démarré sur le port 5000')
})
