import { Line } from "rc-progress";
import _ from "lodash";
import SwalAlert from "../../event/SwalAlert";
import { S3Image } from "aws-amplify-react";
import { format } from "date-fns";
import { memo, useEffect, useState } from "react";
import { postHistory } from "../../api/history";
import {
  getPathUrl,
  TransferDateTime,
  ZeroPad,
} from "../../function/functions";
import { useSelector } from "react-redux";
import {
  deleteInvesrContract,
  onSellInvestContract,
  onBuyInvestContract,
  onCancelInvestContract,
} from "../../api/invest_contract";
import { CelesStandardPopUp } from "../Attribute/CelesStandardPopUp";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchRate } from "../../api/rate";
import TwoModal from "./TwoModals";

const ButtonClick = ({
  onClick,
  name,
  contract_type,
  investId,
  historyId,
  ownerId,
  refetch,
}) => {
  const onClickOpen = (e) => {
    e.stopPropagation();
    onClick(true);
  };

  const onCancelInvest = async (e) => {
    e.stopPropagation();
    try {
      const resultSwalAlert = await SwalAlert.Async({
        title: "ยืนยันการยกเลิกใช่หรือไม่ ?",
        callback: async () => {
          try {
            await onCancelInvestContract({
              investId: investId,
              historyId: historyId,
              ownerId: ownerId,
            });
          } catch (error) {
            SwalAlert.Fail({ text: error.message });
          }
        },
      });

      if (!resultSwalAlert.isConfirmed) return;
      await SwalAlert.Success();
      await refetch();
    } catch (error) {
      console.log("on cancel invest", error);
      SwalAlert.Fail({ text: error.message });
    }
  };

  return (
    <div className="flex items-center justify-center">
      {contract_type === "MARKETPLACE" ? (
        <div className="w-full">
          {" "}
          <button
            disabled
            className="bg-gray-500 hover:shadow-md  rounded-lg mt-2 w-full text-white px-3 py-2 focus:outline-none outline-none cursor-not-allowed"
          >
            กำลังขายอยู่
          </button>
          <button
            onClick={onCancelInvest}
            className="bg-red-500 hover:shadow-md  rounded-lg mt-2 w-full text-white px-3 py-2 focus:outline-none outline-none"
          >
            ยกเลิก
          </button>
        </div>
      ) : (
        <button
          onClick={onClickOpen}
          className={`${
            name === "เก็บเกี่ยว" ? " bg-textdarkgreen " : "    bg-lime-500 "
          }" hover:shadow-md  rounded-lg mt-2 w-full text-white px-3 py-2 focus:outline-none outline-none "
       `}
        >
          {name}
        </button>
      )}
    </div>
  );
};

const LineOptimized = memo(({ duration_endTime, duration_startTime }) => {
  const [percent, setPercent] = useState("0");
  const [tiggerTime, setTriggerTime] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      getPercent();
      setTriggerTime(!tiggerTime);
    }, 1000);
  }, [tiggerTime]);

  useEffect(() => {
    getPercent();
  }, [duration_endTime]);

  const getPercent = () => {
    const timeToday = new Date().getTime();

    const duration_diff_time = duration_endTime - duration_startTime;
    const diff_timeToday = duration_endTime - timeToday;

    let percent = (diff_timeToday / duration_diff_time) * 100;

    const diff_percent = 100 - percent;

    setPercent(parseFloat(diff_percent).toFixed(2));
  };

  return (
    <div className="w-full">
      <div className="text-right text-sm text-green-400">
        {percent > 100 ? 100 : percent}%
      </div>
      <Line
        percent={_.toString(percent)}
        strokeWidth="3"
        trailWidth="3"
        strokeColor="#21B200"
      />
    </div>
  );
});

