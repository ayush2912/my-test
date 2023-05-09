import { faker } from '@faker-js/faker';
import {
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
    getProjects, 
    isEngagementOverdue
    getProjectEngagements,
} from '../projects';
import { createEngagement } from '../engagements';
import { ProjectMockFactory } from '../../__mocks__/mock.data';

const {
    prisma, 
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
        // const projectIds:any[] = []
        const organizationId = faker.helpers.arrayElement(organizations).id

        const projects = await prisma.$transaction(Array(10).fill(0).map(() => 
            createProject({
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
                organization: organizationId,
                portfolioOwner: faker.helpers.arrayElement(organizations).id,
                assetOwners: faker.helpers
                    .arrayElements(organizations)
                    .map((m) => m.id),
                engagements: faker.helpers
                    .arrayElements(engagements, 2)
            })
        ))

        const projectIds = projects.map(project => project.id)

        const result = await getProjects({organizationIds: [ organizationId ], take: 10, skip: 0})

        expect(Array.isArray(result)).toBe(true)

        expect(result.length).toBe(10)

        result.forEach(project => {

            const matchedProject = projects.find(p => p.id === project.id);

            if (!matchedProject) {
                throw new Error("Result contains project that are not created in this test case")
            }

            expect(project).toEqual({
                id: matchedProject.id,
                name: matchedProject.name,
                createdAt: matchedProject.createdAt,
                updatedAt: matchedProject.updatedAt,
                registry: {
                    name: matchedProject.registry?.name
                },
                countries: (matchedProject.countries || []).map(obj => ({
                    iso2Name: obj.iso2Name,
                    name: obj.name
                })),
                registryProjectId: matchedProject.registryProjectId,
                types: (matchedProject.types || []).map(obj => ({
                    id: obj.id,
                    name: obj.name
                })),
                subTypes: (matchedProject.subTypes || []).map(obj => ({
                    id: obj.id,
                    name: obj.name
                })),
                portfolioOwner: {
                    id: matchedProject.portfolioOwner?.id,
                    name: matchedProject.portfolioOwner?.name
                },
                assetOwners: (matchedProject.assetOwners || []).map(obj => ({
                    id: obj.id,
                    name: obj.name
                })),
                annualApproximateCreditVolume: matchedProject.annualApproximateCreditVolume,
                engagement: {
                    id: matchedProject.engagements?.find(e => e.id === project.engagement.id)?.id,
                    type: matchedProject.engagements?.find(e => e.id === project.engagement.id)?.type,
                    dueDate: matchedProject.engagements?.find(e => e.id === project.engagement.id)?.dueDate,
                    state: matchedProject.engagements?.find(e => e.id === project.engagement.id)?.state,
                    completedDate: matchedProject.engagements?.find(e => e.id === project.engagement.id)?.completedDate,
                    isOverdue: isEngagementOverdue(matchedProject.engagements?.find(e => e.id === project.engagement.id))
                }
              });

        })

        await Promise.all(projectIds.map(projectId => deleteProject(projectId)))
    });

    it('returns null if the organization does not exist', async () => {
        const organizationId = '5116591277702d2113142ebc';
        const result = await getProjects({organizationIds: [organizationId], take: 10, skip: 0});
        expect(result).toEqual([]);
    });
});


describe('getProjectEngagements()', () => {
    test('it should list all project engagements', async () => {
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
        };
        const project = await createProject(data);
        if (!project.id) {
            throw new Error('Project not created');
        }
        const engagementData = {
            type: 'Getting a Project Listed',
            startDate: faker.date.recent(),
            dueDate: faker.date.future(),
            projectId: project.id,
            tasks: [
                {
                    type: 'Project design document',
                    startDate: faker.date.recent(),
                    dueDate: faker.date.future(),
                    stateHistory: [
                        {
                            state: 'NOT_STARTED',
                            stateUpdatedAt: faker.date.recent(),
                        },
                    ],
                },
                {
                    type: 'Submit the PPD',
                    startDate: faker.date.recent(),
                    dueDate: faker.date.future(),
                    stateHistory: [
                        {
                            state: 'NOT_STARTED',
                            stateUpdatedAt: faker.date.recent(),
                        },
                    ],
                },
            ],
            attributes: [
                {
                    name: 'KiloWatts per Hour',
                    key: 'KW_H',
                    type: 'integer',
                    value: '150',
                },
                {
                    name: 'Registry ID',
                    key: 'REG_ID',
                    type: 'string',
                    value: '586789878abd980',
                },
            ],
            stateHistory: [
                {
                    state: 'NOT_STARTED',
                    stateUpdatedAt: faker.date.recent(),
                },
            ],
        };
        await createEngagement(engagementData);

        const result = await getProjectEngagements();
        const projectCreated = await getProject(project.id);
        expect(result).toContainEqual(
            expect.objectContaining({
                id: project.id,
                name: project.name,
                registry: project.registry,
                registryProjectId: project.registryProjectId,
                types: project.types,
                countries: project.countries,
                isActive: project.isActive,
                createdAt: project.createdAt,
                updatedAt: project.updatedAt,
                engagements:
                    projectCreated != null
                        ? projectCreated.engagements == undefined ||
                            projectCreated.engagements == null
                            ? []
                            : projectCreated.engagements
                        : [],
            })
        );
        await deleteProject(project.id);
    });
});
