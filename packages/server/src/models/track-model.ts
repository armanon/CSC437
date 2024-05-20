import mongoose from 'mongoose';
import { Track } from './track';

const trackSchema = new mongoose.Schema<Track>({
  id: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  duration: { type: Number, required: true },
  albumId: { type: String, required: true, trim: true },
  artistId: { type: String, required: true, trim: true }
}, { collection: 'tracks' });

const TrackModel = mongoose.model<Track>('Track', trackSchema);

export { TrackModel, Track };