const MarketplaceCard = ({
  sell,
  invest_contract_sell_id,
  quantity = "1",
  name,
  coin,
  code,
  period,
  price,
  profit,
  detail,
  cover_image,
  duration_startTime,
  duration_endTime,
  duration_startDate,
  duration_endDate,
  duration_time,
  duration_display,
  unit_baht = "",
  pathname = "",
  invest_contract = {},
  history = {},
  refetch,
  contract_type,
  owner,
  setPages,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [radio, setRadio] = useState("profit");
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [newCoin, setNewCoin] = useState(coin);
  const [getProductError, setGetProductError] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [historyId, setHistoryId] = useState("");

  const [triggerTime, setTriggerTime] = useState(false);

  const { user } = useSelector((state) => state.initializeApp);

  useEffect(() => {
    setPhone(user?.phone_number);
    setAddress(user?.address);
    setFullName(user?.first_name + " " + user?.last_name);
  }, []);

  useEffect(() => {
    if (getProductError) {
      setTimeout(() => {
        setGetProductError(false);
      }, 3000);
    }
  }, [getProductError]);

  const { data: all_rate } = useQuery("rates", fetchRate);

  const exchange_rate = all_rate?.exchange_rate;
  const fee_rate = all_rate?.fee_rate;

  const timeToday = new Date().getTime();

  const { transfer_date, transfer_time } = TransferDateTime();

  const diff_timeToday = duration_endTime - timeToday;

  const cal_coin_exchange_rate = coin / exchange_rate;

  const cal_coin_fee_rate = cal_coin_exchange_rate * (fee_rate / 100);

  const onSell = async () => {
    try {
      setLoading(true);
      await onSellInvestContract({
        // HISTORY
        invest_contract: invest_contract,
        history_type: "SELL_INVEST",
        status_sell: "SELLING",
        cal_coin_fee_rate: cal_coin_exchange_rate - cal_coin_fee_rate,
        me: user.id,
        price,
        code,
        transection: "EARNING",
        status: "SUCCESS",

        // INVEST CONTRACT
        _id: invest_contract_sell_id,
        old_coin: coin,
        coin: newCoin,
        contract_type: "MARKETPLACE",
      });
      await refetch();
      await SwalAlert.Success();
    } catch (error) {
      await SwalAlert.Fail({ text: error?.message });
    } finally {
      setLoading(false);
    }
  };

  const onGatherProfit = async () => {
    try {
      setLoading(true);
      if (
        !user.bank_name ||
        !user.bank_number ||
        !user.bank_account ||
        !user.bank_branch
      ) {
        await SwalAlert.Warning({ text: "โปรดกรอกข้อมูลบัญชี" });
        return setPages("Account");
      }

      const { data: responseData } = await postHistory({
        history_type: "HARVEST_COIN",
        me: user.id,
        price: Number((Number(coin) + Number(profit)) * Number(exchange_rate)),
        code: code,
        // title: `เก็บเกี่ยวเป็นกำไร ${Number(
        //   (coin + profit) * exchange_rate
        // )} บาท`,
        transfer_date: transfer_date,
        transfer_time: transfer_time,
        transection: "EARNING",
        status: "PENDING",
        bank: {
          bank_name: user?.bank_name,
          bank_number: user?.bank_number,
          bank_account: user?.bank_account,
          bank_branch: user?.bank_branch,
        },
        harvest_invest_contract: invest_contract,
      });
      await deleteInvesrContract(invest_contract_sell_id);
      // await refetch();
      setHistoryId(responseData.id);
      setSuccessOpen(true);
    } catch (error) {
      console.log("ERRORRRR : ", error);
    } finally {
      setLoading(false);
    }
  };

  const onGatherProduct = async () => {
    try {
      setLoading(true);
      if (phone && address && user && fullname) {
        const { data: responseData } = await postHistory({
          history_type: "HARVEST_PRODUCT",
          status: "PENDING",
          transection: "EARNING",
          me: user?.id,
          address: address,
          transfer_date: transfer_date,
          transfer_time: transfer_time,
          userFullname: fullname,
          phone_number: phone,
          harvest_invest_contract: invest_contract,
          bank: {
            bank_name: user?.bank_name,
            bank_number: user?.bank_number,
            bank_account: user?.bank_account,
            bank_branch: user?.bank_branch,
          },
        });
        await deleteInvesrContract(invest_contract_sell_id);
        setHistoryId(responseData.id);
        setSuccessOpen(true);
        // await refetch();
      } else {
        setGetProductError(true);
      }
    } catch (error) {
      console.log("ERROR : ", error);
    } finally {
      setLoading(false);
    }
    // router.push("/Marketplace/SuccessCard");
  };

  const onClickBuy = async () => {
    try {
      await onBuyInvestContract({
        _id: invest_contract_sell_id,
        owner: user?.id,
        old_owner: owner._id,
        coin: coin,
        history,
      });
      await SwalAlert.Success();
      await refetch();
      await localStorage.setItem("State", "Port");
      await router.push("/Profile");
    } catch (error) {
      console.log("ERROR buy coin", error);
      await SwalAlert.Fail({ text: error.message });
    }
  };

  const routerInvestContract = (e) => {
    e.stopPropagation();
    router.push(`/InvestContract/${invest_contract_sell_id}`);
  };

  return (
    <div onClick={routerInvestContract}>
      <TwoModal
        code={code}
        coin={coin}
        price={price}
        id={historyId}
        quantity={quantity}
        profit={profit}
        open={successOpen}
        setOpen={setSuccessOpen}
      />
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
        // pathname={"/Marketplace/SuccessCard"}
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
                    {name}
                    <div className="text-xs text-textgold font-light">
                      {code}
                    </div>
                  </div>
                  <div className="text-lg font-medium flex justify-center items-center text-textpink">
                    <img className="w-6 h-6 mr-2" src="../icon/coin.png" />
                    {sell ? (
                      <div>{coin / exchange_rate} coin</div>
                    ) : (
                      <div>{coin}</div>
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
                  <div>{duration_display}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>&bull; ผลตอบแทนรวม</div>
                  <div>{profit} บาท</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>&bull; วันที่เริ่มลงทุน</div>
                  <div>{new Date(duration_startDate).toLocaleDateString()} </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>&bull; วันที่เก็บเกี่ยว</div>
                  <div>{new Date(duration_endDate).toLocaleDateString()} </div>
                </div>

            

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
        open={open}
        setOpen={setOpen}
      />
      <div className="w-80  md:w-80   relative rounded-lg mr-14 md:mr-0 flex-shrink-0 mx-auto cursor-pointer    ">
        <div className=" bg-gray-100 rounded-lg z-10 relative  w-95% mb-6 mt-6    ">
          <div className=" ">
            <div className="bg-black text-xs  text-white bg-opacity-60 rounded p-2 top-2 right-2   flex justify-center items-center absolute z-10  ">
              จำนวนที่ซื้อ {quantity}
            </div>
            {cover_image ? (
              <img
                className="w-full h-44 object-cover rounded-t-lg"
                src={getPathUrl(cover_image)}
              />
            ) : (
              <img
                className="w-full h-44 object-cover rounded-t-lg "
                src="../card/card.jpg"
              />
            )}
          </div>

          <div className=" p-4 pt-2">
            <div className="flex justify-between items-center">
              <div className="  text-textdarkgreen  text-xl">{name}</div>
              {user?.id === owner && (
                <div className="  text-textdarkgreen  text-sm">(ฉัน)</div>
              )}
            </div>
            <div className="font-light text-xs  text-textgold mb-3 ">
              {code}
            </div>
            <LineOptimized
              duration_endTime={duration_endTime}
              duration_startTime={duration_startTime}
            />

            <div className="flex justify-between items-center text-textlogingray text-xs ">
              <div>
                {format(new Date(duration_startDate), "dd/MM/yyyy HH:mm")}
              </div>
              <div>
                {format(new Date(duration_endDate), "dd/MM/yyyy HH:mm")}
              </div>
            </div>

            <div className="text-sm text-textgraysec mt-3">
              <div className="flex justify-between items-center">
                <div className="text-xs font-light  text-coolGray-500 ">
                  จำนวนสินค้า
                </div>
                <div className="font-medium text-sm text-coolGray-700 ">
                  {quantity} ต้น
                </div>
              </div>
            </div>
            <div className="text-sm text-textgraysec mt-1">
              <div className="flex justify-between items-center">
                <div className="text-xs font-light  text-coolGray-500 ">
                  ระยะเวลาการลงทุน
                </div>
                <div className="font-medium text-sm text-coolGray-700 ">
                  {duration_display}
                </div>
              </div>
            </div>

            <div className="my-2 border-t border-coolGray-200"></div>
            {diff_timeToday < 0 ? (
              <div className="text-textgray flex justify-between items-center mt-2  ">
                <div className="flex justify-start items-center text-sm ">
                  ราคาทุน ( {quantity} ต้น )
                </div>
                <div className=" flex    justify-end  items-center ">
                  <img className="w-4 h-4 mr-1" src="../icon/coin.png" />
                  <div className="text-textdarkgreen pr-2 text-lg font-light">
                    {coin}
                  </div>
                  <div className="font-light text-sm text-coolGray-400">
                    ( {unit_baht} บาท )
                  </div>
                </div>
              </div>
            ) : (
              [
                sell ? (
                  <div className="text-textgray flex justify-between items-center mt-2  ">
                    <div className="flex justify-start items-center text-sm ">
                      ราคาขาย (รวม {quantity} ต้น )
                    </div>
                    <div className=" flex    justify-end  items-center ">
                      <img className="w-4 h-4 mr-1" src="../icon/coin.png" />
                      <div className="text-textdarkgreen pr-2 text-lg font-light">
                        {coin / exchange_rate}
                      </div>
                      <div className="font-light text-sm text-coolGray-400">
                        ( {coin} บาท )
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-textgray flex justify-between items-center mt-2  ">
                    <div className="flex justify-start items-center text-sm ">
                      ราคาขาย (รวม {quantity} ต้น )
                    </div>
                    <div className=" flex    justify-end  items-center ">
                      <img className="w-4 h-4 mr-1" src="../icon/coin.png" />
                      <div className="text-textdarkgreen pr-2 text-lg font-light">
                        {coin}
                      </div>
                      <div className="font-light text-sm text-coolGray-400">
                        ( {unit_baht} บาท )
                      </div>
                    </div>
                  </div>
                ),
              ]
            )}

            {!sell && (
              <div className="text-sm text-coolGray-500">
                <div className="flex justify-between items-center text-sm">
                  <div>ผลตอบแทนรวม (บาท)</div>
                  <div>
                    <div className=" flex flex-col justify-end items-end">
                      <div className=" flex   justify-end   items-center ">
                        <div className="text-coolGray-700 font-medium">
                          {profit}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {sell ? (
              <ButtonClick name="ซื้อต่อสัญญา" onClick={setOpen} />
            ) : (
              [
                diff_timeToday < 0 ? (
                  <ButtonClick name="เก็บเกี่ยว" onClick={setOpen} />
                ) : (
                  <ButtonClick
                    name="ขายต่อสัญญา"
                    onClick={setOpen}
                    contract_type={contract_type}
                    investId={invest_contract_sell_id}
                    historyId={history}
                    ownerId={owner?._id}
                    refetch={refetch}
                  />
                ),
              ]
            )}
          </div>
        </div>
        <div className="decoratecard w-64  rounded-lg   h-decorate absolute top-0 left-0 ml-16 -mt-4"></div>
      </div>
    </div>
  );
};
export default MarketplaceCard;
