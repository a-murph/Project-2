var path = require("path");

module.exports = function (app) {

	//html request
	app.get("/", function (req, res) {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});

	app.get("/app", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/app.html"));
	});
};