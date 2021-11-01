import { useEffect, useState } from "react";
import SocketServer from "../../utils/socketServer";

const test = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    SocketServer.establishSocketConnection();
    SocketServer.onCount(GetCount);
  }, []);
  //กดแล้วจะส่งไปหลังบ้านเพื่อไปทำไรสักอย่าง หลังบ้านจะรับเป็น socket.on("addCount")
  const onClickCount = () => {
    SocketServer.addCount(count);
  };
  //อันนี้คือ Function เพื่อเอาไว้ setCont เพื่อที่จะเอาไปแสดงยังไงหละ
  const GetCount = (count) => {
    setCount(count);
  };

  return (
    <di>
      <button onClick={() => onClickCount()} className="text-center">
        เพิ่มมมมมมมมมม จำนวน
      </button>
    </di>
  );
};
export default test;
