import Errors from '../errors';
import { getProject } from '../actions/projects';
import ProjectConstants from '../utility/constants/ProjectConstants'

/**
 * This method get project details from project id.
 * @param {projectId} Id of the project
 * @returns {Object}  data of the project details
 */
async function getProjectDetails(projectId: string) {
    try {
        console.info('-----In getProjectDetails method of ProjectService ------');

        const getProjectData = await getProject(projectId);

        if (!getProjectData) {
            throw new Errors.BadRequest(ProjectConstants.INVALID_PROJECT_ID);
        }

        return getProjectData;
    } catch (error) {
        console.error(
            '***** Error in ProjectService of getProjectDetails method *****',
            error
        );
        throw error;
    }
}

export { getProjectDetails };
