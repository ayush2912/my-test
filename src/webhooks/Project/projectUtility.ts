import { formatDate } from '../../utility/utils';

/**
 * This method used to mapped project data coming from strapi project creation.
 * @param {Object} data data coming from strapi
 * @returns {Object}  mapped data with project model
 */
function mappedProjectData(data: any) {
    console.debug('----- In Webhook projectUtility of mappedProjectData method -----');

    data = {
        name: data.ProjectName,
        registry: data.Registry,
        registryUrl: data.RegistryURL,
        registryProjectId: data.RegistryProjectID,
        countries: data.Country,
        states: [data.StateorRegion],
        methodologies: data.Methodology,
        type: data.ProjectType,
        subType: data.ProjectSubType,
        notes: data.Notes,
        creditingPeriodStartDate: formatDate(data.CreditingPeriodStartDate),
        creditingPeriodEndDate: formatDate(data.CreditingPeriodEndDate),
        annualApproximateCreditVolume: parseInt(data.Annualapproximatecreditvolume),
        engagements: data.Engagement.map((engagement: any) => ({
            type: engagement.EngagementType,
            startDate: formatDate(engagement.EngagementStartDate),
            dueDate: formatDate(engagement.EngagementDueDate),
            completedDate: formatDate(engagement.EngagementCompletedDate),
            notes: engagement.EngagementNotes,
            state: engagement.EngagementState,
            attributes: engagement.Attribute.map((attribute: any) => ({
                name: attribute.AttributeName,
                type: attribute.AttributeType,
                value: attribute.AttributeValue,
                strapiId: attribute.id.toString(),
            })),
            tasks: engagement.Task.map((task: any) => ({
                id: task.id,
                type: task.TaskType,
                startDate: formatDate(task.TaskStartDate),
                dueDate: formatDate(task.TaskDueDate),
                completedDate: formatDate(task.TaskCompletedDate),
                state: task.TaskState,
                strapiId: task.id,
            })),
            strapiId: engagement.id,
        })),
        // portfolioOwner: data.PortfolioOwner,
        // assetOwners: data.AssetOwners
        strapiId: data.id
    };

    return data;
}

export { mappedProjectData };