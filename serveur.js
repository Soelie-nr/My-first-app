const express = require('express');
const path = require('path');
const port = 3019;

const app = express();

// Rendre tout le dossier 'public' accessible
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Sert la page d'accueil
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
