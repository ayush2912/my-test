import { faker } from '@faker-js/faker';
import prisma from '../prisma';
import { createTasks, updateTask, deleteTask } from '../tasks';
import { deleteProject } from '../projects';
const project = {
    id: faker.database.mongodbObjectId(),
    name: faker.company.name(),
    state: 'ACTIVE',
    isActive: true,
};
const engagement = {
    id: faker.database.mongodbObjectId(),
    projectId: project.id,
    type: 'Getting a Project Listed',
    startDate: faker.date.recent(),
    dueDate: faker.date.future(),
};

beforeAll(async () =>
    Promise.all([
        prisma.project.create({ data: project }),
        prisma.engagement.create({ data: engagement }),
    ])
);

afterAll(async () => deleteProject(project.id));

describe('createTasks()', () => {
    test('it should create tasks successfully', async () => {
        const data = [
            {
                engagementId: engagement.id,
                type: 'PPD',
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
                engagementId: engagement.id,
                type: 'submitted the document',
                startDate: faker.date.recent(),
                dueDate: faker.date.future(),
                stateHistory: [
                    {
                        state: 'NOT_STARTED',
                        stateUpdatedAt: faker.date.recent(),
                    },
                ],
            },
        ];
        const createdTasks = await createTasks(data);

        expect(createdTasks.length).toEqual(data.length);
        createdTasks.sort((a: any, b: any) => a.type - b.type);
        data.sort((a: any, b: any) => a.type - b.type);

        for (let i = 0; i < createdTasks.length; i++) {
            const given = data[i];
            const created = createdTasks[i];
            expect(given.type).toEqual(created.type);
            expect(given.startDate).toEqual(created.startDate);
            expect(given.dueDate).toEqual(created.dueDate);
            expect(given.engagementId).toEqual(created.engagementId);
            expect(given.stateHistory.length).toEqual(
                created.stateHistory?.length
            );
            for (let i = 0; i < given.stateHistory.length; i++) {
                expect(given.stateHistory[i].state).toEqual(
                    created.stateHistory?.[i]?.state
                );
                expect(given.stateHistory[i].stateUpdatedAt).toEqual(
                    created.stateHistory?.[i]?.stateUpdatedAt
                );
            }
        }
        const taskIds: string[] = [];
        for (let i = 0; i < createdTasks.length; i++) {
            taskIds.push(createdTasks[i].id!);
        }
        prisma.task.deleteMany({
            where: {
                id: {
                    in: taskIds,
                },
            },
        });
    });
});

describe('updateTask()', () => {
    test('it should update task successfully', async () => {
        const task = await prisma.task.create({
            data: {
                id: faker.database.mongodbObjectId(),
                engagement: {
                    connect: {
                        id: engagement.id,
                    },
                },
                type: 'Submit the Document',
                startDate: faker.date.recent(),
                dueDate: faker.date.future(),
            },
        });

        const data = {
            type: 'PPD',
            startDate: faker.date.recent(),
            dueDate: faker.date.future(),
        };
        const result = await updateTask(task.id, data);

        expect(result?.type).toEqual(data.type);
        expect(result?.startDate).toEqual(data.startDate);
        expect(result?.dueDate).toEqual(data.dueDate);

        prisma.task.delete({
            where: {
                id: task.id,
            },
        });
    });
});

describe('deleteTask()', () => {
    test('it should delete task successfully', async () => {
        const task = await prisma.task.create({
            data: {
                id: faker.database.mongodbObjectId(),
                engagement: {
                    connect: {
                        id: engagement.id,
                    },
                },
                type: 'Submit the Document',
                startDate: faker.date.recent(),
                dueDate: faker.date.future(),
            },
        });

        if (!task.id) {
            throw new Error('Task not created');
        }

        const result = await deleteTask(task.id);

        expect(result.type).toEqual(task.type);
        expect(result.id).toEqual(task.id);
    });
});
