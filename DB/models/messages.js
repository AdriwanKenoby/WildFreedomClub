const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const messageSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	texte: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('messages', messageSchema);
