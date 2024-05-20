import express from 'express';
import * as playlistService from '../services/playlist-svc';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const playlists = await playlistService.getAllPlaylists();
    res.json(playlists);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const playlist = await playlistService.getPlaylistById(req.params.id);
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).send('Playlist not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newPlaylist = await playlistService.addPlaylist(req.body);
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPlaylist = await playlistService.updatePlaylist(req.params.id, req.body);
    if (updatedPlaylist) {
      res.json(updatedPlaylist);
    } else {
      res.status(404).send('Playlist not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await playlistService.deletePlaylist(req.params.id);
    if (result) {
      res.send('Playlist deleted');
    } else {
      res.status(404).send('Playlist not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
