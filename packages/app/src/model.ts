import { Profile, Artist, Genre, Album, Concert, Playlist, Track, User } from "server/models";

export interface Model {
  artists: Artist[];
  genres: Genre[];
  albums: Album[];
  concerts: Concert[];
  playlists: Playlist[];
  tracks: Track[];
  user?: User;
}

export const init: Model = {artists:[], genres:[], albums:[], concerts:[], playlists:[], tracks:[]};
