import { faker } from '@faker-js/faker';

import { prisma } from '../prisma';
import {
    createEngagement,
    deleteEngagement,
    updateEngagement,
} from '../engagements';

const project = {
    id: faker.database.mongodbObjectId(),
    name: faker.company.name(),
    state: 'ACTIVE',
    isActive: true,
};
beforeAll(() => Promise.resolve(prisma.project.create({ data: project })));

afterAll(() =>
    prisma.project.delete({
        where: {
            id: project.id,
        },
    })
);
describe('createEngagement()', () => {
    test('it should create an engagement successfully', async () => {
        const data = {
            type: 'Getting a Project Listed',
            startDate: '2019-08-24T14:15:22Z',
            dueDate: '2019-08-24T14:15:22Z',
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
        const result = await createEngagement(data);

        if (!result.id) {
            throw new Error('Engagement not created');
        }

        expect(result.state).toBe('NOT_STARTED');
        expect(result.type).toBe(data.type);
        expect(result?.startDate?.getTime()).toBe(
            new Date(data.startDate).getTime()
        );
        expect(result?.dueDate?.getTime()).toBe(
            new Date(data.dueDate).getTime()
        );
        expect(result.projectId).toBe(data.projectId);
        expect(data.tasks.length).toEqual(result?.tasks?.length);

        data.tasks.forEach((dataItem) => {
            expect(result.tasks).toContainEqual(
                expect.objectContaining(dataItem)
            );
        });
        expect(data.attributes.length).toEqual(result?.attributes?.length);

        data.attributes.forEach((dataItem) => {
            expect(result.attributes).toContainEqual(dataItem);
        });

        expect(data.stateHistory.length).toEqual(result?.stateHistory?.length);

        data.stateHistory.forEach((dataItem) => {
            expect(result.stateHistory).toContainEqual(dataItem);
        });
        await deleteEngagement(result.id);
    });
});

describe('updateEngagement()', () => {
    test('it should delete an engagement successfully', async () => {
        const createData = {
            type: 'Getting a Project Listed',
            startDate: '2019-08-24T14:15:22Z',
            dueDate: '2019-08-24T14:15:22Z',
            projectId: project.id,
            tasks: [
                {
                    type: 'Project design document',
                    startDate: '2019-08-24T14:15:22.000Z',
                    dueDate: '2019-10-24T14:15:22.000Z',
                    stateHistory: [
                        {
                            state: 'NOT_STARTED',
                            stateUpdatedAt: '2019-08-24T14:15:22.000Z',
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
                {
                    name: 'Voltage',
                    key: 'VOLT',
                    type: 'float',
                    value: '78.5',
                },
            ],
        };
        const data = {
            state: 'IN_PROGRESS',
            startDate: '2019-08-26T14:15:22.000Z',
            dueDate: '2019-10-05T14:15:22.000Z',
            completedDate: '2019-10-04T14:15:22.000Z',
            notes: 'engagement updated',
            attributes: [
                {
                    key: 'KW_H',
                    value: '250',
                },
                {
                    key: 'REG_ID',
                    value: '6778updated',
                },
            ],
        };
        const keyValues: { [key: string]: any } = {};
        for (const attribute of data.attributes) {
            keyValues[attribute.key] = attribute.value;
        }
        const engagement = await createEngagement(createData);

        if (!engagement.id) {
            throw new Error('Engagement not created');
        }

        const result = await updateEngagement(engagement.id, data);

        expect(result?.startDate?.getTime()).toBe(
            new Date(data.startDate).getTime()
        );
        expect(result?.dueDate?.getTime()).toBe(
            new Date(data.dueDate).getTime()
        );
        expect(result?.state).toEqual(data.state);
        if (result?.completedDate)
            expect(result?.completedDate.getTime()).toBe(
                new Date(data.completedDate).getTime()
            );
        expect(result?.notes).toEqual(data.notes);
        if (result?.attributes)
            for (const attribute of result?.attributes || []) {
                if (attribute.key in keyValues)
                    expect(attribute.value).toBe(keyValues[attribute.key]);
            }
        expect(result?.id).toEqual(engagement.id);

        await deleteEngagement(engagement.id);
    });
});

describe('deleteEngagement()', () => {
    test('it should delete an engagement successfully', async () => {
        const data = {
            type: 'Getting a Project Listed',
            startDate: '2019-08-24T14:15:22Z',
            dueDate: '2019-08-24T14:15:22Z',
            projectId: project.id,
            tasks: [
                {
                    type: 'Project design document',
                    startDate: '2019-08-24T14:15:22.000Z',
                    dueDate: '2019-10-24T14:15:22.000Z',
                    stateHistory: [
                        {
                            state: 'NOT_STARTED',
                            stateUpdatedAt: '2019-08-24T14:15:22.000Z',
                        },
                    ],
                },
            ],
            stateHistory: [
                {
                    state: 'NOT_STARTED',
                    stateUpdatedAt: '2019-10-26T14:15:22.000Z',
                },
            ],
        };

        const engagement = await createEngagement(data);

        if (!engagement.id) {
            throw new Error('Engagement not created');
        }

        const result = await deleteEngagement(engagement.id);

        expect(result.type).toEqual(data.type);
        expect(result.id).toEqual(engagement.id);
    });
});
