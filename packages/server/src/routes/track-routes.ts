import express from 'express';
import * as trackService from '../services/track-svc';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tracks = await trackService.getAllTracks();
    res.json(tracks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const track = await trackService.getTrackById(req.params.id);
    if (track) {
      res.json(track);
    } else {
      res.status(404).send('Track not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTrack = await trackService.addTrack(req.body);
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTrack = await trackService.updateTrack(req.params.id, req.body);
    if (updatedTrack) {
      res.json(updatedTrack);
    } else {
      res.status(404).send('Track not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await trackService.deleteTrack(req.params.id);
    if (result) {
      res.send('Track deleted');
    } else {
      res.status(404).send('Track not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
