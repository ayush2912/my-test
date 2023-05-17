import { parseProjectTypes } from '../parse';
import {
    seedOrganizations,
    seedProjects,
    seedEngagements,
    seedProjectTypes,
    seedTasks,
} from '../seed';

test('seedOrganizations()', async () => {
    const data = [
        {
            name: 'ReNew',
            url: 'www.renew.com',
            type: 'PROJECT_DEVELOPER',
            expiryDate: '2024-01-02T00:00:00.000Z',
        },
        {
            name: 'UTCL',
            url: 'www.UTCL.com',
            type: 'PROJECT_DEVELOPER',
            expiryDate: '2024-01-03T00:00:00.000Z',
        },
    ];

    const results = await seedOrganizations(data);

    results.forEach((result) => {
        if (!result) {
            throw new Error('Result is null');
        }

        const match = data.find((d) => d.name === result?.name);

        if (!match) {
            throw new Error(
                'Result contains data that is not provided by the function'
            );
        }

        expect(result.name).toBe(match.name);
        expect(result.url).toBe(match.url);
        expect(result.type).toBe(match.type);
        expect(result.expiryDate).toEqual(new Date(match.expiryDate));
    });
});

test('seedProjects()', async () => {
    const data = [
        {
            name: 'Renewable wind power project in India - 1-006',
            registry: 'GCC',
            registryProjectId: 'S00209',
            registryUrl: 'https://projects.globalcarboncouncil.com/project/408',
            countries: ['India'],
            states: [''],
            methodologies: ['ACM0002'],
            types: ['Renewable Energy'],
            subTypes: ['Wind'],
            notes: 'Total 2 wind power projects. Total AC capacity of 98.00 MW',
            creditingPeriodStartDate: '2017-02-11T00:00:00.000Z',
            creditingPeriodEndDate: '2027-02-10T00:00:00.000Z',
            annualApproximateCreditVolume: 189103,
            portfolioOwner: 'ReNew',
            assetOwners: ['ReNew'],
        },
        {
            name: 'Renewable wind power project in India -1- 017',
            registry: 'GCC',
            registryProjectId: 'S00292',
            registryUrl: 'https://projects.globalcarboncouncil.com/project/408',
            countries: ['India'],
            states: [''],
            methodologies: ['ACM0002'],
            types: ['Renewable Energy'],
            subTypes: ['Wind'],
            notes: 'Total AC capacity of 300.00 MW',
            creditingPeriodStartDate: '2022-09-24T00:00:00.000Z',
            creditingPeriodEndDate: '2032-09-23T00:00:00.000Z',
            annualApproximateCreditVolume: 926789,
            portfolioOwner: 'ReNew',
            assetOwners: ['ReNew'],
        },
    ];

    const results = await seedProjects(data);

    results.forEach((result) => {
        if (!result) {
            throw new Error('Result is null');
        }

        const match = data.find((d) => d.name === result.name);

        if (!match) {
            throw new Error(
                'Result contains data that is not provided by the function'
            );
        }

        expect(result.name).toBe(match.name);
        expect(result.registry).toEqual({
            name: match.registry,
        });
        expect(result.registryProjectId).toBe(match.registryProjectId);
        expect(result.registryUrl).toBe(match.registryUrl);
        expect(result.countries).toEqual(
            expect.arrayContaining(
                match.countries.map((c) =>
                    expect.objectContaining({
                        name: c,
                    })
                )
            )
        );

        expect(result.states).toEqual(match.states.filter((s) => s.length));
        expect(result.methodologies).toEqual(
            expect.arrayContaining(
                match.methodologies.map((c) =>
                    expect.objectContaining({
                        code: c,
                    })
                )
            )
        );

        expect(result.types).toEqual(
            expect.arrayContaining(
                match.types.map((c) =>
                    expect.objectContaining({
                        name: c,
                    })
                )
            )
        );

        expect(result.subTypes).toEqual(
            expect.arrayContaining(
                match.subTypes.map((c) =>
                    expect.objectContaining({
                        name: c,
                    })
                )
            )
        );

        expect(result.notes).toBe(match.notes);
        expect(result.creditingPeriodStartDate).toEqual(
            new Date(match.creditingPeriodStartDate)
        );
        expect(result.creditingPeriodEndDate).toEqual(
            new Date(match.creditingPeriodEndDate)
        );
        expect(result.annualApproximateCreditVolume).toBe(
            match.annualApproximateCreditVolume
        );

        expect(result.portfolioOwner).toEqual({
            name: match.portfolioOwner,
        });

        expect(result.assetOwners).toEqual(
            expect.arrayContaining(
                match.assetOwners.map((n) =>
                    expect.objectContaining({
                        name: n,
                    })
                )
            )
        );
        expect(result.isActive).toBe(true);
    });
});

