const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Store = new Schema({
	name: {type: String},
	address: {type: String},
	lat: {type: String},
	lng: {type: String},
	description: {type: String}
}, {
	collection: 'stores'
})

module.exports = mongoose.model('Store', Store)