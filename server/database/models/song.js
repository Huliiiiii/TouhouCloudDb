const {
    DataTypes
} = require('sequelize');
const sequelize = require("../query");
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
        comment: null,
        field: "title"
    },
    artist: {
        type: DataTypes.JSON,
        comment: null,
        field: "artist"
    },
    credits: {
        type: DataTypes.JSON,
        comment: null,
        field: "credits"
    },
    duration: {
        type: DataTypes.TIME,
        comment: null,
        field: "duration"
    },
    lyrics: {
        type: DataTypes.JSON,
        comment: null,
        field: "lyrics"
    },
    is_deleted: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: "0",
        comment: null,
        field: "is_deleted"
    }
}, {
    freezeTableName: true, timestamps: true, updatedAt: "update_time", createdAt: "create_time"
});

module.exports = Song;