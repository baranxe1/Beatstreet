import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import RippleButton from "ripple-effect-reactjs";
import { motion } from "framer-motion";
import { usePlaylistContext } from "../Context/ImportPlaylistContext";
import { useUserContext } from "../Context/UserContext";
import { usePlayerContext } from "../Context/PlayerContext";

const PlaylistDeleteModal = ({ handleClose, setShowDelete, playlistId }) => {
  const { DeletePlaylist } = usePlaylistContext();
  const { login_success, User_id } = useUserContext();
  const { getAllPlaylist } = usePlayerContext();

  const HandleDelete = () => {
    if (login_success) {
      let data = {
        playlistId,
      };
      DeletePlaylist(User_id, data).then((res) => {
        console.log(res);
        getAllPlaylist(User_id);
        handleClose();
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black bg-opacity-30">
      <motion.section
        initial={{ scale: 0.3 }}
        animate={{ scale: 1 }}
        exit={{
          scale: 0.3,
          opacity: 0,
        }}
        className="bg-lightBlue max-w-xs w-full  flex flex-col px-5  py-4 gap-3 rounded-md"
      >
        <p className="text-neutral-200 text-base font-thin tracking-wider">
          Delete Playlist
        </p>

        <div className="flex flex-col justify-center">
          <h3 className="text-center text-neutral-100">Are you sure ?</h3>
          <p className="text-center text-neutral-400">
            You will not be able to recover this playlist
          </p>
        </div>

        <div className="flex justify-end gap-2 w-full mt-5">
          <ListItemButton
            sx={[{ width: "fit-content", flexGrow: 0 }]}
            onClick={() => setShowDelete(false)}
          >
            <button className="text-neutral-200 font-extralight tracking-wider text-sm">
              cancel
            </button>
          </ListItemButton>

          <RippleButton width={30} radius={6} color={"#060b1c"} speed={500}>
            <button
              className="text-neutral-200 font-extralight text-sm  tracking-wider rounded-md bg-darkBlue px-4 py-2"
              onClick={HandleDelete}
            >
              Delete
            </button>
          </RippleButton>
        </div>
      </motion.section>
    </div>
  );
};

export default PlaylistDeleteModal;
