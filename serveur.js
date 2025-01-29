require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/database');
const formRoutes = require('./src/routes/formRoutes');

const app = express();
const port = process.env.PORT || 3019;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Fichier
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/formulaire_eve.html'));
});

// Routes
app.use('/api', formRoutes);

// Connexion à la base de données
connectDB();

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});