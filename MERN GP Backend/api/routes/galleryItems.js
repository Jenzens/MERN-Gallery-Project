const express = require('express');
const router = express.Router();
const multer = require('multer');
const cors = require('cors');

//Middleware
const checkAuth = require('../middleware/check-auth');

//controller
const GalleryController = require('../controllers/galleryItems');

//filehandler and storage 
const storage = multer.diskStorage({
    destination: function(req, file, cb ){
        cb(null, './uploads/');
    },
    filename: function( req, file, cb ) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-'); 
        cb(null, date + file.originalname);
    }
});

const fileFilter = (req, file, cb ) => {
    if(file.mimetype  === 'image/jpeg' || file.mimetype  === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else { 
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 10
        }, 
        fileFilter: fileFilter
});

router.get('/', GalleryController.getGalleryItems);

router.post('/', cors(), upload.single('galleryItemImage'), GalleryController.addGalleryItem);

router.get('/:galleryItemId', GalleryController.getGalleryItemById);

// add checkAuth
router.patch('/:galleryItemId', GalleryController.updateGalleryItem);

// add checkAuth ('/:galleryItemId', checkAuth, GalleryController.deleteGalleryItem); 
router.delete('/:galleryItemId', GalleryController.deleteGalleryItem); 

module.exports = router;