import { Router, Request, Response, NextFunction } from "express";

import { z } from "zod";

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
  router.get("/async", asyncRouteHandler);
  router.post("/pet", createPetHandler);
}
