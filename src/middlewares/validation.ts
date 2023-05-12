import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

import Errors from '../errors';
import ProjectConstants from '../utility/constants/ProjectConstants';

const validateRequest =
    (bodySchema?: z.ZodType<any>, paramsSchema?: z.ZodType<any>, querySchema?: z.ZodType<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const bodyData = req.body;
        const paramsData = req.params;
        const queryData = req.query;
        const errorResponse = new Errors.PreConditionFailed();

        if (paramsSchema && Object.keys(paramsData).length > 0) {
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

        if (querySchema && Object.keys(queryData).length > 0) {
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
)

const engagementTaskSchema = z
    .object({
        type: z
            .string()
            .nonempty({ message: 'Task type must be a non-empty string' }),
        startDate: z.date({
            invalid_type_error: 'Task start date must be a valid date',
        }),
        dueDate: z.date({
            invalid_type_error: 'Task start date must be a valid date',
        }),
        completedDate: z.date().optional(),
        state: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'], {
            invalid_type_error: 'Invalid task state',
        }),
    })
    .array()
    .nonempty({ message: 'Engagement must have at least one task' });

const engagementAttributeSchema = z
    .object({
        name: z
            .string()
            .nonempty({ message: 'Attribute name must be a non-empty string' }),
        type: z.enum(['String', 'Number', 'Date', 'Year'], {
            invalid_type_error: 'Invalid task state',
        }),
        value: z.any().optional(),
    })
    .array();

const engagementSchema = z.object({
    type: z
        .string()
        .nonempty({ message: 'Engagement type must be a non-empty string' }),
    startDate: z.date({
        invalid_type_error: 'Engagement start date must be a valid date',
    }),
    dueDate: z.date({
        invalid_type_error: 'Engagement due date must be a valid date',
    }),
    completedDate: z.date().optional(),
    state: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'], {
        invalid_type_error: 'Invalid task state',
    }),
    notes: z.string().optional(),
    Task: engagementTaskSchema,
    attributes: engagementAttributeSchema,
});

const projectSchema = validateRequest(
    z.object({
        name: z
            .string({
                required_error: 'project name is required',
            })
            .trim()
            .min(1, 'ProjectName must be a non-empty string'),
        registry: z
            .string()
            .trim()
            .min(1, 'registry must be a non-empty string'),
        registryProjectId: z
            .string()
            .trim()
            .min(1, 'registryProjectId must be a non-empty string'),
        registryUrl: z
            .string()
            .trim()
            .min(1, 'registryUrl must be a non-empty string'),
        states: z
            .string()
            .trim()
            .min(1, 'StateorRegion must be a non-empty string'),
        notes: z.string().min(1).trim().max(1400),
        creditingPeriodStartDate: z
            .string()
            .trim()
            .regex(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/i,
                'creditingPeriodStartDate must be a valid ISO date string'
            ),
        creditingPeriodEndDate: z
            .string()
            .trim()
            .regex(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/i,
                'creditingPeriodEndDate must be a valid ISO date string'
            ),
        annualApproximateCreditVolume: z
            .string()
            .trim()
            .min(1, 'annualApproximateCreditVolume must be a non-empty string'),
        methodologies: z.array(
            z
                .string()
                .trim()
                .min(1, 'methodologies items must be non-empty strings')
        ),
        countries: z.array(
            z
                .string({
                    required_error: 'countries is required',
                })
                .trim()
                .length(3, 'Country items must be 3-character country codes')
        ),
        type: z
            .string({
                required_error: 'type is required',
            })
            .trim()
            .min(1, 'ProjectType must be a non-empty string'),
        subType: z
            .string({
                required_error: 'subType is required',
            })
            .trim()
            .min(1, 'ProjectSubType must be a non-empty string'),
        engagements: z.array(engagementSchema),
    })
);

export { validateProjectIdParamsSchema, validateProjectsQueryParamsSchema, projectSchema };
