import { Artist } from "server/models/artist";
import { Genre } from "server/models/genre";
import { Album } from "server/models/album";
import { Concert } from "server/models/concert";
import { Playlist } from "server/models/playlist";
import { Track } from "server/models/track";
import { User } from "server/models/user";

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
