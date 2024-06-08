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
import * as trackService from "../services/track-svc";
const router = express.Router();
router.get("/", (req, res) => __async(void 0, null, function* () {
  try {
    const tracks = yield trackService.getAllTracks();
    res.json(tracks);
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.get("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const track = yield trackService.getTrackById(req.params.id);
    if (track) {
      res.json(track);
    } else {
      res.status(404).send("Track not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.post("/", (req, res) => __async(void 0, null, function* () {
  try {
    const newTrack = yield trackService.addTrack(req.body);
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.put("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const updatedTrack = yield trackService.updateTrack(req.params.id, req.body);
    if (updatedTrack) {
      res.json(updatedTrack);
    } else {
      res.status(404).send("Track not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.delete("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const result = yield trackService.deleteTrack(req.params.id);
    if (result) {
      res.send("Track deleted");
    } else {
      res.status(404).send("Track not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
var track_routes_default = router;
export {
  track_routes_default as default
};
