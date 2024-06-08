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
import * as albumService from "../services/album-svc";
const router = express.Router();
router.get("/", (req, res) => __async(void 0, null, function* () {
  try {
    const albums = yield albumService.getAllAlbums();
    res.json(albums);
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.get("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const album = yield albumService.getAlbumById(req.params.id);
    if (album) {
      res.json(album);
    } else {
      res.status(404).send("Album not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.post("/", (req, res) => __async(void 0, null, function* () {
  try {
    const newAlbum = yield albumService.addAlbum(req.body);
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.put("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const updatedAlbum = yield albumService.updateAlbum(req.params.id, req.body);
    if (updatedAlbum) {
      res.json(updatedAlbum);
    } else {
      res.status(404).send("Album not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.delete("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const result = yield albumService.deleteAlbum(req.params.id);
    if (result) {
      res.send("Album deleted");
    } else {
      res.status(404).send("Album not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
var album_routes_default = router;
export {
  album_routes_default as default
};
