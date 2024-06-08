import express from "express";
import artistRouter from "./routes/artists";
import albumRouter from "./routes/album";
import trackRouter from "./routes/tracks";
import genreRouter from "./routes/genres";
import playlistRouter from "./routes/playlists";
import concertRouter from "./routes/concerts";
import userRouter from "./routes/users";
import auth, { authenticateUser } from "./routes/auth";
import { connect } from "./services/mongo";
import fs from "node:fs/promises";
import path from "path";
connect("musik");
const app = express();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(express.json());
app.use(express.static(staticDir));
const nodeModules = path.resolve(__dirname, "../../../node_modules");
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));
app.use("/auth", auth);
app.use(
  "/api/artists",
  /*authenticateUser,*/
  artistRouter
);
app.use(
  "/api/albums",
  /*authenticateUser,*/
  albumRouter
);
app.use("/api/tracks", authenticateUser, trackRouter);
app.use("/api/genres", authenticateUser, genreRouter);
app.use("/api/playlists", authenticateUser, playlistRouter);
app.use("/api/concerts", authenticateUser, concertRouter);
app.use("/api/users", authenticateUser, userRouter);
app.use("/app", (req, res) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then(
    (html) => res.send(html)
  );
});
app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
