import MainContent from "./MainContent";
import React, { useEffect, useState, useContext } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import ApolloClient from "../../appllo/apolloClient";
import { AppContext } from "../../contexts/AppContext";
import { socket } from "../../utils/socketServer";
import { useHistory } from "react-router-dom";
import { CREATE_TIME, UPDATE_LOG } from "../../appllo/mutations";
import { QUERY_LOG } from "../../appllo/queries";

const UpdateLog = async () => {
  const { client } = ApolloClient();

  const hours = new Date().getHours();
  const mins = new Date().getMinutes();
  const current_time = `${hours + ":" + mins}`;

  await client.mutate({
    mutation: UPDATE_LOG,
    variables: {
      input: {
        where: {
          id: localStorage.getItem("log"),
        },
        data: {
          time_out: current_time,
        },
      },
    },
  });
};

const WithAuth = () => {
  const { client } = ApolloClient();
  const router = useHistory();

  const [isTyping, setIsTyping] = useState(false);

  const { user, setUser } = useContext(AppContext);

  useEffect(async () => {
    if (!user.uid) return;

    const hours = new Date().getHours();
    const mins = new Date().getMinutes();
    const current_time = `${hours + ":" + mins}`;

    const { data } = await client.query({
      query: QUERY_LOG,
      variables: {
        id: user?.uid,
      },
    });

    if (data?.logs[0]?.time_out?.length > 1) {
      await client.mutate({
        mutation: CREATE_TIME,
        variables: {
          input: {
            data: {
              user_id: user?.uid,
              time_in: current_time,
              name: localStorage.getItem("userName"),
              email: localStorage.getItem("email"),
              department: localStorage.getItem("department"),
            },
          },
        },
      });

      const { data } = await client.query({
        query: QUERY_LOG,
        variables: {
          id: user?.uid,
        },
      });

      localStorage.setItem("log", data?.logs[0]?.id);
    } else {
      localStorage.setItem("log", data?.logs[0]?.id);
    }
  }, [user]);

  useEffect(() => {
    return () => {
      window.addEventListener("beforeunload", function (e) {
        let confirmationMessage = "Are you sure you want to close?";

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE

        UpdateLog();

        return confirmationMessage; //Webkit, Safari, Chrome
      });
    };
  });

  const adminId = "6139ba00a9954e1aa75a0e6a";

  const getRoomId = () => {
    if (!user) return;
    return `${adminId}:${user?.uid}`;
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    if (user?.roleName === "Admin") {
      router.push("/chat");
    }
  }, [user]);

  useEffect(() => {
    socket.emit("joinRoom", { roomId: getRoomId() });

    socket.on("onMessage", onMessage);

    return () => {
      socket.off("onMessage", onMessage);
    };
  }, []);

  useEffect(() => {
    const typing = {
      roomId: `${adminId}:${user.uid}`,
      isTyping,
      uid: user.uid,
    };

    socket.emit("typing", typing);
  }, [isTyping]);

  const onMessage = (dataMessage) => {
    if (dataMessage.sender === user.uid) return;
    const message = dataMessage.message.replaceAll("<br>", "");
    addResponseMessage(message);
  };

  const handleTextInputChange = (e) => {
    const value = e.target.value;
    if (value) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  const handleNewUserMessage = (newMessage) => {
    let message = {
      userId: user.uid,
      adminId: adminId,
      message: newMessage,
      unread: true,
      sender: user?.uid,
      roomId: getRoomId(),
    };

    socket.emit("sendMessage", message);
    socket.emit("typing", {
      roomId: `${adminId}:${user.uid}`,
      uid: user.uid,
      isTyping: false,
    });
    socket.emit("sendNoti", { roomId: adminId });
  };
  return (
    <div>
      <MainContent user={user} setUser={setUser} UpdateLog={UpdateLog} />
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        handleTextInputChange={handleTextInputChange}
        title="Admin Chat"
        subtitle=" "
      />
    </div>
  );
};
export default WithAuth;
