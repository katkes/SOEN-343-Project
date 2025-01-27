import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  // Logic to fetch users
  res.json([{ message: "What's up megasoft" }]);
});

export default router