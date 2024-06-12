import { Message } from "@calpoly/mustang";
import { Album } from "server/models/album";
import { Artist } from "server/models/artist";
import { Genre } from "server/models/genre";
import { Playlist } from "server/models/playlist";
import { Track } from "server/models/track";
import { User } from "server/models/user";

export type ArtistSaveMessageTag = "artist/save";
export type ArtistSaveMessagePayload = {
        artistId: string;
        artist: Artist;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
};
export type ArtistSaveMessage = Message.Type<ArtistSaveMessageTag, ArtistSaveMessagePayload>;

export type ArtistSelectMessageTag = "artist/select";
export type ArtistSelectMessagePayload = {
  artistId?: string;
}
export type ArtistSelectMessage = Message.Type<ArtistSelectMessageTag, ArtistSelectMessagePayload>;


export type AlbumSelectMessageTag = "album/select";
export type AlbumSelectMessagePayload = {
  albumId?: string;
}
export type AlbumSelectMessage = Message.Type<AlbumSelectMessageTag, AlbumSelectMessagePayload>;

  export type AlbumSaveMessageTag = "album/save";
export type AlbumSaveMessagePayload = {
        albumId: string;
        album: Album;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
export type AlbumSaveMessage = Message.Type<AlbumSaveMessageTag, AlbumSaveMessagePayload>;

  export type GenreSaveMessageTag = "genre/save";
export type GenreSaveMessagePayload = {
        genreId: string;
        genre: Genre;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
export type GenreSaveMessage = Message.Type<GenreSaveMessageTag, GenreSaveMessagePayload>;


export type GenreSelectMessageTag = "genre/select";
export type GenreSelectMessagePayload = {
  genreId?: string;
}
export type GenreSelectMessage = Message.Type<GenreSelectMessageTag, GenreSelectMessagePayload>;


    export type PlaylistSaveMessageTag = "playlist/save";
export type PlaylistSaveMessagePayload = {
        playlistId: string;
        playlist: Playlist;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
export type PlaylistSaveMessage = Message.Type<PlaylistSaveMessageTag, PlaylistSaveMessagePayload>;


export type PlaylistSelectMessageTag = "playlist/select";
export type PlaylistSelectMessagePayload = {
  playlistId?: string;
}
export type PlaylistSelectMessage = Message.Type<PlaylistSelectMessageTag, PlaylistSelectMessagePayload>;


      export type TrackSaveMessageTag = "track/save";
export type TrackSaveMessagePayload = {
        trackId: string;
        track: Track;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
export type TrackSaveMessage = Message.Type<TrackSaveMessageTag, TrackSaveMessagePayload>;

export type TrackSelectMessageTag = "track/select";
export type TrackSelectMessagePayload = {
  trackId?: string
}
export type TrackSelectMessage = Message.Type<TrackSelectMessageTag, TrackSelectMessagePayload>


export type UserSaveMessageTag = "user/save";
export type UserSaveMessagePayload = {
        userId: string;
        user: User;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
export type UserSaveMessage = Message.Type<UserSaveMessageTag, UserSaveMessagePayload>;

export type ConcertSelectMessageTag = "concert/select";
export type ConcertSelectMessagePayload = {
  concertId?: string
}
export type ConcertSelectMessage = Message.Type<ConcertSelectMessageTag, ConcertSelectMessagePayload>


export type UserSelectMessageTag = "user/select";
export type UserSelectMessagePayload = {
  userId?: string
}
export type UserSelectMessage = Message.Type<UserSelectMessageTag, UserSelectMessagePayload>


export type Msg = ArtistSaveMessage | AlbumSaveMessage | GenreSaveMessage | PlaylistSaveMessage | TrackSaveMessage | UserSaveMessage | AlbumSelectMessage | ConcertSelectMessage | ArtistSelectMessage | GenreSelectMessage | PlaylistSelectMessage | UserSelectMessage | TrackSelectMessage
