import request from 'supertest';
import { faker } from '@faker-js/faker';

import prisma from '../actions/prisma';
import { createProject, deleteProject } from '../actions/projects';
import {
    countries,
    methodologies,
    registries,
    projectTypes,
    organizations,
    engagements,
} from '../__mocks__/mock.data';

import { App } from '../app';

async function clearDatabase() {
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
}

beforeEach(async () => {
    await clearDatabase();
    await Promise.all([
        prisma.registry.createMany({ data: registries }),
        prisma.country.createMany({ data: countries }),
        prisma.methodology.createMany({ data: methodologies }),
        prisma.projectType.createMany({ data: projectTypes }),
        prisma.organization.createMany({ data: organizations }),
        prisma.engagement.createMany({ data: engagements }),
    ]);
});

afterEach(async () => {
    await clearDatabase();
    await prisma.$disconnect();
});

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
