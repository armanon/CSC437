// src/routes/genres.ts
import express, { Request, Response } from 'express';
import { getAllGenres, getGenreById, addGenre, updateGenre, deleteGenre } from '../services/genre-svc';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const genres = await getAllGenres();
    res.json(genres);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const genre = await getGenreById(req.params.id);
    if (genre) {
      res.json(genre);
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newGenre = await addGenre(req.body);
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedGenre = await updateGenre(req.params.id, req.body);
    if (updatedGenre) {
      res.json(updatedGenre);
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await deleteGenre(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
