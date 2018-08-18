var db = require("../models");

module.exports = function(app) {
	app.post("/api/restaurants", function(req, res) {
		console.log(db);
		console.log(db.Restaurant);
		
		db.Restaurant.create(req.body).then(function(data) {
			res.json(data);
		});
	});

	app.get("/api/restaurants/:group", function(req, res) {
		db.Restaurant.findAll({
			where: {
				group_name: req.params.group
			}
		}).then(function(data) {
			res.json(data);
		});
	});
};