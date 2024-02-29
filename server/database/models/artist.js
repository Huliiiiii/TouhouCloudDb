const {DataTypes} = require('sequelize');
const sequelize = require("../query");

const Artist = sequelize.define('artist', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "ID",
        field: "id",
    }, name: {
        type: DataTypes.STRING(45),
        comment: "姓名",
        field: "name"
    }, name_variant: {
        type: DataTypes.JSON,
        comment: "?",
        field: "name_variant"
    }, alias: {
        type: DataTypes.JSON,
        comment: "别名",
        field: "alias"
    }, artist_type: {
        type: DataTypes.STRING(45),
        comment: "艺术家类型,团体/个人",
        field: "artist_type"
    }, birth_or_formed_date: {
        type: DataTypes.DATE,
        comment: "生日",
        field: "birth_or_formed_date"
    }, member_of: {
        type: DataTypes.JSON,
        comment: "?",
        field: "member_of"
    }, members: {
        type: DataTypes.JSON,
        comment: "?",
        field: "members"
    }, related_artist: {
        type: DataTypes.STRING(45),
        comment: "?",
        field: "related_artist"
    }, ncm_id: {
        type: DataTypes.INTEGER,
        comment: "?",
        field: "ncm_id"
    }, is_deleted: {
        type: DataTypes.TINYINT,
        defaultValue: "0",
        comment: "是否已删除",
        field: "is_deleted"
    }
}, {
    freezeTableName: true, timestamps: true, updatedAt: "update_time", createdAt: "create_time"
});

module.exports = Artist;