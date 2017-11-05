const express = require('express');
const path = require('path');
const multer = require('multer');

const userController = require('./users/userController.js')

const Router = express.Router();

// Set Storage Engine
const storage = multer.diskStorage({
	destination: './public/uploads',
	filename: function(req, file, callback){
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
})

// Init Upload
const upload = multer({
	storage: storage
}).single('photo');

Router.post('/', (req, res) => {
    upload(req, res, (err) => {
    	if(err){
    		res.send(err);
    	} else {
    		res.send(req.file.path);
    	}
    })
});

module.exports = Router;