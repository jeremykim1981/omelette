import Link from "next/link";
import { useQuery } from "react-query";

// API
import { fetchVideos } from "../../api/video";
import Breadcrumb from "../../components/Attribute/BreadCrumb";
import CelesYoutube from "../../components/Video/CelesYoutube";
import { YouTubeGetID } from "../../function/functions";

const Video = () => {
  const { data, isLoading, error } = useQuery("videos", fetchVideos);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      <Breadcrumb first={"Video"} />
      <div className="flex justify-center items-center flex-col">
        <div className="text-3xl  text-textdarkgreen font-bold text-center">
          Welcome to Rakjang farm{" "}
        </div>
        <div className="w-2/3 text-center mt-4 text-textgray">
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..."
          <div>
            "There is no one who loves pain itself, who seeks after it and wants
            to have it, simply because it is pain..."
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 ">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data?.videos?.map((video) => {
              const url = video.url;
              const videoId = YouTubeGetID(url);
              return <CelesYoutube videoId={videoId} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};
export default Video;
