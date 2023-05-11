import { formatDate } from '../../utility/utils';
import axios from 'axios';

/**
 * This method used to mapped project data coming from strapi project creation.
 * @param {number} strapProjectId data coming from strapi
 * @returns {object}  mapped data with project model
 */
async function getProjectOwners(strapProjectId: number) {
    try {
        console.debug(
            '----- In Webhook projectUtility of getProjectOwners method ------'
        );
        const baseUrl = process.env.STRAPI_BASE_URL;

        const res = await axios.get(
            `${baseUrl}/api/projects/${strapProjectId}?populate=deep,2`
        );

        const data = res?.data?.data?.attributes || {};
        const result: any = {};

        const portfolioOwner = data?.PortfolioOwner?.data?.attributes?.Name;

        const assetOwners =
            data.AssetOwners?.data?.length > 0
                ? data.AssetOwners.data.map(
                      (owner: any) => owner.attributes.Name
                  )
                : [];

        if (portfolioOwner) {
            result.PortfolioOwner = portfolioOwner;
        }

        if (assetOwners && assetOwners.length > 0) {
            result.AssetOwners = assetOwners;
        }

        return result;
    } catch (error) {
        console.error(
            '----- Error in Webhook projectUtility of getProjectOwners method ------',
            error
        );
    }
}

/**
 * This method used to mapped project data coming from strapi project creation.
 * @param {object} data data coming from strapi
 * @returns {object}  mapped data with project model
 */
function mappedProjectData(data: any) {
    console.debug(
        '----- In Webhook projectUtility of mappedProjectData method -----'
    );

    const mappedData = {
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
        annualApproximateCreditVolume: parseInt(
            data.Annualapproximatecreditvolume
        ),
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
                type: task.TaskType,
                startDate: formatDate(task.TaskStartDate),
                dueDate: formatDate(task.TaskDueDate),
                completedDate: formatDate(task.TaskCompletedDate),
                state: task.TaskState,
                strapiId: task.id.toString(),
            })),
            strapiId: engagement.id.toString(),
        })),
        portfolioOwner: data.PortfolioOwner,
        assetOwners: data.AssetOwners,
        strapiId: data.id.toString(),
    };

    return mappedData;
}

/**
 * This method used to mapped project data coming from strapi project creation.
 * @param {object} data data coming from database
 * @returns {object}  mapped data according to data coming from strapi
 */
function mappedProjectWithStrapi(data: any) {
    console.debug(
        '----- In Webhook projectUtility of mappedProjectData method -----'
    );

    const mappedData = {
        name: data.name,
        registry: data.registry.name,
        registryUrl: data.registryUrl.trim(),
        registryProjectId: data.registryProjectId,
        countries: data.countries.map((country: any) => country.iso2Name),
        states: data.states,
        methodologies: data.methodologies.map(
            (methodology: any) => methodology.code
        ),
        type: data.types[0].name,
        subType: data.subTypes[0].name,
        notes: data.notes,
        creditingPeriodStartDate: data.creditingPeriodStartDate,
        creditingPeriodEndDate: data.creditingPeriodEndDate,
        annualApproximateCreditVolume: data.annualApproximateCreditVolume,
        portfolioOwner: data.portfolioOwner.name,
        assetOwners: data.assetOwners.map((assetOwner: any) => assetOwner.name),
        strapiId: data.strapiId,
    };
    return mappedData;
}

/**
 * This method used to identify keys which is deleted.
 * @param {object} Ob1 old data
 * @param {object} Ob12 new updated data
 * @returns {object}  missingTaskIds missingEngagementIds
 */
function deletedStrapiIds(Ob1: any, Ob2: any) {
    console.debug(
        '----- In Webhook projectUtility of deletedStrapiIds method -----'
    );

    const sIdKeys: any = [];

    Ob2.engagements.forEach((data: any) => sIdKeys.push(data.strapiId));

    let missingTaskIds: any = [];
    const missingEngagementIds: any = [];

    Ob1.engagements.forEach((data: any) => {
        const index = sIdKeys.indexOf(data.strapiId);

        if (index != -1) {
            const obj1task = data.tasks;
            const obj2task = Ob2.engagements[index].tasks;
            const a: any = [];
            obj1task.forEach((data: any) => {
                a.push(data['strapiId']);
            });
            const b: any = [];
            obj2task.forEach((data: any) => {
                b.push(data['strapiId']);
            });
            missingTaskIds = a.filter((data: any) => !b.includes(data));
        } else {
            missingEngagementIds.push(data.strapiId);
            data.tasks.forEach((data: any) => {
                missingTaskIds.push(data.strapiId);
            });
        }
    });
    return { missingEngagementIds, missingTaskIds };
}

export {
    getProjectOwners,
    mappedProjectData,
    mappedProjectWithStrapi,
    deletedStrapiIds,
};
