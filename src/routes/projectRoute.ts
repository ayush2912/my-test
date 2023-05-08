import { Request, Response, Router } from 'express';
import {
    getProjectDetails,
    getProjectEngagementDetails,
} from '../services/projectService';
import { validateProjectIdParamsSchema } from '../middlewares/validation';
import ProjectConstants from '../utility/constants/ProjectConstants';

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

    router.get(
        '/project-engagements/:projectId',
        validateProjectIdParamsSchema,
        async (req: Request, res: Response) => {
            try {
                console.info('----- /project-engagements/:projectId ----');

                const results = await getProjectEngagementDetails(
                    req.params.projectId
                );

                res.sendSuccess({
                    msg: ProjectConstants.PROJECT_ENGAGEMENT_DETAILS_RETRIEVED,
                    data: results,
                    customCode:
                        'PROJECT_ENGAGEMENT_DETAILS_RETRIEVED_SUCCESSFULLY',
                });
            } catch (error) {
                res.sendError(error);
            }
        }
    );
}
