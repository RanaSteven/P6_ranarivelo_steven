// Importation des éléments requis
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Importation de body-parser qui permet de stocker des objets sous forme Javascript
const sauceRoutes = require('./routes/sauces'); // Importation des routes pour les sauces
const userRoutes = require('./routes/user');// Importation des routes pour les utilisateurs
const path = require('path'); // Importation qui va nous permettre d'accéder au chemin de notre serveur
const helmet = require("helmet"); // Importation du package 'helmet'
require('dotenv').config(); // Importation du fichier '.env'

// Connexion à la base de donnée mongoose
mongoose.connect(process.env.mongooseUrl,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // Création de l'application Express

app.use(helmet());

// Elément qui nous permet d'accéder à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json()); // utilisation du package body-parser

app.use('/images', express.static(path.join(__dirname, 'images')));
// Enregistrement des routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app; // Exportation de l'application pour y avoir accés depuis les autres fichiers