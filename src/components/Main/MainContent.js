import Vimeo from "@u-wave/react-vimeo";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { socket } from "../../utils/socketServer";
import AppolloClent from "../../appllo/apolloClient";
import { CREATE_QUESTION, CREATE_TIME } from "../../appllo/mutations";
import {
  QUERY_ID_VIMEO,
  QUERY_IMAGE_HIDDEN,
  QUERY_LINK,
  QUERY_LIVE_STATUS,
  QUERY_SPREAKERS,
  QUERY_TOOLS,
  QUERY_VIMEO_ENG,
  QUERY_YOUTUBE_ENG,
  QUERY_YOUTUBE_TH,
} from "../../appllo/queries";
import { getPathUrl } from "../../utils/getPathUrl";
import { DownloadLink, YouTubeGetID } from "../../functions/function";
import YouTube from "react-youtube";
import "../../Vimeo.css";

const mainClassNameStyle =
  "pt-32 md:pt-6 2xl:pt-10  text-white min-h-screen  flex flex-col justify-between";

const mainClassNameStyleLive =
  "pt-32 md:pt-6 2xl:pt-10 text-white min-h-screen  flex flex-col justify-between";

const mainBackGround = {
  backgroundImage: "url(" + "../icon/bg.png" + ")",
  backgroundPosition: "top",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const DownloadOnLive = ({ name, file }) => {
  if (!file) return "";
  return (
    <div className="cursor-pointer borderlinear p-0.5 rounded-3xl text-sm  w-72 mx-auto ">
      <div className="flex justify-center items-center linearbutton rounded-3xl py-1 ">
        <svg
          className="w-6 h-6  mr-2 text-download"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>

        <div
          onClick={() => DownloadLink(getPathUrl(file))}
          className="flex flex-col text-textyellow justify-center items-center text-center  truncate"
        >
          {name}

          <div className="text-white text-xs ">Download Presentation</div>
        </div>
      </div>
    </div>
  );
};

const Questionnaire = ({ link }) => {
  return (
    <div className="borderlinear p-0.5 rounded-3xl text-sm w-72 mx-auto ">
      <div className="flex justify-center items-center h-11 linearbutton rounded-3xl py-1 ">
        <svg
          className="w-6 h-6 -mr-2 text-download"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
        <svg
          className="w-6 h-6 mr-2 text-download"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <a rel="noreferrer" target="_blank" href={link}>
          <div className="flex flex-col justify-center items-center">
            Questionnaire/แบบสอบถาม
          </div>
        </a>
      </div>
    </div>
  );
};

const People = ({
  name = "",
  position = "",
  img = "",
  file,
  subposition = "",
  bank = "",
}) => {
  return (
    <div className=" flex flex-col  justify-center items-center w-60 mb-10 ">
      <div className="mx-auto">
        <img
          className="w-auto mx-auto rounded-full   shadowimg   h-60 object-cover "
          src={img}
        />
      </div>
      <div className="flex flex-col  justify-center items-center h-36 ">
        <div className="text-textyellow mt-4 text-center font-semibold flex justify-start items-center truncate    ">
          {name}
        </div>
        <div className="h-20">
          <div className="text-center mt-2  text-xss flex justify-center items-start  ">
            {position}
          </div>
          <div className="text-center mt-2  text-xss flex justify-center items-center w-80  ">
            {subposition}
          </div>
          {bank && (
            <div className="text-center mt-2 mb-4 text-xss flex justify-center items-center w-80  ">
              {bank}
            </div>
          )}
        </div>
      </div>
      {file && (
        <div className="mx-auto absolute bottom-3">
          <div className="cursor-pointer borderlinear p-0.5 rounded-3xl text-sm  w-60 mx-auto ">
            <div className="flex justify-center items-center linearbutton rounded-3xl py-1 ">
              <svg
                className="w-6 h-6 mr-2 text-download"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <div
                onClick={() => DownloadLink(getPathUrl(file))}
                className=" flex flex-col justify-center text-xs items-center"
              >
                Download Presentation
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const handelResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handelResize);
    handelResize();
    return () => window.removeEventListener("resize", handelResize);
  }, []);

  return windowSize;
};

const MainContent = ({ user, setUser, UpdateLog }) => {
  const router = useHistory();
  const { client } = AppolloClent();
  const [live, setLive] = useState("");
  const [value, setValue] = useState("");
  const [speakers, setSpeakers] = useState([]);
  const [link, setLink] = useState("");
  const [vimeoId, setVimeoId] = useState("");
  const [imageHidden, setImageHidden] = useState("");
  const [vimeoEng, setVimeoEng] = useState("");
  const [youtubeTh, setYoutubeTh] = useState("");
  const [youtubeEng, setYoutubeEng] = useState("");
  const [tools, setTools] = useState("");
  const [language, setLanguage] = useState("TH");

  useEffect(() => {
    socket.on("onLive", () => {
      LoadLiveStatus();
    });
    socket.on("onTools", () => {
      LoadVimeo();
      LoadVimeoEng();
      LoadYoutubeTh();
      LoadYoutubeEng();
      LoadTools();
    });
    return () => {
      socket.off("onChat", LoadLiveStatus);
      socket.off("onChat", () => {
        LoadVimeo();
        LoadVimeoEng();
        LoadYoutubeTh();
        LoadYoutubeEng();
        LoadTools();
      });
    };
  });

  useEffect(() => {
    LoadLiveStatus();
    LoadTools();
    LoadVimeo();
    LoadVimeoEng();
    LoadSpeaker();
    LoadLink();
    LoadImageHidden();
    LoadYoutubeTh();
    LoadYoutubeEng();
  }, []);

  const LoadLiveStatus = async () => {
    const { data } = await client.query({
      query: QUERY_LIVE_STATUS,
    });
    setLive(data?.streaming?.live);
  };

  const LoadSpeaker = async () => {
    const { data } = await client.query({
      query: QUERY_SPREAKERS,
    });
    setSpeakers(data?.speakers);
  };

  const LoadLink = async () => {
    const { data } = await client.query({
      query: QUERY_LINK,
    });
    setLink(data?.questionnaire?.link);
  };

  const LoadVimeo = async () => {
    const { data } = await client.query({
      query: QUERY_ID_VIMEO,
    });
    setVimeoId(data?.vimeo?.number);
  };

  const LoadImageHidden = async () => {
    const { data } = await client.query({
      query: QUERY_IMAGE_HIDDEN,
    });
    setImageHidden(getPathUrl(data?.hiddenImage?.image?.url));
  };

  const LoadVimeoEng = async () => {
    const { data } = await client.query({
      query: QUERY_VIMEO_ENG,
    });
    setVimeoEng(data?.vimeoEng?.number);
  };

  const LoadYoutubeTh = async () => {
    const { data } = await client.query({
      query: QUERY_YOUTUBE_TH,
    });
    setYoutubeTh(YouTubeGetID(data?.youtube?.link));
  };

  const LoadYoutubeEng = async () => {
    const { data } = await client.query({
      query: QUERY_YOUTUBE_ENG,
    });
    setYoutubeEng(YouTubeGetID(data?.youtubeEng?.link));
  };

  const LoadTools = async () => {
    const { data } = await client.query({
      query: QUERY_TOOLS,
    });
    setTools(data?.streamingTool?.tools);
  };

  const onClickSendQuestion = async () => {
    try {
      await client.mutate({
        mutation: CREATE_QUESTION,
        variables: {
          input: {
            data: {
              quest: `${value}`,
              name: user ? user?.userName : "ไม่ระบุ",
              department: localStorage.getItem("department") || "-",
              email: localStorage.getItem("email") || "-",
            },
          },
        },
      });
      socket.emit("sendQuestion", "Hi!");
    } catch (error) {
    } finally {
      setValue("");
    }
  };

  const onClickLogout = () => {
    UpdateLog();
    localStorage.removeItem("jwt");
    localStorage.removeItem("uid");
    localStorage.removeItem("userName");
    localStorage.removeItem("roleName");
    localStorage.removeItem("email");
    localStorage.removeItem("log");
    localStorage.removeItem("department");
    setUser("");
    router.push("/login");
  };

  const size = useWindowSize(); /// อันนนี้คือตัวแปลเวลาเอาไปใช้

  const opts = {
    height: size.height * 0.5,
    width: size.width * 0.5,
    playerVars: {
      autoplay: true,
    },
  };

  return (
    <div className="relative">
      {live === "ON" ? (
        <div className={mainClassNameStyleLive} style={mainBackGround}>
          <div>
            <img
              className="h-24 md:h-32 xl:h-40 object-cover  w-auto absolute top-0.5 left-4"
              src="../icon/Asset 1.png"
            ></img>
            <img
              className="h-14 w-auto absolute top-4 right-4"
              src="../icon/Asset 2.png"
            ></img>
          </div>
          {/* <div><img className="w-28 absolute" src="../icon/left.png"/></div> */}
          <div className="xl:max-w-screen-2xl    mx-auto  mb-auto   ">
            <div className="hidden md:block">
              <img
                className="md:w-7/12 lg:w-5/12 mx-auto"
                src="/krungsrihero.png"
              ></img>
            </div>
            <div className="block md:hidden">
              <div className=" font-semibold text-2xl lg:text-5xl mb-4 flex flex-col justify-center items-center shadowtext">
                <div>
                  Krungsri<span></span> Business{" "}
                  <span className=" text-textyellow shadowtext">Talk </span>
                </div>
                <div className="border-b-2  border-textyellow w-10/12 md:w-5/12 lg:w-76% xl:w-5/12 mx-auto mt-4  "></div>
                <div className="  text-center  text-lg md:text-2xl lg:text-xl xl:text-xl mt-4 shadowtext px-4  w-full md:w-2/3 lg:w-full uppercase">
                  <div className="mb-2 text-xl md:text-2xl  xl:text-4xl text-textyellow">
                    Thailand after covid-19
                  </div>{" "}
                  Business opportunities and transformation
                </div>
              </div>
              <div className="border-b-2  border-textyellow w-10/12 md:w-5/12 lg:w-76% xl:w-5/12 mx-auto  "></div>
            </div>
            {tools === "VIMEO" && (
              <div>
                {language === "TH" && (
                  <div className=" mt-6  ">
                    {vimeoId && (
                      <Vimeo
                        className="flex justify-center items-center"
                        width={
                          size?.width < 1000 ? size?.width : size?.width * 0.55
                        }
                        video={vimeoId}
                        autoplay
                        // controls={false}
                      />
                    )}
                  </div>
                )}
                {language === "ENG" && (
                  <div className=" mt-6  ">
                    {vimeoId && (
                      <Vimeo
                        className="flex justify-center items-center"
                        width={
                          size?.width < 1000 ? size?.width : size?.width * 0.55
                        }
                        video={vimeoEng}
                        autoplay
                        // controls={false}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
            {tools === "YOUTUBE" && (
              <div>
                {language === "TH" && (
                  <YouTube
                    className="flex justify-center items-center mx-auto"
                    videoId={youtubeTh}
                    opts={opts}
                  />
                )}
                {language === "ENG" && (
                  <YouTube
                    className="flex justify-center items-center mx-auto"
                    videoId={youtubeEng}
                    opts={opts}
                  />
                )}
              </div>
            )}

            <div className="hidden lg:flex w-full md:px-4 xl:px-0 lg:w-12/12 xl:w-7/12 mx-auto pb-4 pt-6  justify-center  items-start ">
              <div className=" h-10 w-4/12   borderlinear rounded-full rounded-r-none flex justify-center items-center pl-0.5    ">
                <div className="linearbutton text-sm h-9  w-full rounded-full rounded-r-none flex justify-center items-center  ">
                  Q&A ส่งคำถาม/ตอบ
                </div>
              </div>

              <div className="flex w-6/12">
                <input
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                  value={value}
                  className="xl:w-9/12 w-60   h-10 text-black"
                  type="text"
                ></input>
                <div
                  onClick={() => onClickSendQuestion()}
                  className="bg-white cursor-pointer w-2/12  text-center h-10"
                >
                  <div className="mt-2 text-logouttext hover:text-bgbottom ">
                    ส่ง
                  </div>
                </div>
              </div>
              <div className=" w-2/12 flex  justify-center items-center ml-10">
                <div
                  onClick={() => setLanguage("TH")}
                  className="cursor-pointer flex flex-col justify-center items-center text-xs mr-2"
                >
                  <img
                    className="w-10 h-auto object-cover  mb-1 "
                    src="../icon/thaiflag.png"
                  />
                  <div className="text-center w-28 ">
                    Thai <div>(Original sound)</div>
                  </div>
                </div>
                <div
                  onClick={() => setLanguage("ENG")}
                  className="cursor-pointer flex flex-col justify-center items-center text-xs mr-2"
                >
                  <img
                    className="w-10 h-auto object-cover mb-1"
                    src="../icon/japanflag.png"
                  />
                  <div className="text-center w-28 ">
                    Japanese <div>(Translation)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden flex flex-row w-full  mx-auto pb-4 pt-6  justify-center  items-start px-4 ">
              <div className=" h-10 w-full     borderlinear rounded-full rounded-r-none flex justify-center items-center pl-0.5    ">
                <div className="linearbutton h-9 text-center  px-1 w-full rounded-full rounded-r-none flex flex-col justify-center text-xs items-center  ">
                  Q&A ส่ง<div>คำถาม/ตอบ</div>
                </div>
              </div>
              <div className="flex rounded-none     ">
                <input
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                  value={value}
                  className=" h-10 w-40 md:w-96 text-black rounded-none"
                  type="text"
                ></input>
                <div
                  onClick={() => setValue("")}
                  className="bg-white cursor-pointer  text-black text-center h-10"
                >
                  <div className=" mt-3 md:mt-2 px-2 hover:text-logouttext flex justify-center  items-center text-xs md:text-sm  ">
                    ส่ง
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden flex w-full mx-auto  justify-center items-center mb-4 ">
              <div
                onClick={() => setLanguage("TH")}
                className="cursor-pointer flex flex-col justify-center items-center text-xs mr-2"
              >
                <img
                  className="w-10 h-auto object-cover  mb-1 "
                  src="../icon/thaiflag.png"
                />
                <div className="text-center">
                  Thai <div>(Original sound)</div>
                </div>
              </div>
              <div
                onClick={() => setLanguage("ENG")}
                className="cursor-pointer flex flex-col justify-center items-center text-xs mr-2"
              >
                <img
                  className="w-10 h-auto object-cover mb-1"
                  src="../icon/japanflag.png"
                />
                <div className="text-center">
                  Japanese <div>(Translation) </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 xl:grid-cols-4 px-4 md:px-8 lg:px-16 pb-2">
              {speakers?.map((speaker) => {
                return (
                  <DownloadOnLive
                    name={speaker?.name}
                    file={speaker?.paper?.url}
                  />
                );
              })}
              <Questionnaire link={link} />
            </div>
            {user && (
              <div className=" text-browntext flex  justify-center items-center mx-auto underline font-medium mt-4  ">
                <div className="cursor-pointer" onClick={() => onClickLogout()}>
                  Logout
                </div>
              </div>
            )}
          </div>
          <div className="">
            <div className=" mx-auto  flex justify-start  py-6 pl-4  ">
              <div>
                <a href="https://web.facebook.com/KrungsriBusinessEmpowerment/">
                  <img
                    className="cursor-pointer w-6 h-6 border border-white rounded-full p-0.5 mr-2"
                    src="../icon/fb.png"
                  />
                </a>
              </div>
              <div>
                <img className="w-6 h-6  mr-2" src="../icon/global.png" />
              </div>
              Krungsri Business Empowerment
            </div>
          </div>
        </div>
      ) : (
        [
          live === "HIDE" ? (
            <div className="  bg-bghidebrown">
              <img
                className=" min-w-full object-top h-screen   object-contain"
                src={imageHidden}
              />
            </div>
          ) : (
            <div className={mainClassNameStyle} style={mainBackGround}>
              <div>
                <img
                  className="h-24 md:h-32 xl:h-40 object-cover  w-auto absolute top-0.5 left-4"
                  src="../icon/Asset 1.png"
                ></img>
                <img
                  className="h-14 w-auto absolute top-4 right-4"
                  src="../icon/Asset 2.png"
                ></img>
              </div>
              {/* <div><img className="w-28 absolute" src="../icon/left.png"/></div> */}
              <div className="max-w-screen-2xl mx-auto mb-auto    ">
              <div className="hidden md:block mb-6">
          <img className="md:w-7/12 lg:w-6/12  mx-auto" src="/krungsrihero.png"></img>
        </div>
                <div className="block md:hidden">
                  <div className=" font-semibold text-2xl md:text-4xl lg:text-5xl mb-4 flex flex-col justify-center items-center shadowtext">
                    <div>
                      Krungsri<span></span> Business{" "}
                      <span className=" text-textyellow shadowtext">Talk </span>
                    </div>
                    <div className="border-b-2  border-textyellow w-10/12 md:w-55% lg:w-65%  xl:w-55% mx-auto mt-4  "></div>
                    <div className="  text-center  text-lg md:text-2xl lg:text-lg xl:text-xl  mt-4 shadowtext px-4  w-full md:w-2/3 lg:w-full uppercase">
                      <div className="mb-2 text-xl md:text-2xl lg:text-4xl text-textyellow">
                        Thailand after covid-19
                      </div>{" "}
                      Business opportunities and transformation
                    </div>
                  </div>
                  <div className="border-b-2  border-textyellow w-10/12 md:w-55% lg:w-65%  xl:w-55% mx-auto  "></div>
                  <div className="flex justify-center items-center mt-2"></div>
                  <div className=" shadowtext  mb-4 flex flex-col md:flex-row justify-center items-center  md:text-xl">
                    <span className=" flex justify-start items-center font-semibold  text-textyellow mr-4">
                      Wednesday, 15 <span className="mb-6 mr-2">th</span>{" "}
                      September 2021
                    </span>
                    14.00 - 16.00 hrs.
                  </div>
                </div>
                <div className="relative flex flex-wrap justify-center space-x-4 md:space-x-6 xl:space-x-20  px-4 md:px-8 lg:px-16 pb-2 ">
                  {speakers?.map((speaker, index) => {
                    return (
                      <People
                        key={index}
                        img={getPathUrl(speaker?.image?.url)}
                        name={speaker?.name}
                        position={speaker?.position}
                        file={speaker?.paper?.url}
                        subposition={speaker?.subposition}
                        bank={speaker?.bank}
                      />
                    );
                  })}
                </div>
                {user && (
                  <div className=" text-browntext flex  justify-center items-center mx-auto underline font-medium  ">
                    <div
                      className="cursor-pointer"
                      onClick={() => onClickLogout()}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
              <div className=" cursor-pointer">
                <a href="https://web.facebook.com/KrungsriBusinessEmpowerment/">
                  <div className=" mx-auto  flex justify-start  py-6 pl-4   ">
                    <div>
                      <img
                        className="w-6 h-6 border border-white rounded-full p-0.5 mr-2"
                        src="../icon/fb.png"
                      />
                    </div>
                    <div>
                      <img className="w-6 h-6  mr-2" src="../icon/global.png" />
                    </div>
                    Krungsri Business Empowerment
                  </div>
                </a>
              </div>
            </div>
          ),
        ]
      )}
    </div>
  );
};
export default MainContent;
