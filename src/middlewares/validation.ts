import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

import Errors from '../errors';
import ProjectConstants from '../utility/constants/ProjectConstants';

const validateRequest =
    (
        bodySchema?: z.ZodType<any>,
        paramsSchema?: z.ZodType<any>,
        querySchema?: z.ZodType<any>
    ) =>
    (req: Request, res: Response, next: NextFunction) => {
        const bodyData = req.body;
        const paramsData = req.params;
        const queryData = req.query;
        console.log(bodyData);
        console.log(paramsData);
        console.log(queryData);
        const errorResponse = new Errors.PreConditionFailed();

        if (paramsSchema) {
            try {
                const validatedParamsData = paramsSchema.parse(paramsData);
                req.params = validatedParamsData;
            } catch (error: any) {
                if (error instanceof z.ZodError) {
                    error.errors.forEach((err) => {
                        errorResponse.push(
                            new Errors.PreConditionFailed(err.message)
                        );
                    });
                }
            }
        }

        if (querySchema) {
            try {
                const validatedQueryParamsData = querySchema.parse(queryData);
                req.query = validatedQueryParamsData;
            } catch (error: any) {
                if (error instanceof z.ZodError) {
                    error.errors.forEach((err) => {
                        errorResponse.push(
                            new Errors.PreConditionFailed(err.message)
                        );
                    });
                }
            }
        }

        if (bodySchema && Object.keys(bodyData).length > 0) {
            try {
                const validatedBodyData = bodySchema.parse(bodyData);
                req.body = validatedBodyData;
            } catch (error: any) {
                if (error instanceof z.ZodError) {
                    error.errors.forEach((err) => {
                        errorResponse.push(
                            new Errors.PreConditionFailed(err.message)
                        );
                    });
                }
            }
        }

        if (errorResponse.errors.length > 1) {
            res.sendError(errorResponse);
        } else {
            next();
        }
    };

const validateProjectIdParamsSchema = validateRequest(
    z.object({
        projectId: z.string().length(24, ProjectConstants.INVALID_PROJECT_ID),
    })
);

const validateProjectsQueryParamsSchema = validateRequest(
    z.object({
        organizationIds: z.string(),
        take: z.number().min(10).max(10),
        skip: z.number().min(0),
        tab: z.enum(['ACTIVE', 'INACTIVE']),
    })
);

export const validateProjectEngagementsQueryParamsSchema = validateRequest(
    undefined,
    undefined,
    z.object({
        organizationIds: z
            .string({
                invalid_type_error: 'Invalid Organization ID',
                required_error: 'Organization IDs is required',
            })
            .min(24),
        take: z.number().min(10).max(100).default(10),
        skip: z.number().min(0).default(0),
    })
);

export { validateProjectIdParamsSchema, validateProjectsQueryParamsSchema };
