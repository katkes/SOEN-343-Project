import { Request, Response } from 'express';

export async function TestController(req: Request, res: Response) {
  res.json({ message: "What's up megasoft" });
}
