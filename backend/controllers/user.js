// Importation des éléments requis
const bcrypt = require('bcrypt'); // Importation du package 'bcrypt'
const jwt = require('jsonwebtoken'); // Importation du package 'jwt'
const User = require('../models/modelUser');
var passwordValidator = require('password-validator');
 
// Creation d'un schéma de validation de mot de passe
var schemaPassword = new passwordValidator();

schemaPassword
.is().min(8)                                    // Minimum 8 caractères
.is().max(15)                                   // Maximum 15 caractères
.has().uppercase()                              // Doit avoir des lettres majuscules
.has().lowercase()                              // Doit avoir des lettres minuscules
.has().digits(2)                                // Doit avoir au moins 2 chiffres
.has().not().spaces();                          // Ne doit pas comporter d'espaces

// Exportation de la logiques des routes les utilisateurs
exports.signup = (req, res, next) => {
if (schemaPassword.validate(req.body.password)){
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ message: 'Utilisateur non créé !' }));
      })
      .catch(error => res.status(500).json({ error }));
    }
    else {res.status(400).json({ message: 'Le mot de passe doit contenir au minimum 8 caractères dont minimum 1 majuscule, 1 minuscules, 2 chiffres et ne doit pas comporter d espaces !' });}
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '1h' }
            )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};