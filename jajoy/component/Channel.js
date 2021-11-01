import React, { memo } from "react";
import Link from "next/link";
import Title from "./Title";
import { from, useQuery } from "@apollo/client";
import CelesYoutube from "../lib/CelesYoutube";
import CelesReactPlay from "../lib/CelesReactPlay";
import { QUERY_YOUTUBE } from "../apollo/queries/queryAds";
import { YouTubeGetID } from "../function/functions";

const Youtube = memo(() => {
  const { data: YouTubeData, loading } = useQuery(QUERY_YOUTUBE);
  const lineYoutube = YouTubeData?.youtube?.youtube;
  const Mobile = () => {
    return (
      <div className="flex  overflow-x-scroll xl:hidden">
        {lineYoutube?.map((row, index) => {
          const url = row?.url;
          const videoId = YouTubeGetID(url);
          return <CelesYoutube videoId={videoId} />;
        })}
      </div>
    );
  };
  const Window = () => {
    return (
      <div className="hidden xl:grid grid-cols-3   gap-4 h-60">
        {lineYoutube?.slice(0, 3)?.map((row, index) => {
          const url = row?.url;
          const videoId = url;
          return <CelesReactPlay videoId={videoId} />;
        })}
      </div>
    );
  };
  return (
    <div className="mx-auto ">
      <div className=" font-Times font-bold">
        <Title name="CHANNEL" />
      </div>
      <Mobile />
      <Window />
    </div>
  );
});

export default Youtube;
