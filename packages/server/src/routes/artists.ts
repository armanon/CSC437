import express, { Request, Response } from 'express';
import * as ArtistService from '../services/artist-svc';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const artists = await ArtistService.getAllArtists();
    res.json(artists);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const artist = await ArtistService.getArtistById(req.params.id);
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).send('Artist not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newArtist = await ArtistService.addArtist(req.body);
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedArtist = await ArtistService.updateArtist(req.params.id, req.body);
    if (updatedArtist) {
      res.json(updatedArtist);
    } else {
      res.status(404).send('Artist not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedArtist = await ArtistService.deleteArtist(req.params.id);
    if (deletedArtist) {
      res.status(204).send();
    } else {
      res.status(404).send('Artist not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
