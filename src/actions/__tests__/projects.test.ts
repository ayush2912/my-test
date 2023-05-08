import { faker } from '@faker-js/faker';

import {
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
    getProjects
} from '../projects';

import { ProjectMockFactory } from '../../__mocks__/mock.data';

const {
    countries,
    registries,
    methodologies,
    projectTypes,
    organizations,
    engagements,
    states,
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
            states: ['UP', 'Maharashtra', 'California'],
            methodologies: faker.helpers
                .arrayElements(methodologies, 1)
                .map((m) => m.id),
            type: faker.helpers.arrayElement(projectTypes).id,
            subType: faker.helpers.arrayElement(projectTypes).id,
            notes: 'Renewable Power project in India',
            isActive: true,
            creditingPeriodStartDate: '2023-04-26T07:14:39.237Z',
            creditingPeriodEndDate: '2023-04-26T07:14:39.237Z',
            annualApproximateCreditVolume: 3000,
            organization: faker.helpers.arrayElement(organizations).id,
            portfolioOwner: faker.helpers.arrayElement(organizations).id,
            assetOwners: faker.helpers
                .arrayElements(organizations)
                .map((m) => m.id),
        };

        const result = await createProject(data);

        if (!result.id) {
            throw new Error('Project not created');
        }

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
        expect(result.states?.length).toBe(data.states.length);
        expect(result?.states).toEqual(
            states.filter((c) => data.states.includes(c))
        );
        expect(result.methodologies?.length).toBe(data.methodologies.length);
        expect(result.methodologies).toEqual(
            methodologies.filter((c) => data.methodologies.includes(c.id))
        );
        expect(result.types?.pop()?.id).toBe(data.type);
        expect(result.subTypes?.pop()?.id).toBe(data.subType);
        expect(result.notes).toBe(data.notes);
        expect(result.isActive).toBe(data.isActive);
        expect(result.creditingPeriodStartDate?.getTime()).toBe(
            new Date(data.creditingPeriodStartDate).getTime()
        );
        expect(result.creditingPeriodEndDate?.getTime()).toBe(
            new Date(data.creditingPeriodEndDate).getTime()
        );
        expect(result.annualApproximateCreditVolume).toBe(
            data.annualApproximateCreditVolume
        );
        expect(result.portfolioOwner?.id).toBe(data.portfolioOwner);
        expect(result.assetOwners?.length).toBe(data.assetOwners.length);
        expect(result.assetOwners).toEqual(
            organizations.filter((c) => data.assetOwners.includes(c.id))
        );

        // Teardown
        await deleteProject(result.id);

        // expect(result.countries).toContain('IN');
    });
});

