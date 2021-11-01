import { useQuery } from "react-query";
import Header from "../Attribute/Header";
import { fetchVideos } from "../../api/video";
import { YouTubeGetID } from "../../function/functions";
import CelesReactPlay from "../Video/CelesReactPlay";
import CelesYoutube from "../Video/CelesYoutube";

const Channel = () => {
  const { data, isLoading, error } = useQuery("videos", fetchVideos);

  const Mobile = () => {
    return (
      <div className="flex space-x-4  overflow-x-scroll xl:hidden">
        {data?.videos?.map((row, index) => {
          const url = row?.url;
          const videoId = YouTubeGetID(url);
          return <CelesYoutube key={index} videoId={videoId} />;
        })}
      </div>
    );
  };
  const Window = () => {
    return (
      <div className="hidden xl:grid grid-cols-4  gap-4 h-60">
        {data?.videos?.slice(0, 4)?.map((row, index) => {
          const url = row?.url;
          const videoId = url;
          return <CelesReactPlay key={index} videoId={videoId} />;
        })}
      </div>
    );
  };

  return (
    <div>
      <div className=" bg-white px-4 md:px-8 lg:px-16 pb-10">
        <Header title="Channel" herf="/Video" />
        <Mobile />
        <Window />
      </div>
    </div>
  );
};
export default Channel;
