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
import { getAllAlbums, getAlbumById, addAlbum, updateAlbum, deleteAlbum } from "../services/album-svc";
const router = express.Router();
router.get("/", (req, res) => __async(void 0, null, function* () {
  try {
    const albums = yield getAllAlbums();
    res.json(albums);
  } catch (error) {
    res.status(500).send(error.message);
  }
}));
router.get("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const album = yield getAlbumById(req.params.id);
    if (album) {
      res.json(album);
    } else {
      res.status(404).send("Album not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}));
router.post("/", (req, res) => __async(void 0, null, function* () {
  try {
    const newAlbum = yield addAlbum(req.body);
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).send(error.message);
  }
}));
router.put("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const updatedAlbum = yield updateAlbum(req.params.id, req.body);
    if (updatedAlbum) {
      res.json(updatedAlbum);
    } else {
      res.status(404).send("Album not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}));
router.delete("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const deletedAlbum = yield deleteAlbum(req.params.id);
    if (deletedAlbum) {
      res.status(204).send();
    } else {
      res.status(404).send("Album not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}));
var album_default = router;
export {
  album_default as default
};
