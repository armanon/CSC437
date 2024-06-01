import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  console.log(`Updating for message:`, message);
  switch (message[0]) {
    case "artist/save":
      saveArtist(message[1], user)
        .then((artist) =>
          apply((model) => ({ ...model, artist }))
        )
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "album/save":
      saveAlbum(message[1], user)
        .then((album) =>
          apply((model) => ({ ...model, album }))
        )
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "genre/save":
      saveGenre(message[1], user)
        .then((genre) =>
          apply((model) => ({ ...model, genre }))
        )
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "playlist/save":
      savePlaylist(message[1], user)
        .then((playlist) =>
          apply((model) => ({ ...model, playlist }))
        )
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "track/save":
      saveTrack(message[1], user)
        .then((track) =>
          apply((model) => ({ ...model, track }))
        )
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "user/save":
      saveUser(message[1], user)
        .then((user) =>
          apply((model) => ({ ...model, user }))
        )
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function saveArtist(
  msg: {
    artistId: string;
    artist: Artist;
  },
  user: Auth.User
) {
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
    })
    .then((json: unknown) => {
      if (json) return json as Artist;
      return undefined;
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
  msg: {
    trackId: string;
    track: Track;
  },
  user: Auth.User
) {
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
    })
    .then((json: unknown) => {
      if (json) return json as Track;
      return undefined;
    });
}

function saveUser(
  msg: {
    userId: string;
    user: User;
  },
  authUser: Auth.User
) {
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
    })
    .then((json: unknown) => {
      if (json) return json as User;
      return undefined;
    });
}
