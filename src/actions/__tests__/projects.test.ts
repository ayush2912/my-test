import { count } from 'console';
import prisma from '../prisma';
import {
    getProject,
    createProject,
    updateProject,
    deleteProject,
} from '../projects';
import { faker } from '@faker-js/faker';

const registries = Array(3)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        name: faker.company.name(),
    }));

const countries = [
    { name: 'India', iso3Name: 'IND', iso2Name: 'IN' },
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

beforeAll(() =>
    Promise.all([
        prisma.registry.createMany({ data: registries }),
        prisma.country.createMany({ data: countries }),
        prisma.methodology.createMany({ data: methodologies }),
        prisma.projectType.createMany({ data: projectTypes }),
        prisma.organization.createMany({ data: organizations }),
    ])
);

afterAll(async () => {
    await Promise.all([
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
    ]);

    await prisma.$disconnect();
});

describe('createProject()', () => {
    test('it should create a project successfully', async () => {
        const data = {
            name: 'Renewable Power Project',
            registry: faker.helpers.arrayElement(registries).id,
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
            // assetOwners: faker.helpers
            //     .arrayElements(organizations)
            //     .map((m) => m.id),
        };

        const result = await createProject(data);

        expect(result.name).toBe('Renewable Power Project');
        expect(result.registry?.id).toBe(data.registry);
        expect(result.registry?.name).toBe(
            registries.find((r) => r.id === data.registry)?.name
        );
        expect(result.registryUrl).toBe(data.registryUrl);
        expect(result.registryProjectId).toBe(data.registryProjectId);
        expect(result.countries.length).toBe(data.countries.length);

        expect(result.countries).toEqual(
            countries.filter((c) => data.countries.includes(c.iso2Name))
        );

        // Teardown
        await deleteProject(result.id);

        // expect(result.countries).toContain('IN');
    });
});

describe('getProject()', () => {
    test('it should find the correct project', async () => {
        // Setup
        const data = {
            name: 'Renewable Get Power Project',
            registry: faker.helpers.arrayElement(registries).id,
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
            // assetOwners: faker.helpers
            //     .arrayElements(organizations)
            //     .map((m) => m.id),
        };

        const project = await createProject(data);

        // Body
        const result = await getProject(project.id);

        expect(result?.name).toBe(data.name);
        expect(result?.registry?.id).toBe(data.registry);
        expect(result?.registry?.name).toBe(
            registries.find((r) => r.id === data.registry)?.name
        );
        expect(result?.registryUrl).toBe(data.registryUrl);
        expect(result?.registryProjectId).toBe(data.registryProjectId);
        expect(result?.countries?.length).toBe(data.countries.length);

        expect(result?.countries).toEqual(
            countries.filter((c) => data.countries.includes(c.iso2Name))
        );

        // Teardown
        await deleteProject(project.id);
    });
});

describe('updateProject()', () => {
    test('it should update a project successfully', async () => {
        const data = {
            name: 'Renewable Power Update Project',
            registry: faker.helpers.arrayElement(registries).id,
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
            // assetOwners: faker.helpers
            //     .arrayElements(organizations)
            //     .map((m) => m.id),
        };

        const project = await createProject(data);

        const result = await updateProject(project.id, {
            name: 'My Updated Project Name',
        });

        expect(result?.name).toBe('My Updated Project Name');

        expect(result?.registry?.id).toBe(data.registry);
        expect(result?.registry?.name).toBe(
            registries.find((r) => r.id === data.registry)?.name
        );
        expect(result?.registryUrl).toBe(data.registryUrl);
        expect(result?.registryProjectId).toBe(data.registryProjectId);
        expect(result?.countries.length).toBe(data.countries.length);

        expect(result?.countries).toEqual(
            countries.filter((c) => data.countries.includes(c.iso2Name))
        );

        await deleteProject(result.id);
    });
});

describe('deleteProject()', () => {
    test('it should delete a project successfully', async () => {
        const data = {
            name: 'Renewable Power Project',
            registry: faker.helpers.arrayElement(registries).id,
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
            // assetOwners: faker.helpers
            //     .arrayElements(organizations)
            //     .map((m) => m.id),
        };

        const project = await createProject(data);

        const result = await deleteProject(project.id);

        expect(result.name).toEqual(data.name);
    });
});
