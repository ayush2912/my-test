import prisma from '../prisma';
import { faker } from '@faker-js/faker';

import { createProject, getProject, deleteProject } from '../projects';
import { countries, methodologies, registries, projectTypes, organizations, engagements } from '../../__mock__/mock.data'

beforeEach(() =>
    Promise.all([
        prisma.registry.createMany({ data: registries }),
        prisma.country.createMany({ data: countries }),
        prisma.methodology.createMany({ data: methodologies }),
        prisma.projectType.createMany({ data: projectTypes }),
        prisma.organization.createMany({ data: organizations }),
        prisma.engagement.createMany({ data: engagements })
    ])
);

afterEach(async () => {
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

afterEach(() => {
    jest.clearAllMocks(); // Clears all mock data before each test
});

describe('getProject()', () => {
    test('it should find the correct project', async () => {
        const data = {
            name: 'Renewable Get Power Project',
            registry: faker.helpers.arrayElement(registries).id,
            registryUrl: 'www.url.com',
            registryProjectId: '1851',
            countries: faker.helpers
                .arrayElements(countries)
                .map((c) => c.iso2Name),
            states: ['UP'],
            methodologies: faker.helpers
                .arrayElements(methodologies, 1)
                .map((m) => m.id),
            types: faker.helpers
                .arrayElements(projectTypes, 1)
                .map((m) => m.id),
            subTypes: faker.helpers
                .arrayElements(projectTypes, 1)
                .map((m) => m.id),
            notes: 'Renewable Power project in India',
            isActive: true,
            creditingPeriodStartDate: '2023-04-11T14:15:22Z',
            creditingPeriodEndDate: '2023-04-11T14:15:22Z',
            annualApproximateCreditVolume: 300000,
            portfolioOwner: faker.helpers.arrayElement(organizations).id,
            assetOwners: faker.helpers
                .arrayElements(organizations)
                .map((m) => m.id),
            engagements: faker.helpers
                .arrayElements(engagements, 1)
                .map((m) => m.id),
        };
        const project = await createProject(data);

        const result = await getProject(project.id);

        expect(typeof result?.id).toBe('string');
        expect(result?.name).toBe(data.name);
        expect(result?.registry?.id).toBe(data.registry);
        expect(result?.registry?.name).toBe(
            registries.find((r) => r.id === data.registry)?.name
        );
        expect(result?.registryProjectId).toBe(data.registryProjectId);
        expect(result?.registryUrl).toBe(data.registryUrl);
        expect(Array.isArray(result?.countries)).toBe(true)
        expect(result?.states).toEqual(project.states);
        expect(result?.methodologies).toEqual(project.methodologies);
        expect(result?.types).toEqual(project.types);
        expect(result?.subTypes).toEqual(project.subTypes);
        expect(result?.notes).toBe(data.notes);
        expect(typeof result?.isActive).toBe('boolean');
        expect(Array.isArray(result?.engagements)).toBe(true);
        expect(result?.engagements).toEqual(project.engagements)

        await deleteProject(project.id);
    });

    it('returns null if the project does not exist', async () => {
        const projectId = '5116591277702d2113142ebc';
        const result = await getProject(projectId);
        expect(result).toBeNull();
    });

});
