import { prisma, Prisma } from '../actions/prisma';

type OrganizationData = {
    name: string;
    url: string;
    type: string;
    expiryDate: string;
};

type ProjectData = {
    name: string;
    registry: string;
    registryProjectId: string;
    registryUrl: string;
    countries: string[];
    states: string[];
    methodologies: string[];
    types: string[];
    subTypes: string[];
    notes: string;
    creditingPeriodStartDate: string;
    creditingPeriodEndDate: string;
    annualApproximateCreditVolume: number;
    portfolioOwner: string;
    assetOwners: string[];
};

type EngagementData = {
    project: string;
    type: string;
    startDate: string;
    dueDate: string;
    completedDate?: string;
    state: string;
    notes: string;
};

type TaskData = {
    project: string;
    engagement: string;
    type: string;
    startDate: string;
    dueDate: string;
    completedDate?: string;
    state: string;
};

type ProjectTypeData = {
    name: string;
    parentType: string;
};

type Countries = {
    name: string;
    iso2: string;
    iso3: string;
};

type Methodologies = {
    registry: string;
    code: string;
    name: string;
    fullName: string;
};

const createOrUpdateOrganization = async (data: OrganizationData) => {
    const organization = await prisma.organization.findFirst({
        where: {
            name: data.name,
        },
    });

    if (organization) {
        return prisma.organization.update({
            where: {
                id: organization.id,
            },
            data: {
                url: data.url,
                type: data.type,
                expiryDate: data.expiryDate,
            },
        });
    }

    return prisma.organization.create({
        data: {
            name: data.name,
            url: data.url,
            type: data.type,
            expiryDate: data.expiryDate,
        },
    });
};

const createOrUpdateProject = async (data: ProjectData) => {
    const project = await prisma.project.findFirst({
        where: {
            name: data.name,
            portfolioOwner: {
                name: {
                    equals: data.portfolioOwner,
                },
            },
        },
        select: {
            id: true,
        },
    });

    const countries = await prisma.country.findMany({
        where: {
            name: {
                in: data.countries,
            },
        },
        select: {
            id: true,
        },
    });

    const registry = await prisma.registry.findFirst({
        where: {
            name: data.registry,
        },
        select: {
            id: true,
        },
    });

    const methodologies = await prisma.methodology.findMany({
        where: {
            code: {
                in: data.methodologies,
            },
        },
    });

    const types = await prisma.projectType.findMany({
        where: {
            name: {
                in: data.types,
            },
        },
    });

    const subTypes = await prisma.projectType.findMany({
        where: {
            name: {
                in: data.subTypes,
            },
        },
    });

    const portfolioOwner = await prisma.organization.findFirst({
        where: {
            name: data.portfolioOwner,
        },
        select: {
            id: true,
        },
    });

    const assetOwners = await prisma.organization.findMany({
        where: {
            name: {
                in: data.assetOwners,
            },
        },
        select: {
            id: true,
        },
    });

    const projectSelect: Prisma.ProjectSelect = {
        id: true,
        name: true,
        registry: {
            select: {
                name: true,
            },
        },
        registryProjectId: true,
        registryUrl: true,
        countries: {
            select: {
                name: true,
            },
        },
        states: true,
        methodologies: {
            select: {
                code: true,
            },
        },
        notes: true,
        creditingPeriodStartDate: true,
        creditingPeriodEndDate: true,
        annualApproximateCreditVolume: true,
        types: {
            select: {
                name: true,
            },
        },
        subTypes: {
            select: {
                name: true,
            },
        },
        portfolioOwner: {
            select: {
                name: true,
            },
        },
        assetOwners: {
            select: {
                name: true,
            },
        },
    };

    if (project) {
        await prisma.project.updateMany({
            where: {
                id: project.id,
            },
            data: {
                name: data.name,
                ...(registry?.id && {
                    registryId: registry?.id,
                    registryProjectId: data.registryProjectId,
                    registryUrl: data.registryUrl,
                }),
                countryIDs: countries.map((c) => c.id),
                states: {
                    set: data.states.filter((s) => s.length),
                },
                methodologyIDs: methodologies.map((m) => m.id),
                notes: data.notes,
                creditingPeriodStartDate: data.creditingPeriodStartDate,
                creditingPeriodEndDate: data.creditingPeriodEndDate,
                annualApproximateCreditVolume:
                    data.annualApproximateCreditVolume,
                typeIDs: types.map((t) => t.id),
                subTypeIDs: subTypes.map((t) => t.id),
                portfolioOwnerId: portfolioOwner?.id,
                assetOwnerIDs: assetOwners.map((a) => a.id),
            },
        });

        return prisma.project.findFirst({
            where: {
                id: project.id,
            },
            select: projectSelect,
        });
    }

    const created = await prisma.project.create({
        select: {
            id: true,
        },
        data: {
            name: data.name,
            ...(registry?.id && {
                registryId: registry?.id,
                registryProjectId: data.registryProjectId,
                registryUrl: data.registryUrl,
            }),
            countryIDs: countries.map((c) => c.id),
            states: {
                set: data.states.filter((s) => s.length),
            },
            methodologyIDs: methodologies.map((m) => m.id),
            notes: data.notes,
            creditingPeriodStartDate: data.creditingPeriodStartDate,
            creditingPeriodEndDate: data.creditingPeriodEndDate,
            annualApproximateCreditVolume: data.annualApproximateCreditVolume,
            typeIDs: types.map((t) => t.id),
            subTypeIDs: subTypes.map((t) => t.id),
            portfolioOwnerId: portfolioOwner?.id,
            assetOwnerIDs: assetOwners.map((a) => a.id),
        },
    });

    return prisma.project.findFirst({
        where: {
            id: created.id,
        },
        select: projectSelect,
    });
};

