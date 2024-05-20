import express, { Request, Response } from 'express';
import { getAllAlbums, getAlbumById, addAlbum, updateAlbum, deleteAlbum } from '../services/album-svc';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const albums = await getAllAlbums();
    res.json(albums);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const album = await getAlbumById(req.params.id);
    if (album) {
      res.json(album);
    } else {
      res.status(404).send('Album not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newAlbum = await addAlbum(req.body);
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedAlbum = await updateAlbum(req.params.id, req.body);
    if (updatedAlbum) {
      res.json(updatedAlbum);
    } else {
      res.status(404).send('Album not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedAlbum = await deleteAlbum(req.params.id);
    if (deletedAlbum) {
      res.status(204).send();
    } else {
      res.status(404).send('Album not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
