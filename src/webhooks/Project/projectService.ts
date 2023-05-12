import {
    getProjectById,
    createProject,
    deleteProject,
    getProjectsByStrapiId,
    updateProjectData,
} from '../../actions/projects';

import { deleteEngagementsByStrapiIds } from '../../actions/engagements';
import { deleteTasksByStrapiIds } from '../../actions/tasks';

import {
    getProjectOwners,
    mappedProjectData,
    mappedProjectWithStrapi,
    deletedStrapiIds,
} from './projectUtility';

import { compareAndUpdate } from '../../utility/utils';
import Errors from '../../errors';

/**
 * This method used to create project form strapi-webhook.
 * @param {string} entryId strapi id of the project
 * @param {object} data payload of the project
 * @returns {object}  data of the project details
 */
async function createProjectStrapi(entryId: number, data: any) {
    try {
        console.info(
            '----- In Webhook projectService of createProjectStrapi method ------'
        );

        const projectOwners = await getProjectOwners(entryId);

        const combinedData = { ...data, ...projectOwners };
        const mappedData = mappedProjectData(combinedData);

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

/**
 * This method used to update project form strapi-webhook.
 * @param {string} entryId strapi id of the project
 * @param {object} data payload of the project
 * @returns {object}  data of the project details
 */
async function updateProjectStrapi(entryId: number, data: any) {
    try {
        console.info(
            '----- In Webhook projectService of updateProjectStrapi method ------'
        );

        const project = await getProjectsByStrapiId(entryId.toString());

        if (!project.length) {
            throw new Errors.BadRequest('Project do not exist in system');
        }

        const projectId = project[0].id;
        const getDetails = await getProjectById(projectId);

        const projectOwners = await getProjectOwners(entryId);
        const combinedData = { ...data, ...projectOwners };

        const mappedData = mappedProjectData(combinedData);
        const mappedDatawithStarpi = mappedProjectWithStrapi(getDetails);

        const updatedData = compareAndUpdate(mappedDatawithStarpi, mappedData);

        const deletedIds = await deletedStrapiIds(getDetails, mappedData);

        if (deletedIds.missingTaskIds) {
            await deleteTasksByStrapiIds(deletedIds.missingTaskIds);
        }

        if (deletedIds.missingEngagementIds > 0) {
            await deleteEngagementsByStrapiIds(deletedIds.missingEngagementIds);
        }

        const updatedDetails = await updateProjectData(projectId, updatedData);

        return updatedDetails;
    } catch (error) {
        console.error(
            '***** Error in Webhook projectService of updateProjectStrapi method *****',
            error
        );
        throw error;
    }
}

/**
 * This method used to delete project.
 * @param {number} entryId id of the project
 * @param {object} data payload of the project
 * @returns {object}  data of the project details
 */
async function deleteProjectStrapi(strapiId: number) {
    try {
        console.info(
            '----- In Webhook projectService of deleteProjectStrapi method ------'
        );

        const project = await getProjectsByStrapiId(strapiId.toString());

        if (!project.length) {
            throw new Errors.BadRequest('Project do not exist in system');
        }

        const projectId = project[0].id;
        const deletedProjectDetails = await deleteProject(projectId);

        return deletedProjectDetails;
    } catch (error) {
        console.error(
            '***** Error in Webhook projectService of deleteProjectStrapi method *****',
            error
        );
        throw error;
    }
}

export { createProjectStrapi, updateProjectStrapi, deleteProjectStrapi };
