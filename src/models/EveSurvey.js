const mongoose = require('mongoose');

const eveSurveySchema = new mongoose.Schema({
    playerName: { 
        type: String, 
        required: true,
        trim: true
    },
    characterName: { 
        type: String,
        trim: true
    },
    altAccountCount: { 
        type: Number, 
        min: 0, 
        required: true 
    },
    startPlayingDate: { 
        type: Date, 
        required: true 
    },
    hasSimilarGameExperience: { 
        type: String, 
        enum: ['Yes', 'No'], 
        required: true 
    },
    positiveAspects: { 
        type: String, 
        maxlength: 500, 
        required: true,
        trim: true
    },
    negativeAspects: { 
        type: String, 
        maxlength: 500, 
        required: true,
        trim: true
    },
    suggestedChanges: { 
        type: String, 
        maxlength: 500, 
        required: true,
        trim: true
    },
    satisfactionScore: { 
        type: Number, 
        min: 0, 
        max: 10, 
        required: true 
    },
    improvements: { 
        type: String, 
        maxlength: 500, 
        required: true,
        trim: true
    },
    desiredPlexPrice: { 
        type: Number, 
        min: 0, 
        max: 10, 
        required: true 
    },
    submittedAt: { 
        type: Date, 
        default: Date.now 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('EveSurvey', eveSurveySchema);
