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
var import_artists_routes = __toESM(require("./routes/artists-routes"));
var import_albums_routes = __toESM(require("./routes/albums-routes"));
var import_tracks_routes = __toESM(require("./routes/tracks-routes"));
var import_genres_routes = __toESM(require("./routes/genres-routes"));
var import_playlists_routes = __toESM(require("./routes/playlists-routes"));
var import_concerts_routes = __toESM(require("./routes/concerts-routes"));
var import_users_routes = __toESM(require("./routes/users-routes"));
var import_auth = __toESM(require("./routes/auth"));
var import_mongo = require("./services/mongo");
var import_promises = __toESM(require("node:fs/promises"));
var import_path = __toESM(require("path"));
(0, import_mongo.connect)("musik");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.json());
app.use(import_express.default.static(staticDir));
const nodeModules = import_path.default.resolve(__dirname, "../../../node_modules");
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", import_express.default.static(nodeModules));
app.use("/auth", import_auth.default);
app.use(
  "/api/artists",
  /*authenticateUser,*/
  import_artists_routes.default
);
app.use(
  "/api/albums",
  /*authenticateUser,*/
  import_albums_routes.default
);
app.use(
  "/api/tracks",
  /*authenticateUser,*/
  import_tracks_routes.default
);
app.use(
  "/api/genres",
  /*authenticateUser,*/
  import_genres_routes.default
);
app.use(
  "/api/playlists",
  /*authenticateUser,*/
  import_playlists_routes.default
);
app.use(
  "/api/concerts",
  /*authenticateUser,*/
  import_concerts_routes.default
);
app.use(
  "/api/users",
  /*authenticateUser,*/
  import_users_routes.default
);
app.use("/app", (req, res) => {
  const indexHtml = import_path.default.resolve(staticDir, "index.html");
  import_promises.default.readFile(indexHtml, { encoding: "utf8" }).then(
    (html) => res.send(html)
  );
});
app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
