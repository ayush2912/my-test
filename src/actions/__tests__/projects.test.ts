import { faker } from '@faker-js/faker';

import {
    createProject,
    getProject,
    updateProject,
    deleteProject,
} from '../projects';

import { ProjectMockFactory } from '../../__mocks__/mock.data';

const {
    countries,
    registries,
    methodologies,
    projectTypes,
    organizations,
    engagements,
    createMockData,
    clearMockData,
} = ProjectMockFactory();

beforeAll(async () => createMockData());

afterAll(async () => {
    await clearMockData();
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
        };

        const result = await createProject(data);

        expect(typeof result?.id).toBe('string');
        expect(result.name).toBe('Renewable Power Project');
        expect(result?.registry?.id).toBe(data.registry);
        expect(result?.registry?.name).toBe(
            registries.find((r) => r.id === data.registry)?.name
        );

        expect(result?.registryProjectId).toBe(data.registryProjectId);
        expect(result?.registryUrl).toBe(data.registryUrl);
        expect(Array.isArray(result?.countries)).toBe(true);
        expect(result?.states).toEqual(result.states);
        expect(result?.methodologies).toEqual(result.methodologies);
        expect(result?.types).toEqual(result.types);
        expect(result?.subTypes).toEqual(result.subTypes);
        expect(result?.notes).toBe(data.notes);
        expect(typeof result?.isActive).toBe('boolean');
        expect(Array.isArray(result?.engagements)).toBe(true);
        expect(result?.engagements).toEqual(result.engagements);

        expect(result.countries).toEqual(
            countries.filter((c) => data.countries.includes(c.iso2Name))
        );

        await deleteProject(result.id);
    });
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

        if (!project.id) {
            throw new Error('Project not created');
        }

        const result = await getProject(project.id);
        expect(typeof result?.id).toBe('string');
        expect(result?.name).toBe(data.name);
        expect(result?.registry?.id).toBe(data.registry);
        expect(result?.registry?.name).toBe(
            registries.find((r) => r.id === data.registry)?.name
        );

        expect(result?.registryProjectId).toBe(data.registryProjectId);
        expect(result?.registryUrl).toBe(data.registryUrl);
        expect(Array.isArray(result?.countries)).toBe(true);
        expect(result?.states).toEqual(project.states);
        expect(result?.methodologies).toEqual(project.methodologies);
        expect(result?.types).toEqual(project.types);
        expect(result?.subTypes).toEqual(project.subTypes);
        expect(result?.notes).toBe(data.notes);
        expect(typeof result?.isActive).toBe('boolean');
        expect(Array.isArray(result?.engagements)).toBe(true);
        expect(result?.engagements).toEqual(project.engagements);

        await deleteProject(project.id);
    });

    it('returns null if the project does not exist', async () => {
        const projectId = '5116591277702d2113142ebc';
        const result = await getProject(projectId);
        expect(result).toBeNull();
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
        };

        const project = await createProject(data);

        if (!project.id) {
            throw new Error('Project not created');
        }

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
        expect(result?.countries?.length).toBe(data.countries.length);

        expect(result?.countries).toEqual(
            countries.filter((c) => data.countries.includes(c.iso2Name))
        );

        await deleteProject(project.id);
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
        };

        const project = await createProject(data);

        if (!project.id) {
            throw new Error('Project not created');
        }

        const result = await deleteProject(project.id);

        expect(result?.name).toEqual(data.name);
    });
});
