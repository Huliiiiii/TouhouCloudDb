const {
    DataTypes
} = require('sequelize');
const sequelize = require("../query");
const Release = sequelize.define('release', {
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
            comment: "标题",
            field: "title"
        },
        release_artist: {
            type: DataTypes.JSON,
            comment: "作者",
            field: "release_artist"
        },
        override_credit_name: {
            type: DataTypes.STRING(45),
            comment: "?",
            field: "override_credit_name"
        },
        release_date: {
            type: DataTypes.DATE,
            comment: "发行日",
            field: "release_date"
        },
        release_type: {
            type: DataTypes.STRING(45),
            comment: "发行类型",
            field: "release_type"
        },
        release_format: {
            type: DataTypes.STRING(45),
            comment: "?",
            field: "release_format"
        },
        publisher: {
            type: DataTypes.JSON,
            comment: "?",
            field: "publisher"
        },
        catalog_num: {
            type: DataTypes.STRING(45),
            comment: null,
            field: "catalog_num"
        },
        track_listing: {
            type: DataTypes.JSON,
            comment: null,
            field: "track_listing"
        },
        classfier: {
            type: DataTypes.JSON,
            comment: null,
            field: "classfier"
        },
        ncm_id: {
            type: DataTypes.STRING(45),
            comment: null,
            field: "ncm_id"
        },

        is_deleted: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: "0",
            comment: null,
            field: "is_deleted"
        }
    },
    {
        freezeTableName: true, timestamps: true, updatedAt: "update_time", createdAt: "create_time"
    });

module.exports = Release;