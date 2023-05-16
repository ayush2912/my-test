import request from 'supertest';
import { App } from '../../app';
import { faker } from '@faker-js/faker';
import projectService = require('../../services/projectService');

beforeEach((done) => {
    setTimeout(() => {
        done();
    }, 1000);
});
describe('/project-engagements}', () => {
    test('GET /project-engagements/', async () => {
        const app = App();
        const projectId = faker.database.mongodbObjectId();

        const mockGetProjectEngagementDetails = jest.fn();
        jest.spyOn(
            projectService,
            'getProjectEngagementDetails'
        ).mockImplementation(mockGetProjectEngagementDetails);
        const mockProjectEngagements = [
            {
                id: projectId,
                name: 'Renewable Get Power Project',
                createdAt: faker.date.recent().toISOString(),
                updatedAt: faker.date.recent().toISOString(),
                engagements: [
                    {
                        id: faker.database.mongodbObjectId(),
                        projectId: faker.database.mongodbObjectId(),
                        startDate: faker.date.recent().toISOString(),
                        dueDate: faker.date.future().toISOString(),
                        completedDate: faker.date.future().toISOString(),
                        type: 'Johnston LLC',
                        state: 'COMPLETED',
                        notes: 'similique dolore doloremque ipsum occaecati labore sed modi dolores earum',
                        attributes: [],
                        stateHistory: [],
                        tasks: [],
                    },
                ],
            },
        ];
        mockGetProjectEngagementDetails.mockReturnValue(mockProjectEngagements);

        const results = await request(app)
            .get(
                `/project-engagements?organizationIds=6448d91ea2b95136130c9550`
            )
            .expect('Content-Type', /json/)
            .expect(200);

        expect(results.body.status).toBe('Success');
        expect(results.body.message).toBe(
            'Project Engagement Details Retrieved Successfully'
        );
        expect(results.body.data.length).toEqual(mockProjectEngagements.length);

        mockProjectEngagements.forEach((dataItem) => {
            expect(results.body.data).toContainEqual(
                expect.objectContaining(dataItem)
            );
        });
        expect(mockGetProjectEngagementDetails).toHaveBeenCalledWith({
            organizationIds: ['6448d91ea2b95136130c9550'],
            take: 10,
            skip: 0,
        });
    });
});