describe('getProjectById()', () => {
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
            type: faker.helpers.arrayElement(projectTypes).id,
            subType: faker.helpers.arrayElement(projectTypes).id,
            notes: 'Renewable Power project in India',
            isActive: true,
            creditingPeriodStartDate: '2023-04-11T14:15:22Z',
            creditingPeriodEndDate: '2023-04-11T14:15:22Z',
            annualApproximateCreditVolume: 300000,
            organization: faker.helpers.arrayElement(organizations).id,
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

        const result = await getProjectById(project.id);
        expect(typeof result?.id).toBe('string');
        expect(result?.name).toBe(data.name);
        expect(result?.registry?.id).toBe(data.registry);
        expect(result?.registry?.name).toBe(
            registries.find((r) => r.id === data.registry)?.name
        );
        expect(result?.registryUrl).toBe(data.registryUrl);
        expect(result?.registryProjectId).toBe(data.registryProjectId);
        expect(result?.countries).toEqual(
            countries.filter((c) => data.countries.includes(c.iso2Name))
        );
        expect(result?.states).toEqual(
            states.filter((c) => data.states.includes(c))
        );
        expect(result?.methodologies).toEqual(
            methodologies.filter((c) => data.methodologies.includes(c.id))
        );
        expect(result?.types?.pop()?.id).toBe(data.type);
        expect(result?.subTypes?.pop()?.id).toBe(data.subType);
        expect(result?.notes).toBe(data.notes);
        expect(result?.isActive).toBe(data.isActive);
        expect(result?.creditingPeriodStartDate?.getTime()).toBe(
            new Date(data.creditingPeriodStartDate).getTime()
        );
        expect(result?.creditingPeriodEndDate?.getTime()).toBe(
            new Date(data.creditingPeriodEndDate).getTime()
        );
        expect(result?.annualApproximateCreditVolume).toBe(
            data.annualApproximateCreditVolume
        );
        expect(result?.portfolioOwner?.id).toBe(data.portfolioOwner);
        expect(result?.assetOwners).toEqual(
            organizations.filter((c) => data.assetOwners.includes(c.id))
        );

        // Teardown
        await deleteProject(project.id);
    });

    it('returns null if the project does not exist', async () => {
        const projectId = '5116591277702d2113142ebc';
        const result = await getProjectById(projectId);
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
            states: ['UP', 'Maharashtra', 'California'],
            methodologies: faker.helpers
                .arrayElements(methodologies, 1)
                .map((m) => m.id),
            type: faker.helpers.arrayElement(projectTypes).id,
            subType: faker.helpers.arrayElement(projectTypes).id,
            notes: 'Renewable Power project in India',
            isActive: true,
            creditingPeriodStartDate: '2023-04-26T07:14:39.237Z',
            creditingPeriodEndDate: '2023-04-26T07:14:39.237Z',
            annualApproximateCreditVolume: 300000,
            organization: faker.helpers.arrayElement(organizations).id,
            portfolioOwner: faker.helpers.arrayElement(organizations).id,
            assetOwners: faker.helpers
                .arrayElements(organizations)
                .map((m) => m.id),
        };

        const project = await createProject(data);

        const dataToUpdate = {
            name: 'My Updated Project Name',
        };

        if (!project.id) {
            throw new Error('Project not created');
        }

        const result = await updateProject(project.id, dataToUpdate);

        expect(result?.name).toBe(dataToUpdate.name);

        expect(result.registry?.id).toBe(data.registry);
        expect(result.registry?.name).toBe(
            registries.find((r) => r.id === data.registry)?.name
        );
        expect(result.registryUrl).toBe(data.registryUrl);
        expect(result.registryProjectId).toBe(data.registryProjectId);
        expect(result.countries?.length).toBe(data.countries.length);
        expect(result.countries).toEqual(
            countries.filter((c) => data.countries.includes(c.iso2Name))
        );
        expect(result.states?.length).toBe(data.states.length);
        expect(result?.states).toEqual(
            states.filter((c) => data.states.includes(c))
        );
        expect(result.methodologies?.length).toBe(data.methodologies.length);
        expect(result.methodologies).toEqual(
            methodologies.filter((c) => data.methodologies.includes(c.id))
        );
        expect(result.types?.pop()?.id).toBe(data.type);
        expect(result.subTypes?.pop()?.id).toBe(data.subType);
        expect(result.notes).toBe(data.notes);
        expect(result.isActive).toBe(data.isActive);
        expect(result.creditingPeriodStartDate?.getTime()).toBe(
            new Date(data.creditingPeriodStartDate).getTime()
        );
        expect(result.creditingPeriodEndDate?.getTime()).toBe(
            new Date(data.creditingPeriodEndDate).getTime()
        );
        expect(result.annualApproximateCreditVolume).toBe(
            data.annualApproximateCreditVolume
        );
        expect(result.portfolioOwner?.id).toBe(data.portfolioOwner);
        expect(result.assetOwners?.length).toBe(data.assetOwners.length);
        expect(result.assetOwners).toEqual(
            organizations.filter((c) => data.assetOwners.includes(c.id))
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
            states: ['UP', 'Maharashtra', 'California'],
            methodologies: faker.helpers
                .arrayElements(methodologies, 1)
                .map((m) => m.id),
            type: faker.helpers.arrayElement(projectTypes).id,
            subType: faker.helpers.arrayElement(projectTypes).id,
            notes: 'Renewable Power project in India',
            isActive: true,
            creditingPeriodStartDate: '2023-04-26T07:14:39.237Z',
            creditingPeriodEndDate: '2023-04-26T07:14:39.237Z',
            annualApproximateCreditVolume: 300000,
            organization: faker.helpers.arrayElement(organizations).id,
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

describe('getProjects()', () => {
    test('it should get the list of projets successfully', async() => {
        const projectIds:any[] = []
        const organization = faker.helpers.arrayElement(organizations).id
        for (let i = 0; i < 10; i++) {
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
                type: faker.helpers.arrayElement(projectTypes).id,
                subType: faker.helpers.arrayElement(projectTypes).id,
                notes: 'Renewable Power project in India',
                isActive: true,
                creditingPeriodStartDate: '2023-04-11T14:15:22Z',
                creditingPeriodEndDate: '2023-04-11T14:15:22Z',
                annualApproximateCreditVolume: 300000,
                organization: organization,
                portfolioOwner: faker.helpers.arrayElement(organizations).id,
                assetOwners: faker.helpers
                    .arrayElements(organizations)
                    .map((m) => m.id),
                engagements: faker.helpers
                    .arrayElements(engagements, 2)
                    .map((m) => m.id),
            };
            const project = await createProject(data)
            projectIds.push(project.id)
        }

        const result = await getProjects({organizationIds: organization.split(' '), take: 10, skip: 0})

        expect(Array.isArray(result)).toBe(true)

        expect(result.length).toBe(10)

        // Check that each object in the array has the expected fields
        result.forEach(project => {
            expect(project).toHaveProperty('id')
            expect(project).toHaveProperty('name')
            expect(project).toHaveProperty('createdAt')
            expect(project).toHaveProperty('updatedAt')
            expect(project).toHaveProperty('registry')
            expect(project.registry).toHaveProperty('name')
            expect(project).toHaveProperty('registryProjectId')
            expect(project).toHaveProperty('countries')
            project.countries.forEach(country => {
                expect(country).toHaveProperty('iso2Name')
                expect(country).toHaveProperty('name')
            })
            expect(project).toHaveProperty('types')
            expect(project.types.length).toBe(1)
            expect(project.subTypes.length).toBe(1)
            expect(project).toHaveProperty('subTypes')
            expect(project).toHaveProperty('portfolioOwner')
            expect(project).toHaveProperty('assetOwners')
            expect(project).toHaveProperty('annualApproximateCreditVolume')
            expect(project).toHaveProperty('engagements')
            if (project.engagements) { // engagements can be empty for some projects
                expect(project.engagements).toHaveProperty('id')
                expect(project.engagements).toHaveProperty('type')
                expect(project.engagements).toHaveProperty('dueDate')
                expect(project.engagements).toHaveProperty('state')
                expect(project.engagements).toHaveProperty('isOverdue')
            }
        });

        projectIds.forEach(projectId => {
            deleteProject(projectId)
        })
    });
});
