import mongoose from 'mongoose';
import { Playlist } from './playlist';

const playlistSchema = new mongoose.Schema<Playlist>({
  _id: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
}, { collection: 'playlists' });

const PlaylistModel = mongoose.model<Playlist>('Playlist', playlistSchema);

export { PlaylistModel, Playlist };
