import { parseProjectTypes } from '../parse';
import { seedOrganizations, seedProjects, seedProjectTypes } from '../seed';

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

    console.log(results);

    expect(results).toEqual(
        expect.arrayContaining(
            data.map((d) =>
                expect.objectContaining({
                    ...d,
                    expiryDate: new Date(d.expiryDate),
                })
            )
        )
    );
});

test.only('seedProjects()', async () => {
    const data = [
        {
            name: 'Renewable wind power project in India - 1-006',
            registry: 'GCC',
            registryProjectId: 'S00209',
            registryUrl: 'https://projects.globalcarboncouncil.com/project/408',
            countries: ['India'],
            states: [''],
            methodologies: ['ACM0002'],
            types: ['Renewable energy'],
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
            types: ['Renewable energy'],
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

    console.log(results);

    expect(results).toEqual(
        expect.arrayContaining(
            data.map((d) =>
                expect.objectContaining({
                    ...d,
                    creditingPeriodStartDate: new Date(
                        d.creditingPeriodStartDate
                    ),
                    creditingPeriodEndDate: new Date(d.creditingPeriodEndDate),
                })
            )
        )
    );
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
