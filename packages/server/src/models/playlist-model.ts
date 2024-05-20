import mongoose from 'mongoose';
import { Playlist } from './playlist';

const playlistSchema = new mongoose.Schema<Playlist>({
  id: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  tracks: [{ type: String, trim: true }],
  createdBy: { type: String, required: true, trim: true }
}, { collection: 'playlists' });

const PlaylistModel = mongoose.model<Playlist>('Playlist', playlistSchema);

export { PlaylistModel, Playlist };
