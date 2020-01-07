const mongoose = require('mongoose');

// Models import
const Gallery = require('../models/galleryItems');

exports.getGalleryItems = (req, res, next) => {
    Gallery.find() //find().limit = add number of shown items, add pagenation
        .select('title description _id galleryItemImage') // Fields to fetch
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                galleryItems: docs.map(doc => {
                    return {
                        title: doc.title,
                        description: doc.description,
                        _id: doc._id,
                        galleryItemImage: doc.galleryItemImage,
                        url: {
                            type: 'GET',
                            url: 'http://localhost:5000/gallery/' + doc._id
                        }
                    }
                })
            }
                res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.getGalleryItemById = (req, res, next) => {
    const id = req.params.galleryItemId;
    Gallery.findById(id)
    .select('title description _id galleryItemImage')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            //if item exists then post info else 
            if (doc) {
                res.status(200).json({
                    galleryItem: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/gallery/'
                    }
                });
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err}) 
        });
};

exports.addGalleryItem = (req, res, next) => { //upload image
    console.log(req.file);
    const galleryItem = new Gallery({ // This is the data we want to store
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        galleryItemImage: req.file.path
    });
    galleryItem
        .save()
        .then(result => { // store model in db
            console.log(result);
            res.status(201).json({
                message: 'Created item successfully',
                createdGalleryItem: {
                    title: result.title,
                    description: result.description,
                    _id: result._id,
                    galleryItemImage: result.galleryItemImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/gallery/' + result._id
                    }
                }
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
  
};

exports.updateGalleryItem = (req, res, next) => {
    const id = req.params.galleryItemId;
    const updateOps = {};

    // console.log(req.body);
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }

    updateOps['title'] = req.body.title;
    updateOps['description'] = req.body.description;

    Gallery.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Item updated successfully',
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/gallery/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.deleteGalleryItem = (req, res, next) => {
    const id = req.params.galleryItemId;
    Gallery.remove({ _id: id }) //remove any objects in the db that fulfills this criteria 
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Item deleted successfully',
                request: {
                    type: 'POST',
                    url: 'http://localhost:5000/gallery/',
                    body: { title: 'String', description: 'String'}
                }
            });
        })
        .catch(err => {
            console.log(500).json({
                error: err
            })
        });                           
};