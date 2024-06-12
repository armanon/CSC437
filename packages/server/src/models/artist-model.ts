import mongoose from 'mongoose';
import { Artist } from './artist';

const artistSchema = new mongoose.Schema<Artist>({
  _id: { type: String, /*required: true,*/ trim: true },
  name: { type: String, required: true, trim: true },
}, { collection: 'artists' });

const ArtistModel = mongoose.model<Artist>('Artist', artistSchema);

export { ArtistModel, Artist };
