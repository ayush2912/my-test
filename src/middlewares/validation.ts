import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

import Errors from '../errors';
import ProjectConstants from '../utility/constants/ProjectConstants'

const validateRequest =
    (schema: z.ZodType<any>, source: 'body' | 'params') =>
        (req: Request, res: Response, next: NextFunction) => {
            const requestData = source === 'body' ? req.body : req.params;
            try {
                const validatedData = schema.parse(requestData);

                if (source === 'body') {
                    req.body = validatedData;
                } else {
                    req.params = validatedData;
                }
                next();
            } catch (error: any) {
                const er = new Errors.PreConditionFailed();

                if (error instanceof z.ZodError) {
                    if (
                        error?.errors &&
                        Array.isArray(error.errors) &&
                        error.errors.length > 0
                    ) {
                        error.errors.forEach((error) => {
                            er.push(new Errors.PreConditionFailed(error.message));
                        });
                    }
                    res.sendError(er);
                }
            }
        };

const validateProjectIdParamsSchema = validateRequest(
    z.object({
        projectId: z.string().length(24, ProjectConstants.INVALID_PROJECT_ID),
    }),
    'params'
);

export { validateProjectIdParamsSchema };
