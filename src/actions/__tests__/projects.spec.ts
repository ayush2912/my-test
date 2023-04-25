import prisma from '../prisma';

import { getProject } from '../projects';

describe('getProject()', () => {
    beforeAll(async () => {
        await prisma.project.create({
            data: {
                id: '6446591277702d34131426ea',
                name: 'Test Project 1',
                state: 'test_state',
                isActive: true,
            },
        });
        await prisma.engagement.create({
            data: {
                id: '6446591277702d34131427bb',
                type: 'Test Engagement 1',
                startDate: new Date('2023-04-25'),
                dueDate: new Date('2023-05-01'),
                project: {
                    connect: {
                        id: '6446591277702d34131426ea',
                    },
                },
            },
        });
        await prisma.task.create({
            data: {
                id: '6446591277702d3413142ebc',
                type: 'Test Task 1',
                engagementId: '6446591277702d34131427bb',
                startDate: new Date('2023-04-25'),
                dueDate: new Date('2023-05-01'),
            },
        });
    });

    afterAll(async () => {
        await prisma.task.deleteMany();
        await prisma.engagement.deleteMany();
        await prisma.project.deleteMany();
        await prisma.$disconnect();
    });

    it('get project details with engagements and tasks sorted by start date and type', async () => {
        const projectId = '6446591277702d34131426ea';
        const result = await getProject(projectId);

        expect(typeof result?.id).toBe('string');
        expect(result?.name).toBe('Test Project 1');
        expect(Array.isArray(result?.engagements)).toBe(true);
    });

    it('returns null if the project does not exist', async () => {
        const projectId = '5116591277702d2113142ebc';
        const result = await getProject(projectId);
        expect(result).toBeNull();
    });
});


