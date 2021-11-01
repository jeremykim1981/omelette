import React, { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import InvestCard from "../../components/Card/InvestCard";
import { useState } from "react";
import BuyItemsModal from "../../components/basket/BuyItemsModal";
import { fetchInvestById } from "../../api/invest";
import classNames from "classnames";
import { createInvestContract } from "../../api/invest_contract";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "../../_redux/initializeAppSlice";
import { Storage } from "aws-amplify";
import SwalAlert from "../../event/SwalAlert";
import { postOtp } from "../../api/otps";

import { format } from "date-fns";
import { th } from "date-fns/locale";
import OtpRakjang from "../../components/basket/atpRakjang";
import { CelesStandardPopUp } from "../../components/Attribute/CelesStandardPopUp";
import { useRouter, withRouter } from "next/router";
import Breadcrumb from "../../components/Attribute/BreadCrumb";

const InvestDetail = ({ count, setCount, setOpen, open, invest, refetch }) => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.initializeApp);
  const [loading, setLoading] = useState(false);
  const [checkCoinError, setCheckCoinError] = useState(false);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    let checkCoin = count * invest?.coin > user?.coin;
    if (checkCoin) {
      setCheckCoinError(true);
    } else {
      setCheckCoinError(false);
    }
  }, [count]);

  const onBuyInvest = async () => {
    setOpen(true);
    await postOtp({
      phone_number: user.phone_number,
    });
  };

  const onAddCount = () => {
    if (invest?.quantity !== count) {
      setCount(count + 1);
    }
  };

  const onCount = (e) => {
    const { value } = e.target;

    if (value < 0) {
      return setCount(0);
    } else if (value > invest?.quantity) {
      return setCount(invest?.quantity);
    }
    setCount(value);
  };

  const clearData = () => {
    setCount("");
    setOpen(false);
    setOtp("");
    setError(false);
    setCountDown(0);
  };

  if (status === "loading" || status === "idle") {
    return <div>Loading...</div>;
  }

  const checkOutOfDate =
    new Date().getTime() > new Date(invest?.endDate).getTime();

  return (
    <div className="  bg-bgcareerblog bg-opacity-30 text-xl rounded-xl p-4 flex flex-col justify-between ">
      {/* <BuyItemsModal
        open={open}
        setOpen={setOpen}
        count={count}
        price={invest?.coin}
      /> */}
      <CelesStandardPopUp
        open={open}
        hidden
        setOpen={setOpen}
        hidden
        panel={
          <OtpRakjang
            clearData={clearData}
            setOpen={setOpen}
            username={user?.username}
            count={count}
            otp={otp}
            setOtp={setOtp}
            otp_type="INVEST"
            data={{
              invest: invest,
              phone_number: user?.phone_number,
              random_number: otp,
              multi_images: invest?.multi_images?.map(
                (multi_image) => multi_image.original
              ),
              temp_buy_type: "bluePrint",
              temp_buy_quantity: count,
              temp_invest_id: invest?._id,
              owner: user?.id,
              refetch,
            }}
          />
        }
        title={
          <div className="flex flex-col justify-center items-center font-semibold text-xl text-textdarkgreen space-y-4">
            <div>Varificacion</div>
          </div>
        }
      />
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className=" text-textdarkgreen ">รหัสสินค้า </div>
          <div className="font-light text-textgray">{invest?.code}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className=" text-textdarkgreen ">จำนวนที่ขาย </div>
          <div className="font-light text-textgray">{invest?.quantity}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className=" text-textdarkgreen ">ราคาหน่วยบาท</div>
          <div className="font-light text-textgray flex justify-center items-center">
            {invest?.unit_baht} บาท / ต้น
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className=" text-textdarkgreen ">ระยะเวลาการลงทุน </div>
          <div className="font-light text-textgray">
            {invest?.duration_display}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className=" text-textdarkgreen ">ผลตอบแทน</div>
          <div className="font-light text-textgray flex justify-center items-center">
            {invest?.coin} บาท / ต้น
          </div>
        </div>
        <div className="border-b"></div>
        <div className="text-xs font-light  text-textpink">
          * เริ่มจำหน่ายวันที่{" "}
          {invest?.startDate
            ? format(new Date(invest?.startDate), "dd MMMM yyyy", {
                locale: th,
              })
            : "-"}{" "}
          -
          {invest?.endDate
            ? format(new Date(invest?.endDate), "dd MMMM yyyy", {
                locale: th,
              })
            : "-"}{" "}
          หรือจนกว่าสินค้าจะหมด
        </div>
        {!checkOutOfDate && (
          <React.Fragment>
            <div className="flex justify-between items-center">
              <div className="">
                <div className="flex justify-start items-center  text-textpink ">
                  <img
                    className={classNames("w-8 h-8 mr-4", {
                      "text-red-500": checkCoinError,
                    })}
                    src="../icon/coin.png"
                  ></img>
                  {count * invest?.coin}{" "}
                  <span className="text-sm flex items-center justify-center  ml-2">
                    (คงเหลือ {user?.coin - count * invest?.coin})
                  </span>
                </div>
                <div className="font-light text-base">เหรียญ / ต้น</div>
              </div>
              <div className=" text-textgray flex justify-center items-center space-x-1.5">
                <button
                  disabled={count === 0 || invest?.quantity === 0}
                  onClick={() => (count > 0 ? setCount(count - 1) : "")}
                  className={classNames(
                    "text-white w-14 h-7  flex justify-center items-center rounded ",
                    {
                      "bg-textdarkgreen cursor-pointer": count > 0,
                      "bg-gray-200 cursor-not-allowed":
                        count === 0 || invest?.quantity === 0 || checkOutOfDate,
                    }
                  )}
                >
                  -
                </button>
                <input
                  onChange={onCount}
                  value={count}
                  className=" bg-white border w-14 h-7 text-base flex justify-center items-center rounded focus:border-blue-400 px-3 py-2 text-center outline-none"
                />
                <button
                  disabled={invest?.quantity === count}
                  onClick={onAddCount}
                  className={classNames(
                    "text-white w-14 h-7  flex justify-center items-center rounded ",
                    {
                      "bg-textdarkgreen cursor-pointer":
                        invest?.quantity !== count,
                      "bg-gray-200 cursor-not-allowed":
                        invest?.quantity === count || checkOutOfDate,
                    }
                  )}
                >
                  +
                </button>
              </div>
            </div>
            {checkCoinError && (
              <div className="text-sm text-red-500">เหรียญของคุณไม่พอ</div>
            )}
          </React.Fragment>
        )}
      </div>

      {!checkOutOfDate ? (
        <button
          disabled={
            checkCoinError || loading || invest?.quantity === 0 || count === 0
          }
          onClick={onBuyInvest}
          className={classNames(
            " uppercase   text-white py-1 px-4 focus:outline-none rounded-3xl  flex justify-center items-center",
            {
              "bg-textdarkgreen cursor-pointer":
                !loading && !checkCoinError && invest?.quantity !== 0 && count,

              "bg-gray-200 cursor-not-allowed":
                loading || checkCoinError || invest?.quantity === 0 || !count,
            }
          )}
        >
          Buy
        </button>
      ) : (
        <div className="text-red-500 text-lg text-center">สินค้าหมดเขต</div>
      )}
    </div>
  );
};

