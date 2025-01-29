const mongoose = require('mongoose');

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
    question7: { type: Number, min: 0, max: 10, required: true }
});

module.exports = mongoose.model('Satisfaction', satisfactionSchema);