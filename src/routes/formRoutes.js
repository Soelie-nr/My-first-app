const express = require('express');
const router = express.Router();
const Satisfaction = require('../models/satisfaction');

router.post('/submit-satisfaction', async (req, res) => {
    try {
        const satisfactionData = req.body;
        const newSatisfaction = new Satisfaction(satisfactionData);
        await newSatisfaction.save();
        res.status(200).send({ message: 'Formulaire soumis avec succès !' });
    } catch (err) {
        res.status(500).send({ 
            message: 'Erreur lors de l\'enregistrement du formulaire : ' + err.message 
        });
    }
});

module.exports = router;