import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes/postRoute';

import {
    constructResponse,
    constructErrorResponse,
    safelySetHeaders,
} from './ServiceHandler';

import formatSuccessResponse from './utility/ResponseEnvelope';

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(helmet());

// Handle CORS error
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

const whitelist = ['http://localhost:3000', 'https://dev-dashboard.offsetmax.digital/', 'https://staging-dashboard.offsetmax.digital/'];
let corsOptions = {
    origin: ((origin: any, callback: any) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    })
};

app.use(cors(corsOptions));

declare global {
    namespace Express {
        interface Response {
            sendSuccess: (results: any) => void;
            sendError: (result: any) => void;
        }
    }
}

const responseMiddleware =
    () => (req: Request, res: Response, next: NextFunction) => {
        const sendSuccess = (results: any) => {
            const result = constructResponse(formatSuccessResponse(results));
            safelySetHeaders(res, result.headers);
            res.status(result.status).send(result.body);
        };

        const sendError = (results: any) => {
            const result = constructErrorResponse(results);
            safelySetHeaders(res, result.headers);
            res.status(result.status).send(result.body);
        };

        res.sendSuccess = sendSuccess;
        res.sendError = sendError;

        next();
    };

app.use(responseMiddleware());

const router = express.Router();

app.use(router);

routes(router);

app.get('/health', (req: any, res: any) => {
    res.status(200).send('Health Check !!');
});

app.listen(PORT, () => {
    console.info(`Server listening at port=${PORT}`);
});
