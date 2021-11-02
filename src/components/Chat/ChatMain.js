import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Avatar,
  Conversation,
  ConversationList,
  ConversationHeader,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useEffect, useState, memo, useContext } from "react";
import { socket } from "../../utils/socketServer";
import { timeDifference } from "../../functions/function";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../contexts/AppContext";
import ApolloClient from "../../appllo/apolloClient";

const uri =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BACKEND_URL
    : process.env.REACT_APP_BACKEND_PRODUCTION_URL;

const avatar_image_user = "/icon/user_m.png";
const avatar_image_admin = "/icon/admin.png";

const MemoMessage = memo(({ message, sender, sentTime }) => {
  const { user } = useContext(AppContext);

  return (
    <Message
      model={{
        message,
        sender: sender.username,
        direction: sender._id === user.uid ? "outgoing" : "incoming",
        position: "normal",
      }}
      avatarPosition={sender._id === user.uid ? "tr" : "tl"}
    >
      <Avatar
        src={sender._id === user.uid ? avatar_image_admin : avatar_image_user}
        name={sender.username}
      />
      <Message.Footer>
        <div>
          {timeDifference(new Date().getTime(), new Date(sentTime).getTime())}
        </div>
      </Message.Footer>
    </Message>
  );
});

const MainChat = ({ isWindow, isMobile }) => {
  const router = useHistory();
  const { user } = useContext(AppContext);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [activeChat, setActiveChat] = useState("");
  const [conversation, setConversation] = useState({
    user: null,
    admin: null,
  });
  const [conversations, setConversations] = useState(() => []);
  const [typing, setTyping] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const roleName = _.lowerCase(user?.roleName);
  const [messages, setMessages] = useState([]);
  const [skip, setSkip] = useState(0);
  const [stopMore, setStopMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const getRoleOpposite = roleName === "user" ? "admin" : "user";

  useEffect(() => {
    socket.on("onTyping", onTyping);
    socket.on("onChat", onChat);
    socket.on("onMessage", onMessage);
    socket.on("onUnread", onUnread);
    // socket.on("onQuestion", () => {
    //   LoadQuestion();
    // });
    return () => {
      socket.off("onChat", onChat);
      socket.off("onMessage", onMessage);
      socket.off("onTyping", onTyping);
      socket.off("onUnread", onUnread);
      // socket.off("onQuestion");
    };
  });

  useEffect(async () => {
    socket.emit("joinRoom", { roomId: `${user?.uid}`, roleName });
    // await fetchChat();
  }, []);

  useEffect(() => {
    if (!activeChat || activeChat !== conversation?._id) return;

    let roomId = `${user.uid}:${conversation?.user?._id}`;
    if (roleName === "user") {
      roomId = `${conversation?.admin?._id}:${user.uid}`;
    }
    let typing = {
      roomId,
      uid: user.uid,
      isTyping: false,
    };
    if (isTyping) {
      typing = {
        ...typing,
        isTyping: true,
      };
    }
    return socket.emit("typing", typing);
  }, [isTyping]);

  // useEffect(async () => {
  //   if (!user) {
  //     return router.push("/");
  //   }
  //   await fetchChat();
  // }, [user]);

  useEffect(async () => {
    await fetchChat();
  }, [user]);

  const fetchChat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${uri}/chat/${user?.uid}?roleName=${roleName}`
      );
      setConversations(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchMesssage = async (chatId, loading = true) => {
    try {
      setLoadingMessages(loading);
      const { data } = await axios.get(`${uri}/messages/${chatId}`);
      setMessages(data);
    } catch (error) {
    } finally {
      setLoadingMessages(false);
    }
  };

  const onYReachStart = async () => {
    if (loadingMore === true || !activeChat || stopMore) {
      return;
    }

    setLoadingMore(true);
    const { data } = await axios.get(
      `${uri}/messages/${activeChat}?skip=${skip + 30}`
    );
    setSkip((prev) => prev + 30);

    if (!data?.length) {
      setLoadingMore(false);
      return setStopMore(true);
    }
    setMessages((prev) => [...data, ...prev]);
    setLoadingMore(false);
  };

  const onTyping = (data) => {
    setTyping(data);
  };

  const onUnread = async () => {
    await fetchChat(false);
  };

  const onChat = async () => {
    await fetchChat(false);
  };

  const onMessage = async () => {
    if (activeChat) {
      await fetchMesssage(activeChat, true);
    }
  };

  const onChangeConversation =
    ({ chatId, userId, ...conversation }) =>
    async (e) => {
      let roomId = `${user.uid}:${userId}`;
      if (roleName === "user") {
        roomId = `${userId}:${user.uid}`;
      }
      await fetchMesssage(chatId);
      socket.emit("joinRoom", { roomId });
      socket.emit("sendUnread", {
        _id: chatId,
        roomId,
        unreadFrom:
          user.uid === conversation.user._id ? false : conversation.unreadFrom,
        unreadTo:
          user.uid === conversation.admin._id ? false : conversation.unreadTo,
      });
      setActiveChat(chatId);
      setConversation(conversation);
    };

  const sendMessage = (newMessage = messageInputValue) => {
    let roomId = `${user.uid}:${conversation.user?._id}`;
    if (roleName === "user") {
      roomId = `${conversation.admin?._id}:${user.uid}`;
    }
    let message = {
      adminId: conversation.admin._id,
      userId: conversation.user._id,
      sender: user.uid,
      message: newMessage,
      sentTime: new Date(),
      roomId,
    };
    socket.emit("sendMessage", message);
    socket.emit("typing", {
      ...typing,
      isTyping: false,
    });
    socket.emit("sendNoti", { roomId: conversation[getRoleOpposite]._id });
  };

  const onChangeMessageInput = (value) => {
    setMessageInputValue(value);
    if (value) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  if (isWindow) {
    return (
      <div className="h-5/6" style={{ position: "relative", height: "500px" }}>
        <MainContainer responsive>
          <Sidebar position="left" scrollable={false} loading={loading}>
            <ConversationList>
              {conversations?.length > 0 &&
                conversations.map((conversation) => {
                  const { unreadFrom, unreadTo, _id: chatId } = conversation;
                  const { username, _id: userId } =
                    conversation[getRoleOpposite];

                  const unread =
                    user.uid === conversation.user._id ? unreadFrom : unreadTo;

                  return (
                    <div>
                      <Conversation
                        name={username}
                        lastSenderName={username}
                        onClick={onChangeConversation({
                          chatId,
                          userId,
                          ...conversation,
                          [getRoleOpposite]: conversation[getRoleOpposite],
                        })}
                        active={activeChat === chatId}
                        unreadDot={unread}
                      >
                        <Avatar src={avatar_image_user} name={username} />
                      </Conversation>
                      <div className="border-b border-gray-300"></div>
                    </div>
                  );
                })}
            </ConversationList>
          </Sidebar>

          <ChatContainer>
            {conversation?._id === activeChat && (
              <ConversationHeader>
                <Avatar
                  // src={
                  //   conversation[getRoleOpposite].image_avatar
                  //     ? conversation[getRoleOpposite].image_avatar.url
                  //     : conversation[getRoleOpposite].image_social
                  // }
                  src={avatar_image_user}
                  name={conversation[getRoleOpposite].username}
                />
                <ConversationHeader.Content
                  userName={conversation[getRoleOpposite].username}
                ></ConversationHeader.Content>
              </ConversationHeader>
            )}
            <MessageList
              loading={loadingMessages}
              loadingMore={loadingMore}
              onYReachStart={onYReachStart}
              typingIndicator={
                conversation[getRoleOpposite]?._id === typing?.uid &&
                typing?.isTyping ? (
                  <TypingIndicator
                    content={`${conversation[getRoleOpposite]?.username} is typing`}
                  />
                ) : null
              }
            >
              {messages.map(({ message, sentTime, sender }, index) => {
                return (
                  <MemoMessage
                    key={index}
                    index={index}
                    message={message}
                    sentTime={sentTime}
                    sender={sender}
                  />
                );
              })}
            </MessageList>
            {activeChat && (
              <MessageInput
                attachButton={false}
                placeholder="Type message here"
                onChange={onChangeMessageInput}
                onSend={sendMessage}
              />
            )}
          </ChatContainer>
        </MainContainer>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="sm:hidden ">
        <div className="text-center text-xl text-gray-500 border-b border-gray-300">
          ประวัติการแชท
        </div>
        <div
          className="h-5/6"
          style={{ position: "relative", height: "500px" }}
        >
          <div className="flex overflow-x-scroll">
            {conversations?.length > 0 &&
              conversations.map((conversation) => {
                const { unreadFrom, unreadTo, _id: chatId } = conversation;
                const {
                  username,
                  image_avatar,
                  image_social,
                  social_id,
                  _id: userId,
                } = conversation[getRoleOpposite];
                const unread =
                  user.uid === conversation.user._id ? unreadFrom : unreadTo;

                return (
                  <Conversation
                    onClick={onChangeConversation({
                      chatId,
                      userId,
                      ...conversation,
                      [getRoleOpposite]: conversation[getRoleOpposite],
                    })}
                    active={activeChat === chatId}
                    unreadDot={unread}
                  >
                    <Avatar
                      // src={social_id ? image_social : image_avatar?.url}
                      src={avatar_image_user}
                      name={username}
                    />
                  </Conversation>
                );
              })}
          </div>
          <MainContainer responsive>
            <ChatContainer>
              {conversation?._id === activeChat && (
                <ConversationHeader>
                  <Avatar
                    src={avatar_image_user}
                    name={conversation[getRoleOpposite].username}
                  />
                  <ConversationHeader.Content
                    userName={conversation[getRoleOpposite].username}
                  ></ConversationHeader.Content>
                </ConversationHeader>
              )}
              <MessageList
                loading={loadingMessages}
                loadingMore={loadingMore}
                onYReachStart={onYReachStart}
                typingIndicator={
                  conversation[getRoleOpposite]?._id === typing?.uid &&
                  typing?.isTyping ? (
                    <TypingIndicator
                      content={`${conversation[getRoleOpposite]?.username} is typing`}
                    />
                  ) : null
                }
              >
                {messages.map(({ message, sentTime, sender }, index) => {
                  return (
                    <MemoMessage
                      key={index}
                      index={index}
                      message={message}
                      sentTime={sentTime}
                      sender={sender}
                    />
                  );
                })}
              </MessageList>
              {activeChat && (
                <MessageInput
                  attachButton={false}
                  // onAttachClick={onUploadImage}
                  placeholder="Type message here"
                  onChange={onChangeMessageInput}
                  onSend={sendMessage}
                  // SendButton={false}
                />
              )}
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    );
  }
};

const ChatMain = () => {
  const router = useHistory();
  const { client } = ApolloClient();
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    if (user?.roleName !== "Admin") {
      router.push("/");
    }
  }, [user]);

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

  return (
    <div className=" md:pt-12 pb-20 md:pb-0">
      <div className="hidden md:block">
        <MainChat isWindow />
      </div>
      <div className="sm:hidden ">
        <MainChat isMobile />
      </div>

      <div
        className="mt-4 cursor-pointer text-center text-browntext"
        onClick={() => onClickLogout()}
      >
        Logout
      </div>
    </div>
  );
};
export default ChatMain;
