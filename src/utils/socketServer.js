import * as io from "socket.io-client";

const url =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BACKEND_URL
    : process.env.REACT_APP_BACKEND_PRODUCTION_URL;
// const url = "http://localhost:1337";
export const socket = io(url);

class SocketServer {
  socket = null;

  establishSocketConnection() {
    try {
      const url =
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_BACKEND_URL
          : process.env.REACT_APP_BACKEND_PRODUCTION_URL;
      this.socket = io(url);
    } catch (error) {
      alert(`Something went wrong; Can't connect to socket server`);
    }
  }

  joinRoom(roomId) {
    this.socket.emit("joinRoom", roomId);
  }

  sendMessage(data) {
    this.socket.emit("sendMessage", data);
  }

  sendUnread(data) {
    this.socket.emit("sendUnread", data);
  }

  onFirstMessage(cb) {
    this.socket.on("onFirstMessage", (data) => {
      cb(data);
    });
  }

  noti(data) {
    this.socket.emit("noti", data);
  }

  onNoti(cb) {
    this.socket.on("onNoti", (data) => {
      cb(data);
    });
  }

  onInitChats(cb) {
    this.socket.on("onInitChats", (data) => {
      cb(data);
    });
  }

  typing(data) {
    this.socket.emit("typing", data);
  }

  handshake(data) {
    this.socket.emit("handshake", data);
  }

  sendUnread(data) {
    this.socket.emit("sendUnread", data);
  }

  onTyping(cb) {
    this.socket.on("onTyping", (data) => {
      cb(data);
    });
  }

  onUnread(cb) {
    this.socket.on("onUnread", (data) => {
      cb(data);
    });
  }

  onHandShake(cb) {
    this.socket.on("onHandShake", (data) => {
      cb(data);
    });
  }

  onMessage(cb) {
    this.socket.on("onMessage", () => {
      cb();
    });
  }
  onLive(cb) {
    this.socket.on("onLive", () => {
      cb();
    });
  }

  onQuestion(cb) {
    this.socket.on("onQuestion", () => {
      cb();
    });
  }

  onTools(cb) {
    this.socket.on("onTools", () => {
      cb();
    });
  }

  offQuestion() {
    this.socket.off("onQuestion");
  }

  offTools() {
    this.socket.off("onTools");
  }

  offLive() {
    this.socket.off("onLive");
  }

  offJoinRoom() {
    this.socket.off("joinRoom");
  }

  offFirstMessage() {
    this.socket.off("onFirstMessage");
  }

  offMessage() {
    this.socket.off("onMessage");
  }
}

export default new SocketServer();
