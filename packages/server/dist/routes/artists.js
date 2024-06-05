"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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
var artists_exports = {};
__export(artists_exports, {
  default: () => artists_default
});
module.exports = __toCommonJS(artists_exports);
var import_express = __toESM(require("express"));
var ArtistService = __toESM(require("../services/artist-svc"));
const router = import_express.default.Router();
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
