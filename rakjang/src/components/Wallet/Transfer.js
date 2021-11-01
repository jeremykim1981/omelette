import { useState, useEffect } from "react";
import {
  fetchProfileByPhoneNumber,
  fetchProfileByUserName,
} from "../../api/profile";
import { DebounceInput } from "react-debounce-input";
import { postOtp } from "../../api/otps";
import { useSelector } from "react-redux";
import OtpRakjang from "../basket/atpRakjang";
import { CelesStandardPopUp } from "../Attribute/CelesStandardPopUp";
import { useQuery } from "react-query";
import { fetchRate } from "../../api/rate";

const Transfer = ({ my_phone_number, coins }) => {
  const { user } = useSelector((state) => state.initializeApp);

  const [telephone, setTelephone] = useState("");
  const [username, setUserName] = useState("");
  const [count, setCount] = useState("");
  const [countDisplay, setCountDisplay] = useState("");
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [loadingPhone, setLoadingPhone] = useState(false);
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [textUsername, setTextUsername] = useState("");
  const [textPhone, setTextPhone] = useState("");
  const [countDown, setCountDown] = useState(0);
  const [errorCount, setErrorCount] = useState(false);

  const { data: all_rate } = useQuery("rates", fetchRate);
  const fee_rate = all_rate?.fee_rate;

  useEffect(() => {
    if (countDown > 0 && open) {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
  }, [countDown]);

  useEffect(async () => {
    if (telephone?.length === 10) {
      setLoadingUsername(true);
      const dataPhone = await fetchProfileByPhoneNumber(telephone)();
      if (dataPhone) {
        setUserName(dataPhone.username);
      }
      setLoadingUsername(false);
    } else {
      return;
    }
  }, [telephone]);

  useEffect(async () => {
    if (username.length > 5) {
      setLoadingPhone(true);
      const dataUser = await fetchProfileByUserName(username)();
      if (dataUser) {
        setTelephone(dataUser.phone_number);
      }
      setLoadingPhone(false);
    } else {
      return;
    }
  }, [username]);

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
    if (
      telephone &&
      username &&
      count &&
      my_phone_number &&
      coins >= count &&
      countDown === 0
    ) {
      try {
        await postOtp({
          phone_number: my_phone_number,
        });
        setCountDown(10);
      } catch (error) {
      } finally {
      }
      setOpen(true);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  const clearData = () => {
    setTelephone("");
    setUserName("");
    setCount("");
    setCountDisplay("");
    setOpen(false);
    setOtp("");
    setError(false);
    setCountDown(0);
  };

  return (
    <div>
      <div>
        <div className="text-textdarkgray space-y-4 mt-10">
          <div className="text-3xl  font-semibold">โอนเหรียญ</div>
          <div className="text-xs text-textgray">
            <div>Importance</div>
            <ul>
              <li>
                &bull; transfer เป็นการโอนเหรียญให้กับผู้อื่นใน platform
                เดียวกัน
              </li>
            </ul>
          </div>
        </div>
        <div className=" font-medium text-textgray space-y-2 mt-4">
          <div className=" text-2xl font-semibold ">ไปยัง</div>
          <div className="flex justify-start items-center space-x-4">
            <div className="w-28">Telephone </div>
            <input
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="border rounded-full px-4 py-2  focus:outline-none"
            />
            {/* {loadingUsername && (
              <div className="text-gray-400 text-sm">Loading...</div>
            )} */}
          </div>
          <div className="flex justify-start items-center space-x-4">
            <div className="w-28">Username </div>
            <DebounceInput
              value={username}
              debounceTimeout={2000}
              onChange={(e) => setUserName(e.target.value)}
              className="border rounded-full px-4 py-2  focus:outline-none"
            />{" "}
            {/* {loadingPhone && (
              <div className="text-gray-400 text-sm">Loading...</div>
            )} */}
          </div>

          <div className="flex justify-start items-center space-x-4">
            <div className="w-28">จำนวน </div>
            <input
              value={count}
              onChange={onCount}
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
        {coins < count ? (
          <div>จำนวนเงินของท่านไม่พอ</div>
        ) : (
          <div>
            {error && (
              <div className="my-4">
                <div className="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2">
                  <div className="text-red-500 rounded-full bg-white mr-3">
                    <svg
                      width="1.8em"
                      height="1.8em"
                      viewBox="0 0 16 16"
                      className="bi bi-x"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                      />
                    </svg>
                  </div>
                  <div class="text-white max-w-xs ">
                    ข้อมูลผิดพลาด หรือ ไม่ครบถ้วน
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-center items-center pt-4 space-x-4 ">
              <div
                onClick={() => sendOtp()}
                className="cursor-pointer bg-textdarkgreen text-white px-4 py-1 w-28 flex justify-center items-center rounded-full"
              >
                บันทึก
              </div>
              <div className="cursor-pointer bg-textpink text-white px-4 py-1 w-28 flex justify-center items-center rounded-full">
                ยกเลิก
              </div>
            </div>
          </div>
        )}
      </div>
      <CelesStandardPopUp
        open={open}
        hidden
        setOpen={setOpen}
        hidden
        panel={
          <OtpRakjang
            clearData={clearData}
            setOpen={setOpen}
            username={username}
            count={count}
            otp={otp}
            setOtp={setOtp}
            data={{ my_phone_number }}
            otp_type="TRANSFER"
          />
        }
        title={
          <div className="flex flex-col justify-center items-center font-semibold text-xl text-textdarkgreen space-y-4">
            <div>Varificacion</div>
          </div>
        }
      />
    </div>
  );
};

export default Transfer;
