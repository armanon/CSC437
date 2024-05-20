import express from 'express';
import * as albumService from '../services/album-svc';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const albums = await albumService.getAllAlbums();
    res.json(albums);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const album = await albumService.getAlbumById(req.params.id);
    if (album) {
      res.json(album);
    } else {
      res.status(404).send('Album not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newAlbum = await albumService.addAlbum(req.body);
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedAlbum = await albumService.updateAlbum(req.params.id, req.body);
    if (updatedAlbum) {
      res.json(updatedAlbum);
    } else {
      res.status(404).send('Album not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await albumService.deleteAlbum(req.params.id);
    if (result) {
      res.send('Album deleted');
    } else {
      res.status(404).send('Album not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
