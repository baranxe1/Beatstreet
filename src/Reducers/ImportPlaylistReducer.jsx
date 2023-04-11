import {
  GET_USER_SPOTIFY_PLAYLIST_BEGIN,
  GET_USER_SPOTIFY_PLAYLIST_SUCCESS,
  GET_USER_SPOTIFY_PLAYLIST_FAILED,
  ADD_SONGS_BEGIN,
  ADD_SONGS_SUCCESS,
  ADD_SONGS_FAILED,
  PLAYLIST_CREATION_BEGIN,
  PLAYLIST_CREATION_SUCCESS,
  PLAYLIST_CREATION_FAILED,
} from "./../Actions";

const PlaylistReducer = (state, action) => {
  if (action.type === GET_USER_SPOTIFY_PLAYLIST_BEGIN) {
    const tok = action.payload;
    return {
      ...state,
      all_playlists_loading: true,
      token: tok,
      new_playlist: [],
    };
  }
  if (action.type === GET_USER_SPOTIFY_PLAYLIST_SUCCESS) {
    const data = action.payload;
    return { ...state, all_playlists_loading: false, all_Playlists: data };
  }
  if (action.type === GET_USER_SPOTIFY_PLAYLIST_FAILED) {
    return { ...state, all_playlists_loading: false };
  }
  if (action.type === ADD_SONGS_BEGIN) {
    return { ...state, new_playlist: [], add_songs_loading: true };
  }
  if (action.type === ADD_SONGS_SUCCESS) {
    const data = action.payload;
    return { ...state, new_playlist: data, add_songs_loading: false };
  }
  if (action.type === ADD_SONGS_FAILED) {
    return { ...state, add_songs_loading: false };
  }
  if (action.type === PLAYLIST_CREATION_BEGIN) {
    return { ...state, new_playlist_creation: false };
  }
  if (action.type === PLAYLIST_CREATION_SUCCESS) {
    return { ...state, new_playlist_creation: true };
  }
  if (action.type === PLAYLIST_CREATION_FAILED) {
    return { ...state, new_playlist_creation: false };
  }
};

export default PlaylistReducer;
