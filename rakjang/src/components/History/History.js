import { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { fetchHistorys } from "../../api/history";
import { useQuery } from "react-query";
import WalletCard from "../Card/WalletCard";
import HistoryCard from "../Card/HistoryCard";
import { EngDate, getPathUrl } from "../../function/functions";
import { Toast } from "../Attribute/Toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { S3Image } from "aws-amplify-react";
import EvidenceModal from "../basket/EvidenceModal";
import LoadingMutation from "../../components/Loading/LoadingMutation";
import classNames from "classnames";
import { format } from "date-fns";
import { CelesStandardPopUp } from "../Attribute/CelesStandardPopUp";

// const Filter = () => {
//   return (
//     <div className="mt-4 flex flex-col lg:flex-row justify-between lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 ">
//       <div className=" border rounded p-2 w-40 flex justify-center items-center">
//         Transfer
//         <svg
//           className="w-4 h-4 ml-2"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </div>
//       <div className=" flex justify-between items-center space-x-4">
//         <div className=" border rounded p-2 w-36  md:w-40 flex justify-center items-center">
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//             />
//           </svg>
//           1 / 08 / 2021
//         </div>
//         <div>TO</div>
//         <div className=" border rounded p-2 w-36  md:w-40 flex justify-center items-center">
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//             />
//           </svg>
//           1 / 08 / 2021
//         </div>
//       </div>
//       <div className=" border rounded p-2 w-40 flex justify-center items-center">
//         APPROVE
//         <svg
//           className="w-4 h-4 ml-2"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// };

const ModalOptimized = memo(({ index, history }) => {
  const [openBuy, setOpenBuy] = useState(false);

  return (
    <div
      onClick={() => setOpenBuy(true)}
      className="text-blue-500 underline mt-2 ml-2"
    >
      หลักฐานการทำรายการ
      <CelesStandardPopUp
        hidden
        panel={
          <div className="relative w-96  border shadowModal rounded-xl h-screen  max-h-bill text-textdarkgreen ">
            <div className="m-4 flex flex-col justify-center items-center  space-y-2">
              <div className="text-2xl ">สินค้าของคุณ !</div>
              <img className="w-20 h-auto" src="../icon/correct.png" />
              {/* <div className="text-lg">หมายเลขการสั่งซื้อ</div> */}
              {/* <div className="text-2xl text-black">1234ABCD</div> */}
              <div className=" text-textgray  font-light">
                {format(new Date(history?.createdAt), "dd/MM/yyyy HH:mm")}
              </div>

              {/* <div className=" text-black">รับสินค้าที่หน้าฟาร์ม</div> */}
              <div className=" text-black">{history?.address}</div>
              <div className="w-2/3">
                {history?.products &&
                  history?.products?.map((row) => {
                    return (
                      <div className=" flex justify-between text-textgray  font-light  ">
                        <div>{row?.name} </div>
                        <div>x{row?.count}</div>
                      </div>
                    );
                  })}
              </div>

              <div className=" flex justify-between text-textgray  font-light w-2/3  ">
                <div>ราคาสินค้ารวม </div>
                <div className="flex justify-end items-center">
                  <img className="w-8 h-8 mr-4" src="../icon/coin.png" />
                  {history?.coin}
                </div>
              </div>
              <div className=" mr-auto w-4/6 mx-auto mt-2">
                <div className="flex  justify-start flex-col items-start text-gray-900 text-sm ">
                  ที่อยู่สำหรับจัดส่ง
                </div>
                <div className=" text-textgray text-sm font-light">
                  {history?.address}
                </div>
              </div>
              <button
                onClick={() => setOpenBuy(false)}
                className="absolute bottom-4  w-11/12 bg-green-500 text-white text-center px-4 py-2 rounded focus:outline-none outline-none "
              >
                ปิด
              </button>
            </div>
          </div>
        }
        key={index}
        open={openBuy}
        setOpen={setOpenBuy}
      />
    </div>
  );
});

const History = ({ coins }) => {
  const { user, status } = useSelector((state) => state.initializeApp);

  const default_limit = 10;
  const default_failter = `sort=createdAt:-1&me=${user.id}`;

  const [navs, setNavs] = useState("All");
  const [filter, setFilter] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(default_limit);
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);

  const fetchSpending = async () => {
    try {
      setLoading(true);
      const filter = `transection=SPENDING`;
      const dataContracts = await fetchHistorys(
        `?limit=${limit}&skip=${skip}&${default_failter}&${filter}`
      )();
      setHistories(dataContracts.historys);
      setFilter(filter);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchEarning = async () => {
    try {
      setLoading(true);
      const filter = `transection=EARNING`;
      const dataContracts = await fetchHistorys(
        `?limit=${limit}&skip=${skip}&${default_failter}&${filter}`
      )();
      setHistories(dataContracts.historys);
      setFilter(filter);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      const dataContracts = await fetchHistorys(
        `?limit=${limit}&skip=${skip}&${default_failter}`
      )();
      setHistories(dataContracts.historys);
      setFilter("");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const newSkip = skip + limit;
      const dataContracts = await fetchHistorys(
        `?limit=${limit}&skip=${newSkip}&${default_failter}&${filter}`
      )();

      if (dataContracts?.historys?.length) {
        setHistories((prev) => {
          return [...prev, ...dataContracts.historys];
        });
        setSkip(newSkip);
      }
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };

  const MY_WALLET_ID = user?.wallet_id;

  const checkEarningSpending = (type) => {
    if (type === "EARNING") {
      return "+";
    }
    return "-";
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    switch (navs) {
      case "All":
        fetchAll();
        break;
      case "Earning":
        fetchEarning();
        break;
      case "Spending":
        fetchSpending();
      default:
        break;
    }
  }, [navs]);

  const checkStatusSell = (status_sell) => {
    switch (status_sell) {
      case "SELLING":
        return <div className="text-green-400">กำลังขาย</div>;
      case "SOLD":
        return <div className="text-blue-400">ขายแล้ว</div>;
      case "CANCEL":
        return <div className="text-red-400">ยกเลิก</div>;
      default:
        break;
    }
  };

  const CheckStatus = (status) => {
    if (status === "PENDING")
      return (
        <div className="absolute top-3 right-3 text-blue-400">รออนุมัติ</div>
      );

    if (status === "SUCCESS")
      return (
        <div className="absolute top-3 right-3 text-green-400">อนุมัติ</div>
      );

    if (status === "FAILED")
      return (
        <div className="absolute top-3 right-3 text-red-400">ไม่อนุมัติ</div>
      );
  };

  const checkName = ({ history_type, status_sell }) => {
    if (history_type === "TRANSFER") return "Transfer";
    else if (history_type === "EXCHANGE") return "Exchange";
    else if (history_type === "DEPOSIT") return "Deposit";
    else if (history_type === "DEPOSIT_CRYPTO") return "Deposit";
    else if (history_type === "INVEST") return "การลงทุน";
    else if (history_type === "BUY_INVEST") return "ซื้อต่อหน่วยลงทุน";
    else if (history_type === "SELL_INVEST")
      return (
        <div className="flex space-x-1">
          <div> ขายต่อหน่วยลงทุน</div>
          <div> {checkStatusSell(status_sell)}</div>
        </div>
      );
    else if (history_type === "HARVEST_COIN") return "เก็บเกี่ยว-เงินสด";
    else if (history_type === "HARVEST_PRODUCT") return "เก็บเกี่ยว-สินค้า";
    else if (history_type === "BUY_PRODUCT") return "สั่งซื้อสินค้า";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const onNav = (status) => {
    setNavs(status);
    setSkip(0);
  };

  return (
    <div className="max-w-xl mx-auto">
      <Toast />

      <div>
        <div className="flex justify-start items-center">
          <img className="w-16 mr-4" src="../icon/coin.png" />
          <div>
            <div className=" font-bold text-xl mb-2">
              {coins} Coins available
            </div>
            <div className="text-sm text-textgray flex justify-center items-center">
              <div className=" mr-4">{"My wallet id : " + MY_WALLET_ID}</div>
              <svg
                onClick={() => {
                  navigator.clipboard.writeText(MY_WALLET_ID);
                  toast.success("คัดลอกเรียบร้อยแล้ว", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}
                className="w-6 h-6 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <div className="my-4">
            <div className="topnav grid  md:grid-cols-3">
              <a
                onClick={() => onNav("All")}
                className={
                  navs === "All"
                    ? " active focus:outline-none cursor-pointer"
                    : "cursor-pointe"
                }
              >
                All history
              </a>
              <a
                className={
                  navs === "Earning"
                    ? " active focus:outline-none cursor-pointer"
                    : "cursor-pointe"
                }
                onClick={() => onNav("Earning")}
              >
                Earning
              </a>
              <a
                className={
                  navs === "Spending"
                    ? " active focus:outline-none cursor-pointer"
                    : "cursor-pointe"
                }
                onClick={() => onNav("Spending")}
              >
                Spending
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  text-textgray mt-4 ">
        {/* <div className="  rounded-full w-full border flex justify-start items-start py-2 px-4 ">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div> */}
        {/* <Filter /> */}

        <div className="flex justify-end items-center mt-4 font-bold">
          ทั้งหมด {histories?.length} รายการ
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {histories?.length > 0 &&
            histories?.map((history, index) => {
              return (
                <div className=" cardwallet flex flex-row p-4  text-xs lg:text-sm relative pt-16 md:pt-4 ">
                  <div className="flex justify-center items-center space-x-4">
                    {["TRANSFER", "DEPOSIT", "DEPOSIT_CRYPTO"].includes(
                      history.history_type
                    ) ? (
                      <img
                        className="w-16 h-16   hidden md:block object-cover rounded-full "
                        src={"../icon/coin.png"}
                      />
                    ) : history.history_type === "BUY_PRODUCT" ? (
                      <div>
                        <img
                          className="w-16 h-16   hidden md:block object-cover rounded-full "
                          src={"../icon/cart.jpeg"}
                        />
                      </div>
                    ) : history?.invest_contract?.cover_image ? (
                      <img
                        className="w-16 h-16  hidden md:block object-cover rounded-full "
                        src={getPathUrl(history?.invest_contract?.cover_image)}
                      />
                    ) : history?.harvest_invest_contract?.cover_image ? (
                      <img
                        className="w-16 h-16  hidden md:block object-cover rounded-full "
                        src={getPathUrl(
                          history?.harvest_invest_contract?.cover_image
                        )}
                      />
                    ) : (
                      <img
                        className="w-16 h-16   hidden md:block object-cover rounded-full "
                        src={"../card/card.jpg"}
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-1">
                    <div className="ml-3">
                      {checkName({
                        history_type: history?.history_type,
                        status_sell: history?.status_sell,
                      })}
                    </div>
                    <div className="ml-3">
                      หมายเลขการทำรายการ : {history?._id}
                    </div>
                    <div className="ml-3">
                      {format(new Date(history.createdAt), "dd/MM/yyyy HH:mm")}
                    </div>
                    <div className="ml-3 text-green-500">
                      {checkEarningSpending(history.transection)}
                      {history.history_type === "HARVEST_COIN"
                        ? `${history.price} บาท`
                        : `${history.coin} (coins)`}
                    </div>
                    {history?.history_type === "BUY_PRODUCT" && (
                      <ModalOptimized index={index} history={history} />
                      // <div
                      //   onClick={() => setOpenBuy(true)}
                      //   className="text-blue-500 underline mt-2 ml-2"
                      // >
                      //   หลักฐานการทำรายการ
                      //   <CelesStandardPopUp
                      //     hidden
                      //     panel={
                      //       <div className="relative w-96  border shadowModal rounded-xl h-screen  max-h-bill text-textdarkgreen ">
                      //         <div className="m-4 flex flex-col justify-center items-center  space-y-2">
                      //           <div className="text-2xl ">สินค้าของคุณ !</div>
                      //           <img
                      //             className="w-20 h-auto"
                      //             src="../icon/correct.png"
                      //           />
                      //           {/* <div className="text-lg">หมายเลขการสั่งซื้อ</div> */}
                      //           {/* <div className="text-2xl text-black">1234ABCD</div> */}
                      //           <div className=" text-textgray  font-light">
                      //             {format(
                      //               new Date(history?.createdAt),
                      //               "dd/MM/yyyy HH:mm"
                      //             )}
                      //           </div>

                      //           {/* <div className=" text-black">รับสินค้าที่หน้าฟาร์ม</div> */}
                      //           <div className=" text-black">
                      //             {history?.address}
                      //           </div>
                      //           <div className="w-2/3">
                      //             {history?.products &&
                      //               history?.products?.map((row) => {
                      //                 return (
                      //                   <div className=" flex justify-between text-textgray  font-light  ">
                      //                     <div>{row?.name} </div>
                      //                     <div>x{row?.count}</div>
                      //                   </div>
                      //                 );
                      //               })}
                      //           </div>

                      //           <div className=" flex justify-between text-textgray  font-light w-2/3  ">
                      //             <div>ราคาสินค้ารวม </div>
                      //             <div className="flex justify-end items-center">
                      //               <img
                      //                 className="w-8 h-8 mr-4"
                      //                 src="../icon/coin.png"
                      //               />
                      //               {history?.coin}
                      //             </div>
                      //           </div>
                      //           <div className=" mr-auto w-4/6 mx-auto mt-2">
                      //             <div className="flex  justify-start flex-col items-start text-gray-900 text-sm ">
                      //               ที่อยู่สำหรับจัดส่ง
                      //             </div>
                      //             <div className=" text-textgray text-sm font-light">
                      //               {history?.address}
                      //             </div>
                      //           </div>
                      //           <button
                      //             onClick={() => setOpenBuy(false)}
                      //             className="absolute bottom-4  w-11/12 bg-green-500 text-white text-center px-4 py-2 rounded "
                      //           >
                      //             ปิด
                      //           </button>
                      //         </div>
                      //       </div>
                      //     }
                      //     key={index}
                      //     open={openBuy}
                      //     setOpen={setOpenBuy}
                      //   />
                      // </div>
                    )}
                    {history?.evidence_url && (
                      <div
                        onClick={() => setOpen(true)}
                        className="text-blue-500 underline mt-2 ml-2"
                      >
                        หลักฐานการทำรายการ
                        <EvidenceModal
                          index={index}
                          key={index}
                          open={open}
                          setOpen={setOpen}
                          evidence_url={history?.evidence_url}
                        />
                      </div>
                    )}
                  </div>
                  {history?.history_type === "DEPOSIT" ||
                  history?.history_type === "DEPOSIT_CRYPTO" ||
                  history?.history_type === "HARVEST_COIN" ||
                  history?.history_type === "HARVEST_PRODUCT" ||
                  history?.history_type === "BUY_PRODUCT" ? (
                    <div>
                      {history?.status && (
                        <div>{CheckStatus(history?.status)}</div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
        </div>
        <div>
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className={classNames(
              "w-full px-4 py-2 text-center text-white mt-4 flex items-center justify-center",
              {
                "bg-green-500 cursor-pointer": !loadingMore,
                "bg-gray-400 cursor-not-allowed": loadingMore,
              }
            )}
          >
            {loadingMore && <LoadingMutation />} Loadmore
          </button>
        </div>
      </div>
    </div>
  );
};
export default History;
