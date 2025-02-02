const express = require('express');
const router = express.Router();
const EveSurvey = require('../models/EveSurvey');

router.post('/submit-Eve', async (req, res) => {
  try {
    const newSurvey = new EveSurvey({
      playerName: req.body.prenom,  // Utilisation de prenom du formulaire
      characterName: req.body.nom,  // Utilisation de nom du formulaire
      altAccountCount: req.body.alt,
      startPlayingDate: req.body.date,
      hasSimilarGameExperience: req.body['question-1'],  // Assurez-vous que le nom est le bon
      positiveAspects: req.body['question2'],
      negativeAspects: req.body['question3'],
      suggestedChanges: req.body['question4'],
      satisfactionScore: req.body['question5'],
      improvements: req.body['question6'],
      desiredPlexPrice: req.body['question7']
    });

    await newSurvey.save();
    res.json({ success: true, message: "Données enregistrées avec succès" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Erreur lors de l'enregistrement", error: error.message });
  }
});

module.exports = router;
