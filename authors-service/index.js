import express from  'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()

app.use(bodyParser.json())

let authors = [
  {
    id: 1,
    name: 'Arthur Rimbaud'
  },
  {
    id: 2,
    name: 'Riad Sattouf'
  }
]


app.get('/authors', async (req, res) => {
  res.json(authors)
})

app.get('/authors/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const author = authors.find(author => author.id === id)

  if (author) {
    res.json(author)
  } else {
    res.status(404).json({ error: 'Auteur non trouvé' })
  }
})

app.listen(4000, () => {
  console.log('Microservice de gestion des auteurs démarré sur le port 4000')
})
