// src/models/album.ts
export interface Album {
  id: string;
  title: string;
  artistId: string;
  releaseDate: Date;
  genres: string[];
  coverUrl: string;  // URL to the album cover image
}
