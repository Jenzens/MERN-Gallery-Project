const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors');

const mongoose = require('mongoose');
const connection = mongoose.connection;

//Routes
const galleryRoutes = require('./api/routes/galleryItems');
const userRoutes = require('./api/routes/user');

// DB connection
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
    'mongodb://127.0.0.1:27017/portiadb', 
    { useNewUrlParser: true });

connection.once('open', function() {
    console.log("MongoDB database connection established successfully")
})
mongoose.Promise = global.Promise;

//Middleware
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); //set static public folder


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
//Headers CORS
// set * to own url to only allow access to own page
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, multipart/form-data'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH DELETE, GET');
        return res.status(200).json({}); 
    }
    next(); 
});

//Routes for handling requests
app.use('/gallery', galleryRoutes);
app.use('/user', userRoutes);

//error handling if no routes was found
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

//Error handling 
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;