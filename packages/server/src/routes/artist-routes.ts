import express from 'express';
import * as artistService from '../services/artist-svc';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const artists = await artistService.getAllArtists();
    res.json(artists);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const artist = await artistService.getArtistById(req.params.id);
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).send('Artist not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newArtist = await artistService.addArtist(req.body);
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedArtist = await artistService.updateArtist(req.params.id, req.body);
    if (updatedArtist) {
      res.json(updatedArtist);
    } else {
      res.status(404).send('Artist not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await artistService.deleteArtist(req.params.id);
    if (result) {
      res.send('Artist deleted');
    } else {
      res.status(404).send('Artist not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
