import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	ModelAttributes,
	ModelOptions,
} from "sequelize";
import sequelize from "component/database/query";
import { User } from "./auth_schema";

export interface UserModel extends User {}

export interface UserModel
	extends Model<
		InferAttributes<UserModel>,
		InferCreationAttributes<UserModel>
	> {
	id: CreationOptional<number>;
}

const attributes: ModelAttributes<UserModel, InferAttributes<UserModel>> = {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		comment: "",
		field: "id",
	},
	username: {
		type: DataTypes.STRING(45),
		allowNull: false,
		primaryKey: false,
		autoIncrement: false,
		comment: "",
		field: "username",
	},
	password: {
		type: DataTypes.STRING(45),
		allowNull: false,
		primaryKey: false,
		autoIncrement: false,
		comment: "",
		field: "password",
	},
};

const options: ModelOptions = {
	freezeTableName: true,
	timestamps: true,
	updatedAt: "updated_at",
	createdAt: "created_at",
};

export const UserModel = sequelize.define<UserModel>(
	"user",
	attributes,
	options
);
