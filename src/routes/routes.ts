import { Router, Request, Response, NextFunction } from "express";

import { z } from "zod";

export const routeHandler = (req: Request, res: Response) =>
  res.send(
    '<div class="tenor-gif-embed" data-postid="23513555" data-share-method="host" data-aspect-ratio="1.77778" data-width="100%"><a href="https://tenor.com/view/sheldon-cooper-bazinga-tbbt-gif-23513555">Sheldon Cooper GIF</a>from <a href="https://tenor.com/search/sheldon-gifs">Sheldon GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>'
  );

export const asyncRouteHandler = async (req: Request, res: Response) =>
  res.json({
    data: "Hello world!",
  });

export const createPetHandler = (req: Request, res: Response) => {
  const ReqBodySchema = z.object({
    name: z.string(),
    type: z.enum(["Dog", "Cat", "Bird"]),
    dateOfBirth: z.coerce.date(),
    description: z.string().optional(),
  });

  try {
    const parsedBody = ReqBodySchema.parse(req.body);
    res.json(parsedBody);
  } catch (e: any) {
    res.json({ error: e.issues });
  }
};

export default function routes(router: Router) {
  router.get("/", routeHandler);
  router.get("/async", asyncRouteHandler);
  router.post("/pet", createPetHandler);
}
