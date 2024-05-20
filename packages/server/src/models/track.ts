// src/models/track.ts
export interface Track {
  id: string;
  title: string;
  albumId: string;
  artistId: string;
  duration: number;  // Duration in seconds
  url: string;       // URL to listen to the track
}
