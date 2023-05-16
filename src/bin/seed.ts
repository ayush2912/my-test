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

const createOrUpdateOrganization = async (data: OrganizationData) =>
    prisma.$transaction(async (tx) => {
        const organization = await tx.organization.findFirst({
            where: {
                name: data.name,
            },
        });

        if (organization) {
            return tx.organization.update({
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

        return tx.organization.create({
            data: {
                name: data.name,
                url: data.url,
                type: data.type,
                expiryDate: data.expiryDate,
            },
        });
    });

const createOrUpdateProject = async (data: ProjectData) =>
    prisma.$transaction(async (tx) => {
        const project = await tx.project.findFirst({
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

        const countries = await tx.country.findMany({
            where: {
                name: {
                    in: data.countries,
                },
            },
            select: {
                id: true,
            },
        });

        const portfolioOwner = await tx.organization.findFirst({
            where: {
                name: data.portfolioOwner,
            },
            select: {
                id: true,
            },
        });

        const assetOwners = await tx.organization.findMany({
            where: {
                name: {
                    in: data.assetOwners,
                },
            },
            select: {
                id: true,
            },
        });

        console.log(countries);

        const projectInput = {
            name: data.name,
            registry: {
                connect: {
                    name: data.registry,
                },
            },
            registryProjectId: data.registryProjectId,
            registryUrl: data.registryUrl,
            countries: {
                connect: countries.map((c) => ({
                    id: c.id,
                })),
            },
            states: {
                set: data.states.filter((s) => s.length),
            },
            methodologies: {
                connect: data.methodologies.map((m) => ({
                    code: m,
                })),
            },
            notes: data.notes,
            creditingPeriodStartDate: data.creditingPeriodStartDate,
            creditingPeriodEndDate: data.creditingPeriodEndDate,
            annualApproximateCreditVolume: data.annualApproximateCreditVolume,
            portfolioOwner: {
                connect: {
                    id: portfolioOwner?.id,
                },
            },
            assetOwners: {
                connect: assetOwners.map((a) => ({
                    id: a.id,
                })),
            },
        };

        const projectSelect = {
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
                    name: true,
                },
            },
            notes: true,
            creditingPeriodStartDate: true,
            creditingPeriodEndDate: true,
            annualApproximateCreditVolume: true,
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

        console.log(
            JSON.stringify({ project, projectInput, projectSelect }, null, 2)
        );

        if (project) {
            return tx.project.update({
                where: {
                    id: project.id,
                },
                data: projectInput,
                select: projectSelect,
            });
        }

        return tx.project.create({
            data: { ...projectInput },
            select: projectSelect,
        });
    });

export const seedOrganizations = (data: OrganizationData[]) =>
    Promise.all(data.map((d) => createOrUpdateOrganization(d)));

export const seedProjects = (data: ProjectData[]) =>
    Promise.all(data.map((d) => createOrUpdateProject(d)));

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
    const methodologies = await prisma.$transaction(
        data.map((item) =>
            prisma.methodology.upsert({
                where: {
                    code: item.code,
                },
                update: {
                    name: item.name,
                    fullName: item.fullName,
                    code: item.code,
                    Registry: {
                        connect:
                            item.registry === 'CDM'
                                ? [
                                      { name: 'GCC' },
                                      { name: 'GS' },
                                      { name: 'CDM' },
                                      { name: 'Verra' },
                                  ]
                                : [{ name: item.registry }],
                    },
                },
                create: {
                    name: item.name,
                    code: item.code,
                    fullName: item.fullName,
                    Registry: {
                        connect:
                            item.registry === 'CDM'
                                ? [
                                      { name: 'GCC' },
                                      { name: 'GS' },
                                      { name: 'CDM' },
                                      { name: 'Verra' },
                                  ]
                                : [{ name: item.registry }],
                    },
                },
            })
        )
    );
    return methodologies;
};
