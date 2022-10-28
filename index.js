const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const configObj = require('./configs/config');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
configObj.setEnv(process.argv[2]);
const cofig=configObj.props();

const db = require("./configs/postgres.conf");
const req = require('express/lib/request');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboyBodyParser())

db.sequelize.sync()
  .then(() => {
    logger.info("Synced db.");
  })
  .catch((err) => {
    logger.error("Failed to sync db: " + err.message);
  });


app.get("/health", (req, res) => {
    logger.info(`Success`);
    res.json({ message: "App is Healthy" });
});
require("./app/routes")(app);

const PORT=cofig.app.PORT || 8081;

let server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}.`);
  });

server.keepAliveTimeout = 61 * 1000;
server.headersTimeout = 62 * 1000;