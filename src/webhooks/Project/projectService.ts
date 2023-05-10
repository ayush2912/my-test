import { createProject } from '../../actions/projects'
import { mappedProjectData } from './projectUtility';

/**
 * This method used to create project form strapi-webhook.
 * @param {Object} data payload of the project
 * @returns {Object}  data of the project details
 */
async function createProjectStrapi(data: any) {
    try {
        console.info(
            '----- In Webhook projectService of createProjectStrapi method ------'
        );

        const mappedData = mappedProjectData(data);

        const projectDetails = await createProject(mappedData);

        return projectDetails;

    } catch (error) {
        console.error(
            '***** Error in Webhook projectService of createProjectStrapi method *****',
            error
        );
        throw error;
    }
}

export { createProjectStrapi };