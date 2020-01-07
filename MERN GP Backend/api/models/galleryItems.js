const mongoose = require('mongoose');

const galleryItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array },
    uploadDate: {type: Date},
    category: {type: String},
    galleryItemImage: {type: String }
});

// internal name, schema
module.exports = mongoose.model('Gallery', galleryItemSchema)