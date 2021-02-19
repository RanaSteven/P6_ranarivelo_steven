// Importation des éléments requis pour les routes
const express = require('express');
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth'); // Importation du middleware pour l'authentification
const multer = require('../middleware/multer-config');  // Importation du package multer
const router = express.Router(); // Création du router

// Importation de la logique des routes des sauces
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce)
router.delete('/:id', auth, saucesCtrl.deleteSauce)
router.post('/:id/like', auth, saucesCtrl.likeSauce)

module.exports = router; // Exportation des routes pour y avoir accés depuis les autres fichiers