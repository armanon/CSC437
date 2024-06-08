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
import { getAllGenres, getGenreById, addGenre, updateGenre, deleteGenre } from "../services/genre-svc";
const router = express.Router();
router.get("/", (req, res) => __async(void 0, null, function* () {
  try {
    const genres = yield getAllGenres();
    res.json(genres);
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.get("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const genre = yield getGenreById(req.params.id);
    if (genre) {
      res.json(genre);
    } else {
      res.status(404).send("Genre not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.post("/", (req, res) => __async(void 0, null, function* () {
  try {
    const newGenre = yield addGenre(req.body);
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.put("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const updatedGenre = yield updateGenre(req.params.id, req.body);
    if (updatedGenre) {
      res.json(updatedGenre);
    } else {
      res.status(404).send("Genre not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.delete("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const result = yield deleteGenre(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send("Genre not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
var genres_default = router;
export {
  genres_default as default
};
