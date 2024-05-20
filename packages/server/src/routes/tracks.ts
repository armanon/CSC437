// src/routes/tracks.ts
import express, { Request, Response } from 'express';
import { getAllTracks, getTrackById, addTrack, updateTrack, deleteTrack } from '../services/track-svc';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const tracks = await getAllTracks();
    res.json(tracks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const track = await getTrackById(req.params.id);
    if (track) {
      res.json(track);
    } else {
      res.status(404).send('Track not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newTrack = await addTrack(req.body);
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedTrack = await updateTrack(req.params.id, req.body);
    if (updatedTrack) {
      res.json(updatedTrack);
    } else {
      res.status(404).send('Track not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await deleteTrack(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send('Track not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
