import express from 'express';
import { Server } from 'http';
require('dotenv').config();

let bodyParser = require('body-parser');

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

const app = express();

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

const PORT = process.env.APP_PORT;

const server: Server = app.listen((process.env['NODE_PORT'] || process.env['APP_PORT']), () => {
    console.log(`App is active at ${PORT}!`); 
});

export default app;