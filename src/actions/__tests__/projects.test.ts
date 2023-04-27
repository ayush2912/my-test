import prisma from '../prisma';
import { faker } from '@faker-js/faker';

import { createProject, getProject, updateProject, deleteProject } from '../projects';
import { countries, states, methodologies, registries, projectTypes, organizations, engagements } from '../../__mock__/mock.data'

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
            portfolioOwner: faker.helpers.arrayElement(organizations).id,
            assetOwners: faker.helpers
                .arrayElements(organizations)
                .map((m) => m.id),
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
        expect(result.states.length).toBe(data.states.length);
        expect(result?.states).toEqual(
            states.filter((c) => data.states.includes(c))
        );
        expect(result.methodologies.length).toBe(data.methodologies.length);
        expect(result.methodologies).toEqual(
            methodologies.filter((c) => data.methodologies.includes(c.id))
        );
        expect(result.types[0].id).toBe(data.type)
        expect(result.subTypes[0].id).toBe(data.subType);
        expect(result.notes).toBe(data.notes);
        expect(result.isActive).toBe(data.isActive);
        expect(result.creditingPeriodStartDate?.getTime()).toBe(new Date(data.creditingPeriodStartDate).getTime());
        expect(result.creditingPeriodEndDate?.getTime()).toBe(new Date(data.creditingPeriodEndDate).getTime());
        expect(result.annualApproximateCreditVolume).toBe(data.annualApproximateCreditVolume);
        expect(result.portfolioOwner?.id).toBe(data.portfolioOwner);
        expect(result.assetOwners.length).toBe(data.assetOwners.length);
        expect(result.assetOwners).toEqual(
            organizations.filter((c) => data.assetOwners.includes(c.id))
        );

        // Teardown
        await deleteProject(result.id);

        // expect(result.countries).toContain('IN');
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

        const result = await getProject(project.id);

        expect(typeof result?.id).toBe('string');
        expect(result?.name).toBe(data.name);
        expect(result?.registry?.id).toBe(data.registry);
        expect(result?.registry?.name).toBe(
            registries.find((r) => r.id === data.registry)?.name
        );
        expect(result?.registryUrl).toBe(data.registryUrl);
        expect(result?.registryProjectId).toBe(data.registryProjectId);
        // expect(result?.countries.length).toBe(data.countries.length);
        // expect(result?.countries).toEqual(
        //     countries.filter((c) => data.countries.includes(c.iso2Name))
        // );
        expect(result?.states.length).toBe(data.states.length);
        expect(result?.states).toEqual(
            states.filter((c) => data.states.includes(c))
        );
        expect(result?.methodologies.length).toBe(data.methodologies.length);
        expect(result?.methodologies).toEqual(
            methodologies.filter((c) => data.methodologies.includes(c.id))
        );
        expect(result?.types[0].id).toBe(data.type)
        expect(result?.subTypes[0].id).toBe(data.subType);
        expect(result?.notes).toBe(data.notes);
        expect(result?.isActive).toBe(data.isActive);
        expect(result?.creditingPeriodStartDate?.getTime()).toBe(new Date(data.creditingPeriodStartDate).getTime());
        expect(result?.creditingPeriodEndDate?.getTime()).toBe(new Date(data.creditingPeriodEndDate).getTime());
        expect(result?.annualApproximateCreditVolume).toBe(data.annualApproximateCreditVolume);
        expect(result?.portfolioOwner?.id).toBe(data.portfolioOwner);
        expect(result?.assetOwners.length).toBe(data.assetOwners.length);
        expect(result?.assetOwners).toEqual(
            organizations.filter((c) => data.assetOwners.includes(c.id))
        );

        // Teardown
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
            portfolioOwner: faker.helpers.arrayElement(organizations).id,
            assetOwners: faker.helpers
                .arrayElements(organizations)
                .map((m) => m.id),
        };

        const project = await createProject(data);

        const dataToUpdate = {
            name: 'My Updated Project Name'
        }
        
        const result = await updateProject(project.id, dataToUpdate);
        
        expect(result?.name).toBe(dataToUpdate.name);

        expect(result.registry?.id).toBe(data.registry);
        expect(result.registry?.name).toBe(
            registries.find((r) => r.id === data.registry)?.name
        );
        expect(result.registryUrl).toBe(data.registryUrl);
        expect(result.registryProjectId).toBe(data.registryProjectId);
        expect(result.countries.length).toBe(data.countries.length);
        // expect(result.countries).toEqual(
        //     countries.filter((c) => data.countries.includes(c.iso2Name))
        // );
        expect(result.states.length).toBe(data.states.length);
        expect(result?.states).toEqual(
            states.filter((c) => data.states.includes(c))
        );
        expect(result.methodologies.length).toBe(data.methodologies.length);
        expect(result.methodologies).toEqual(
            methodologies.filter((c) => data.methodologies.includes(c.id))
        );
        expect(result.types[0].id).toBe(data.type)
        expect(result.subTypes[0].id).toBe(data.subType);
        expect(result.notes).toBe(data.notes);
        expect(result.isActive).toBe(data.isActive);
        expect(result.creditingPeriodStartDate?.getTime()).toBe(new Date(data.creditingPeriodStartDate).getTime());
        expect(result.creditingPeriodEndDate?.getTime()).toBe(new Date(data.creditingPeriodEndDate).getTime());
        expect(result.annualApproximateCreditVolume).toBe(data.annualApproximateCreditVolume);
        expect(result.portfolioOwner?.id).toBe(data.portfolioOwner);
        expect(result.assetOwners.length).toBe(data.assetOwners.length);
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
            portfolioOwner: faker.helpers.arrayElement(organizations).id,
            assetOwners: faker.helpers
                .arrayElements(organizations)
                .map((m) => m.id),
        };

        const project = await createProject(data);

        const result = await deleteProject(project.id);

        expect(result.name).toEqual(data.name);
    });
});
