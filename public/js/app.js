$(document).ready(function() {
	$("#submit-restaurant").on("click", function(event) {
		var groupName = $("#group-name").val().trim();
		var userName = $("#user-name").val().trim();
		
		//CALLING YELP API
		
		var searchname = $("#restaurant-name").val().trim();
		var searchlocation = $("#user-location").val().trim();
		
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + searchname + '&location=' + searchlocation,
			"method": "GET",
			"headers": {
				"Authorization": "Bearer ar-x6hwt2s0--HITMPmH0Wb-8goH-GIHW8qv5XyHWbz9k25Dh8MB45L6qwUxGrdMHXr5hpQ0wCYt9jh5ItYLPoBvR2DfGD_JFgQZpV2f9kK_27rbG8BRS4ushy54W3Yx",
				"Cache-Control": "no-cache",
				"Postman-Token": "9af56c63-703e-4e70-ada3-7e10fbca86e5"
			}
		}
		
		$.ajax(settings).then(function (response) {
			console.log(response);
			
			var restaurant = response.businesses[0];
			console.log(restaurant);
			console.log(restaurant.name);
			
			var restStreet = restaurant.location.address1;
			var restCity = restaurant.location.city;
			var restState = restaurant.location.state;
			var restZip = restaurant.location.zip_code;

			var newRestaurant = {
				group_name: groupName,
				user_name: userName,
				restaurant_name: restaurant.name,
				address: restStreet + ", " + restCity + ", " + restState + ", " + restZip,
				phone: restaurant.phone,
				rating: restaurant.rating,
				image: restaurant.image_url,
				website: restaurant.url
			};
			
			console.log(newRestaurant["restaurant_name"]);
			console.log(newRestaurant.address);
			console.log(newRestaurant.phone);
			console.log(newRestaurant.rating);
			console.log(newRestaurant.image);
			console.log(newRestaurant.website);
			
			$.post("/api/restaurants", newRestaurant, function(data) {
				$.get("/api/restaurants/" +groupName, function(data) {
					if (data) {
						console.log(data);
						$("#groupNames").empty();
						data.forEach(function(val) {
							$("#groupNames").append("<span class='member-name'>" +val.restaurant_name +"</span>");
						});
					}
				});
			}).then(function() {
				$("#user-name").val("");
				$("#user-location").val("");
				$("#restaurant-name").val("");
			});
		});
	});

	$("#groupSearchSubmit").on("click", function(event) {
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
					"<h5 class='rand-rest-name'>" +restaurant.user_name +"'s choice: "+restaurant.restaurant_name +"</h6>"
				);
				$("#restRandom").append(
					"<p class='rand-rest-address'>" +restaurant.address +"</p>"
				);
				$("#restRandom").append(
					"<p class='rand-rest-phone'>Phone: " +restaurant.phone +"</p>"
				);
				$("#restRandom").append(
					"<p class='rand-rest-rating'>Rating: " +restaurant.rating +" / 5</p>"
				);
				$("#restRandom").append(
					"<img class='rand-rest-img' alt='Restaurant Image' style='width: 100%' src=" +restaurant.image +">"
				);
			}
		});
	});

	$("#submit-group").on("click", function(event) {
		$("#group-form").attr("style", "display:none");
		$("#form").attr("style", "");
	});
});