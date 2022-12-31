const express = require('express');
const app = express();

const storeRoute = express.Router();
let Store = require('../models/Store');

// Add Store
storeRoute.route('/add-store').post((req, res, next) => {
	
	Store.create(req.body, (error, data) => {
		if (error) {
			return next(error)
		} else {
			res.json(data)
		}
	})
	
});

// Get all Store
storeRoute.route('/').get((req, res) => {
	
	Store.find((error, data) => {
		if (error) {
			return next(error)
		} else {
			res.json(data)
		}
	})
	
})

// Get Store
storeRoute.route('/read-store/:id').get((req, res) => {

	Store.findById(req.params.id, (error, data) => {
		if (error) {
			return next(error)
		} else {
			res.json(data)
		}
	})

})

// Update Store
storeRoute.route('/update-store/:id').put((req, res, next) => {

	Store.findByIdAndUpdate(req.params.id, {
		$set: req.body
	}, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			res.json(data)
			console.log('Store updated successfully!')
		}
	})

})

// Delete Store
storeRoute.route('/delete-store/:id').delete((req, res, next) => {

	Store.findByIdAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data
			})
		}
	})

})

module.exports = storeRoute;