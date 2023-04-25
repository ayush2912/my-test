import request from 'supertest';

import { App } from '../app';

// describe('/projects', () => {
//     test('GET /projects', () => {
//         const app = App();

//         request(app)

//     });
// });

describe('/projects/{projectId}', () => {
    test('GET /projects/{projectId}', async () => {
        const app = App();

        const results = await request(app)
            .get('/projects/6447b7616130c5eb2099dffe')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(results.body.status).toBe('Success');
        expect(results.body.message).toBe(
            'Project Details Retrived Successfully'
        );
    });

    test('GET /projects/{projectId} with invalid projectId', async () => {
        const app = App();

        const results = await request(app).get('/projects/vhasd');

        expect(results.body.errors).toEqual([
            {
                msg: 'Validation errors/ Invalid arguments',
                code: 'VALIDATION_ERROR',
            },
            { msg: 'Invalid Project Id', code: 'VALIDATION_ERROR' },
        ]);

        // expect(results.body.status).toBe('Error');
        // expect(results.body.message).toBe('Get Project Detail failed');
    });
});
