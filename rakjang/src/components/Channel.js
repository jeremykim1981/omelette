import ChannelBlog from "./ChanelBlog";
import { useQuery } from "react-query";
import Header from "./Attribute/Header";

// API
import { fetchVideos } from "../api/video";

const Channel = () => {
  const { data, isLoading, error } = useQuery("videos", fetchVideos);

  return (
    <div>
      <div className=" bg-white px-4 md:px-8 lg:px-16 pb-10">
        <Header title="Channel" herf="/Video" />
        <div className="flex overflow-x-scroll xl:overflow-hidden xl:grid  grid-cols-1 xl:grid-cols-3 gap-4  pb-6 ">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data.videos.map((video, index) => (
              <div className=" flex-shrink-0 mx-auto">
                <ChannelBlog id={video.url} name={video.title} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Channel;
