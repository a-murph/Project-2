// dependencies

var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

//parse app/x-www-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

//parse the app/json
app.use(bodyParser.json());

//static directory
app.use(express.static("public"));

//routes
require("./routing/html-routes.js")(app);
// require("./routing/api-routes.js")(app);

db.sequelize.sync({}).then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});
});