import express from  'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()

app.use(bodyParser.json())

let categories = [
  {
    id: 1,
    name: 'Poème'
  },
  {
    id: 2,
    name: 'Bande dessiné'
  }
]


app.get('/categories', async (req, res) => {
  res.json(categories)
})

app.get('/categories/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const category = categories.find(category => category.id === id)

  if (category) {
    res.json(category)
  } else {
    res.status(404).json({ error: 'Catégorie non trouvé' })
  }
})

app.listen(5000, () => {
  console.log('Microservice de gestion des catégories démarré sur le port 5000')
})
