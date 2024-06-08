import express from 'express';
import * as genreService from '../services/genre-svc';

const router = express.Router();

const getErrorMessage = (u: unknown): string => {
  if (u && typeof u === 'object' && 'message' in u && typeof u.message === 'string') {
    return u.message;
  } else {
    return 'Unknown Error';
  }
};

router.get('/', async (req, res) => {
  try {
    const genres = await genreService.getAllGenres();
    res.json(genres);
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await genreService.getGenreById(req.params.id);
    if (genre) {
      res.json(genre);
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
});

router.post('/', async (req, res) => {
  try {
    const newGenre = await genreService.addGenre(req.body);
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedGenre = await genreService.updateGenre(req.params.id, req.body);
    if (updatedGenre) {
      res.json(updatedGenre);
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await genreService.deleteGenre(req.params.id);
    if (result) {
      res.send('Genre deleted');
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
});

export default router;
