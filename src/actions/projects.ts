import prisma from './prisma';

const ProjectSchema = {
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
            iso2Name: true,
            iso3Name: true,
            name: true,
        },
    },
    state: true,
    methodologies: {
        select: {
            id: true,
            name: true,
        },
    },
    type: {
        select: {
            id: true,
            name: true,
        },
    },
    subType: {
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
            tasks: {
                select: {
                    id: true,
                    type: true,
                    startDate: true,
                    dueDate: true,
                    completedDate: true,
                    state: true,
                    engagementId: true,
                    stateHistory: true,
                },
            },
        },
    },
    creditingPeriodStartDate: true,
    creditingPeriodEndDate: true,
    annualApproximateCreditVolume: true,
    portfolioOwner: {
        select: {
            id: true,
            name: true,
        },
    }
};

const getProject = async (projectId: string) =>
    prisma.project.findUnique({
        where: {
            id: projectId,
        },
        include: {
            engagements: {
                orderBy: [{ startDate: 'asc' }, { type: 'asc' }],
                include: {
                    tasks: {
                        orderBy: [{ startDate: 'asc' }, { type: 'asc' }],
                    },
                },
            },
        },
    });

const createProject = (data: any) =>
    prisma.project.create({
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
                connect: data.types.map((typeID: string) => ({
                    id: typeID,
                })),
            },
            subTypes: {
                connect: data.subTypes.map((subTypeID: string) => ({
                    id: subTypeID,
                })),
            },
            notes: data.notes,
            creditingPeriodStartDate: data.creditingPeriodStartDate,
            creditingPeriodEndDate: data.creditingPeriodEndDate,
            portfolioOwner: {
                connect: {
                    id: data.portfolioOwner,
                },
            },
            assetOwners: {
                connect: data.assetOwners.map((ownerId: string) => ({
                    id: ownerId,
                })),
            },
            isActive: true
        },
        select: ProjectSchema,
    });

const deleteProject = (projectId: string) =>
    prisma.project.delete({
        where: {
            id: projectId,
        },
    });

export { getProject, createProject, deleteProject };
