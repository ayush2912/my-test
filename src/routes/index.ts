import { Request, Response } from "express";

import { events } from "../services/events";

import { z } from "zod";

export const notifyHandler = (req: Request, res: Response) => {
  const reqBodySchema = z.object({
    userId: z.string().length(24),
  });

  const results = reqBodySchema.safeParse(req.body);

  if (!results.success) {
    return res.status(400).json({ status: 400, error: results.error.issues });
  }

  events.emit("notify", { userId: results.data.userId });
  res.status(200).json({ status: 200 });
};
