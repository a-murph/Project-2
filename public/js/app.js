$(document).ready(function() {
	$("#submit-restaurant").on("click", function(event) {
		var groupName = $("#group-name").val().trim();
		var userName = $("#user-name").val().trim();
		var restaurant = $("#restaurant-name").val().trim();

		var newRestaurant = {
			group_name: groupName,
			user_name: userName,
			restaurant_name: restaurant
		};

		//calling yelp api function
		getYelp();

		$.post("/api/restaurants", newRestaurant, function(data) {
			$("#groupNames").append("<span class='member-name'>" +data.restaurant_name +"</span>");
		}).then(function() {
			$("#user-name").val("");
			$("#user-location").val("");
			$("#restaurant-name").val("");
		});
	});

	$("#groupSearch").on("click", function(event) {
		event.preventDefault();

		var groupName = $("#groupInput").val().trim();

		$.get("/api/restaurants/" +groupName, function(data) {
			if (data) {
				console.log(data);
				$("#groupNames").empty();
				data.forEach(function(val) {
					$("#groupNames").append("<span class='member-name'>" +val.restaurant_name +"</span>");
				});
				$("#group-name").val(data[0].group_name);
				$("#user-name").val("");
				$("#user-location").val("");
				$("#restaurant-name").val("");
			}
		});
	});

	$("#restChoose").on("click", function(event) {
		var groupName = $("#group-name").val().trim();

		$.get("/api/restaurants/" +groupName, function(data) {
			if (data) {
				var randNum = Math.floor(Math.random()*data.length);
				var restaurant = data[randNum];

				$("#restRandom").empty();

				$("#restRandom").append(
					"<h5 class='rand-rest-name'>" +restaurant.restaurant_name +"</h6>"
				);
				$("#restRandom").append(
					"<p class='rand-rest-address'>" +restaurant.address +"</p>"
				);
				$("#restRandom").append(
					"<p class='rand-rest-phone'>" +restaurant.phone +"</p>"
				);
				$("#restRandom").append(
					"<p class='rand-rest-rating'>" +restaurant.rating +"</p>"
				);
				$("#restRandom").append(
					"<img class='rand-rest-img' alt='Restaurant Image' href=" +restaurant.image +">"
				);
			}
		});
	});

	$("#submit-group").on("click", function(event) {
		$("#group-form").attr("style", "display:none");
		$("#form").attr("style", "");
	});



	function getYelp(response){
    
		var searchname = $("#restaurant-name").val().trim();;
		var searchlocation = $("#user-location").val().trim();;
		

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": 'https://api.yelp.com/v3/businesses/search?name=' + searchname + '&location=' + searchlocation,
			"method": "GET",
			"headers": {
				"Authorization": "Bearer ar-x6hwt2s0--HITMPmH0Wb-8goH-GIHW8qv5XyHWbz9k25Dh8MB45L6qwUxGrdMHXr5hpQ0wCYt9jh5ItYLPoBvR2DfGD_JFgQZpV2f9kK_27rbG8BRS4ushy54W3Yx",
				"Cache-Control": "no-cache",
				"Postman-Token": "9af56c63-703e-4e70-ada3-7e10fbca86e5"
			}
		}
		
		$.ajax(settings).done(function (response) {
			console.log(response);

			var response = response.businesses[1];
			var restPhone = response.phone;
			var restRating = response.rating;
			var restIMG = response.image_url;
			var restWebsite = response.url;
			
			var restStreet = response.location.address1;
			var restCity = response.location.city;
			var restState = response.location.state;
			var restZip = response.location.zip_code;

			var restAddress = restStreet + ", " + restCity + ", " + restState + ", " + restZip;

			console.log(restPhone);
			console.log(restRating);
			console.log(restIMG);
			console.log(restWebsite);
			console.log(restAddress);

		});
	}

});