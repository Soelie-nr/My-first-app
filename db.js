const mongoose = require('mongoose');
require('dotenv').config();

// Schéma pour les données d'enquête
const enqueteSchema = new mongoose.Schema({
    nom: String,
    email: String,
    reponses: [String],
    dateCreation: {
        type: Date,
        default: Date.now
    }
});

// Créer le modèle
const Enquete = mongoose.model('Enquete', enqueteSchema);

// URL de connexion MongoDB (à mettre dans votre fichier .env)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/soelie-invastigate';

// Connexion à MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connecté à MongoDB avec succès');
    })
    .catch((err) => {
        console.error('❌ Erreur de connexion MongoDB:', err);
    });

// Exporter le modèle pour l'utiliser dans d'autres fichiers
module.exports = Enquete;