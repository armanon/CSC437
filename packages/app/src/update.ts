import { Auth, Update } from "@calpoly/mustang";
import { AlbumSelectMessagePayload, ArtistSaveMessagePayload, ConcertSelectMessagePayload, Msg, PlaylistSelectMessagePayload, TrackSaveMessagePayload, UserSaveMessagePayload } from "./messages";
import { Model } from "./model";
import { Artist } from "server/models/artist";
import { Album } from "server/models/album";
import { Concert } from "server/models/concert";
import { Genre } from "server/models/genre";
import { Playlist } from "server/models/playlist";
import { Track } from "server/models/track";
import { User } from "server/models/user";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  console.log(`Updating for message:`, message);
  switch (message[0]) {
    case "concert/select":
      loadConcert(message[1], user)
          .then(concerts => apply(model => ({...model, concerts})))
      break;
    case "artist/save":
      saveArtist(message[1]!, user)
        .then((artist) =>
          apply((model) => ({ ...model, artists:[artist] }))
        )
        .then(() => {
          const { onSuccess } = message[1]!;
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1]!;
          if (onFailure) onFailure(error);
        });
      break;
      case "artist/select":
      loadArtist(message[1]!, user)
          .then((artists) =>
            apply((model) => ({ ...model, artists }))
               )
      break;
    case "album/select":
	loadAlbum(message[1]!, user)
.then((albums) =>
          apply((model) => ({ ...model, albums }))
        )
	break;
    case "album/save":
      saveAlbum(message[1]!, user)
        .then((album) =>
          apply((model) => ({ ...model, album }))
        )
        .then(() => {
          const { onSuccess } = message[1]!;
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1]!;
          if (onFailure) onFailure(error);
        });
      break;
    case "genre/save":
      saveGenre(message[1]!, user)
        .then((genre) =>
          apply((model) => ({ ...model, genre }))
        )
        .then(() => {
          const { onSuccess } = message[1]!;
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1]!;
          if (onFailure) onFailure(error);
        });
      break;
    case "genre/select":
      loadGenre(message[1]!, user)
          .then(genres => apply(model => ({ ...model, genres })))
      break;
    case "playlist/select":
      loadPlaylist(message[1]!, user)
          .then(playlists => apply(model => ({ ...model, playlists })));
      break;
    case "playlist/save":
      savePlaylist(message[1]!, user)
        .then((playlist) =>
          apply((model) => ({ ...model, playlist }))
        )
        .then(() => {
          const { onSuccess } = message[1]!;
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1]!;
          if (onFailure) onFailure(error);
        });
      break;
    case "track/save":
      saveTrack(message[1]!, user)
        .then((track) =>
          apply((model) => ({ ...model, track }))
        )
        .then(() => {
          const { onSuccess } = message[1]!;
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1]!;
          if (onFailure) onFailure(error);
        });
      break;
    case "user/save":
      saveUser(message[1]!, user)
        .then((user) =>
          apply((model) => ({ ...model, user }))
        )
        .then(() => {
          const { onSuccess } = message[1]!;
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1]!;
          if (onFailure) onFailure(error);
        });
      break;
  }
}

function saveArtist(
  msg: ArtistSaveMessagePayload,
  user: Auth.User
): Promise<Artist> {
  return fetch(`/api/artists/${msg.artistId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.artist)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save artist for ${msg.artistId}`
        );
    });
}

function loadArtist(
  msg: {
      artistId?: string;
  }, user: Auth.User){
  const url = msg.artistId ? `/api/artists/${msg.artistId}` : '/api/artists';

  return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...Auth.headers(user)
      },
    })
      .then((response: Response) => {
        if (response.status === 200)
          return response.json();
        else
          throw new Error(
            `Failed to get artist for ${msg.artistId}`
          );
      })
      .then((json: unknown) => {
        if (json && Array.isArray(json)) {
          return json as Artist[];
        } else if (json && typeof json == 'object') {
          return [json] as Artist[];
        } else {
          throw new Error(
            `Invalid response body ${JSON.stringify(json)}`
          )
        }
      });
  }


