// src/routes/users.ts
import express, { Request, Response } from 'express';
import { getAllUsers, getUserById, addUser, updateUser, deleteUser } from '../services/user-svc';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await deleteUser(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
