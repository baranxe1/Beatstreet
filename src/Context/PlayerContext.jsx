import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useRef,
} from "react";
import axios from "axios";
import reducer from "../Reducers/PlayerReducer";
import {
  PLAY_SONG_BEGIN,
  PLAY_SONG_SUCESS,
  PLAY_SONG_ERROR,
  RIGHT_MENU_BTN,
  SEARCH_SUCESS,
  SEARCH_ERROR,
  NEXT_PAGE_BTN,
  NEW_SEARCH_BEGIN,
  LEFT_MENU_BTN,
  NEXT_SEARCHED_ARRAY,
  NEXT_SEARCHED_ARRAY_ERROR,
  SEARCH_SONGS_SUCESS,
  SEARCH_ALBUMS_SUCESS,
  NEXT_SEARCHED_ALBUMS,
  NEXT_PAGE_BTN_ALBUMS,
  PLAYING_CURRENT_ALBUM,
  PLAYING_CURRENT_ARTIST,
  PLAYING_CURRENT_PLAYLIST,
  PLAYING_VIEWALLSONGS_LISTS,
} from "../Actions";

const playerContext = React.createContext();

const initialState = {
  side_menu_show: false,
  side_navbar_show: false,
  audio_playing: false,
  play_song_loading: false,
  search_loading: false,
  has_more: true,
  has_more_albums: true,
  current_song: {
    name: "null",
    primaryArtists: "null",
    image: "null",
    downloadUrl: "null",
  },
  search_results: null,
  search_songs: [],
  search_albums: [],
  current_album: [],
  current_page_count: 1,
  current_page_count_albums: 1,
  current_playing_lists: [],
};
import { useMusicContext } from "../Context/MusicContext";
export const PlayerProvider = ({ children }) => {
  const { currentAlbum, single_artist_songs, currentPlaylists } =
    useMusicContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

  const singleSong = async (id) => {
    dispatch({ type: PLAY_SONG_BEGIN });
    try {
      const res = await axios.get(`https://saavn.me/songs?id=${id}`);
      const result = res.data.data[0];
      dispatch({ type: PLAY_SONG_SUCESS, payload: result });
    } catch (error) {
      dispatch({ type: PLAY_SONG_ERROR });
    }
  };

  const SearchAll = async (text) => {
    dispatch({ type: NEW_SEARCH_BEGIN });
    try {
      const res = await axios.get(`https://saavn.me/search/all?query=${text}`);
      const result = res.data.data;
      dispatch({ type: SEARCH_SUCESS, payload: result });
    } catch (error) {
      console.log(error);
      dispatch({ type: SEARCH_ERROR });
    }
  };

  const SearchSongs = async (keyword) => {
    dispatch({ type: NEW_SEARCH_BEGIN });
    try {
      const res = await axios.get(
        `https://saavn.me/search/songs?query=${keyword}}&page=1`
      );

      const result = res.data.data.results;
      dispatch({ type: SEARCH_SONGS_SUCESS, payload: result });
    } catch (error) {
      dispatch({ type: SEARCH_ERROR });
    }
  };

  const SearchAlbums = async (keyword) => {
    dispatch({ type: NEW_SEARCH_BEGIN });
    try {
      const res = await axios.get(
        `https://saavn.me/search/albums?query=${keyword}}&page=1`
      );

      const result = res.data.data.results;
      dispatch({ type: SEARCH_ALBUMS_SUCESS, payload: result });
    } catch (error) {
      dispatch({ type: SEARCH_ERROR });
    }
  };

  const PageChange = async (text, page) => {
    try {
      const res = await axios.get(
        `https://saavn.me/search/songs?query=${text}&page=${page}`
      );
      const result = res.data.data.results;
      dispatch({ type: NEXT_SEARCHED_ARRAY, payload: result });
    } catch (error) {
      dispatch({ type: NEXT_SEARCHED_ARRAY_ERROR });
    }
  };

  const AlbumsPageChange = async (text, page) => {
    try {
      const res = await axios.get(
        `https://saavn.me/search/albums?query=${text}&page=${page}`
      );
      const result = res.data.data.results;
      dispatch({ type: NEXT_SEARCHED_ALBUMS, payload: result });
    } catch (error) {
      dispatch({ type: NEXT_SEARCHED_ARRAY_ERROR });
    }
  };

  const HandleRightSideMenu = () => {
    dispatch({ type: RIGHT_MENU_BTN });
  };

  const HandleNextPageBtn = (key) => {
    dispatch({ type: NEXT_PAGE_BTN });
    PageChange(key, state.current_page_count);
  };

  const HandleNextPageBtn_Albums = (key) => {
    dispatch({ type: NEXT_PAGE_BTN_ALBUMS });
    AlbumsPageChange(key, state.current_page_count_albums);
  };

  const HandleSideNav = () => {
    dispatch({ type: LEFT_MENU_BTN });
  };

  const HandlePlaySong = (id, current) => {
    if (current === "currentAlbum") {
      dispatch({ type: PLAYING_CURRENT_ALBUM, payload: currentAlbum.songs });
    }
    if (current === "Artist") {
      dispatch({ type: PLAYING_CURRENT_ARTIST, payload: single_artist_songs });
    }
    if (current === "Playlist") {
      dispatch({
        type: PLAYING_CURRENT_PLAYLIST,
        payload: currentPlaylists.songs,
      });
    }
    if (current === "ViewAllSong") {
      dispatch({
        type: PLAYING_VIEWALLSONGS_LISTS,
      });
    }
    singleSong(id);
  };

  return (
    <playerContext.Provider
      value={{
        ...state,
        singleSong,
        HandleRightSideMenu,
        SearchAll,
        inputValue,
        setInputValue,
        HandleNextPageBtn,
        HandleSideNav,
        inputRef,
        SearchSongs,
        SearchAlbums,
        AlbumsPageChange,
        HandleNextPageBtn_Albums,
        HandlePlaySong,
      }}
    >
      {children}
    </playerContext.Provider>
  );
};

export const usePlayerContext = () => {
  return useContext(playerContext);
};
