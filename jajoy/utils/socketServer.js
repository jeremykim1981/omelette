import * as io from "socket.io-client";

class SocketServer {
  socket = null;

  establishSocketConnection() {
    try {
      const url =
        process.env.NODE_ENV === "development"
          ? process.env.NEXTAUTH_BACKEND_URL
          : process.env.NEXTAUTH_BACKEND_PRODUCTION_URL;
      this.socket = io(url);
    } catch (error) {
      alert(`Something went wrong; Can't connect to socket server`);
    }
  }

  pushNoti(data) {
    this.socket.emit("pushNoti", data);
  }

  addCount(data) {
    this.socket.emit("addCount", data);
  }
  //อันนี้ call back เอาไป เป็นตัวส่่งอีกทีนึง
  onCount(cb) {
    this.socket.on("onCount", (data) => {
      cb(data);
    });
  }
  onNoti(cb) {
    this.socket.on("onNoti", (data) => {
      cb(data);
    });
  }
}
export default new SocketServer();

// import io from "socket.io-client";
// let STRAPI_ENDPOINT;

// if (process.env.NODE_ENV !== "production") {
//   STRAPI_ENDPOINT = "http://localhost:1337";
// } else {
//   STRAPI_ENDPOINT = process.env.REACT_APP_SERVER_URL;
// }

// export const socket = io(STRAPI_ENDPOINT);
