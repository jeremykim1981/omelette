import { UPDATE_LIVE_STATUS, UPDATE_LIVE_TOOLS } from "../../appllo/mutations";
import { AppContext } from "../../contexts/AppContext";
import ApolloClient from "../../appllo/apolloClient";
import { useHistory } from "react-router-dom";
import { socket } from "../../utils/socketServer";
import _ from "lodash";
import { useContext, useEffect } from "react";

const ControllerMain = () => {
  const router = useHistory();
  const { client } = ApolloClient();
  const { user, setUser } = useContext(AppContext);

  const admin = user?.roleName === "Admin";

  const onClickLogout = () => {
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

  const onClickChangeLiveOn = async () => {
    await client.mutate({
      mutation: UPDATE_LIVE_STATUS,
      variables: {
        input: {
          data: {
            live: "ON",
          },
        },
      },
    });
    await socket.emit("sendLive", { data: "live" });
  };

  const onClickChangeLiveOff = async () => {
    await client.mutate({
      mutation: UPDATE_LIVE_STATUS,
      variables: {
        input: {
          data: {
            live: "OFF",
          },
        },
      },
    });
    await socket.emit("sendLive", { data: "live" });
  };
  const onClickChangeLiveHide = async () => {
    await client.mutate({
      mutation: UPDATE_LIVE_STATUS,
      variables: {
        input: {
          data: {
            live: "HIDE",
          },
        },
      },
    });
    await socket.emit("sendLive", { data: "live" });
  };

  const onClickChangeVIMEO = async () => {
    await client.mutate({
      mutation: UPDATE_LIVE_TOOLS,
      variables: {
        input: {
          data: {
            tools: "VIMEO",
          },
        },
      },
    });
    await socket.emit("sendTools", { data: "Tools" });
  };
  const onClickChangeYOUTUBE = async () => {
    await client.mutate({
      mutation: UPDATE_LIVE_TOOLS,
      variables: {
        input: {
          data: {
            tools: "YOUTUBE",
          },
        },
      },
    });
    await socket.emit("sendTools", { data: "Tools" });
  };

  return (
    <div>
      {admin && (
        <div>
          <div className="text-center mt-2">
            <div>Status Live</div>
            <div className="flex my-10">
              <div
                className=" bg-green-500 cursor-pointer p-2 m-2 flex justify-center items-center w-40 mx-auto rounded-3xl text-white "
                onClick={() => onClickChangeLiveOn()}
              >
                เปิดไลฟ์
              </div>
              <div
                className=" bg-red-500 cursor-pointer p-2 m-2 flex justify-center items-center w-40 mx-auto rounded-3xl text-white "
                onClick={() => onClickChangeLiveOff()}
              >
                ปิดไลฟ์
              </div>
              <div
                className=" cursor-pointer p-2 m-2 flex justify-center items-center w-40 mx-auto rounded-3xl text-white linearbutton"
                onClick={() => onClickChangeLiveHide()}
              >
                ซ่อนไลฟ์
              </div>
            </div>
          </div>
          <div className="text-center mt-2">Tools</div>
          <div className="flex">
            <div
              className=" bg-lightBlue-400 cursor-pointer p-2 m-2 flex justify-center items-center w-40 mx-auto rounded-3xl text-white "
              onClick={() => onClickChangeVIMEO()}
            >
              VIMEO
            </div>
            <div
              className=" bg-red-500 cursor-pointer p-2 m-2 flex justify-center items-center w-40 mx-auto rounded-3xl text-white "
              onClick={() => onClickChangeYOUTUBE()}
            >
              YOUTUBE
            </div>
          </div>
          <div
            className="mt-4 cursor-pointer text-center text-browntext"
            onClick={() => onClickLogout()}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};
export default ControllerMain;
