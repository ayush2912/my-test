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

app.use((err, req, res, next) => {
  res.json(err.error);
});

const port = process.env.APP_PORT || process.env.NODE_PORT || 3000;

const server: Server = app.listen(port, () => {
  console.log(`App is active at ${port}!`);
});

export default app;
