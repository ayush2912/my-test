import { getProjectEngagementDetails } from '../projectService';
import projects = require('../../actions/projects');
import { faker } from '@faker-js/faker';

beforeEach((done) => {
    setTimeout(() => {
        done();
    }, 1000);
});
describe('getprojectEngagementDetails()', () => {
    test('it should return response from getProjectEngagements method in actions', async () => {
        const mockGetProjectEngagements = jest.fn();
        const projectId = faker.database.mongodbObjectId();
        const mockProjectEngagements = [
            {
                id: projectId,
                name: 'Renewable Get Power Project',
                createdAt: faker.date.recent(),
                updatedAt: faker.date.recent(),
                engagements: [
                    {
                        id: faker.database.mongodbObjectId(),
                        projectId: faker.database.mongodbObjectId(),
                        startDate: faker.date.recent(),
                        dueDate: '2024-05-08T21:04:33.782Z',
                        completedDate: '2023-05-08T21:04:33.782Z',
                        type: 'Johnston LLC',
                        state: 'COMPLETED',
                        notes: 'similique dolore doloremque ipsum occaecati labore sed modi dolores earum',
                        attributes: [],
                        stateHistory: [],
                        tasks: [
                            {
                                id: faker.database.mongodbObjectId(),
                                startDate: faker.date.recent(),
                                state: 'COMPLETED',
                                dueDate: '2022-05-08T21:04:33.782Z',
                                completedDate: '2023-05-08T21:04:33.782Z',
                            },
                        ],
                    },
                ],
            },
        ];
        jest.spyOn(projects, 'getProjectEngagements').mockImplementation(
            mockGetProjectEngagements
        );
        mockGetProjectEngagements.mockReturnValue(mockProjectEngagements);

        const projectEngagements = await getProjectEngagementDetails();

        expect(mockGetProjectEngagements).toHaveBeenCalledWith();
        expect(projectEngagements).toEqual(mockProjectEngagements);
        const engagement = projectEngagements[0].engagements[0];
        const tasks = projectEngagements[0].engagements[0].tasks;
        if (tasks !== undefined && tasks.length > 0) {
            const task = tasks[0];
            expect(task['isOverdue' as keyof typeof task]).toBe(true);
        }
        expect(engagement['isOverdue' as keyof typeof engagement]).toBe(false);
    });
});
