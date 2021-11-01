import { QUERY_YOUTUBE } from "../../apollo/queries/queryAds";
import BlogHeader from "../../component/BlogHeader";
import { YouTubeGetID } from "../../function/functions";
import withAuth from "../../hoc/withAuth";
import CelesYoutube from "../../lib/CelesYoutube";
import { from, useQuery } from "@apollo/client";

const Channel = () => {
  const { data: YouTubeData, loading } = useQuery(QUERY_YOUTUBE);
  const lineYoutube = YouTubeData?.youtube?.youtube;
  return (
    <div className="bg-gray-50 py-10 font-kanit max-w-screen-2xl mx-auto">
      <div
        className="min-h-screen font-kanit font-bold text-gray-700 text-3xl  mx-2 lg:mx-16"
        id="youtube"
      >
        <BlogHeader name="Channel" />
        <div className="mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4  lg:ml-2">
          {lineYoutube?.map((row, index) => {
            const url = row.url;
            const videoId = YouTubeGetID(url);
            return <CelesYoutube videoId={videoId} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Channel;
