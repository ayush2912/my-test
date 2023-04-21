import { Request, Response, NextFunction } from 'express';
import express from 'express';
import helmet from 'helmet';

import routes from './routes/postRoute';
import {
    constructResponse,
    constructErrorResponse,
    safelySetHeaders,
} from './ServiceHandler';
import formatSuccessResponse from './utility/ResponseEnvelope';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(helmet());

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
