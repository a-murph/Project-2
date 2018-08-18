module.exports = function(sequelize, DataTypes) {
	var Restaurant = sequelize.define("Restaurant", {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		group_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		user_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		restaurant_name: {
			type: DataTypes.STRING,
			defaultValue: ""
		},
		address: {
			type: DataTypes.STRING,
			defaultValue: ""
		},
		phone: {
			type: DataTypes.STRING,
			defaultValue: ""
		},
		rating: {
			type: DataTypes.STRING,
			defaultValue: ""
		},
		image: {
			type: DataTypes.STRING,
			defaultValue: ""
		},
		website: {
			type: DataTypes.STRING,
			defaultValue: ""
		}
	});

	return Restaurant;
};