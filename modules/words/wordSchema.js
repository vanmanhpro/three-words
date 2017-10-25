const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
	content:{
		type: String,
		require: true
	},
	targetOwner:{
		type: String,
		require: true
	},
	targetPicture:{
		type: String,
		require: true
	},
	vote:{
		type: Number,
		default: 1
	},
	voters:{
		type: [],
		default: []
	}
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('words', wordSchema);