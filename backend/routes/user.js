// Importation des éléments pour les routes d'authentification
const express = require('express');
const userCtrl = require('../controllers/user');
const router = express.Router(); // Création du router

// Importation de la logique des routes pour les utilisateurs
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router; // Exportation des routes pour y avoir accés depuis les autres fichiers