const createOrUpdateEngagement = async (data: EngagementData) => {
    const engagementSelect: Prisma.EngagementSelect = {
        type: true,
        project: {
            select: {
                name: true,
            },
        },
        startDate: true,
        dueDate: true,
        completedDate: true,
        state: true,
        notes: true,
    };

    const project = await prisma.project.findFirst({
        where: {
            name: data.project,
        },
        select: {
            id: true,
        },
    });

    if (!project) {
        throw new Error(`Project do not exist: ${data.project}`);
    }

    const engagement = await prisma.engagement.findFirst({
        where: {
            type: data.type,
            projectId: project.id,
        },
    });

    if (engagement) {
        await prisma.engagement.updateMany({
            where: {
                id: engagement.id,
            },
            data: {
                type: data.type,
                startDate: data.startDate,
                dueDate: data.dueDate,
                completedDate: data.completedDate,
                state: data.state,
                notes: data.notes,
            },
        });

        return prisma.engagement.findFirst({
            where: {
                id: engagement.id,
            },
            select: engagementSelect,
        });
    }

    const created = await prisma.engagement.create({
        select: {
            id: true,
        },
        data: {
            type: data.type,
            project: {
                connect: {
                    id: project.id,
                },
            },
            startDate: data.startDate,
            dueDate: data.dueDate,
            completedDate: data.completedDate,
            state: data.state,
            notes: data.notes,
        },
    });

    return prisma.engagement.findFirst({
        where: {
            id: created.id,
        },
        select: engagementSelect,
    });
};

const createOrUpdateTasks = async (data: TaskData) => {
    const taskSelect: Prisma.TaskSelect = {
        engagement: {
            select: {
                type: true,
            },
        },
        type: true,
        state: true,
        startDate: true,
        dueDate: true,
        completedDate: true,
    };

    const project = await prisma.project.findFirst({
        where: {
            name: data.project,
        },
        select: {
            id: true,
        },
    });

    if (!project) {
        throw new Error(`Project do not exist: ${data.project}`);
    }

    const engagement = await prisma.engagement.findFirst({
        where: {
            type: data.engagement,
            projectId: project.id,
        },
        select: {
            id: true,
        },
    });

    if (!engagement) {
        throw new Error(
            `Engagement ${data.engagement} do not exist for project ${data.project}`
        );
    }

    const task = await prisma.task.findFirst({
        where: {
            engagementId: engagement.id,
            type: data.type,
        },
        select: {
            id: true,
        },
    });

    if (task) {
        await prisma.task.updateMany({
            where: {
                id: task.id,
            },
            data: {
                type: data.type,
                startDate: data.startDate,
                dueDate: data.dueDate,
                completedDate: data.completedDate,
                state: data.state,
            },
        });

        return prisma.task.findFirst({
            where: {
                id: task.id,
            },
            select: taskSelect,
        });
    }

    const created = await prisma.task.create({
        select: {
            id: true,
        },
        data: {
            type: data.type,
            engagement: {
                connect: {
                    id: engagement.id,
                },
            },
            startDate: data.startDate,
            dueDate: data.dueDate,
            completedDate: data.completedDate,
            state: data.state,
        },
    });

    return prisma.task.findFirst({
        where: {
            id: created.id,
        },
        select: taskSelect,
    });
};

