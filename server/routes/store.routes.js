
module.exports = app => {

	const stores = require("../controllers/store.controller.js");
	var router = require("express").Router();

	router.post("/", stores.create);
	router.get("/", stores.findAll);
	router.get("/published", stores.findAllPublished);
	router.get("/:id", stores.findOne);
	router.put("/:id", stores.update);
	router.delete("/:id", stores.delete);
	router.delete("/", stores.deleteAll);
	
	app.use('/api/stores', router);

};