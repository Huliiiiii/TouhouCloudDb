require("./models/artist");
require("./models/release");
require("./models/song");

const sequelize = require("./query");

sequelize.sync({alter: true, logging: false}).then(() => {
    console.log("Models sync done");
}).catch((error) => {
    console.error("Models sync failed", error);
});
