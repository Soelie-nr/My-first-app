const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/enquete', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB'))
.catch((err) => console.error('Erreur de connexion à MongoDB:', err));

// Création du schéma et modèle pour les réponses du formulaire
const responseSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  question1: String,
  question2: String
});

const Response = mongoose.model('Response', responseSchema);

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Route pour soumettre le formulaire
app.post('/submit', (req, res) => {
  const { firstName, lastName, age, question1, question2 } = req.body;

  const response = new Response({ firstName, lastName, age, question1, question2 });

  response.save()
    .then(() => res.status(201).send('Réponse enregistrée avec succès !'))
    .catch((err) => res.status(500).send('Erreur lors de l\'enregistrement de la réponse'));
});

// Route pour récupérer toutes les réponses
app.get('/responses', (req, res) => {
  Response.find()
    .then((responses) => res.json(responses))
    .catch((err) => res.status(500).send('Erreur lors de la récupération des réponses'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
