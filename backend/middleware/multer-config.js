const multer = require('multer'); // Importation du package multer
// Création du dictionnaire des MIME_TYPE
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Objet permettant d'indiquer où et comment enregistrer les fichiers entrants
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    } 
});

// Exportation du middleware multer
module.exports = multer({ storage: storage }).single('image');