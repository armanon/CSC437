// src/models/playlist.ts
export interface Playlist {
  id: string;
  title: string;
  userId: string;  // Assuming you have a User model for users who create playlists
  tracks: string[];  // Array of track IDs
}
