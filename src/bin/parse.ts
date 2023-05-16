import moment from 'moment';

type CSVOrganization = {
    Name: string;
    URL: string;
    Type: string;
    Portfolio: string;
    'Account Expiry Date': string;
};

type CSVProject = {
    'Project name': string;
    Registry: string;
    'Registry project ID': string;
    'Registry URL': string;
    Country: string;
    'State/Region': string;
    Methodology: string;
    'Project type': string;
    'Project sub-type': string;
    Notes: string;
    'Crediting period start date': string;
    'Crediting period end date': string;
    'Annual approximate credit volume': string;
    'Portfolio Owner': string;
    'Asset Owner': string;
};

type CSVEngagement = {
    Project: string;
    Engagement: string;
    'Start Date': string;
    'Due Date': string;
    'Completion Date': string;
    State: string;
    Notes: string;
};

type CSVTask = {
    Project: string;
    Engagement: string;
    Task: string;
    'Start Date': string;
    'Due Days': string;
    'Due Date': string;
    'Completion Days': string;
    'Completion Date': string;
    State: string;
};

type CSVProjectType = {
    Name: string;
    ParentType: string;
};

type CSVMethodologies = {
    Registry: string;
    Code: string;
    Name: string;
    FullName: string;
};

export const parseOrganizations = (data: CSVOrganization[]) =>
    data.map((d: CSVOrganization) => ({
        name: d.Name,
        url: d.URL,
        type: d.Type,
        expiryDate: moment
            .utc(d['Account Expiry Date'], 'DD/MM/YYYY')
            .toISOString(),
    }));

export const parseProjects = (data: CSVProject[]) =>
    data.map((d: CSVProject) => ({
        name: d['Project name'].trim(),
        registry: d.Registry.trim(),
        registryProjectId: d['Registry project ID'].trim(),
        registryUrl: d['Registry URL'].trim(),
        countries: d.Country.split(',').map((s) => s.trim()),
        states: d['State/Region'].split(',').map((s) => s.trim()),
        methodologies: d.Methodology.split(',').map((s) => s.trim()),
        types: d['Project type'].split(',').map((s) => s.trim()),
        subTypes: d['Project sub-type'].split(',').map((s) => s.trim()),
        notes: d.Notes,
        creditingPeriodStartDate: moment
            .utc(d['Crediting period start date'])
            .toISOString(),
        creditingPeriodEndDate: moment
            .utc(d['Crediting period end date'])
            .toISOString(),
        annualApproximateCreditVolume: parseInt(
            d['Annual approximate credit volume'] || '0'
        ),
        portfolioOwner: d['Portfolio Owner'].trim(),
        assetOwners: d['Asset Owner'].split(',').map((s) => s.trim()),
    }));

export const parseEngagements = (data: CSVEngagement[]) =>
    data.map((d: CSVEngagement) => ({
        project: d.Project,
        type: d.Engagement,
        startDate: moment.utc(d['Start Date']).toISOString(),
        dueDate: moment.utc(d['Due Date']).toISOString(),
        state: d.State,
        notes: d.Notes,
        ...(d['Completion Date'] && {
            completedDate: moment.utc(d['Completion Date']).toISOString(),
        }),
    }));

export const parseTasks = (data: CSVTask[]) =>
    data.map((d: CSVTask) => ({
        project: d.Project,
        engagement: d.Engagement,
        type: d.Task,
        startDate: moment.utc(d['Start Date']).toISOString(),
        dueDate: moment.utc(d['Due Date']).toISOString(),
        state: d.State,
        ...(d['Completion Date'] && {
            completedDate: moment.utc(d['Completion Date']).toISOString(),
        }),
    }));
export const parseProjectTypes = (data: CSVProjectType[]) =>
    data.map((d: CSVProjectType) => ({
        name: d.Name,
        parentType: d.ParentType,
    }));

export const parseCountries = (data: string) => JSON.parse(data);

export const parseMethodologies = (data: CSVMethodologies[]) =>
    data.map((d: CSVMethodologies) => ({
        registry: d.Registry,
        code: d.Code,
        name: d.Name,
        fullName: d.FullName,
    }));
