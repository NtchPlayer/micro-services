import express from  'express'
import bodyParser from 'body-parser'
import { connection } from './bdd.js'

const app = express()

app.use(bodyParser.json())

app.get('/authors', async (req, res) => {
  connection.query('SELECT * FROM authors', (err, results) => {
    res.json(results)
  })
})

app.get('/authors/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  connection.query(`SELECT * FROM authors WHERE id = ${id}`, async (err, results) => {
    const author = results[0]
    if (author) {
      res.json(author)
    } else {
      res.status(404).json({ error: 'Auteur non trouvé' })
    }
  })
})

app.post('/authors/add', async (req, res) => {
  connection.query('INSERT INTO authors (name) VALUES(?)', [req.body.name], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Une erreur est survenue.' })
    }
    res.status(201).json({ error: 'Auteur ajouté.' })
  })
})

app.put('/authors/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  connection.query(`UPDATE authors SET name = ? WHERE id = ${id}`, [req.body.name], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Une erreur est survenue.' })
    }
    res.status(200).json({ error: 'Auteur à mis à jour.' })
  })
})

app.delete('/authors/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  connection.query(`DELETE FROM authors WHERE id = ${id}`, (error) => {
    if (error) {
      return res.status(500).json({ error: 'Une erreur est survenue.' })
    }
    res.status(200).json({ error: 'Auteur supprimer.' })
  })
})

app.listen(4000, () => {
  console.log('Microservice de gestion des auteurs démarré sur le port 4000')
})
