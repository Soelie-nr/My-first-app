require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3019; // Permet d'utiliser un port dynamique si nécessaire

const app = express();

// Vérification de la connexion MongoDB
if (!process.env.MONGO_URI) {
  console.error("❌ Erreur : La variable d'environnement MONGO_URI n'est pas définie.");
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Gestion du favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Route de la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB avec succès"))
  .catch(err => {
    console.error("❌ Erreur de connexion MongoDB:", err);
    process.exit(1);
  });


// Définition du modèle de satisfaction
const satisfactionSchema = new mongoose.Schema({
  prenom: { type: String, required: true },
  nom: { type: String },
  alt: { type: Number, min: 0, required: true },
  date: { type: Date, required: true },
  question1: { type: String, enum: ['Yes', 'No'], required: true },
  question2: { type: String, maxlength: 500, required: true },
  question3: { type: String, maxlength: 500, required: true },
  question4: { type: String, maxlength: 500, required: true },
  question5: { type: Number, min: 0, max: 10, required: true },
  question6: { type: String, maxlength: 500, required: true },
  question7: { type: Number, min: 0, max: 10, required: true },
});

const Satisfaction = mongoose.model('Satisfaction', satisfactionSchema);

/// Route pour soumettre un formulaire
app.post('/submit-Eve', async (req, res) => {
    try {
      const surveyData = new EveSurvey(req.body);
      await surveyData.save();
      res.status(201).json({
        success: true,
        message: 'Réponse enregistrée avec succès',
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      // Vérifier les erreurs de validation et les afficher
      if (error.name === 'ValidationError') {
        // Afficher les erreurs de validation spécifiques
        const validationErrors = Object.values(error.errors).map(err => err.message);
        res.status(400).json({
          success: false,
          message: "Erreur de validation",
          errors: validationErrors,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Erreur lors de l'enregistrement",
          error: error.message,
        });
      }
    }
  });
// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
