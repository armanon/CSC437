import mongoose from 'mongoose';
import { Genre } from './genre';

const genreSchema = new mongoose.Schema<Genre>({
  id: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true }
}, { collection: 'genres' });

const GenreModel = mongoose.model<Genre>('Genre', genreSchema);

export { GenreModel, Genre };
