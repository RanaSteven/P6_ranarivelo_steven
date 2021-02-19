const jwt = require('jsonwebtoken'); // Importation du package jwt

// Exportation du middleware pour les vérification de l'authentification avec les tokens
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'userID invalide !';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide !')
    });
  }
};