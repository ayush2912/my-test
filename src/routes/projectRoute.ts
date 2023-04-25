import { Request, Response, Router } from 'express';
import { getProjectDetails } from '../services/projectService';
import {
    validateProjectIdParamsSchema,
} from '../middlewares/validation';

export default function routes(router: Router) {
    router.get(
        '/projects/:projectId',
        validateProjectIdParamsSchema,
        async (req: Request, res: Response) => {
            try {
                console.info('----- /projects/:projectId ----');

                const results = await getProjectDetails(req.params.projectId);

                res.sendSuccess({
                    msg: 'Project Details Retrived Successfully',
                    data: results,
                    custom_code: 'PROJECT_DETAILS_RETRIVED_SUCCESSFULLY'
                    
                });
            } catch (error) {
                res.sendError(error);
            }
        }
    );
}
