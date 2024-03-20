import {DataTypes} from "sequelize";
import sequelize from "../query";

const Song = sequelize.define('song', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "ID",
        field: "id"
    },
    title: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: "",
        field: "title"
    },
    artist: {
        type: DataTypes.JSON,
        comment: "",
        field: "artist"
    },
    credits: {
        type: DataTypes.JSON,
        comment: "",
        field: "credits"
    },
    duration: {
        type: DataTypes.TIME,
        comment: "",
        field: "duration"
    },
    lyrics: {
        type: DataTypes.JSON,
        comment: "",
        field: "lyrics"
    },
    is_deleted: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: "0",
        comment: "",
        field: "is_deleted"
    }
}, {
    freezeTableName: true, timestamps: true, updatedAt: "update_time", createdAt: "create_time"
});

export default Song;