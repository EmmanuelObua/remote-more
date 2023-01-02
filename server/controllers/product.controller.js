const Product = require("../models/Product.js");

exports.create = (req, res) => {

	res.send(req.body)

	if (!req.body.name) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const productObj = new Product({
		name: req.body.name,
		storeId: req.body.storeId,
		price: req.body.price,
		description: req.body.description
	});
	
	productObj
		.save(productObj)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
				err.message || "Some error occurred while creating the product."
			});
		});
};


exports.findAll = (req, res) => {

	const name = req.query.name;

	var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

	Product.find(condition)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while retrieving products."
		});
	});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	
	Product.findById(id)
	.then(data => {
		if (!data)
			res.status(404).send({ message: "Not found product with id " + id });
		else res.send(data);
	})
	.catch(err => {
		res
		.status(500)
		.send({ message: "Error retrieving product with id=" + id });
	});
};

exports.update = (req, res) => {

	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!"
		});
	}

	const id = req.params.id;

	Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
	.then(data => {
		if (!data) {
			res.status(404).send({
				message: `Cannot update product with id=${id}. Maybe product was not found!`
			});
		} else res.send({ message: "Product was updated successfully." });
	})
	.catch(err => {
		res.status(500).send({
			message: "Error updating product with id=" + id
		});
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	
	Product.findByIdAndRemove(id)
	.then(data => {
		if (!data) {
			res.status(404).send({
				message: `Cannot delete product with id=${id}. Maybe product was not found!`
			});
		} else {
			res.send({
				message: "Product was deleted successfully!"
			});
		}
	})
	.catch(err => {
		res.status(500).send({
			message: "Could not delete product with id=" + id
		});
	});
};