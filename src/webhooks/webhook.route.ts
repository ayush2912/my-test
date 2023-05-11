import { Request, Response, Router } from 'express';
import {
    createProjectStrapi,
    updateProjectStrapi,
    deleteProjectStrapi,
} from './Project/projectService';

import { events, EventTypes } from '../services/events';

export default function webhookRoutes(router: Router) {
    router.post('/strapi-webhook', async (req: Request, res: Response) => {
        try {
            console.info('----- /strapi-webhook ----');

            console.log(JSON.stringify(req.body, null, 2));

            const payload = req.body;
            const event = payload.event;
            const model = payload.model;
            const entryId = payload.entry.id;

            switch (event) {
                case 'entry.create':
                    switch (model) {
                        case 'project':
                            events.emit(
                                EventTypes.CREATING_STRAPI_PROJECT,
                                payload.entry.ProjectName
                            );
                            try {
                                await createProjectStrapi(
                                    entryId,
                                    payload.entry
                                );
                            } catch (error) {
                                events.emit(
                                    EventTypes.STRAPI_PROJECT_VALIDATION_FAILED,
                                    payload.entry.ProjectName,
                                    error
                                );
                            }

                            break;
                    }
                    break;
                case 'entry.update':
                    switch (model) {
                        case 'project':
                            events.emit(
                                EventTypes.UPDATING_STRAPI_PROJECT,
                                payload.entry.ProjectName
                            );
                            try {
                                await updateProjectStrapi(
                                    entryId,
                                    payload.entry
                                );
                            } catch (error) {
                                events.emit(
                                    EventTypes.STRAPI_PROJECT_VALIDATION_FAILED,
                                    payload.entry.ProjectName,
                                    error
                                );
                            }

                            break;
                    }
                    break;
                case 'entry.delete':
                    switch (model) {
                        case 'project':
                            events.emit(
                                EventTypes.DELETING_STRAPI_PROJECT,
                                payload.entry.ProjectName
                            );
                            try {
                                await deleteProjectStrapi(entryId);
                            } catch (error) {
                                events.emit(
                                    EventTypes.STRAPI_PROJECT_VALIDATION_FAILED,
                                    payload.entry.ProjectName,
                                    error
                                );
                            }

                            break;
                    }
                    break;
                default:
                    // Handle unknown event
                    break;
            }
        } catch (error) {
            res.sendError(error);
        }
    });
}
