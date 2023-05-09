import Errors from '../errors';
import { getProject, getProjectEngagements } from '../actions/projects';
import ProjectConstants from '../utility/constants/ProjectConstants';

/**
 * This method get project details from project id.
 * @param {projectId} Id of the project
 * @returns {Object}  data of the project details
 */
async function getProjectDetails(projectId: string) {
    try {
        console.info(
            '-----In getProjectDetails method of ProjectService ------'
        );

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

async function getProjectEngagementDetails() {
    try {
        console.info(
            '-----In getProjectEngagementDetails method of ProjectService ------'
        );
        const projectEngagements = await getProjectEngagements();
        projectEngagements.forEach((project: any) => {
            project.engagements.forEach((engagement: any) => {
                engagement['isOverdue'] =
                    engagement.completedDate > engagement.dueDate;
                engagement.tasks.forEach((task: any) => {
                    task['isOverdue'] = task.completedDate > task.dueDate;
                });
            });
        });
        return projectEngagements;
    } catch (error) {
        console.error(
            '***** Error in ProjectService of getProjectEngagements method *****',
            error
        );
        throw error;
    }
}

export { getProjectDetails, getProjectEngagementDetails };
