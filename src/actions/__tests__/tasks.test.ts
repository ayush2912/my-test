import { faker } from '@faker-js/faker';
import { prisma } from '../../actions/prisma';
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

        if (!createdTasks.length) {
            throw new Error('Tasks have not been created');
        }

        expect(createdTasks.length).toEqual(data.length);

        expect(createdTasks).toEqual(
            expect.arrayContaining(
                data.map((given) => expect.objectContaining({ ...given }))
            )
        );

        const taskIds = createdTasks.map((t) => t?.id) as string[];

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
