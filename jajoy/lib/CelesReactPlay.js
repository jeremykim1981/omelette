import React from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import ReactPlayer from "react-player/youtube";

const CelesReactPlay = ({ videoId = "lwc-RFh6SbU" }) => {
  return <ReactPlayer url={videoId} width={"100%"} height={"100%"} />;
};

export default CelesReactPlay;
