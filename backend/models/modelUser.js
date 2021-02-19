// Importation des éléments requis
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création d'un schéma pour un user avec la méthode 'Schema', les id sont gérés automatiquement par mongoose
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // Appliquez le plugin uniqueValidator à userSchema.

module.exports = mongoose.model('User', userSchema); // Exportation du schéma appelé User