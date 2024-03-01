require("dotenv").config();
const path = require('path');
const config = {
    development: {
        database: {
            host: "localhost",
            username: "root",
            password: "zjy06282109",
            database_name: "touhoudbtest",
        },
        server: {
            port: 3007,
        },
        log_dir: path.join(__dirname, "..", "logs"),
    },
    test: {},
    production: {}
};

module.exports = config[process.env.NODE_ENV || "development"];

