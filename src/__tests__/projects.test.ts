import request from 'supertest';
import { faker } from '@faker-js/faker';

import { createProject, deleteProject } from '../actions/projects';
import { createEngagement } from '../actions/engagements';

import { App } from '../app';

import { ProjectMockFactory } from '../__mocks__/mock.data';

const {
    prisma,
    countries,
    registries,
    methodologies,
    projectTypes,
    organizations,
    engagements,
    createMockData,
    clearMockData,
} = ProjectMockFactory();

beforeAll(() => createMockData());

afterAll(() => clearMockData());

describe('/projects/{projectId}', () => {
    test('GET /projects/{projectId}', async () => {
        const app = App();

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

        const results = await request(app)
            .get(`/projects/${project.id}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(results.body.status).toBe('Success');
        expect(results.body.message).toBe(
            'Project Details Retrieved Successfully'
        );

        await deleteProject(project.id);
    });

    test('GET /projects/{projectId} with invalid projectId', async () => {
        const app = App();

        const results = await request(app).get(
            '/projects/234567890109876543212345'
        );

        expect(results.statusCode).toBe(400);
        expect(results.body.errors).toEqual([
            {
                msg: 'Invalid Project Id',
                code: 'BAD_REQUEST',
            },
        ]);
    });

    test('GET /projects with valid organization Id', async () => {
        const app = App()

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

        const results = await request(app)
            .get(`/projects?organizationIds=${organizationId}&tab=ACTIVE&take=10&skip=0`)
            .expect('Content-Type', /json/)
            .expect(200);
        
        expect(results.body.status).toBe('Success');
        expect(results.body.message).toBe(
            'Projects Retrieved Successfully'
        );

        await Promise.all(projectIds.map(projectId => deleteProject(projectId)))
    });

    test('GET /projects with invalid organization Id', async () => {
        const app = App();

        const results = await request(app).get(
            '/projects?organizationIds=234567890109876543212345&tab=ACTIVE&take=10&skip=0'
        );

        expect(results.statusCode).toBe(400);
        expect(results.body.errors).toEqual([
            {
                msg: 'Invalid Organization Id',
                code: 'BAD_REQUEST',
            },
        ]);
    });
});

describe('/project-engagements', () => {
    test('GET /project-engagements', async () => {
        const app = App();
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
            creditingPeriodStartDate: faker.date.recent(),
            creditingPeriodEndDate: faker.date.future(),
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
        const engagementData = {
            type: 'Getting a Project Listed',
            startDate: faker.date.recent().toISOString(),
            dueDate: faker.date.future().toISOString(),
            projectId: project.id,
            createdAt: faker.date.recent().toISOString(),
            updatedAt: faker.date.recent().toISOString(),
            tasks: [
                {
                    type: 'Project design document',
                    startDate: faker.date.recent().toISOString(),
                    dueDate: faker.date.future().toISOString(),
                    stateHistory: [
                        {
                            state: 'NOT_STARTED',
                            stateUpdatedAt: faker.date.recent().toISOString(),
                        },
                    ],
                },
                {
                    type: 'Submit the PPD',
                    startDate: faker.date.recent().toISOString(),
                    dueDate: faker.date.future().toISOString(),
                    stateHistory: [
                        {
                            state: 'NOT_STARTED',
                            stateUpdatedAt: faker.date.recent().toISOString(),
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
                    stateUpdatedAt: faker.date.recent().toISOString(),
                },
            ],
        };
        await createEngagement(engagementData);

        const result = await request(app)
            .get(`/project-engagements`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(result.body.data).toContainEqual(
            expect.objectContaining({
                id: project.id,
                name: project.name,
                registry: project.registry,
                registryProjectId: project.registryProjectId,
                types: project.types,
                countries: project.countries,
                isActive: project.isActive,
                createdAt: project.createdAt?.toISOString(),
                updatedAt: project.updatedAt?.toISOString(),
            })
        );
        expect(result.body.status).toBe('Success');
        expect(result.body.message).toBe(
            'Project Engagement Details Retrieved Successfully'
        );

        await deleteProject(project.id);
    });
});