test('seedEngagements()', async () => {
    const data = [
        {
            project: 'Renewable wind power project in India - 1-014',
            type: 'Registration',
            startDate: '2023-02-01T00:00:00.000Z',
            dueDate: '2023-12-21T00:00:00.000Z',
            state: 'IN_PROGRESS',
            notes: 'This is my note',
        },
        {
            project: 'Renewable wind power project in India -1- 017',
            type: 'Feasibility',
            startDate: '2022-03-25T00:00:00.000Z',
            dueDate: '2022-09-21T00:00:00.000Z',
            completedDate: '2022-09-01T00:00:00.000Z',
            state: 'COMPLETED',
            notes: 'This is my other note',
        },
    ];

    const results = await seedEngagements(data);

    results.forEach((result) => {
        if (!result) {
            throw new Error('Result is null');
        }

        const match = data.find(
            (d) => result.project?.name === d.project && result.type === d.type
        );

        if (!match) {
            throw new Error(
                'Result contains data that is not provided by the function'
            );
        }

        expect(result.project?.name).toBe(match.project);
        expect(result.type).toBe(match.type);
        expect(result.startDate).toEqual(new Date(match.startDate));
        expect(result.dueDate).toEqual(new Date(match.dueDate));

        if (match.completedDate) {
            expect(result.completedDate).toEqual(new Date(match.completedDate));
        }

        expect(result.state).toEqual(match.state);
        expect(result.notes).toEqual(match.notes);
    });
});

test('seedTasks()', async () => {
    const data = [
        {
            project: 'Renewable wind power project in India -1- 017',
            engagement: 'Feasibility',
            type: 'Project Signed',
            startDate: '2023-02-01T00:00:00.000Z',
            dueDate: '2023-02-01T00:00:00.000Z',
            completedDate: '2023-02-01T00:00:00.000Z',
            state: 'COMPLETED',
        },
        {
            project: 'Renewable wind power project in India - 1-014',
            engagement: 'Registration',
            type: 'Project Registered',
            startDate: '2023-12-21T00:00:00.000Z',
            dueDate: '2023-12-21T00:00:00.000Z',
            state: 'NOT_STARTED',
        },
        {
            project: 'Renewable wind power project in India - 1-014',
            engagement: 'Registration',
            type: 'Document Collection',
            startDate: '2023-02-01T00:00:00.000Z',
            dueDate: '2023-12-21T00:00:00.000Z',
            state: 'IN_PROGRESS',
        },
    ];

    const results = await seedTasks(data);

    results.forEach((result) => {
        if (!result) {
            throw new Error('Result is null');
        }

        const match = data.find(
            (d) =>
                result.engagement?.type === d.engagement &&
                result.type === d.type
        );

        if (!match) {
            throw new Error(
                'Result contains data that is not provided by the function'
            );
        }

        expect(result.engagement?.type).toBe(match.engagement);
        expect(result.type).toBe(match.type);
        expect(result.startDate).toEqual(new Date(match.startDate));
        expect(result.dueDate).toEqual(new Date(match.dueDate));

        if (match.completedDate) {
            expect(result.completedDate).toEqual(new Date(match.completedDate));
        }

        expect(result.state).toEqual(match.state);
    });
});

test('seedProjectTypes()', async () => {
    const data = parseProjectTypes([
        {
            Name: 'Hybrid',
            ParentType: 'Renewable Energy',
        },
        {
            Name: 'Renewable Energy',
            ParentType: '',
        },
    ]);

    const { parentTypes, subTypes } = await seedProjectTypes(data);

    expect(parentTypes).toEqual([
        expect.objectContaining({
            name: 'Renewable Energy',
        }),
    ]);

    expect(subTypes).toEqual([
        expect.objectContaining({
            name: 'Hybrid',
            parentId: parentTypes.find((p) => p.name === 'Renewable Energy')
                ?.id,
        }),
    ]);
});
