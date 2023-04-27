import { Request, Response, NextFunction } from 'express';

import {
    constructResponse,
    constructErrorResponse,
    safelySetHeaders,
} from '../ServiceHandler';

import formatSuccessResponse from '../utility/ResponseEnvelope';

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

export { responseMiddleware };
