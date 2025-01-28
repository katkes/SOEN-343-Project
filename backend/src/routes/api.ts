import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  // Logic to fetch users
  res.json({ message: "What's up megasoft" });
});

router.all('*', (_, res)=> {
  res.status(404).json({'error': "Route not found."})
})

export default router