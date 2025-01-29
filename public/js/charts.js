// Ajouter ces routes dans votre server.js
const express = require('express');
const cors = require('cors');

// Activer CORS
app.use(cors());

// Route pour obtenir les statistiques
app.get('/api/stats', async (req, res) => {
  try {
    // Statistiques pour la question 5 (satisfaction)
    const satisfactionStats = await Satisfaction.aggregate([
      {
        $group: {
          _id: null,
          averageSatisfaction: { $avg: "$question5" },
          satisfactionDistribution: {
            $push: "$question5"
          }
        }
      }
    ]);

    // Statistiques pour la question 7 (prix PLEX)
    const plexStats = await Satisfaction.aggregate([
      {
        $group: {
          _id: null,
          averagePlex: { $avg: "$question7" },
          plexDistribution: {
            $push: "$question7"
          }
        }
      }
    ]);

    // Statistiques pour la question 1 (expérience précédente)
    const experienceStats = await Satisfaction.aggregate([
      {
        $group: {
          _id: "$question1",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      satisfaction: satisfactionStats[0],
      plex: plexStats[0],
      experience: experienceStats
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});