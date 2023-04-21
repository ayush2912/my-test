import { Request, Response, Router } from 'express';
import { getPostData, createPostData } from '../services/postService';

export default function routes(router: Router) {
    router.get('/post/:id', async (req: Request, res: Response) => {
        try {
            console.info('----- /post/:id ----');
            const results = await getPostData(req.params.id);

            res.sendSuccess({
                data: results.title,
                msg: 'get posts successfully',
            });
        } catch (error) {
            res.sendError(error);
        }
    });

    router.post('/createPost', async (req: Request, res: Response) => {
        try {
            console.info('--- /createPost ----');
            const newData = await createPostData(
                req.body.title,
                req.body.content
            );

            res.sendSuccess({
                status_code: 201,
                data: newData,
                msg: 'checking successfully',
            });
        } catch (error) {
            res.sendError(error);
        }
    });
}
