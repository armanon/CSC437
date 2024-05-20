"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_artists = __toESM(require("./routes/artists"));
var import_album = __toESM(require("./routes/album"));
var import_tracks = __toESM(require("./routes/tracks"));
var import_genres = __toESM(require("./routes/genres"));
var import_playlists = __toESM(require("./routes/playlists"));
var import_concerts = __toESM(require("./routes/concerts"));
var import_users = __toESM(require("./routes/users"));
var import_mongo = require("./services/mongo");
(0, import_mongo.connect)("musik");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.json());
app.use(import_express.default.static(staticDir));
app.use("/api/artists", import_artists.default);
app.use("/api/album", import_album.default);
app.use("/api/tracks", import_tracks.default);
app.use("/api/genres", import_genres.default);
app.use("/api/playlists", import_playlists.default);
app.use("/api/concerts", import_concerts.default);
app.use("/api/users", import_users.default);
app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
