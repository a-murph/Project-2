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