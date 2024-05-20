// src/routes/concerts.ts
import express, { Request, Response } from 'express';
import { getAllConcerts, getConcertById, addConcert, updateConcert, deleteConcert } from '../services/concert-svc';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const concerts = await getAllConcerts();
    res.json(concerts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const concert = await getConcertById(req.params.id);
    if (concert) {
      res.json(concert);
    } else {
      res.status(404).send('Concert not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newConcert = await addConcert(req.body);
    res.status(201).json(newConcert);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedConcert = await updateConcert(req.params.id, req.body);
    if (updatedConcert) {
      res.json(updatedConcert);
    } else {
      res.status(404).send('Concert not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await deleteConcert(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send('Concert not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
