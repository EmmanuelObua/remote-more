const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Store = new Schema({
	name: {type: String},
	address: {type: String},
	location: {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	description: {type: String}
}, {
	collection: 'stores',
	timestamps: true 
})

Store.index({ location: '2dsphere' });

Store.method("toJSON", function() {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});


module.exports = mongoose.model('Store', Store)