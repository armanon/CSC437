import { Artist } from "server/dist/models/artist";
import { Genre } from "server/dist/models/genre";
import { Album } from "server/dist/models/album";
import { Concert } from "server/dist/models/concert";
import { Playlist } from "server/dist/models/playlist";
import { Track } from "server/dist/models/track";
import { User } from "server/dist/models/user";

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
