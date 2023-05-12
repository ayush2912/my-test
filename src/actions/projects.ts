import { prisma, Prisma } from '../actions/prisma';
import { EngagementSchema } from './engagements';
import {
    GetProjectEngagementsInput,
    GetProjectListInput,
} from '../interfaces/project.interface';

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

export const getIsOverdue = (object: any) => {
    if (object?.state === 'COMPLETED') {
        if (!object.completedDate) {
            return false;
        }

        if (object?.completedDate >= object?.dueDate) {
            return true;
        }
    }

    if (object?.state === 'IN_PROGRESS' || object?.state === 'NOT_STARTED') {
        if (object.dueDate <= new Date().toISOString()) {
            return true;
        }
    }

    return false;
};

const applyGetProjectsFilters = (options: GetProjectListInput) => {
    const filters: Prisma.ProjectWhereInput = {};

    if (options.organizationIds) {
        filters.portfolioOwnerId = {
            in: options.organizationIds,
        };
    }
    if (options.tab === 'ACTIVE') {
        filters.isActive = {
            equals: true,
        };
    } else {
        filters.isActive = {
            equals: false,
        };
    }

    return filters;
};

const getProjectById = async (projectId: string) =>
    prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: ProjectSchema,
    });

const getProjectEngagements = async (
    getProjectEngagementsInput: GetProjectEngagementsInput
) =>
    prisma.project.findMany({
        where: {
            portfolioOwnerId: {
                in: getProjectEngagementsInput.organizationIds,
            },

            engagements: {
                some: {
                    state: {
                        in: [
                            'NOT_STARTED',
                            'IN_PROGRESS',
                            'DISCONTINUED',
                            'COMPLETED',
                        ],
                    },
                },
            },
        },
        take: getProjectEngagementsInput.take || 10,
        skip: getProjectEngagementsInput.skip || 0,
        orderBy: {
            createdAt: 'desc',
        },
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
                create: data.engagements
                    ? data.engagements.map((engagement: any) => ({
                          type: engagement.type,
                          startDate: engagement.startDate,
                          dueDate: engagement.dueDate,
                          completedDate: engagement.completedDate,
                          state: engagement.state,
                          notes: engagement.notes,
                          attributes: engagement.attributes
                              ? engagement.attributes.map((attribute: any) => ({
                                    name: attribute.name,
                                    key: attribute.key,
                                    type: attribute.type,
                                    value: attribute.value,
                                }))
                              : [],
                          tasks: {
                              create: engagement.tasks
                                  ? engagement.tasks.map((task: any) => ({
                                        type: task.type,
                                        startDate: task.startDate,
                                        dueDate: task.dueDate,
                                        completedDate: task.completedDate,
                                        state: task.state,
                                    }))
                                  : [],
                          },
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
    });
};

const getProjects = async (options: GetProjectListInput) =>
    prisma.project
        .findMany({
            where: applyGetProjectsFilters(options),
            take: options.take || 10,
            skip: options.skip || 0,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                registry: {
                    select: {
                        name: true,
                    },
                },
                registryProjectId: true,
                countries: {
                    select: {
                        iso2Name: true,
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
                    take: 1,
                },
            },
        })
        .then((results) =>
            results.map((result) => ({
                id: result.id,
                name: result.name,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
                registry: result.registry,
                registryProjectId: result.registryProjectId,
                countries: result.countries,
                types: result.types,
                subTypes: result.subTypes,
                engagement: {
                    ...result.engagements[0],
                    isOverdue: getIsOverdue(result.engagements[0]),
                },
                annualApproximateCreditVolume:
                    result.annualApproximateCreditVolume,
                portfolioOwner: result.portfolioOwner,
                assetOwners: result.assetOwners,
            }))
        );

export {
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjects,
    getProjectEngagements,
};
