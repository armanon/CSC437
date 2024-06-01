import { Artist, Album, Genre, Playlist, Track, User } from "server/models";

export type Msg =
  | [
      "artist/save",
      {
        artistId: string;
        artist: Artist;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [
      "album/save",
      {
        albumId: string;
        album: Album;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [
      "genre/save",
      {
        genreId: string;
        genre: Genre;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [
      "playlist/save",
      {
        playlistId: string;
        playlist: Playlist;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [
      "track/save",
      {
        trackId: string;
        track: Track;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [
      "user/save",
      {
        userId: string;
        user: User;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | []; // Add other messages as needed