export const seedOrganizations = (data: OrganizationData[]) =>
    Promise.all(data.map((d) => createOrUpdateOrganization(d)));

export const seedProjects = (data: ProjectData[]) =>
    Promise.all(
        data.map((d) =>
            createOrUpdateProject(d).catch((error) =>
                console.error(`Error seeding project`, {
                    data: d,
                    error,
                })
            )
        )
    );

export const seedEngagements = (data: EngagementData[]) =>
    Promise.all(data.map((d) => createOrUpdateEngagement(d)));

export const seedTasks = (data: TaskData[]) =>
    Promise.all(
        data.map((d) =>
            createOrUpdateTasks(d).catch((error) =>
                console.error(`Error seeding project`, {
                    data: d,
                    error,
                })
            )
        )
    );

export const seedProjectTypes = async (data: ProjectTypeData[]) => {
    const parentTypes = await prisma.$transaction(
        data
            .filter((r: any) => r.parentType === '')
            .map(({ name }: { name: string }) =>
                prisma.projectType.upsert({
                    where: {
                        name: name,
                    },
                    update: {
                        // name: 'Viola the Magnificent',
                    },
                    create: {
                        name: name,
                    },
                })
            )
    );

    const subTypes = await prisma.$transaction(
        data
            .filter((r: any) => r.parentType !== '')
            .map((r: any) =>
                prisma.projectType.upsert({
                    where: {
                        name: r.name,
                    },
                    update: {
                        name: r.name,
                        parentId: parentTypes.find(
                            (p) => p.name === r.parentType
                        )?.id,
                    },
                    create: {
                        name: r.name,
                        parentId: parentTypes.find(
                            (p) => p.name === r.parentType
                        )?.id,
                    },
                })
            )
    );

    return {
        parentTypes,
        subTypes,
    };
};

export const seedCountries = async (data: Countries[]) => {
    const countries = await prisma.$transaction(
        data.map((item) =>
            prisma.country.upsert({
                where: {
                    iso2Name: item.iso2,
                },
                update: {
                    name: item.name,
                    iso3Name: item.iso3,
                    iso2Name: item.iso2,
                },
                create: {
                    name: item.name,
                    iso3Name: item.iso3,
                    iso2Name: item.iso2,
                },
            })
        )
    );
    return countries;
};

export const seedMethodologies = async (data: Methodologies[]) => {
    const createdMethodologies = await prisma.methodology.findMany({
        where: {
            code: {
                in: data.map((m) => m.code),
            },
        },
    });

    const newMethodologies = data.filter(
        (m) => !createdMethodologies.find((c) => c.code === m.code)
    );

    if (!newMethodologies.length) {
        return { count: 0 };
    }

    const registries = await prisma.registry.findMany({
        where: {
            name: {
                in: ['CDM', 'GCC', 'CDM', 'Verra'],
            },
        },
    });

    const methodologies = await prisma.methodology.createMany({
        data: newMethodologies.map((item) => ({
            name: item.name,
            code: item.code,
            fullName: item.fullName,
            registryIDs:
                item.registry === 'CDM'
                    ? registries.map((r) => r.id)
                    : registries.find((r) => r.name === item.registry)?.id,
        })),
    });

    return methodologies;
};
