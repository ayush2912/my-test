import { Request, Response, Router } from 'express';
import {
    getProjectDetails, 
    getProjectList,
    getProjectEngagementDetails
} from '../services/projectService';
import {
    validateProjectIdParamsSchema,
    validateProjectsQueryParamsSchema
} from '../middlewares/validation';
import ProjectConstants from '../utility/constants/ProjectConstants';
import { QueryParams } from "../interfaces/project.interface"
import { string } from 'zod';


export default function routes(router: Router) {
    router.get(
        '/projects/:projectId',
        validateProjectIdParamsSchema,
        async (req: Request, res: Response) => {
            try {
                console.info('----- /projects/:projectId ----');

                const results = await getProjectDetails(req.params.projectId);

                res.sendSuccess({
                    msg: ProjectConstants.PROJECT_DETAILS_RETRIEVED,
                    data: results,
                    customCode: 'PROJECT_DETAILS_RETRIEVED_SUCCESSFULLY',
                });
            } catch (error) {
                res.sendError(error);
            }
        }
    );

    router.get('/project-engagements/', async (req: Request, res: Response) => {
        try {
            console.info('----- /project-engagements/ ----');

            const results = await getProjectEngagementDetails();

            res.sendSuccess({
                msg: ProjectConstants.PROJECT_ENGAGEMENT_DETAILS_RETRIEVED,
                data: results,
                customCode: 'PROJECT_ENGAGEMENT_DETAILS_RETRIEVED_SUCCESSFULLY',
            });
        } catch (error) {
            res.sendError(error);
        }
    });

    router.get(
        '/projects',
        validateProjectsQueryParamsSchema,
        async (req: Request, res: Response) => {
            try {
                console.info('----- /projects ----');

                const {organizationIds, take, skip, tab} = req.query;

                let queryParams: QueryParams = {
                    organizationIds: organizationIds as string,
                    take: Number(take),
                    skip: Number(skip),
                    tab: tab as string
                }
                let getProjectListInput = {
                    ...queryParams,
                    organizationIds: queryParams.organizationIds.split(',')
                }
                
                const results = await getProjectList(getProjectListInput);

                res.sendSuccess({
                    msg: ProjectConstants.PROJECT_RETRIEVED,
                    data: results,
                    customCode: 'PROJECTS_RETRIEVED_SUCCESSFULLY',
                });
            } catch (error) {
                res.sendError(error);
            }
        }
    );
}
