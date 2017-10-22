const express = require('express');

const userController = require('./users/userController.js');

const Router = express.Router();

Router.post('/createAccount', (req, res) => {
	let userInfo = req.body;
	console.log(userInfo);
	userController.checkExistAccount(userInfo)
 	.then((user) => {
		if (user){
			console.log(user);
			console.log('userExist');
		} else {
			userController.createNewAccount(userInfo)
			.then(() => {
				console.log('Account created');
			})
			.catch((err) => {
				console.log('err');
			})
		}
	})
 	.catch((err) => {
 		console.log(err)
 	});
})

Router.post('/getPortfolios', (req, res) => {
	userController.getOnePage()
	.then((data) => {
		res.send(data);
	})
	.catch((err) => console.log(err));

})

module.exports = Router;