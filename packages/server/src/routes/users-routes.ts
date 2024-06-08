import express from 'express';
import * as userService from '../services/user-svc';

const router = express.Router();

const getErrorMessage = (u: unknown): string => {
  if (u && typeof u === 'object' && 'message' in u && typeof u.message === 'string') {
    return u.message;
  } else {
    return 'Unknown Error';
  }
};

router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await userService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    if (result) {
      res.send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
});

export default router;
