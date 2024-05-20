// src/models/artist.ts
export interface Artist {
  id: string;
  name: string;
  bio: string;
  genres: string[];
  imageUrl: string;  // URL to an image of the artist
}
