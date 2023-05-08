import request from 'supertest';
import { App } from '../../app';
import { faker } from '@faker-js/faker';
import projectService = require('../../services/projectService');

describe('/project-engagements/{projectId}', () => {
    test('GET /project-engagements/{projectId} with valid project id', async () => {
        const app = App();
        const projectId = faker.database.mongodbObjectId();

        const mockGetProjectEngagementDetails = jest.fn();
        jest.spyOn(
            projectService,
            'getProjectEngagementDetails'
        ).mockImplementation(mockGetProjectEngagementDetails);
        const mockProjectEngagements = {
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
        };
        mockGetProjectEngagementDetails.mockReturnValue(mockProjectEngagements);

        const results = await request(app)
            .get(`/project-engagements/${projectId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(results.body.status).toBe('Success');
        expect(results.body.message).toBe(
            'Project Engagement Details Retrieved Successfully'
        );
        expect(results.body.data.id).toEqual(mockProjectEngagements.id);
        expect(results.body.data.name).toEqual(mockProjectEngagements.name);
        expect(results.body.data.engagements).toEqual(
            expect.arrayContaining(
                mockProjectEngagements.engagements.map((given) =>
                    expect.objectContaining({ ...given })
                )
            )
        );
        expect(mockGetProjectEngagementDetails).toHaveBeenCalledWith(projectId);
    });

    test('GET /project-engagements/{projectId} with invalid project id', async () => {
        const app = App();
        // const projectId = 'abcd';

        const results = await request(app).get('/project-engagements/2345');

        expect(results.statusCode).toBe(400);
        expect(results.body.errors).toEqual([
            {
                msg: 'Invalid Project Id',
                code: 'BAD_REQUEST',
            },
        ]);
    });
});
