import Errors from '../errors';
import { getProjectById, getProjectEngagements, getProjects } from '../actions/projects';
import ProjectConstants from '../utility/constants/ProjectConstants';
import { type } from 'os';

type GetProjectListInput = {
    organizationIds: string[];
    take: number;
    skip: number;
    tab: string;
}

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

async function getProjectList(projectListInput: GetProjectListInput) {
    try {
        console.info(
            '-----In getProjectList method of ProjectService ------'
        );

        const getProjectListData = await getProjects(projectListInput);

        if (getProjectListData.length === 0) {
            throw new Errors.BadRequest(ProjectConstants.INVALID_ORGANIZATION_ID);
        }

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
