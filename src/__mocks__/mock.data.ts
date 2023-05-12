import { faker } from '@faker-js/faker';

import { Prisma, PrismaClient } from '@prisma/client';

enum State {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

const countryList = [
    {
        name: 'India',
        iso3Name: 'IND',
        iso2Name: faker.address.countryCode('alpha-2'),
    },
    {
        name: 'United Kingdom',
        iso3Name: 'GBR',
        iso2Name: faker.address.countryCode('alpha-2'),
    },
    {
        name: 'United States',
        iso3Name: 'USA',
        iso2Name: faker.address.countryCode('alpha-2'),
    },
];

type MockMethodology = {
    id: string;
    name: string;
    code: string;
};

type MockCountry = {
    name: string;
    iso3Name: string;
    iso2Name: string;
    id: string;
};

type MockRegistry = {
    id: string;
    name: string;
};

type MockOrganization = {
    id: string;
    name: string;
};

type MockProjectType = {
    id: string;
    name: string;
};

const MockProject =
    ({
        registries,
        organizations,
        countries,
        projectTypes,
        methodologies,
    }: {
        countries: MockCountry[];
        registries: MockRegistry[];
        methodologies: MockMethodology[];
        projectTypes: MockProjectType[];
        organizations: MockOrganization[];
    }) =>
    ({ organizationId }: { organizationId: string }) => ({
        name: faker.company.name(),
        registry: faker.helpers.arrayElement(registries).id,
        organization: organizationId,
        registryUrl: 'www.url.com',
        registryProjectId: '1851',
        countries: faker.helpers
            .arrayElements(countries)
            .map((c) => c.iso2Name),
        states: ['UP'],
        methodologies: faker.helpers
            .arrayElements(methodologies, 1)
            .map((m) => m.id),
        type: faker.helpers.arrayElement(projectTypes).id,
        subType: faker.helpers.arrayElement(projectTypes).id,
        notes: faker.company.bs(),
        isActive: true,
        creditingPeriodStartDate: faker.date.past(),
        creditingPeriodEndDate: faker.date.future(),
        annualApproximateCreditVolume: faker.datatype.number({
            min: 100000,
            max: 10000000,
        }),
        portfolioOwner: organizationId,
        assetOwners: faker.helpers
            .arrayElements(organizations)
            .map((m) => m.id),
    });

const MockCountries = () =>
    Array(3)
        .fill(0)
        .map((_, index) => ({
            id: faker.database.mongodbObjectId(),
            ...countryList[index],
        }));

const MockMethodologies = () =>
    Array(3)
        .fill(0)
        .map(() => ({
            id: faker.database.mongodbObjectId(),
            name: faker.company.bs(),
            code: faker.datatype.string(5),
        }));

const MockRegistries = () =>
    Array(3)
        .fill(0)
        .map(() => ({
            id: faker.database.mongodbObjectId(),
            name: faker.company.name(),
        }));

const MockProjectTypes = () =>
    Array(1)
        .fill(0)
        .map(() => ({
            id: faker.database.mongodbObjectId(),
            name: faker.company.catchPhraseNoun(),
        }));

const MockOrganizations = () =>
    Array(3)
        .fill(0)
        .map(() => ({
            id: faker.database.mongodbObjectId(),
            name: faker.company.name(),
        }));

const MockEngagements = () =>
    Array(30)
        .fill(0)
        .map(() => ({
            id: faker.database.mongodbObjectId(),
            // projectId: faker.database.mongodbObjectId(),
            type: faker.company.name(),
            startDate: faker.date.recent(),
            dueDate: faker.date.future(),
            completedDate: faker.date.future(),
            state: faker.helpers.arrayElement(Object.values(State)),
            notes: faker.lorem.words(10),
        }));

const ProjectMockFactory = () => {
    const prisma = new PrismaClient();
    const countries = MockCountries();
    const registries = MockRegistries();
    const methodologies = MockMethodologies();
    const projectTypes = MockProjectTypes();
    const organizations = MockOrganizations();
    const engagements = MockEngagements();

    const createMockProject = MockProject({
        countries,
        registries,
        methodologies,
        projectTypes,
        organizations,
    });

    const states = ['UP', 'Maharashtra', 'California'];

    const createMockData = () =>
        Promise.all([
            prisma.registry.createMany({ data: registries }),
            prisma.country.createMany({ data: countries }),
            prisma.methodology.createMany({ data: methodologies }),
            prisma.projectType.createMany({ data: projectTypes }),
            prisma.organization.createMany({ data: organizations }),
            // prisma.engagement.createMany({ data: engagements }),
        ]);

    const clearMockData = () => {
        Promise.all([
            prisma.registry.deleteMany({
                where: {
                    id: {
                        in: registries.map((r) => r.id),
                    },
                },
            }),
            prisma.country.deleteMany({
                where: {
                    iso2Name: {
                        in: countries.map((r) => r.iso2Name),
                    },
                },
            }),
            prisma.methodology.deleteMany({
                where: {
                    id: {
                        in: methodologies.map((r) => r.id),
                    },
                },
            }),
            prisma.projectType.deleteMany({
                where: {
                    id: {
                        in: projectTypes.map((r) => r.id),
                    },
                },
            }),
            prisma.organization.deleteMany({
                where: {
                    id: {
                        in: organizations.map((r) => r.id),
                    },
                },
            }),

            prisma.engagement.deleteMany({
                where: {
                    id: {
                        in: engagements.map((r) => r.id),
                    },
                },
            }),
        ]);
        return prisma.$disconnect();
    };

    return {
        prisma,
        countries,
        registries,
        methodologies,
        organizations,
        projectTypes,
        engagements,
        states,
        createMockProject,
        createMockData,
        clearMockData,
    };
};

export {
    MockCountries,
    MockMethodologies,
    MockRegistries,
    MockProjectTypes,
    MockOrganizations,
    MockEngagements,
    ProjectMockFactory,
};
