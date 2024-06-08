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
import * as ArtistService from "../services/artist-svc";
const router = express.Router();
router.get("/", (req, res) => __async(void 0, null, function* () {
  try {
    const artists = yield ArtistService.getAllArtists();
    res.json(artists);
  } catch (error) {
    res.status(500).send(error);
  }
}));
router.get("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const artist = yield ArtistService.getArtistById(req.params.id);
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).send("Artist not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}));
router.post("/", (req, res) => __async(void 0, null, function* () {
  try {
    const newArtist = yield ArtistService.addArtist(req.body);
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(500).send(error);
  }
}));
router.put("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const updatedArtist = yield ArtistService.updateArtist(req.params.id, req.body);
    if (updatedArtist) {
      res.json(updatedArtist);
    } else {
      res.status(404).send("Artist not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}));
router.delete("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const deletedArtist = yield ArtistService.deleteArtist(req.params.id);
    if (deletedArtist) {
      res.status(204).send();
    } else {
      res.status(404).send("Artist not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}));
var artists_default = router;
export {
  artists_default as default
};
