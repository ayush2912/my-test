import Errors from '../errors';
import {
    getProjectById,
    getProjectEngagements,
    getProjects,
    getIsOverdue,
} from '../actions/projects';
import ProjectConstants from '../utility/constants/ProjectConstants';
import {
    GetProjectListInput,
    GetProjectEngagementsInput,
} from '../interfaces/project.interface';

/**
 * This method get project details from project id.
 * @param {projectId} Id of the project
 * @returns {object}  data of the project details
 */
async function getProjectDetails(projectId: string) {
    try {
        console.info(
            '-----In getProjectDetails method of ProjectService ------'
        );

        const getProjectData = await getProjectById(projectId);

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

async function getProjectEngagementDetails(
    getProjectEngagementsInput: GetProjectEngagementsInput
) {
    try {
        console.info(
            '-----In getProjectEngagementDetails method of ProjectService ------'
        );
        const projectEngagements = await getProjectEngagements(
            getProjectEngagementsInput
        );
        projectEngagements.forEach((project: any) => {
            project.engagements.forEach((engagement: any) => {
                engagement['isOverdue'] = getIsOverdue(engagement);
                engagement.tasks.forEach((task: any) => {
                    task['isOverdue'] = getIsOverdue(task);
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

async function getProjectList(projectListInput: GetProjectListInput) {
    try {
        console.info('-----In getProjectList method of ProjectService ------');

        const getProjectListData = await getProjects(projectListInput);

        return getProjectListData;
    } catch (error) {
        console.error(
            '***** Error in ProjectService of getProjectList method *****',
            error
        );
        throw error;
    }
}

export { getProjectDetails, getProjectEngagementDetails, getProjectList };