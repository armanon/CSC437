import express, { Request, Response } from 'express';
import artistRouter from './routes/artists';
import albumRouter from './routes/album'; // updated to plural 'albums'
import trackRouter from './routes/tracks';
import genreRouter from './routes/genres';
import playlistRouter from './routes/playlists';
import concertRouter from './routes/concerts';
import userRouter from './routes/users';

import { connect } from "./services/mongo";

// Connect to MongoDB
connect("musik");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || 'public';

// Middleware to parse JSON
app.use(express.json());

// Serving static files
app.use(express.static(staticDir));

// Routes
app.use('/api/artists', artistRouter);
app.use('/api/album', albumRouter); // updated to plural 'albums'
app.use('/api/tracks', trackRouter);
app.use('/api/genres', genreRouter);
app.use('/api/playlists', playlistRouter);
app.use('/api/concerts', concertRouter);
app.use('/api/users', userRouter);

// Test endpoint
app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
