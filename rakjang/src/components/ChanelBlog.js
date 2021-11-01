const ChannelBlog = ({ id = "", name = "" }) => {
    return (
      <div className="w-80 md:w-80 ">
        <iframe className="w-full h-60" src={id}></iframe>
        <div className="text-textgray mt-4 line-clamp-2">{name}</div>
      </div>
    );
  };
  export default ChannelBlog;