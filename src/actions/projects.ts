import { ConsoleLogger } from 'typedoc/dist/lib/utils';
import { prisma, Prisma } from '../actions/prisma';
import { EngagementSchema } from './enagagements';

const ProjectSchema: Prisma.ProjectSelect = {
    id: true,
    name: true,
    registry: {
        select: {
            id: true,
            name: true,
        },
    },
    registryProjectId: true,
    registryUrl: true,
    countries: {
        select: {
            id: true,
            iso2Name: true,
            iso3Name: true,
            name: true,
        },
    },
    states: true,
    methodologies: {
        select: {
            id: true,
            name: true,
        },
    },
    types: {
        select: {
            id: true,
            name: true,
        },
    },
    subTypes: {
        select: {
            id: true,
            name: true,
        },
    },
    notes: true,
    isActive: true,
    engagements: {
        select: EngagementSchema,
        orderBy: [{ startDate: 'asc' }, { type: 'asc' }],
    },
    creditingPeriodStartDate: true,
    creditingPeriodEndDate: true,
    annualApproximateCreditVolume: true,
    portfolioOwner: {
        select: {
            id: true,
            name: true,
        },
    },
    assetOwners: {
        select: {
            id: true,
            name: true,
        },
    },
    createdAt: true,
    updatedAt: true,
};

const getProject = async (projectId: string) =>
    prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: ProjectSchema,
    });

const getProjectEngagements = async () =>
    prisma.project.findMany({
        select: {
            id: true,
            name: true,
            registry: {
                select: {
                    id: true,
                    name: true,
                },
            },
            registryProjectId: true,
            types: {
                select: {
                    id: true,
                    name: true,
                },
            },
            countries: {
                select: {
                    id: true,
                    iso2Name: true,
                    iso3Name: true,
                    name: true,
                },
            },
            isActive: true,
            createdAt: true,
            updatedAt: true,
            engagements: {
                select: EngagementSchema,
                orderBy: [{ startDate: 'asc' }, { type: 'asc' }],
            },
        },
    });

const createProject = (data: any) => {
    return prisma.project.create({
        data: {
            name: data.name,
            registry: {
                connect: {
                    id: data.registry,
                },
            },
            registryProjectId: data.registryProjectId,
            registryUrl: data.registryUrl,
            countries: {
                connect: data.countries.map((country: string) => ({
                    iso2Name: country,
                })),
            },
            states: data.states,
            methodologies: {
                connect: data.methodologies.map((methodologyId: string) => ({
                    id: methodologyId,
                })),
            },
            types: {
                connect: [
                    {
                        id: data.type,
                    },
                ],
            },
            subTypes: {
                connect: [
                    {
                        id: data.subType,
                    },
                ],
            },
            notes: data.notes,
            engagements: {
                connect: data.engagements
                    ? data.engagements.map((engagementId: string) => ({
                        id: engagementId,
                    }))
                    : [],
            },
            creditingPeriodStartDate: data.creditingPeriodStartDate,
            creditingPeriodEndDate: data.creditingPeriodEndDate,
            annualApproximateCreditVolume: data.annualApproximateCreditVolume,
            portfolioOwner: {
                connect: {
                    id: data.portfolioOwner,
                },
            },
            assetOwners: {
                connect: data.assetOwners
                    ? data.assetOwners.map((ownerId: string) => ({
                        id: ownerId,
                    }))
                    : [],
            },
            isActive: true,
        },
        select: ProjectSchema,
    });
};

const updateProject = (projectId: string, data: any) => {
    return prisma.project.update({
        where: {
            id: projectId,
        },
        data: data,
        select: ProjectSchema,
    });
};

const deleteProject = async (projectId: string | undefined) => {
    const engagements = await prisma.engagement.findMany({
        where: {
            projectId: projectId,
        },
        select: {
            id: true,
        },
    });

    const engagementIds = engagements.map((engagement) => engagement.id);

    await prisma.engagement.deleteMany({
        where: {
            id: {
                in: engagementIds,
            },
        },
    });

    return prisma.project.delete({
        where: {
            id: projectId,
        },
        select: {
            name: true,
        },
    });
};

export {
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectEngagements,
};
