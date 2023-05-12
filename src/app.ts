import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes/projectRoute';

import { responseMiddleware } from './middlewares/customMiddleware';

export const App = () => {
    const app: Express = express();

    app.use(express.json());
    app.use(morgan('combined'));
    app.use(helmet());

    app.use(cors());

    app.use(responseMiddleware());

    const router = express.Router();

    app.use(router);

    routes(router);

    app.get('/health', (req: Request, res: Response) => {
        res.status(200).send('Health Check !!');
    });

    return app;
};
