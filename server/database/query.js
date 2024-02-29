const config = require("../config/config.json");
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(config.database.database_name, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: "mysql"
});

// (async function () {
//     try {
//         await sequelize.authenticate();
//         console.log("success");
//     } catch (error) {
//         console.error("fail", error);
//     }
// })();

module.exports = sequelize;