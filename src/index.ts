import express from 'express';
import { Server } from 'http';
require('dotenv').config();

//initialise express router
const router = express.Router();

let bodyParser = require('body-parser');

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

const app = express();

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

const routes = require('./routes/routes');

app.use('/',router);

routes(router); 

const PORT = process.env.APP_PORT;

const server: Server = app.listen((process.env['NODE_PORT'] || process.env['APP_PORT']), () => {
    console.log(`App is active at ${PORT}!`); 
});

export default app;