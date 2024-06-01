import { Profile, Artist, Genre, Album, Concert, Playlist, Track, User } from "server/models";

export interface Model {
  artist?: Artist;
  genre?: Genre;
  album?: Album;
  concert?: Concert;
  playlist?: Playlist;
  track?: Track;
  user?: User;
  profile?: Profile;
}

export const init: Model = {};
