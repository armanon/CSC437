import mongoose from 'mongoose';
import { Track } from './track';

const trackSchema = new mongoose.Schema<Track>({
  _id: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  duration: { type: Number, required: true },
}, { collection: 'tracks' });

const TrackModel = mongoose.model<Track>('Track', trackSchema);

export { TrackModel, Track };
