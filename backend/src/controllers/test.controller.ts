import { Request, Response } from "express";

export function TestController(req: Request, res: Response) {
    res.json({ message: "What's up megasoft" });
}