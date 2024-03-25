import sequelize from "component/database/query";
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from "sequelize";
import { type Release } from "./release_schema";

export interface ReleaseModel
	extends Omit<Release, "id">,
		Model<
			InferAttributes<ReleaseModel>,
			InferCreationAttributes<ReleaseModel>
		> {
	id: CreationOptional<number>;
}

export const ReleaseModel = sequelize.define<ReleaseModel>(
	"release",
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			comment: "ID",
			field: "id",
		},
		title: {
			type: DataTypes.STRING(45),
			allowNull: false,
			comment: "标题",
			field: "title",
		},
		release_artist: {
			type: DataTypes.JSON,
			comment: "作者",
			field: "release_artist",
		},
		override_credit_name: {
			type: DataTypes.STRING(45),
			comment: "?",
			field: "override_credit_name",
		},
		release_date: {
			type: DataTypes.DATE,
			comment: "发行日",
			field: "release_date",
		},
		release_type: {
			type: DataTypes.STRING(45),
			comment: "发行类型",
			field: "release_type",
		},
		release_format: {
			type: DataTypes.STRING(45),
			comment: "?",
			field: "release_format",
		},
		publisher: {
			type: DataTypes.JSON,
			comment: "?",
			field: "publisher",
		},
		catalog_num: {
			type: DataTypes.STRING(45),
			comment: "",
			field: "catalog_num",
		},
		track_listing: {
			type: DataTypes.JSON,
			comment: "",
			field: "track_listing",
		},
		classfier: {
			type: DataTypes.JSON,
			comment: "",
			field: "classfier",
		},
		ncm_id: {
			type: DataTypes.STRING(45),
			comment: "",
			field: "ncm_id",
		},
		is_deleted: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: "0",
			comment: "",
			field: "is_deleted",
		},
	},
	{
		freezeTableName: true,
		timestamps: true,
		updatedAt: "updated_at",
		createdAt: "created_at",
	}
);
