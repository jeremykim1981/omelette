import { useState, useEffect } from "react";
import { CelesStandardPopUp } from "../Attribute/CelesStandardPopUp";
import OtpRakjang from "../basket/atpRakjang";
import { useQuery } from "react-query";
import { fetchRate } from "../../api/rate";
import { postOtp } from "../../api/otps";
import { useSelector } from "react-redux";
const Witdraw = ({ wallet_id }) => {
  const [wallet, setWallet] = useState("");
  const [count, setCount] = useState("");
  const [open, setOpen] = useState(false);
  const [opnOtp, setOpenOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [countDisplay, setCountDisplay] = useState("");
  const [error, setError] = useState(false);
  const { data: all_rate } = useQuery("rates", fetchRate);

  useEffect(() => {
    setWallet(wallet_id);
  }, []);

  const fee_rate = all_rate?.fee_rate;

  const { user } = useSelector((state) => state.initializeApp);

  const sumbitExchange = () => {
    setOpen(true);
  };

  const onSubmit = async () => {
    await sendOtp();
    setOpenOtp(true);
  };

  const onCount = (e) => {
    const value = e.target.value;

    if (!value) {
      setCountDisplay("");
      return setCount("");
    }

    if (parseInt(value)) {
      const cal_fee_rate = parseInt(value) * (fee_rate / 100);
      setCount(value);
      setCountDisplay(cal_fee_rate + parseInt(value));
    }
  };

  const sendOtp = async () => {
    const coins_rate = Number(count) + Number(count) * (fee_rate / 100);
    if (count && user.phone_number && user.coin >= coins_rate) {
      try {
        await postOtp({
          phone_number: user.phone_number,
        });
      } catch (error) {
        console.log("post otps error", error);
      } finally {
      }
      setOpen(true);
    } else {
      setError(true);
    }
  };

  const onClose = () => {};

  const clearData = () => {
    setCount("");
    setOpen(false);
    setOtp("");
    setError(false);
    setWallet("");
  };

  return (
    <div>
      <div className="text-textdarkgray space-y-4 mt-10">
        <div className="text-3xl  font-semibold">โอนเหรียญ</div>
        <div className="text-sm text-textgray font-light">
          <div>Importance</div>
          <ul>
            <li>&bull; transfer เป็นการโอนเหรียญไปยัง platform อื่นๆ</li>
          </ul>
        </div>
      </div>
      <div className=" font-medium text-textgray space-y-2 mt-4">
        <div className=" text-2xl font-semibold ">ไปยัง</div>
        <div className="flex justify-start items-center space-x-4">
          <div className="w-28">crypto wallet : </div>
          <input
            onChange={(e) => setWallet(e.target.value)}
            value={wallet}
            className="border rounded-full px-4 py-2  focus:outline-none"
          />
        </div>
        <div className="flex justify-start items-center space-x-4">
          <div className="w-28">จำนวน</div>
          <input
            onChange={onCount}
            value={count}
            className="border rounded-full px-4 py-2  focus:outline-none"
          />
          <div className="text-sm text-gray-500">{countDisplay}</div>
        </div>
        <div className="text-sm font-light flex    justify-start  space-x-4   items-center ">
          <div className=" text-bglivered mt-2">*ค่าธรรมเนียมการทำรายการ</div>
          <div className="flex justify-center items-center text-bglivered   font-medium mt-2">
            {fee_rate}%
            <img className="w-6 h-6 ml-1" src="../icon/coin.png" />
          </div>
        </div>
      </div>
      <CelesStandardPopUp
        open={open}
        setOpen={setOpen}
        panel={
          <div className="text-gray-800 text-xl text-center w-full max-w-md h-40 p-4">
            คุณได้ตรวจสอบwallet id แล้วใช่หรือไม่?{" "}
            <div>หากผิดพลาด ทาง rakjangfarm</div>
            <div>จะไม่รับผิดชอบใดๆ</div>
          </div>
        }
        save={onSubmit}
        clearInput={onClose}
      />
      <CelesStandardPopUp
        open={opnOtp}
        setOpen={setOpenOtp}
        hidden
        panel={
          <OtpRakjang
            clearData={clearData}
            data={{ crypto_wallet: wallet }}
            setOpen={setOpenOtp}
            count={count}
            otp={otp}
            setOtp={setOtp}
            otp_type="EXCHANGE"
          />
        }
        title={
          <div className="flex flex-col justify-center items-center font-semibold text-xl text-textdarkgreen space-y-4">
            <div>Varificacion</div>
          </div>
        }
      />
      <div className="flex justify-center items-center pt-4 space-x-4 ">
        <div
          onClick={() => sumbitExchange()}
          className="cursor-pointer bg-textdarkgreen text-white px-4 py-1 w-28 flex justify-center items-center rounded-full"
        >
          บันทึก
        </div>
        <div className="cursor-pointer bg-textpink text-white px-4 py-1 w-28 flex justify-center items-center rounded-full">
          ยกเลิก
        </div>
      </div>
    </div>
  );
};

export default Witdraw;
