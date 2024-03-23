import { config } from "config/config.js";
import { Sequelize } from "sequelize";

const database_name = config.database.database_name;
const database_username = config.database.username;
const database_password = config.database.password;
const database_host = config.database.host;
const sequelize = new Sequelize(
	database_name,
	database_username,
	database_password,
	{
		host: database_host,
		dialect: "mysql",
	}
);

// (async function () {
//     try {
//         await sequelize.authenticate();
//         console.log("success");
//     } catch (error) {
//         console.error("fail", error);
//     }
// })();
export default sequelize;
