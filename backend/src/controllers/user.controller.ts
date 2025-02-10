import { Request, Response } from "express";
import { createUser, getUsers } from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;
    const user = await createUser({ name, email, age });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
