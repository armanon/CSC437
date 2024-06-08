import express, { Request, Response } from 'express';
import artistRouter from './routes/artists-routes';
import albumRouter from './routes/albums-routes';
import trackRouter from './routes/tracks-routes';
import genreRouter from './routes/genres-routes';
import playlistRouter from './routes/playlists-routes';
import concertRouter from './routes/concerts-routes';
import userRouter from './routes/users-routes';

import auth, { authenticateUser } from "./routes/auth"; // Import auth and authenticateUser

import { connect } from "./services/mongo";
import fs from "node:fs/promises";
import path from "path";

// Connect to MongoDB
connect("musik");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || 'public';

// Middleware to parse JSON
app.use(express.json());

// Serving static files
app.use(express.static(staticDir));

// Serve node_modules for Mustang
const nodeModules = path.resolve(__dirname, "../../../node_modules");
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));

// Routes
app.use('/auth', auth); // Add auth routes
app.use('/api/artists', /*authenticateUser,*/ artistRouter);
app.use('/api/albums', /*authenticateUser,*/ albumRouter); // corrected to plural 'albums'
app.use('/api/tracks', /*authenticateUser,*/ trackRouter);
app.use('/api/genres', /*authenticateUser,*/ genreRouter);
app.use('/api/playlists', /*authenticateUser,*/ playlistRouter);
app.use('/api/concerts', /*authenticateUser,*/ concertRouter);
app.use('/api/users', /*authenticateUser,*/ userRouter);

// Serve the SPA for any /app/... requests
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

// Test endpoint
app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
