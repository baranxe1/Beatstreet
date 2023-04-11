import React, { useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import { useUserContext } from "../Context/UserContext";
import { usePlayerContext } from "../Context/PlayerContext";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const PopoverPlaylist = React.memo(() => {
  const { login_success, User_id } = useUserContext();
  const { getAllPlaylist, all_playlists, all_playlists_loading } =
    usePlayerContext();
  useEffect(() => {
    if (login_success && all_playlists.length === 0) {
      getAllPlaylist(User_id);
    }
  }, []);

  if (all_playlists_loading) {
    return (
      <div className="text-neutral-100 w-full text-center">Loading...</div>
    );
  }

  if (all_playlists.length === 0) {
    return (
      <div className="text-neutral-100 text-center mb-3 mt-2">No playlist</div>
    );
  }

  return (
    <>
      {all_playlists.map((item, index) => (
        <ListItemButton key={index} className="gap-3 flex">
          {item.image ? (
            <img src={item.image} alt="image" className="w-10 rounded-md" />
          ) : (
            <div className="grid place-items-center bg-[#343432] rounded-md p-2 scale-90">
              <MusicNoteIcon className="text-neutral-300" />
            </div>
          )}
          {item.name}
        </ListItemButton>
      ))}
    </>
  );
});

export default PopoverPlaylist;
