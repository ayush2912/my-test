import { Prisma, PrismaClient } from '@prisma/client';

// import prisma from './prisma';

const prisma = new PrismaClient();

const TaskSchema: Prisma.TaskSelect = {
    id: true,
    engagementId: true,
    type: true,
    startDate: true,
    dueDate: true,
    completedDate: true,
    state: true,
    stateHistory: true,
    createdAt: true,
    updatedAt: true,
};

const ProjectSchema: Prisma.ProjectSelect = {
    id: true,
    createdAt: true,
    updatedAt: true,
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
        select: {
            id: true,
            type: true,
            startDate: true,
            dueDate: true,
            completedDate: true,
            state: true,
            notes: true,
            projectId: true,
            stateHistory: true,
            attributes: true,
            createdAt: true,
            updatedAt: true,
            tasks: {
                select: TaskSchema,
                orderBy: [{ startDate: 'asc' }, { type: 'asc' }],
            },
        },
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
};

const isEngagementOverdue = (engagement: any) => {
    if (engagement?.state === 'COMPLETED') {
        if (!engagement.completedDate) {
            return false;
        }

        if (engagement?.completedDate >= engagement?.dueDate) {
            return true
        }
    }

    if (engagement?.state === 'IN_PROGRESS' || engagement?.state === 'NOT_STARTED') {
        if (engagement.dueDate <= new Date()) {
            return true; 
        }
    }

    return false; 
};

type GetProjectsOptions = {
    organizationIds?: string[];
    take?: number; 
    skip?: number;
}

const applyGetProjectsFilters = (options: GetProjectsOptions) => {

    const filters: Prisma.ProjectWhereInput = {};

    if  (options.organizationIds) {
        filters.organizationId = {
            in: options.organizationIds
        }
    }

    return filters
};

const getProjectById = async (projectId: string) =>
    prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: ProjectSchema,
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
            organization: {
                connect: {
                    id: data.organization,
                },
            },
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

const getProjects = async(options: GetProjectsOptions) => 
    prisma.project.findMany({
        where: applyGetProjectsFilters(options),
        take: options.take || 10, 
        skip: options.skip || 0,
        orderBy: { 
            createdAt: "desc"
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            registry: {
                select: {
                    name: true, 
                }
            },
            registryProjectId: true,
            countries: {
                select: {
                    iso2Name: true,
                    name: true,
                } 
            },
            types: true,
            subTypes: true,
            portfolioOwner: {
                select: {
                    id: true,
                    name: true,
                }
            },
            assetOwners: {
                select: {
                    id: true,
                    name: true,
                }
            },
            annualApproximateCreditVolume: true,
            engagements: {
                where: {
                    startDate: {
                        lte: new Date(),
                    },
                },
                select: {
                    id: true,
                    type: true,
                    dueDate: true,
                    completedDate: true,
                    state: true,
                },
                orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
                take: 1
            },
        },
    }).then(results => results.map(result => ({
        id: result.id,
        name: result.name,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        registry: result.registry,
        registryProjectId: result.registryProjectId,
        countries: result.countries,
        types: result.types,
        subTypes: result.subTypes,
        engagements: {
            ...result.engagements.pop(),
            isOverdue: isEngagementOverdue(result.engagements.pop())
        },
        annualApproximateCreditVolume: result.annualApproximateCreditVolume,
        portfolioOwner: result.portfolioOwner,
        assetOwners: result.assetOwners,

    })));


export { getProjectById, createProject, updateProject, deleteProject, getProjects };
