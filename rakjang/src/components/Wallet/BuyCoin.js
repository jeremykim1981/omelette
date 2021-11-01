import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import router from "next/router";
import { format } from "date-fns";

// EVENT
import SwalAlert from "../../event/SwalAlert";

// API
import { postHistory } from "../../api/history";
import { fetchCoins } from "../../api/coin";

// AWS
import { Storage } from "aws-amplify";

// COMPONENT
import UnbuyCoin from "./UnbuyCoin";
import ModalBuyCoin from "./ModalBuyCoin";
import { ThaiDate } from "../../function/functions";
import { initializeApp } from "../../_redux/initializeAppSlice";
import { fetchRate } from "../../api/rate";
import ModalBuyCrypto from "./ModalBuyCrypto";

const BuyCoin = ({ setPages }) => {
  const { data, isLoading, refetch } = useQuery(
    "coins",
    fetchCoins("?sort=createdAt:-1?limit=1")
  );

  const { data: all_rate, refetch: refetchNewRate } = useQuery(
    "rates",
    fetchRate
  );

  const exchange_rate = all_rate?.exchange_rate;

  const { user } = useSelector((state) => state.initializeApp);
  const [coins, setCoins] = useState("0");
  const [open, setOpen] = useState(false);
  const [fileImage, setFileImage] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bankName, setBankName] = useState("");
  const [transferDate, setTransfetDate] = useState("");
  const [transferTime, setTransfetTime] = useState("");

  const [openCrypto, setOpenCrypto] = useState(false);

  useEffect(() => {
    refetchNewRate();
  }, [open]);

  const getData = data?.coins[0];

  useEffect(() => {
    if (error === true) {
      setTimeout(() => setError(false), 3000);
    } else {
      return;
    }
  }, [error]);

  const onClickSubmit = async (e) => {
    e.stopPropagation();

    if (fileImage && coins && transferDate && transferTime) {
      try {
        setLoading(true);
        if (!user.phone_number) {
          await SwalAlert.Warning({ text: "โปรดกรอกเบอร์โทรศัพท์" });
          return setPages("Account");
        }

        let image = { key: "" };
        if (fileImage) {
          image = await Storage.put(fileImage.name, fileImage);
        }
        await postHistory({
          price: coins * exchange_rate,
          evidence_url: image.key,
          history_type: "DEPOSIT",
          status: "PENDING",
          me: user.id,
          coin: coins,
          title: `Buy Coins ${coins}`,
          transfer_date: transferDate,
          transfer_time: transferTime,
          bank: {
            bank_name: bankName,
          },
          temp_coin_id: getData._id,
        });
        await SwalAlert.Success();
        await refetch();
      } catch (error) {
        await SwalAlert.Fail();
      } finally {
        setOpen(false);
        setCoins("");
        setImageSrc("");
        setFileImage(null);
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  const onCoin = (e) => {
    const { value } = e.target;

    if (value > getData?.count) {
      setCoins(getData.count);
    } else {
      setCoins(value);
    }
  };

  const handleUploadChange = async ({ target: { files } }) => {
    const file = await files[0];
    if (!file) return;
    let imageDataUrl = URL.createObjectURL(file);
    setFileImage(file);
    setImageSrc(imageDataUrl);
  };

  return (
    <div>
      {getData?.open === "open" ? (
        <div>
          <div className="flex justify-center items-center my-10">
            <div className="flex justify-start items-center">
              <img className="w-16 mr-4" src="../icon/coin.png" />
              <div className="flex flex-col justify-center items-center">
                <div>
                  <div className=" font-bold text-xl mb-2  ">
                    ซื้อเหรียญได้อีก {getData?.count} Coins
                  </div>
                  <div className=" text-xs md:text-sm text-textpink flex flex-col md:flex-row justify-start items-start ">
                    <div className="mr-2"> * เริ่มจำหน่ายวันที่</div>
                    {format(new Date(getData?.startDate), "dd MMMM")} -
                    {format(new Date(getData?.endDate), "dd MMMM yyyy")}
                    <div className="ml-2">หรือจนกว่าสินค้าจะหมด</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-start items-start space-x-2 md:space-x-10">
              <div className="flex flex-col justify-start items-start text-textgray   space-y-2 w-80">
                <div className=" font-bold h-10  ">
                  จำนวนเหรียญที่ต้องการซื้อ (เหรียญ)
                </div>
                <input
                  onChange={onCoin}
                  value={coins}
                  placeholder="จำนวนเหรียญที่ต้องการซื้อ"
                  className=" border  w-full px-2 py-2  focus:outline-none rounded-md "
                />
              </div>
              <div className="flex flex-col justify-start items-start text-textgray   space-y-2 w-80">
                <div className=" font-bold h-10  ">จำนวนเงิน(บาท)</div>
                <input
                  disabled
                  className=" border h-10 w-full px-2 py-2  focus:outline-none rounded-md text-textpink "
                  value={coins * exchange_rate}
                />
              </div>
            </div>
            <div className=" space-y-4 mt-4 text-textgray">
              <div className=" flex justify-between items-center  ">
                <div className="font-bold">บัญชีที่ต้องการจ่ายเงิน</div>
              </div>
              <div className="space-y-2 border  shadow-md  flex  flex-col p-4 rounded-xl w-60  ">
                <div className="flex flex-col justify-start items-start text-textgray  space-y-2">
                  <div className="flex justify-center  items-center ">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src="icon/logokrungthai.png"
                    />
                    <span className="ml-2 font-light"> ธนาคารกรุงไทย</span>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start  space-y-2 ">
                  <div className=" font-light  ">
                    ประเภทบัญชี :<span className="ml-2"> ออมทรัพย์</span>
                  </div>
                </div>

                <div className="flex flex-col justify-start items-start  space-y-2">
                  <div className=" font-light ">เลขที่บัญชี : 1234567889</div>
                </div>
                <div className="flex flex-col justify-start items-start  space-y-2">
                  <div className=" font-light ">ชื่อบัญชี : รักจังฟาร์ม</div>
                </div>
                <div className="flex flex-col justify-start items-start  space-y-2">
                  <div className=" font-light ">สาขา : วังน้ำเขียว</div>
                </div>
              </div>
            </div>
            <ModalBuyCoin
              price={coins * exchange_rate}
              coins={coins}
              open={open}
              setOpen={setOpen}
              imageSrc={imageSrc}
              handleUploadChange={handleUploadChange}
              loading={loading}
              onClickSubmit={onClickSubmit}
              transferDate={transferDate}
              transferTime={transferTime}
              setTransferTime={setTransfetTime}
              setTransfetDate={setTransfetDate}
              error={error}
              setBankName={setBankName}
              exchange_rate={exchange_rate}
            />
            <div className="flex justify-center items-center pt-4 space-x-4 ">
              <button
                onClick={() => setOpen(true)}
                className="cursor-pointer bg-textdarkgreen text-white px-4 py-1  flex justify-center items-center rounded-full"
              >
                ยืนยันการซื้อเหรียญ
              </button>
              <button className="cursor-pointer bg-textpink text-white px-4 py-1 w-28 flex justify-center items-center rounded-full">
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      ) : (
        <UnbuyCoin />
      )}
      <div className=" space-y-4 mt-4 text-textgray">
              <div className=" flex justify-between items-center  ">
                <div className="font-bold">บัญชีที่ต้องการจ่ายเงิน crypto</div>
              </div>
              <div className="space-y-2 border  shadow-md  flex  flex-col py-4 rounded-xl w-full  max-w-sm  ">
                <div className="flex flex-col justify-start items-start text-textgray px-2  space-y-2">
                  <div className="flex justify-center  items-center ">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src="icon/coin.png"
                    />
                    <span className="ml-2 font-light"> Crypto wallet Rakjangfarm </span>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start  space-y-2 ">
                  <div className=" font-light  ">
                    
                  </div>
                  <div className="font-light md:px-4"> 0xf3eeb6b69c2153b511e9526a25833d08c1f465c9</div>
                </div>

                
              </div>
            </div>
      <button
        onClick={() => setOpenCrypto(true)}
        className=" flex justify-center  font-medium items-center w-80  rounded-3xl bg-yellow-500 text-white py-1 px-4 uppercase mt-6 cursor-pointer focus:outline-none mx-auto"
      >
        แลกเหรียญจาก crypto
      </button>
      <ModalBuyCrypto open={openCrypto} setOpen={setOpenCrypto} />
    </div>
  );
};

export default BuyCoin;
