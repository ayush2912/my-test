import {
    parseProjectTypes,
    parseOrganizations,
    parseProjects,
    parseEngagements,
    parseTasks,
} from '../parse';

test('parseOrganizations', () => {
    const data = [
        {
            Name: 'ReNew',
            URL: 'www.renew.com',
            Type: 'PROJECT_DEVELOPER',
            Portfolio: '',
            'Account Expiry Date': '02/01/2024',
        },
        {
            Name: 'UTCL',
            URL: 'www.UTCL.com',
            Type: 'PROJECT_DEVELOPER',
            Portfolio: '',
            'Account Expiry Date': '03/01/2024',
        },
    ];

    const results = parseOrganizations(data);

    expect(results).toEqual([
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
    ]);
});

test('parseProjects', () => {
    const data = [
        {
            'Project name': 'Renewable wind power project in India - 1-006',
            Registry: 'GCC',
            'Registry project ID': 'S00209',
            'Registry URL':
                'https://projects.globalcarboncouncil.com/project/408',
            Country: 'India',
            'State/Region': '',
            Methodology: 'ACM0002',
            'Project type': 'Renewable energy',
            'Project sub-type': 'Wind',
            Notes: 'Total 2 wind power projects. Total AC capacity of 98.00 MW',
            'Crediting period start date': '2017-02-11T00:00:00.0Z',
            'Crediting period end date': '2027-02-10T00:00:00.0Z',
            'Annual approximate credit volume': '189103',
            'Portfolio Owner': 'ReNew',
            'Asset Owner': 'ReNew',
        },
        {
            'Project name': 'Renewable wind power project in India -1- 017',
            Registry: 'GCC',
            'Registry project ID': 'S00292',
            'Registry URL':
                'https://projects.globalcarboncouncil.com/project/408',
            Country: 'India',
            'State/Region': '',
            Methodology: 'ACM0002',
            'Project type': 'Renewable energy',
            'Project sub-type': 'Wind',
            Notes: 'Total AC capacity of 300.00 MW',
            'Crediting period start date': '2022-09-24T00:00:00.0Z',
            'Crediting period end date': '2032-09-23T00:00:00.0Z',
            'Annual approximate credit volume': '926789',
            'Portfolio Owner': 'ReNew',
            'Asset Owner': 'ReNew',
        },
    ];

    const results = parseProjects(data);

    expect(results).toEqual([
        {
            name: 'Renewable wind power project in India - 1-006',
            registry: 'GCC',
            registryProjectId: 'S00209',
            registryUrl: 'https://projects.globalcarboncouncil.com/project/408',
            countries: ['India'],
            states: [],
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
            states: [],
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
    ]);
});

test('parseEngagements()', () => {
    const data = [
        {
            Project: 'Renewable wind power project in India - 1-014',
            Engagement: 'Registration',
            'Start Date': '2023-02-01T00:00:00.0Z',
            'Due Date': '2023-12-21T00:00:00.0Z',
            'Completion Date': '',
            State: 'IN_PROGRESS',
            Notes: '',
        },
        {
            Project: 'BSE-BRM Grid Connected Solar PV Project',
            Engagement: 'Feasibility',
            'Start Date': '2022-03-25T00:00:00.0Z',
            'Due Date': '2022-09-21T00:00:00.0Z',
            'Completion Date': '2022-09-01T00:00:00.0Z',
            State: 'COMPLETED',
            Notes: '',
        },
    ];

    const results = parseEngagements(data);

    expect(results).toEqual([
        {
            project: 'Renewable wind power project in India - 1-014',
            type: 'Registration',
            startDate: '2023-02-01T00:00:00.000Z',
            dueDate: '2023-12-21T00:00:00.000Z',
            state: 'IN_PROGRESS',
            notes: '',
        },
        {
            project: 'BSE-BRM Grid Connected Solar PV Project',
            type: 'Feasibility',
            startDate: '2022-03-25T00:00:00.000Z',
            dueDate: '2022-09-21T00:00:00.000Z',
            completedDate: '2022-09-01T00:00:00.000Z',
            state: 'COMPLETED',
            notes: '',
        },
    ]);
});

test('parseTasks()', () => {
    const data = [
        {
            Project: '10 MW Wind Power Plant (LLG)',
            Engagement: 'Feasibility',
            Task: 'Eligibility Analysis',
            'Start Date': '2022-04-24T00:00:00.0Z',
            'Due Days': '',
            'Due Date': '2022-05-24T00:00:00.0Z',
            'Completion Days': '',
            'Completion Date': '2022-05-24T00:00:00.0Z',
            State: 'COMPLETED',
        },
        {
            Project: 'Renewable wind power project in India - 1-014',
            Engagement: 'Registration',
            Task: 'Project Registered',
            'Start Date': '2023-12-21T00:00:00.0Z',
            'Due Days': '',
            'Due Date': '2023-12-21T00:00:00.0Z',
            'Completion Days': '',
            'Completion Date': '',
            State: 'NOT_STARTED',
        },
        {
            Project: 'Renewable wind power project in India - 1-014',
            Engagement: 'Registration',
            Task: 'Document Collection',
            'Start Date': '2023-02-01T00:00:00.0Z',
            'Due Days': '',
            'Due Date': '2023-12-21T00:00:00.0Z',
            'Completion Days': '',
            'Completion Date': '',
            State: 'IN_PROGRESS',
        },
    ];

    const results = parseTasks(data);

    expect(results).toEqual([
        {
            project: '10 MW Wind Power Plant (LLG)',
            engagement: 'Feasibility',
            type: 'Eligibility Analysis',
            startDate: '2022-04-24T00:00:00.000Z',
            dueDate: '2022-05-24T00:00:00.000Z',
            completedDate: '2022-05-24T00:00:00.000Z',
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
    ]);
});

test('parseProjectTypes()', () => {
    const data = [
        {
            Name: 'Solar Water Heaters',
            ParentType: 'Renewable Energy',
        },
        {
            Name: 'Wind',
            ParentType: 'Renewable Energy',
        },
        {
            Name: 'Hybrid',
            ParentType: 'Renewable Energy',
        },
        {
            Name: 'Bicycles',
            ParentType: '',
        },
        {
            Name: 'Electric Vehicles & Charging',
            ParentType: '',
        },
    ];

    const results = parseProjectTypes(data);

    expect(results).toEqual([
        {
            name: 'Solar Water Heaters',
            parentType: 'Renewable Energy',
        },
        {
            name: 'Wind',
            parentType: 'Renewable Energy',
        },
        {
            name: 'Hybrid',
            parentType: 'Renewable Energy',
        },
        {
            name: 'Bicycles',
            parentType: '',
        },
        {
            name: 'Electric Vehicles & Charging',
            parentType: '',
        },
    ]);
});
