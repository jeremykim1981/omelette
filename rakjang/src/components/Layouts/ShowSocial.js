const ShowSocial = () => {
    return (
      <div className="flex justify-center lg:justify-start   items-center mt-4">
        <a target="_blank" rel="noreferrer" href={"https://www.facebook.com/RAKJANGFARM"} >
          <img
            className="w-auto h-6 mr-2  outline-none"
            src={"../icon/1.png"}
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={"http://line.me/ti/p/@rakjangmelonfarm "}
          
        >
          <img
            className="w-auto h-6 mr-2  outline-none"
            src={"../icon/5.png"}
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://www.youtube.com/channel/UCmcNeRfc3FO6865XhoHiptA"}
        >
          <img className="w-auto h-6 mr-2  outline-none" src={"../icon/3.png"} />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://www.instagram.com/rakjangfarm/"}
          
        >
          <img className="w-auto h-6 mr-2  outline-none rounded-full" src={"../icon/instagram.png"} />
        </a>
      </div>
    );
  };
  export default ShowSocial;