import express from 'express';
import * as concertService from '../services/concert-svc';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const concerts = await concertService.getAllConcerts();
    res.json(concerts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const concert = await concertService.getConcertById(req.params.id);
    if (concert) {
      res.json(concert);
    } else {
      res.status(404).send('Concert not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newConcert = await concertService.addConcert(req.body);
    res.status(201).json(newConcert);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedConcert = await concertService.updateConcert(req.params.id, req.body);
    if (updatedConcert) {
      res.json(updatedConcert);
    } else {
      res.status(404).send('Concert not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await concertService.deleteConcert(req.params.id);
    if (result) {
      res.send('Concert deleted');
    } else {
      res.status(404).send('Concert not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
