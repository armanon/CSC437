var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import express from "express";
import * as concertService from "../services/concert-svc";
const router = express.Router();
router.get("/", (req, res) => __async(void 0, null, function* () {
  try {
    const concerts = yield concertService.getAllConcerts();
    res.json(concerts);
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.get("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const concert = yield concertService.getConcertById(req.params.id);
    if (concert) {
      res.json(concert);
    } else {
      res.status(404).send("Concert not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.post("/", (req, res) => __async(void 0, null, function* () {
  try {
    const newConcert = yield concertService.addConcert(req.body);
    res.status(201).json(newConcert);
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.put("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const updatedConcert = yield concertService.updateConcert(req.params.id, req.body);
    if (updatedConcert) {
      res.json(updatedConcert);
    } else {
      res.status(404).send("Concert not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.delete("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const result = yield concertService.deleteConcert(req.params.id);
    if (result) {
      res.send("Concert deleted");
    } else {
      res.status(404).send("Concert not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
var concert_routes_default = router;
export {
  concert_routes_default as default
};