const Filter = ({ name = "" }) => {
  return (
    <div className="text-sm font-semibold hover:text-white hover:bg-textgreen  cursor-pointer rounded-full w-20  text-textgreen bg-greenblog flex justify-center items-center bg-opacity-30">
      {name}
    </div>
  );
};

const Invest = () => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [invest, setInvest] = useState({});

  useEffect(() => {
    LoadInvest();
  }, [router]);

  const getMultiImages = async (multi_images) => {
    try {
      return await Promise.all(
        multi_images.map(async (multi_image) => {
          const url = await Storage.get(multi_image);
          return { original: url, thumbnail: url };
        })
      );
    } catch (error) {}
  };

  const LoadInvest = async () => {
    try {
      // setLoading(true);
      const { invest } = await fetchInvestById(router?.query?.invest);
      setInvest({
        invest,
        url_multi_images: invest.multi_images.length
          ? await getMultiImages(invest.multi_images)
          : [],
      });
    } catch (error) {
    } finally {
      // setLoading(false);
    }
  };

  // useEffect(async () => {
  //   if (!rawInvest) return;
  //   setLoading(true);
  //   setInvest({
  //     ...rawInvest,
  //     url_multi_images: rawInvest.multi_images.length
  //       ? await getMultiImages(rawInvest.multi_images)
  //       : [],
  //   });
  //   setLoading(false);
  // }, [rawInvest]);

  // if (!rawInvest) {
  //   return <div>Data not found</div>;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // const refetch = async () => {
  //   try {
  //     setLoading(true);
  //     const { invest } = await fetchInvestById(rawInvest._id);
  //     setInvest({
  //       ...invest,
  //       url_multi_images: invest.multi_images.length
  //         ? await getMultiImages(invest.multi_images)
  //         : [],
  //     });
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      <div className="flex justify-start  items-start flex-col">
        <div className="text-3xl  textlinear font-bold ">
          {invest?.invest?.name}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center mt-4">
        <Breadcrumb first={"Invest"} secound={invest?.invest?.name} />
        <div className="text-textgray flex justify-center  items-center mt-4 md:mt-0 ">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <div>{invest?.invest?.views}</div>
        </div>
      </div>
      <div>
        {/* <div className="flex space-x-4 text-textdarkgreen mt-10 overflow-x-scroll xl:overflow-x-hidden">
          <div className="text-lg">Tag</div>

          <Filter name="Invest" />

          <Filter name="Herb" />
        </div> */}
      </div>
      {invest?.url_multi_images && (
        <div>
          <div className="md:hidden block w-full xl:w-2/3 mx-auto mt-10">
            <ImageGallery
              items={invest?.url_multi_images}
              thumbnailPosition={"bottom"}
              showNav={true}
              showBullets={true}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </div>
          <div className="hidden md:block w-full xl:w-2/3 mx-auto mt-10">
            <ImageGallery
              items={invest?.url_multi_images}
              thumbnailPosition={"right"}
              showNav={true}
              showBullets={true}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4 mt-10">
        <div className=" bg-bgproduct rounded-xl p-4">
          <div className=" text-textdarkgreen text-2xl">รายละเอียดสินค้า</div>
          <div className=" font-light space-y-4 mt-4">
            <div className="text-lg ">คำอธิบาย</div>
            <div className="text-textgray">{invest?.invest?.detail}</div>
            <div className="text-lg ">คุณลักษณะ</div>
            <div className="text-textgray">{invest?.invest?.attribute}</div>
            <div className="text-lg ">วัตถุประสงค์การใช้เงิน</div>
            <div className="text-textgray">{invest?.invest?.objective}</div>
            <div className="text-lg ">เงื่อนไขการลงทุน</div>
            <div className="text-textgray">{invest?.invest?.condition}</div>
            <div className="text-lg ">ระยะเวลาลงทุน</div>
            <div className="text-textgray">
              {invest?.invest?.duration_display}
            </div>
            <div className="text-lg ">ประมาณการผลตอบแทน</div>
            <div className="text-textgray">{invest?.invest?.payoff}</div>
          </div>
        </div>
        {/* <Invest/> */}
        {/* <Port /> */}
        <InvestDetail
          // refetch={refetch}
          invest={invest?.invest}
          count={count}
          setCount={setCount}
          setOpen={setOpen}
          open={open}
        />
      </div>
      {/* <div>
        <div className=" text-textdarkgreen text-2xl mt-10">
          สินค้าที่คล้ายกัน
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mt-4">
          <InvestCard />
        </div>
      </div> */}
    </div>
  );
};

export default withRouter(Invest);

// export async function getServerSideProps(context) {
//   const { investId } = context.query;

//   try {
//     const { invest } = await fetchInvestById(investId);
//     return {
//       props: {
//         rawInvest: invest,
//         error: null,
//       },
//     };
//   } catch (error) {
//     return { props: { rawInvest: null, error: { message: "Bad Request" } } };
//   }
// }
