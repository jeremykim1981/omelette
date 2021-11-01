import React, { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { useState } from "react";
import classNames from "classnames";
import { useQuery } from "react-query";
import { postHistory } from "../../api/history";
import {
  fetchInvestContractById,
  deleteInvesrContract,
  onSellInvestContract,
  onBuyInvestContract,
  onCancelInvestContract,
} from "../../api/invest_contract";
import { fetchRate } from "../../api/rate";
import { TransferDateTime } from "../../function/functions";
import { useDispatch, useSelector } from "react-redux";
import { Storage } from "aws-amplify";
import SwalAlert from "../../event/SwalAlert";
import { CelesStandardPopUp } from "../../components/Attribute/CelesStandardPopUp";
import router, { useRouter, withRouter } from "next/router";
import Breadcrumb from "../../components/Attribute/BreadCrumb";
import TwoModal from "../../components/Card/TwoModals";

const ButtonInvest = ({ invest, setOpen, diff_timeToday, ...rest }) => {
  const { user } = useSelector((state) => state.initializeApp);

  const [loading, setLoading] = useState(false);

  const checkMyInvest = invest?.owner._id === user.id;

  const onCancelInvest = async () => {
    try {
      const resultSwalAlert = await SwalAlert.Async({
        title: "ยืนยันการยกเลิกใช่หรือไม่ ?",
        callback: async () => {
          try {
            await onCancelInvestContract({
              investId: invest._id,
              historyId: invest.history,
              ownerId: invest.owner._id,
            });
          } catch (error) {
            SwalAlert.Fail({ text: error.message });
          }
        },
      });

      if (!resultSwalAlert.isConfirmed) return;
      await SwalAlert.Success();
      await localStorage.setItem("State", "Port");
      router.push("/Profile");
    } catch (error) {
      console.log("on cancel invest", error);
      SwalAlert.Fail({ text: error.message });
    }
  };

  if (checkMyInvest && invest.contract_type === "MARKETPLACE") {
    return (
      <div className="flex flex-col items-center justify-center">
        <button
          disabled
          className={classNames(
            " hover:shadow-md  rounded-lg mt-2 w-full text-white px-3 py-2 focus:outline-none outline-none bg-gray-400"
          )}
        >
          กำลังขาย
        </button>
        <button
          onClick={onCancelInvest}
          className={classNames(
            " hover:shadow-md  rounded-lg mt-2 w-full text-white px-3 py-2 focus:outline-none outline-none bg-red-400"
          )}
        >
          ยกเลิก
        </button>
      </div>
    );
  } else if (checkMyInvest && invest.contract_type === "PORTFOLIO") {
    if (diff_timeToday > 0) {
      return (
        <button
          onClick={() => setOpen(true)}
          className={classNames(
            " hover:shadow-md  rounded-lg mt-2 w-full text-white px-3 py-2 focus:outline-none outline-none bg-lime-500 cursor-pointer"
          )}
        >
          ขายต่อสัญญา
        </button>
      );
    }

    return (
      <button
        onClick={() => setOpen(true)}
        disabled={loading}
        className={classNames(
          " hover:shadow-md  rounded-lg mt-2 w-full text-white px-3 py-2 focus:outline-none outline-none bg-textdarkgreen cursor-pointer",
          {}
        )}
      >
        เก็บเกี่ยว
      </button>
    );
  }

  return <div>...</div>;
};

const InvestDetail = ({ count, setCount, setOpen, open, invest, refetch }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, status } = useSelector((state) => state.initializeApp);
  const { data: all_rate } = useQuery("rates", fetchRate);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newCoin, setNewCoin] = useState(invest?.coin);
  const [radio, setRadio] = useState("profit");
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [getProductError, setGetProductError] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (getProductError) {
      setTimeout(() => {
        setGetProductError(false);
      }, 3000);
    }
  }, [getProductError]);

  if (status === "loading" || status === "idle") {
    return <div>Loading...</div>;
  }

  const checkMyInvest = invest?.owner._id === user.id;

  const exchange_rate = all_rate?.exchange_rate;

  const fee_rate = all_rate?.fee_rate;

  const timeToday = new Date().getTime();

  const { transfer_date, transfer_time } = TransferDateTime();

  const diff_timeToday = invest?.duration_endTime - timeToday;

  const cal_coin_exchange_rate = invest?.coin / exchange_rate;

  const cal_coin_fee_rate = cal_coin_exchange_rate * (fee_rate / 100);

  const sell = invest.contract_type === "MARKETPLACE";

  const onSell = async () => {
    try {
      setLoading(true);
      await onSellInvestContract({
        // HISTORY
        invest_contract: invest,
        history_type: "SELL_INVEST",
        status_sell: "SELLING",
        cal_coin_fee_rate: cal_coin_exchange_rate - cal_coin_fee_rate,
        me: user.id,
        price: invest?.price,
        code: invest?.code,
        transection: "EARNING",
        status: "SUCCESS",

        // INVEST CONTRACT
        _id: invest._id,
        old_coin: invest?.coin,
        coin: newCoin,
        contract_type: "MARKETPLACE",
      });
      await SwalAlert.Success();
      router.push("/Invest");
    } catch (error) {
      await SwalAlert.Fail({ text: error?.message });
    } finally {
      setLoading(false);
    }
  };

  const onGatherProfit = async () => {
    try {
      setLoading(true);
      await postHistory({
        history_type: "HARVEST_COIN",
        me: user.id,
        price: Number(
          (Number(invest.coin) + Number(invest.profit)) * Number(exchange_rate)
        ),
        code: invest.code,
        title: `เก็บเกี่ยวเป็นกำไร ${Number(
          (invest.coin + invest.profit) * exchange_rate
        )} บาท`,
        transfer_date,
        transfer_time,
        transection: "EARNING",
        status: "SUCCESS",
      });
      await deleteInvesrContract(invest._id); //เดียวเปลี่้ยนจาก Delete เป็น เก็บ Log ไว้แทน เพื่อเอาไว้เช็คในอนา่คต
      await SwalAlert.Success();
      setSuccessOpen(true);
    } catch (error) {
      console.log("error", error);
      await SwalAlert.Fail({ text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const onGatherProduct = async () => {
    try {
      setLoading(true);
      if (phone && address && user && fullname) {
        await postHistory({
          history_type: "HARVEST_PRODUCT",
          status: "SUCCESS",
          transection: "EARNING",
          me: user?.id,
          address: address,
          userFullname: fullname,
          phone_number: phone,
        });
        await deleteInvesrContract(invest._id);
        setSuccessOpen(true);
      } else {
        setGetProductError(true);
      }
    } catch (error) {
      console.log("ERROR : ", error);
    } finally {
      setLoading(false);
    }
  };

  const onClickBuy = async () => {
    try {
      await onBuyInvestContract({
        _id: invest._id,
        owner: user?.id,
        old_owner: owner._id,
        coin: invest.coin,
        history: invest.history,
      });
      await SwalAlert.Success();
      await localStorage.setItem("State", "Port");
      await router.push("/Profile");
    } catch (error) {
      console.log("ERROR buy coin", error);
      await SwalAlert.Fail({ text: error.message });
    }
  };

  return (
    <div className="  bg-bgcareerblog bg-opacity-30 text-xl rounded-xl p-4 flex flex-col justify-between ">
      <TwoModal open={successOpen} setOpen={setSuccessOpen} />

      <CelesStandardPopUp
        save={
          sell
            ? onClickBuy
            : diff_timeToday > 0
            ? onSell
            : radio === "profit"
            ? onGatherProfit
            : onGatherProduct
        }
        title={""}
        error={radio === "product" && getProductError}
        panel={
          <div className="">
            <div className="flex justify-center items-center text-2xl font-semibold text-textdarkgreen">
              {diff_timeToday > 0 ? "ขายสัญญา" : "ยืนยันการเก็บเกี่ยว"}
            </div>
            <div className="p-4  w-screen max-w-lg  h-screen max-h-card mb-10 bg-white grid md:grid-cols-1 gap-4  overflow-y-scroll  ">
              <div className="bg-bgbasket text-textgray p-4  rounded-lg flex flex-col  ">
                <div className=" font-semibold text-xl text-textdarkgreen">
                  รายละเอียด
                </div>
                <div className="flex justify-between items-start text-textdarkgreen">
                  <div className="text-xl font-medium">
                    {invest.name}
                    <div className="text-xs text-textgold font-light">
                      {invest.code}
                    </div>
                  </div>
                  <div className="text-lg font-medium flex justify-center items-center text-textpink">
                    <img className="w-6 h-6 mr-2" src="../icon/coin.png" />
                    {sell ? (
                      <div>{invest.coin / exchange_rate} coin</div>
                    ) : (
                      <div>{invest.coin}</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div> &bull; จำนวนสินค้า</div>
                  <div>10 ต้น</div>
                </div>
                <div className="flex justify-between items-center ">
                  <div> &bull; หมายการลงทุน</div>
                  <div>12345678</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>&bull; ระยะเวลาการลงทุน</div>
                  <div>{invest.duration_display}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>&bull; ผลตอบแทนรวม</div>
                  <div>{invest.profit} บาท</div>
                </div>

                <div>&bull; วันที่เริ่มลงทุน</div>
                <div>&bull; วันที่เก็บเกี่ยว</div>

                {diff_timeToday < 0
                  ? [
                      <div>
                        <div className="text-sm font-light">
                          การลงทุนครบกำหนดแล้ว กรุณาเลือกการลงทุน
                        </div>

                        <div className="mt-2 flex flex-col justify-start items-start space-y-4 ">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio border text-textdarkgreen focus:border-textdarkgreen"
                              name="accountType"
                              onChange={() => setRadio("profit")}
                              checked={radio === "profit"}
                            />
                            <span className="ml-2 text-textdarkgreen">
                              เงินสด
                            </span>
                          </label>
                          <label className="inline-flex items-center ">
                            <input
                              type="radio"
                              className="form-radio border text-textdarkgreen focus:border-textdarkgreen"
                              name="accountType"
                              onChange={() => setRadio("product")}
                              checked={radio === "product"}
                            />
                            <span className="ml-2 text-textdarkgreen">
                              สินค้า
                            </span>
                          </label>
                        </div>
                        {radio === "product" && (
                          <div>
                            <input
                              placeholder="ชื่อ-นามสกุล"
                              onChange={(e) => setFullName(e.target.value)}
                              value={fullname}
                              className="w-full h-10 border rounded-full px-4 py-2 focus:outline-none   my-2"
                            />
                            <input
                              placeholder="เบอร์โทรศัพท์"
                              onChange={(e) => setPhone(e.target.value)}
                              value={phone}
                              className="w-full h-10  border rounded-full px-4 py-2 focus:outline-none my-2"
                            />
                            <textarea
                              placeholder="ที่อยู่"
                              onChange={(e) => setAddress(e.target.value)}
                              value={address}
                              className="w-full h-10  border rounded-full px-4 py-2 focus:outline-none my-2"
                            />
                          </div>
                        )}
                      </div>,
                    ]
                  : [
                      sell ? (
                        <div className="flex  justify-between">
                          {/* <div>&bull;ราคาซื้อ</div> ...... บาท */}
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between">
                            <div className="text-textdarkgreen">
                              ราคาขายสัญญา (บาท)
                            </div>
                            <input
                              className="px-3 py-2 rounded-md  border outline-none    w-24 text-center border-gray-300 focus:border-gray-400"
                              value={newCoin}
                              placeholder="ราคาขายสัญญา"
                              onChange={(e) => setNewCoin(e.target.value)}
                            />
                          </div>
                          <div className="text-sm font-light flex justify-between items-center">
                            <div className=" text-bglivered">
                              *ค่าธรรมเนียมการทำรายการ
                            </div>
                            <div className="flex justify-center items-center text-bglivered   font-medium mt-2">
                              {fee_rate}% ({cal_coin_fee_rate})
                              <img
                                className="w-6 h-6 ml-1"
                                src="../icon/coin.png"
                              />
                            </div>
                          </div>
                        </div>
                      ),
                    ]}

                <div className=" text-textgray  font-light text-sm mt-2">
                  คุณได้ตรวจสอบและยอมรับการสั่งซื้อแล้วใช่หรือไม่
                </div>
              </div>
            </div>
          </div>
        }
        open={openModal}
        setOpen={setOpenModal}
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
        <ButtonInvest
          invest={invest}
          diff_timeToday={diff_timeToday}
          setOpen={setOpenModal}
        />
      </div>
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
  const { user, status } = useSelector((state) => state.initializeApp);

  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [invest, setInvest] = useState({});

  const checkMyInvest = invest?.invest?.owner?._id === user?.id;

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
      if (!router.query?.investContractId) return;
      setLoading(true);
      const { invest_contract } = await fetchInvestContractById(
        router?.query?.investContractId
      );
      setInvest({
        invest: invest_contract,
        url_multi_images: invest_contract.multi_images.length
          ? await getMultiImages(invest_contract.multi_images)
          : [],
      });
    } catch (error) {
    } finally {
      setLoading(false);
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

  if (loading || status === "loading" || status === "idle") {
    return <div>Loading...</div>;
  }

  if (!invest.invest) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        Data not found
      </div>
    );
  }

  console.log("invest", invest);

  if (
    invest?.invest?.owner._id !== user.id &&
    invest?.invest?.contract_type === "PORTFOLIO"
  ) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        Unauthorized
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      <div className="flex justify-start  items-start flex-col">
        <div className="text-3xl  textlinear font-bold ">
          {invest?.invest?.name} ({invest.invest?.contract_type})
          <div className="text-xl ">
            {invest?.invest?.owner._id === user.id
              ? "(ฉัน)"
              : "(" +
                invest?.invest?.owner?.first_name +
                " " +
                invest?.invest?.owner?.last_name +
                ")"}
          </div>
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
        <div className="w-2/3 mx-auto mt-10">
          <ImageGallery
            items={invest?.url_multi_images}
            thumbnailPosition={"right"}
          />
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
