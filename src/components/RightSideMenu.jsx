import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import AudioPlayer from "./AudioPlayer";
import { usePlayerContext } from "../Context/PlayerContext";

const RightSideMenu = () => {
  const { side_menu_show, HandleRightSideMenu } = usePlayerContext();
  return (
    <section
      className={
        "bg-lightBlue text-darkTextColor z-20 fixed h-full top-0 py-10 right-0 transition-all duration-300 ease-in  px-10 " +
        (side_menu_show ? "w-96 max-md:w-full " : "w-0 -right-20")
      }
    >
      <div className="w-fit mt-14 max-md:mt-12">
        <KeyboardDoubleArrowLeftIcon
          className="rotate-180 cursor-pointer"
          onClick={HandleRightSideMenu}
        />
      </div>
      {!side_menu_show && (
        <div className="w-32 h-10 -left-12 bg-lightBlue bg-opacity-50 pl-1  flex items-center float-left  rounded-xl backdrop-blur-xl absolute">
          <KeyboardDoubleArrowLeftIcon
            onClick={HandleRightSideMenu}
            className="text-white cursor-pointer"
          />
        </div>
      )}
      <AudioPlayer />
      <a
        href="https://twitter.com/immdipu"
        target={"_blank"}
        className="text-white font-light text-xs hover:opacity-80 duration-500 transition-all ease-linear absolute  bottom-0 w-full text-center bg-black bg-opacity-10 opacity-40"
      >
        © Created by Dipu
      </a>
    </section>
  );
};

export default RightSideMenu;