function loadAlbum(
msg: AlbumSelectMessagePayload, user: Auth.User){
  const url = msg.albumId ? `/api/albums/${msg.albumId}` : '/api/albums';
return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save album for ${msg.albumId}`
        );
    })
    .then((json: unknown) => {
      if (json && Array.isArray(json)) {
          return json as Album[];
        } else if (json && typeof json == 'object') {
          return [json] as Album[];
        } else {
          throw new Error(
            `Invalid response body ${JSON.stringify(json)}`
          )
        }
    });
}

function saveAlbum(
  msg: {
    albumId: string;
    album: Album;
  },
  user: Auth.User
) {
  return fetch(`/api/albums/${msg.albumId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.album)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save album for ${msg.albumId}`
        );
    })
    .then((json: unknown) => {
      if (json) return json as Album;
      return undefined;
    });
}

function saveGenre(
  msg: {
    genreId: string;
    genre: Genre;
  },
  user: Auth.User
) {
  return fetch(`/api/genres/${msg.genreId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.genre)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save genre for ${msg.genreId}`
        );
    })
    .then((json: unknown) => {
      if (json) return json as Genre;
      return undefined;
    });
}

function savePlaylist(
  msg: {
    playlistId: string;
    playlist: Playlist;
  },
  user: Auth.User
) {
  return fetch(`/api/playlists/${msg.playlistId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.playlist)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save playlist for ${msg.playlistId}`
        );
    })
    .then((json: unknown) => {
      if (json) return json as Playlist;
      return undefined;
    });
}

function saveTrack(
  msg: TrackSaveMessagePayload,
  user: Auth.User
): Promise<Track> {
  return fetch(`/api/tracks/${msg.trackId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.track)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save track for ${msg.trackId}`
        );
    });
}

function saveUser(
  msg: UserSaveMessagePayload,
  authUser: Auth.User
): Promise<User> {
  return fetch(`/api/users/${msg.userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(authUser)
    },
    body: JSON.stringify(msg.user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save user for ${msg.userId}`
        );
    });
}
function loadConcert(msg: ConcertSelectMessagePayload = {}, user: Auth.User): Promise<Concert[]> {
    const url = msg.concertId ? `/api/concerts/${msg.concertId}` : '/api/concerts';
return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },

  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to get concert for ${msg.concertId}`
        );
    })
    .then((json: unknown) => {
      if (json && Array.isArray(json)) {
          return json as Concert[];
        } else if (json && typeof json == 'object') {
          return [json] as Concert[];
        } else {
          throw new Error(
            `Invalid response body ${JSON.stringify(json)}`
          )
        }
    });
}
function loadGenre(msg: { genreId?: string }, user: Auth.User) {
const url = msg.genreId ? `/api/genres/${msg.genreId}` : '/api/genres';
return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },

  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to get genre for ${msg.genreId}`
        );
    })
    .then((json: unknown) => {
      if (json && Array.isArray(json)) {
          return json as Genre[];
        } else if (json && typeof json == 'object') {
          return [json] as Genre[];
        } else {
          throw new Error(
            `Invalid response body ${JSON.stringify(json)}`
          )
        }
    });
}
function loadPlaylist(msg: PlaylistSelectMessagePayload, user: Auth.User) {
const url = msg.playlistId ? `/api/playlists/${msg.playlistId}` : '/api/playlists';
return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },

  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to get playlist for ${msg.playlistId}`
        );
    })
    .then((json: unknown) => {
      if (json && Array.isArray(json)) {
          return json as Playlist[];
        } else if (json && typeof json == 'object') {
          return [json] as Playlist[];
        } else {
          throw new Error(
            `Invalid response body ${JSON.stringify(json)}`
          )
        }
    });
}
