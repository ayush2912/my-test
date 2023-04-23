import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

import Errors from '../errors';

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

// Validate request parameters
const validatePostIdParamsSchema = validateRequest(
    z.object({
        id: z.string().min(24, 'Invalid ObjectId').max(24),
    }),
    'params'
);

// Validate request body
const validateCreatePostSchema = validateRequest(
    z.object({
        title: z.string({
            required_error: 'title is required',
            invalid_type_error: 'title must be a string',
        }),
        content: z.string({
            required_error: 'content is required',
            invalid_type_error: 'content must be a string',
        }),
    }),
    'body'
);

export { validatePostIdParamsSchema, validateCreatePostSchema };
