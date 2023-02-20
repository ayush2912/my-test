import express from "express";
import { Server } from "http";
import dotenv from "dotenv";

import bodyParser from "body-parser";

import routes from "./routes/routes";

dotenv.config();

//initialise express router
const router = express.Router();

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

const app = express();

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use("/", router);

routes(router);

const PORT = process.env.APP_PORT;

const server: Server = app.listen(
  process.env["NODE_PORT"] || process.env["APP_PORT"],
  () => {
    console.log(`App is active at ${PORT}!`);
  }
);

export default app;
