const Store = require("../models/Store.js");
const Product = require("../models/Product.js");

const NodeGeocoder = require('node-geocoder');

const options = {
	provider: 'google',
	apiKey: 'AIzaSyBbn-F65G6we2tploFH1xPQEYdnw_DgQ0g',
	formatter: null
};

const geocoder = NodeGeocoder(options);

exports.create = async (req, res) => {

	if (!req.body.name) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const googleRes = await geocoder.geocode(req.body.address);

	const location = { type: 'Point', coordinates: [googleRes[0].latitude, googleRes[0].longitude] };
	
	const storeObj = new Store({
		name: req.body.name,
		address: req.body.address,
		location:location,
		description: req.body.description
	});
	
	storeObj
	.save(storeObj)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while creating the store."
		});
	});
};

exports.findProducts = (req, res) => {

	Product.find({storeId : req.params.id}).then(data=>{
		res.send(data)
	}).catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while retrieving store products."
		});
	});
	
}	

exports.findAll = (req, res) => {

	const name = req.query.name;

	var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

	Store.find(condition)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while retrieving stores."
		});
	});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	
	Store.findById(id)
	.then(data => {
		if (!data)
			res.status(404).send({ message: "Not found Store with id " + id });
		else res.send(data);
	})
	.catch(err => {
		res
		.status(500)
		.send({ message: "Error retrieving Store with id=" + id });
	});
};

exports.update = (req, res) => {

	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!"
		});
	}

	const id = req.params.id;

	Store.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
	.then(data => {
		if (!data) {
			res.status(404).send({
				message: `Cannot update Store with id=${id}. Maybe Store was not found!`
			});
		} else res.send({ message: "Store was updated successfully." });
	})
	.catch(err => {
		res.status(500).send({
			message: "Error updating Store with id=" + id
		});
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	
	Store.findByIdAndRemove(id)
	.then(data => {
		if (!data) {
			res.status(404).send({
				message: `Cannot delete Store with id=${id}. Maybe Store was not found!`
			});
		} else {
			res.send({
				message: "Store was deleted successfully!"
			});
		}
	})
	.catch(err => {
		res.status(500).send({
			message: "Could not delete Store with id=" + id
		});
	});
};


exports.deleteAll = (req, res) => {

	Store.deleteMany({})
	.then(data => {
		res.send({
			message: `${data.deletedCount} Stores were deleted successfully!`
		});
	})
	.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while removing all stores."
		});
	});

};

exports.findAllPublished = (req, res) => {

	Store.find({ published: true })
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while retrieving stores."
		});
	});

};