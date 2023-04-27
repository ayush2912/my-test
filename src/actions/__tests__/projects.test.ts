import { count } from 'console';
import prisma from '../prisma';
import { createProject, getProject, deleteProject } from '../projects';
import { faker } from '@faker-js/faker';

const registry = Array(3)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        name: faker.company.name(),
    }));

const countryList = [
    {
        name: 'India',
        iso3Name: 'IND',
        iso2Name: 'IN'
    },
    {
        name: 'United Kingdom',
        iso3Name: 'GBR',
        iso2Name: 'GB',
    },
    {
        name: 'United States',
        iso3Name: 'USA',
        iso2Name: 'US',
    },
];

const countries = Array(3)
    .fill(0)
    .map((_, index) => ({
        id: faker.database.mongodbObjectId(),
        ...countryList[index],
    }));

const methodologies = Array(10)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        name: faker.company.bs(),
    }));

const projectTypes = Array(10)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        name: faker.company.catchPhraseNoun(),
    }));

const organizations = Array(10)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        name: faker.company.name(),
    }));

const engagements = Array(10)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        type: faker.company.name(),
        startDate: faker.datatype.datetime(),
        dueDate: faker.datatype.datetime(),
        projectId: faker.database.mongodbObjectId(),
    }));


beforeAll(() =>
    Promise.all([
        prisma.registry.createMany({ data: registry }),
        prisma.country.createMany({ data: countries }),
        prisma.methodology.createMany({ data: methodologies }),
        prisma.projectType.createMany({ data: projectTypes }),
        prisma.organization.createMany({ data: organizations }),
        prisma.engagement.createMany({ data: engagements })
    ])
);

afterAll(async () => {
    await Promise.all([
        prisma.registry.deleteMany({
            where: {
                id: {
                    in: registry.map((r) => r.id),
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

    await prisma.$disconnect();
});

describe('getProject()', () => {
    test('it should find the correct project', async () => {
        const data = {
            name: 'Renewable Get Power Project',
            registry: faker.helpers.arrayElement(registry).id,
            registryUrl: 'www.url.com',
            registryProjectId: '1851',
            countries: faker.helpers
                .arrayElements(countries)
                .map((c) => c.iso2Name),
            state: 'UP',
            methodologies: faker.helpers
                .arrayElements(methodologies, 1)
                .map((m) => m.id),
            type: faker.helpers.arrayElement(projectTypes).id,
            subType: faker.helpers.arrayElement(projectTypes).id,
            notes: 'Renewable Power project in India',
            isActive: true,
            creditingPeriodStartDate: '2023-04-11T14:15:22Z',
            creditingPeriodEndDate: '2023-04-11T14:15:22Z',
            annualApproximateCreditVolume: 300000,
            portfolioOwner: faker.helpers.arrayElement(organizations).id,
            assetOwners: faker.helpers
                .arrayElements(organizations)
                .map((m) => m.id),
            engagements: faker.helpers.arrayElement(engagements).id

        };

        const project = await createProject(data);

        const result = await getProject(project.id);

        expect(result?.name).toBe(data.name);
        expect(result?.registryUrl).toBe(data.registryUrl);
        expect(result?.registryProjectId).toBe(data.registryProjectId);

        await deleteProject(project.id);
    });

    it('returns null if the project does not exist', async () => {
        const projectId = '5116591277702d2113142ebc';
        const result = await getProject(projectId);
        expect(result).toBeNull();
    });

});
