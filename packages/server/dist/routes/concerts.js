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
var concerts_exports = {};
__export(concerts_exports, {
  default: () => concerts_default
});
module.exports = __toCommonJS(concerts_exports);
var import_express = __toESM(require("express"));
var import_concert_svc = require("../services/concert-svc");
const router = import_express.default.Router();
router.get("/", (req, res) => {
  res.json((0, import_concert_svc.getAllConcerts)());
});
router.get("/:id", (req, res) => {
  const concert = (0, import_concert_svc.getConcertById)(req.params.id);
  if (concert) {
    res.json(concert);
  } else {
    res.status(404).send("Concert not found");
  }
});
router.post("/", (req, res) => {
  (0, import_concert_svc.addConcert)(req.body);
  res.status(201).send("Concert added");
});
router.put("/:id", (req, res) => {
  const updatedConcert = (0, import_concert_svc.updateConcert)(req.params.id, req.body);
  if (updatedConcert) {
    res.json(updatedConcert);
  } else {
    res.status(404).send("Concert not found");
  }
});
router.delete("/:id", (req, res) => {
  (0, import_concert_svc.deleteConcert)(req.params.id);
  res.status(204).send();
});
var concerts_default = router;
