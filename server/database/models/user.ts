import { DataTypes } from "sequelize";
import sequelize from "../query";

const attributes = {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: null,
		primaryKey: true,
		autoIncrement: true,
		comment: "",
		field: "id",
	},
	username: {
		type: DataTypes.STRING(45),
		allowNull: false,
		defaultValue: null,
		primaryKey: false,
		autoIncrement: false,
		comment: "",
		field: "username",
	},
	password: {
		type: DataTypes.STRING(45),
		allowNull: false,
		defaultValue: null,
		primaryKey: false,
		autoIncrement: false,
		comment: "",
		field: "password",
	},
};
const options = {
	tableName: "user",
	indexes: [],
	freezeTableName: true,
	timestamps: true,
	updatedAt: "update_time",
	createdAt: "create_time",
};
export const UserModel = sequelize.define("user", attributes, options);
