import { prisma, Prisma } from './prisma';
import { ObjectId } from 'bson';
import { EngagementSchema } from './engagements';
import { GetProjectListInput, GetProjectEngagementsInput } from '../interfaces/project.interface'

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
            code: true,
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
    strapiId: true,
    createdAt: true,
    updatedAt: true,
};

export const isEngagementOverdue = (engagement: any) => {
    if (engagement?.state === 'COMPLETED') {
        if (!engagement.completedDate) {
            return false;
        }

        if (engagement?.completedDate >= engagement?.dueDate) {
            return true;
        }
    }

    if (
        engagement?.state === 'IN_PROGRESS' ||
        engagement?.state === 'NOT_STARTED'
    ) {
        if (engagement.dueDate <= new Date().toISOString()) {
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
                    [ObjectId.isValid(data.registry) ? 'id' : 'name']:
                        ObjectId.isValid(data.registry)
                            ? data.registry
                            : data.registry,
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
                connect: data.methodologies
                    ? data.methodologies.map((methodology: string) => {
                        if (ObjectId.isValid(methodology)) {
                            return { id: methodology };
                        } else {
                            return { code: methodology };
                        }
                    })
                    : [],
            },
            types: {
                connect: [
                    {
                        [ObjectId.isValid(data.type) ? 'id' : 'name']:
                            ObjectId.isValid(data.type) ? data.type : data.type,
                    },
                ],
            },
            subTypes: {
                connect: [
                    {
                        [ObjectId.isValid(data.subType) ? 'id' : 'name']:
                            ObjectId.isValid(data.subType)
                                ? data.subType
                                : data.subType,
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
                                type: attribute.type,
                                value: attribute.value,
                                strapiId: attribute.strapiId,
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
                                    strapiId: task.strapiId,
                                }))
                                : [],
                        },
                        strapiId: engagement.strapiId,
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
                    [ObjectId.isValid(data.portfolioOwner) ? 'id' : 'name']:
                        ObjectId.isValid(data.portfolioOwner)
                            ? data.portfolioOwner
                            : data.portfolioOwner,
                },
            },
            assetOwners: {
                connect: data.assetOwners
                    ? data.assetOwners.map((assetOwner: string) => {
                        if (ObjectId.isValid(assetOwner)) {
                            return { id: assetOwner };
                        } else {
                            return { name: assetOwner };
                        }
                    })
                    : [],
            },
            isActive: true,
            strapiId: data.strapiId,
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

const deleteProject = async (projectId: any) => {
    const deletedProject = await prisma.$transaction(async (tx) => {
        await tx.engagement.deleteMany({ where: { projectId } });
        await tx.task.deleteMany({ where: { engagement: { projectId } } });
        return tx.project.delete({
            where: { id: projectId },
            select: { id: true, name: true },
        });
    });
    return deletedProject;
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
                    isOverdue: isEngagementOverdue(result.engagements[0]),
                },
                annualApproximateCreditVolume:
                    result.annualApproximateCreditVolume,
                portfolioOwner: result.portfolioOwner,
                assetOwners: result.assetOwners,
            }))
        );

const updateProjectData = (projectId: string, data: any) => {
    const { engagements, ...rest } = data;
    return prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            ...rest,
            engagements: {
                upsert: engagements.map((engagement: any) => ({
                    where: { strapiId: engagement.strapiId },
                    update: {
                        ...engagement,
                        attributes: {
                            upsert: engagement.attributes.map(
                                (attribute: any) => ({
                                    where: { strapiId: attribute.strapiId },
                                    update: attribute,
                                    create: attribute,
                                })
                            ),
                        },
                        tasks: {
                            upsert: engagement.tasks.map((task: any) => ({
                                where: { strapiId: task.strapiId },
                                update: task,
                                create: task,
                            })),
                        },
                    },
                    create: {
                        ...engagement,
                        attributes: {
                            create: engagement.attributes,
                        },
                        tasks: {
                            create: engagement.tasks,
                        },
                    },
                })),
            },
        },
        select: ProjectSchema,
    });
};

const getProjectsByStrapiId = async (strapiId: string) =>
    prisma.project.findMany({
        where: { strapiId },
    });

export {
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjects,
    getProjectEngagements,
    updateProjectData,
    getProjectsByStrapiId,
};
