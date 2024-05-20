import mongoose from 'mongoose';

interface Album {
  id: string;
  title: string;
  tracks: string[];
  artist: string;
  releaseDate: string;
}

const albumSchema = new mongoose.Schema<Album>({
  id: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  tracks: [{ type: String, trim: true }],
  artist: { type: String, required: true, trim: true },
  releaseDate: { type: String, trim: true }
}, { collection: 'albums' });

const AlbumModel = mongoose.model<Album>('Album', albumSchema);

export { AlbumModel, Album };
