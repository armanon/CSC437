// src/routes/playlists.ts
import express, { Request, Response } from 'express';
import { getAllPlaylists, getPlaylistById, addPlaylist, updatePlaylist, deletePlaylist } from '../services/playlist-svc';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const playlists = await getAllPlaylists();
    res.json(playlists);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const playlist = await getPlaylistById(req.params.id);
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).send('Playlist not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newPlaylist = await addPlaylist(req.body);
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedPlaylist = await updatePlaylist(req.params.id, req.body);
    if (updatedPlaylist) {
      res.json(updatedPlaylist);
    } else {
      res.status(404).send('Playlist not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await deletePlaylist(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send('Playlist not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
