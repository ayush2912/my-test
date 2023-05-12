import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes/project.route';
import webhookRoutes from './webhooks/webhook.route';

import { responseMiddleware } from './middlewares/customMiddleware';

export const App = () => {
    const app: Express = express();

    app.use(express.json());
    app.use(morgan('combined'));
    app.use(helmet());

    // Handle CORS error
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        if (req.method === 'OPTIONS') {
            res.header(
                'Access-Control-Allow-Methods',
                'PUT, POST, PATCH, DELETE, GET'
            );
            return res.status(200).json({});
        }
        next();
    });

    const whitelist = [process.env.LOCAL, process.env.DEV, process.env.STAGING];
    const corsOptions = {
        origin: (origin: any, callback: any) => {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    };

    app.use(cors());

    app.use(responseMiddleware());

    const router = express.Router();

    app.use(router);

    routes(router);
    webhookRoutes(router);

    app.get('/health', (req: Request, res: Response) => {
        res.status(200).send('Health Check !!');
    });

    return app;
};
