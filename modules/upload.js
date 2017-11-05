const express = require('express');
const path = require('path');
const multer = require('multer');

const userController = require('./users/userController.js');
const imageController = require('./images/imageController.js');

const Router = express.Router();

// Set Storage Engine
const storage = multer.diskStorage({
	destination: './public/uploads',
	filename: function(req, file, callback){
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
})

// Init Upload
const photoMaxSize = 100000;
const upload = multer({
	storage: storage,
    limits: {fileSize: photoMaxSize}
}).single('photo');

Router.post('/', (req, res) => {
    upload(req, res, (err) => {
    	if(err){
    		res.send(err);
    	} else {
            //create image
            let newImageURL = `uploads/${req.file.filename}`;
            let userId = req.body.userId;
            let newImageData = {
                ownerId: req.body.userId,
                url: newImageURL
            }
            imageController.addImage(newImageData)
            .then((data) => {
                //change current image id of user
                let newImageId = data;
                userController.updateAccountImage( userId, newImageId, newImageURL)
                .then((data) => {
                    console.log("changed users image to :", data);
                })
                .catch((err) => {
                    console.log(err);
                })
            })
            .catch((err) => {
                console.log(err);
            });
    	}
    })
});

module.exports = Router;