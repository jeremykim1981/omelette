import React from "react";
import YouTube from "react-youtube";
import _ from "lodash";
import { useRouter } from "next/router";

const CelesYoutube = ({
  setGlobalFilter,
  data,
  videoId = "lwc-RFh6SbU",
  // className = " w-96 p-4 lg:w-96 h-60",
  className = "mr-2 w-96  h-64 xl:mx-14",
}) => {
  const opts = {
    playerVars: {
      autoplay: false,
    },
  };

  return (
    <div className=" sm:pl-0 mx-auto ">
      <YouTube className={className} videoId={videoId} opts={opts} />
    </div>
  );
};

export default CelesYoutube;
