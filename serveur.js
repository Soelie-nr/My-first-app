require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3019; // Permet d'utiliser un port dynamique si nécessaire

const app = express();

// Vérifiez si MONGO_URI est bien défini
if (!process.env.MONGO_URI) {
  console.error("Erreur : La variable d'environnement MONGO_URI n'est pas définie.");
  process.exit(1); // Arrête l'exécution si MONGO_URI est manquant
}

// Middleware pour analyser les données JSON
app.use(express.json());

// Rendre tout le dossier 'public' accessible
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB en utilisant la variable d'environnement
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(err => {
    console.error("Erreur de connexion à MongoDB :", err);
    process.exit(1); // Arrête le serveur en cas d'erreur de connexion
  });

// Définition du modèle de satisfaction
const satisfactionSchema = new mongoose.Schema({
  prenom: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
  },
  alt: {
    type: Number,
    min: 0,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  question1: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  question2: {
    type: String,
    maxlength: 500,
    required: true,
  },
  question3: {
    type: String,
    maxlength: 500,
    required: true,
  },
  question4: {
    type: String,
    maxlength: 500,
    required: true,
  },
  question5: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  question6: {
    type: String,
    maxlength: 500,
    required: true,
  },
  question7: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
});

// Création du modèle Mongoose
const Satisfaction = mongoose.model('Satisfaction', satisfactionSchema);

// Route pour la page d'accueil (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Sert la page d'accueil
});

// Route pour recevoir les données du formulaire
app.post('/submit-satisfaction', async (req, res) => {
  try {
    const satisfactionData = req.body;

    // Validation des données
    const newSatisfaction = new Satisfaction(satisfactionData);

    await newSatisfaction.save();
    res.status(200).send('Formulaire soumis avec succès !');
  } catch (err) {
    console.error("Erreur lors de l'enregistrement du formulaire :", err);
    res.status(500).send('Erreur lors de l\'enregistrement du formulaire : ' + err.message);
  }
});

// Activer le mode debug pour Mongoose
mongoose.set('debug', true);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
