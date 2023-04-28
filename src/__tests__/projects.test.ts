import request from 'supertest';
import { faker } from '@faker-js/faker';

import { createProject, deleteProject } from '../actions/projects';

import { App } from '../app';

import { ProjectMockFactory } from '../__mocks__/mock.data';

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
});
