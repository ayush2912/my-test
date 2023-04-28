import { faker } from '@faker-js/faker';
import prisma from '../prisma';
import {
    createEngagement,
    deleteEngagement,
    updateEngagement,
} from '../enagagements';

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
                    startDate: '2019-08-24T14:15:22.000Z',
                    dueDate: '2019-10-24T14:15:22.000Z',
                    stateHistory: [
                        {
                            state: 'NOT_STARTED',
                            stateUpdatedAt: '2019-08-24T14:15:22.000Z',
                        },
                    ],
                },
                {
                    type: 'Submit the PPD',
                    startDate: '2019-08-12T14:15:22.000Z',
                    dueDate: '2019-10-26T14:15:22.000Z',
                    stateHistory: [
                        {
                            state: 'NOT_STARTED',
                            stateUpdatedAt: '2019-08-12T14:15:22.000Z',
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
                    stateUpdatedAt: '2019-10-26T14:15:22.000Z',
                },
            ],
        };
        const result = await createEngagement(data);

        expect(result.state).toBe('NOT_STARTED');
        expect(result.type).toBe(data.type);
        expect(result?.startDate?.getTime()).toBe(
            new Date(data.startDate).getTime()
        );
        expect(result?.dueDate?.getTime()).toBe(
            new Date(data.dueDate).getTime()
        );
        expect(result.projectId).toBe(data.projectId);
        expect(result?.tasks?.length).toBe(data.tasks.length);
        expect(result?.stateHistory[0].state).toBe(data.stateHistory[0].state);
        expect(result?.stateHistory[0]?.stateUpdatedAt.getTime()).toBe(
            new Date(data.stateHistory[0].stateUpdatedAt).getTime()
        );
        result.tasks.sort((firstItem, secondItem) =>
            firstItem.type > secondItem.type ? 1 : 0
        );
        data.tasks.sort((firstItem, secondItem) =>
            firstItem.type > secondItem.type ? 1 : 0
        );
        data.tasks.forEach((data_task, index) => {
            const result_task = result.tasks[index];
            expect(result_task.type).toBe(data_task.type);
            expect(result_task.startDate.getTime()).toBe(
                new Date(data_task.startDate).getTime()
            );
            expect(result_task.dueDate.getTime()).toBe(
                new Date(data_task.dueDate).getTime()
            );
            expect(result_task.stateHistory[0].stateUpdatedAt.getTime()).toBe(
                new Date(data_task.stateHistory[0].stateUpdatedAt).getTime()
            );
            expect(result_task.stateHistory[0].state).toBe(
                data_task.stateHistory[0].state
            );
            expect(result_task.state).toBe('NOT_STARTED');
            expect(result_task.engagementId).toBe(result.id);
        });

        expect(
            result.attributes.sort((firstItem, secondItem) =>
                firstItem.key > secondItem.key ? 1 : 0
            )
        ).toEqual(
            data.attributes.sort((firstItem, secondItem) =>
                firstItem.key > secondItem.key ? 1 : 0
            )
        );

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
        const result = await updateEngagement(engagement.id, data);
        const deleted = await deleteEngagement(engagement.id);

        expect(result?.startDate.getTime()).toBe(
            new Date(data.startDate).getTime()
        );
        expect(result?.dueDate.getTime()).toBe(
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
        const result = await deleteEngagement(engagement.id);

        expect(result.type).toEqual(data.type);
        expect(result.id).toEqual(engagement.id);
    });
});
