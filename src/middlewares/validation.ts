import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

import Errors from '../errors';
import PostConstants from '../utility/constants/PostConstants'

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
        id: z.string().length(24, PostConstants.INVALID_POST_ID),
    }),
    'params'
);

// Validate request body
const validateCreatePostSchema = validateRequest(
    z.object({
        title: z.string({
            required_error: PostConstants.TITLE_REQUIRED,
            invalid_type_error: PostConstants.INVALID_TITLE,
        }),
        content: z.string({
            required_error: PostConstants.CONTENT_REQUIRED,
            invalid_type_error: PostConstants.INVALID_CONTENT,
        }),
    }),
    'body'
);

export { validatePostIdParamsSchema, validateCreatePostSchema };
