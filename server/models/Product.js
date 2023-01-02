const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let Product = new Schema({
	storeId: {type: String},
	name: {type: String},
	price: {type: String},
	description: {type: String}
}, {
	collection: 'products',
	timestamps: true 
})

Product.method("toJSON", function() {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = mongoose.model('Product', Product)