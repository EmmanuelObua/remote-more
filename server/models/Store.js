const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Store = new Schema({
	name: {type: String},
	address: {type: String},
	lat: {type: String},
	lng: {type: String},
	description: {type: String}
}, {
	collection: 'stores',
	timestamps: true 
})

Store.method("toJSON", function() {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});


module.exports = mongoose.model('Store', Store)