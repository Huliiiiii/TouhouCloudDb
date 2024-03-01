import "./models/artist";
import "./models/release";
import "./models/song";

import sequelize from "./query";
import logger from "../utils/logger";

const syncDatabase = async (): Promise<void> => {
    try {
        await sequelize.sync({alter: true, logging: false});
        logger.info("Models sync done");
    } catch (error) {
        logger.error("Models sync failed", error);
    }
}

export default syncDatabase;
