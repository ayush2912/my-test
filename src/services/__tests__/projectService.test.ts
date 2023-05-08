import { getProjectEngagementDetails } from '../projectService';
import projects = require('../../actions/projects');
import { faker } from '@faker-js/faker';

describe('getprojectEngagementDetails()', () => {
    it('it should return response from getProjectEngagements method in actions', async () => {
        const mockGetProjectEngagements = jest.fn();
        const projectId = faker.database.mongodbObjectId();
        const mockProjectEngagements = {
            id: projectId,
            name: 'Renewable Get Power Project',
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent(),
            engagements: [
                {
                    id: faker.database.mongodbObjectId(),
                    projectId: faker.database.mongodbObjectId(),
                    startDate: faker.date.recent(),
                    dueDate: faker.date.future(),
                    completedDate: faker.date.future(),
                    type: 'Johnston LLC',
                    state: 'COMPLETED',
                    notes: 'similique dolore doloremque ipsum occaecati labore sed modi dolores earum',
                    attributes: [],
                    stateHistory: [],
                    tasks: [],
                },
            ],
        };
        jest.spyOn(projects, 'getProjectEngagements').mockImplementation(
            mockGetProjectEngagements
        );
        mockGetProjectEngagements.mockReturnValue(mockProjectEngagements);

        const engagements = await getProjectEngagementDetails(projectId);

        expect(mockGetProjectEngagements).toHaveBeenCalledWith(projectId);
        expect(engagements).toEqual(mockProjectEngagements);
    });
});
