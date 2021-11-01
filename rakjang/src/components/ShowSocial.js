const ShowSocial = () => {
    return (
      <div className="flex justify-center lg:justify-start   items-center mt-4">
        <a target="_blank" rel="noreferrer" href={`${"tel:0633371888"}`}>
          <img
            className="w-auto h-6 mr-2  outline-none"
            src={"../icon/1.png"}
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={"http://line.me/ti/p/@about8.studio"}
        >
          <img
            className="w-auto h-6 mr-2  outline-none"
            src={"../icon/2.png"}
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://www.facebook.com/about8.studio/"}
        >
          <img className="w-auto h-6 mr-2  outline-none" src={"../icon/3.png"} />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://www.instagram.com/about8.studio/?hl=en"}
        >
          <img className="w-auto h-6 mr-2  outline-none" src={"../icon/5.png"} />
        </a>
      </div>
    );
  };
  export default ShowSocial;