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
import * as playlistService from "../services/playlist-svc";
const router = express.Router();
router.get("/", (req, res) => __async(void 0, null, function* () {
  try {
    const playlists = yield playlistService.getAllPlaylists();
    res.json(playlists);
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.get("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const playlist = yield playlistService.getPlaylistById(req.params.id);
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).send("Playlist not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.post("/", (req, res) => __async(void 0, null, function* () {
  try {
    const newPlaylist = yield playlistService.addPlaylist(req.body);
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.put("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const updatedPlaylist = yield playlistService.updatePlaylist(req.params.id, req.body);
    if (updatedPlaylist) {
      res.json(updatedPlaylist);
    } else {
      res.status(404).send("Playlist not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
router.delete("/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const result = yield playlistService.deletePlaylist(req.params.id);
    if (result) {
      res.send("Playlist deleted");
    } else {
      res.status(404).send("Playlist not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}));
var playlist_routes_default = router;
export {
  playlist_routes_default as default
};
