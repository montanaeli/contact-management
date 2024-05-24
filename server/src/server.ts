import express from "express";
import bodyParser from "body-parser";
import { routes } from "./routes";
import dotenv from "dotenv";
import db from "./models";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

// TODO: Enable cors for a production route https://expressjs.com/en/resources/middleware/cors.html
var cors = require("cors");
app.use(cors());

app.use(routes);
app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
