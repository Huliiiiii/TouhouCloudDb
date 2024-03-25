import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from "sequelize";
import sequelize from "component/database/query";

export interface SongData {
	id: number;
	title: string;
	artist: number[];
	credits?: SongCredits[];
	duration?: string;
	lyrics?: object;
	is_deleted: 0 | 1;
}

export interface SongCredits {
	artist_id: number;
	role: number[];
	override_credit_name?: string;
}

interface SongModel extends Model<InferAttributes<SongModel>, InferCreationAttributes<SongModel>> {
	id: CreationOptional<number>;
	title: string;
	artist: number[];
	credits: SongCredits[];
	duration: string;
	lyrics: object;
	is_deleted: 0 | 1;
}

const SongModel = sequelize.define<SongModel>(
	"song",
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
			comment: "",
			field: "title",
		},
		artist: {
			type: DataTypes.JSON,
			comment: "",
			field: "artist",
		},
		credits: {
			type: DataTypes.JSON,
			comment: "",
			field: "credits",
		},
		duration: {
			type: DataTypes.TIME,
			comment: "",
			field: "duration",
		},
		lyrics: {
			type: DataTypes.JSON,
			comment: "",
			field: "lyrics",
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
		updatedAt: "update_time",
		createdAt: "create_time",
	}
);

export default SongModel;
