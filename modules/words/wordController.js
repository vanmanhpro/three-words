const path = require('path');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId();

const wordsModel = require('./wordSchema');

const addWord = (word) => {
	return new Promise(function(resolve, reject){
		var newWord = new wordsModel({
			content : word.content,
			targetOwner : word.targetOwner,
			targetPicture : word.targetPicture,
			voters : [word.authorId]
		});

		newWord.save( (err, data) => {
			if(err) reject(err);
				else resolve(data._id);
		});
	});
}

const upvoteWord = (word, voterId) => {
	return new Promise(function(resolve, reject){
		wordsModel.findById(word._id)
		.exec((updateWord) => {
			updateWord.vote++;
			updateWord.voter.push(voterId);
			updateWord.save((err, updatedWord) => {
				if (err) reject(err);
					else resolve(updatedWord);
			})
		});
	})
}

module.exports = {
	addWord
}