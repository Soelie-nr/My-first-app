const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connecté à MongoDB avec succès");
    } catch (error) {
        console.error("❌ Erreur de connexion MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;