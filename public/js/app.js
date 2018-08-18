$(document).ready(function() {
	$("#submitGroup").on("click", function(event) {
		event.preventDefault();
	});

	$("#submitRestaurant").on("click", function(event) {
		event.preventDefault();

		var groupName = $("#groupName").val().trim();
		var userName = $("#userName").val().trim();
		var restaurant = $("#restaurantName").val().trim();

		var newRestaurant = {
			group_name: groupName,
			user_name: userName,
			restaurant_name: restaurant
		};

		$.post("/api/restaurants", newRestaurant, function() {});
	});

	$("#submitSearch").on("click", function(event) {
		event.preventDefault();

		var groupName = $("#searchGroup").val().trim();

		$.get("/api/restaurants/" +groupName, function(data) {
			if (data) {
				console.log(data);
			}
		})
	});
});