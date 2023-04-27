import { faker } from '@faker-js/faker';

enum State {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

const countryList = [
    {
        name: 'India',
        iso3Name: 'IND',
        iso2Name: 'IN'
    },
    {
        name: 'United Kingdom',
        iso3Name: 'GBR',
        iso2Name: 'GB',
    },
    {
        name: 'United States',
        iso3Name: 'USA',
        iso2Name: 'US',
    },
];

const countries = Array(3)
    .fill(0)
    .map((_, index) => ({
        id: faker.database.mongodbObjectId(),
        ...countryList[index],
    }));

const methodologies = Array(3)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        name: faker.company.bs(),
    }));

const registries = Array(3)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        name: faker.company.name(),
    }));

const projectTypes = Array(1)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        name: faker.company.catchPhraseNoun(),
    }));

const organizations = Array(3)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        name: faker.company.name(),
    }));

const engagements = Array(3)
    .fill(0)
    .map(() => ({
        id: faker.database.mongodbObjectId(),
        projectId: faker.database.mongodbObjectId(),
        type: faker.company.name(),
        startDate: faker.date.recent(),
        dueDate: faker.date.future(),
        completedDate: faker.date.future(),
        state: faker.helpers.arrayElement(Object.values(State)),
        notes: faker.lorem.words(10)
    }));

const states = ['UP', 'Maharashtra', 'California']

export { countries, states, methodologies, registries, projectTypes, organizations, engagements }