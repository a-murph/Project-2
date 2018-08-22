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

		$.post("/api/restaurants", newRestaurant, function(data) {
			$("#groupNames").append("<span class='member-name'>" +data.user_name +"</span>");
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
					$("#groupNames").append("<span class='member-name'>" +val.user_name +"</span>");
				});
				$("#group-name").val(data[0].group_name);
				$("#user-name").val("");
				$("#user-location").val("");
				$("#restaurant-name").val("");
			}
		});
	});

	$("#restChoose").on("click", function(event) {
		var groupName = $("#groupInput").val().trim();

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
});