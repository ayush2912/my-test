
import { Request, Response, Router } from 'express';
import { createProjectStrapi } from './Project/projectService';

export default function webhookRoutes(router: Router) {
    router.post(
        '/strapi-webhook',
        async (req: Request, res: Response) => {
            try {
                console.info('----- /strapi-webhook ----');

               console.log(JSON.stringify(req.body, null, 2));

                const payload = req.body;
                const event = payload.event;
                const model = payload.model;
                //const entryId = payload.entry.id;

                switch (event) {
                    case 'entry.create':
                        switch (model) {
                            case 'project':
                                // Handle project create event
                                const results = await createProjectStrapi(payload.entry);
                                console.log(results);
                                //here call slack notification messsanger

                                break;
                        }
                        break;
                    case 'entry.update':
                        switch (model) {
                            case 'project':
                                // Handle project update event
                                break;
                        }
                        break;
                    case 'entry.delete':
                        switch (model) {
                            case 'project':
                                // Handle project delete event
                                break;
                        }
                        break;
                    default:
                        // Handle unknown event
                        break;
                }

                // res.sendSuccess({
                //     msg: ProjectConstants.PROJECT_DETAILS_RETRIEVED,
                //     data: results,
                //     customCode: 'PROJECT_DETAILS_RETRIEVED_SUCCESSFULLY',
                // });
            } catch (error) {
                res.sendError(error);
            }
        }
    );
}
