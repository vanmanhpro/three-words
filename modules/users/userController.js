const path = require('path');
const mongoose = require('mongoose');

const userModel = require('./userSchema');

const getQuestionByOrder = (id, callback) => {
	var typeQuestion = questionModel;
	typeQuestion.findOne( {'order' : id}, (err, question) => {
		if (err) {
			console.log(err);
		} else {
			callback(question);
		}
	})
}

const updateQuestionById = (updatedQuestion, callback) => {
	questionModel.update({ _id: updatedQuestion._id }, { $set: updatedQuestion}, callback);
}

const checkExistAccount = (userInfo) => {
	return new Promise( function( resolve, reject){
		userModel.findOne({ id : userInfo.id})
		.exec( (err, user) => {
			if (err) reject(err);
				else resolve(user);
		})
	});
}

const createNewAccount = (newUserData) => {
	return new Promise(function(resolve, reject){
		var newUser = new userModel({
			id: newUserData.id,
			name: newUserData.name,
			profileURL: newUserData.id,
			currentImageId: `https://graph.facebook.com/${newUserData.id}/picture?width=300`
		})
		console.log(newUser)

		newUser.save( (err) => {
			if(err) reject(err);
				else resolve();
		});
	});
}

const getPage = ( pageNumber) => {
	return new Promise(function(resolve, reject){
		userModel.find()
		.limit(10)
		.skip( pageNumber * 10)
		.exec( ( err, users) => {
			if(err) reject(err);
				else resolve(users);
		})
	});
}

const getAll = () => {
	return new Promise(function(resolve, reject){
		userModel.find( (err, users) => {
			if(err) reject(err); 
				else resolve(users);
		});
	});
}

module.exports = {
	createNewAccount,
	getAll,
	getPage,
	checkExistAccount
}