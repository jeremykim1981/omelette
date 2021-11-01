import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchHistorys } from "../../api/history";
import { getPathUrl, timeDifference } from "../../function/functions";

const BellNoti = ({ clickNoti, setClickNoti }) => {
  const router = useRouter();
  const { user, status } = useSelector((state) => state.initializeApp);

  const default_limit = 5;
  const default_failter = `sort=createdAt:-1&me=${user?.id}`;

  const [histories, setHistories] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(default_limit);
  const [skip, setSkip] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const filter = "transection=EARNING";

  useEffect(() => {
    setSkip(0);
    fetchEarning();
  }, [clickNoti]);

  const fetchEarning = async () => {
    try {
      setLoading(true);
      const filter = `transection=EARNING`;
      const dataContracts = await fetchHistorys(
        `?limit=${limit}&skip=${skip}&${default_failter}&${filter}`
      )();
      setHistories(dataContracts.historys);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
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

  const clickViewMore = async () => {
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

  const onClickTask = () => {
    if (router.asPath === "/Profile") {
      //   localStorage.setItem("State", "History");
      return;
    } else {
      router.push("/Profile");
      localStorage.setItem("State", "History");
    }
  };

  return (
    <div className="relative ">
      <div className=" absolute right-0 top-4 z-40 w-72">
        {clickNoti && (
          <div className=" bg-white  px-4 py-3 rounded-lg shadow-md max-w-xs break-all ">
            {loading ? (
              <div className="flex items-center mt-3 hover:bg-gray-100 rounded-lg px-1 py-1 cursor-pointer">
                <div className="flex flex-shrink-0 items-end">
                  {/* <Skeleton width={"100%"} height={"100%"} /> */}
                </div>
              </div>
            ) : (
              <div className="overflow-y-scroll h-96">
                {histories?.length > 0 &&
                  histories?.map((history, i) => {
                    return (
                      <div
                        key={i}
                        className="flex items-center mt-3 hover:bg-gray-100 rounded-lg px-1 py-1 cursor-pointer"
                        onClick={() => onClickTask()}
                      >
                        <div className="flex flex-shrink-0 items-end">
                          <div>
                            {["TRANSFER", "DEPOSIT", "DEPOSIT_CRYPTO"].includes(
                              history?.history_type
                            ) ? (
                              <img
                                className="h-16 w-16 object-cover rounded-full "
                                src={"../icon/coin.png"}
                              />
                            ) : history?.history_type === "BUY_PRODUCT" ? (
                              <div>
                                <img
                                  className="h-16 w-16 object-cover rounded-full "
                                  src={"../icon/cart.jpeg"}
                                />
                              </div>
                            ) : history?.invest_contract?.cover_image ? (
                              <img
                                className="w-16 h-16  hidden md:block object-cover rounded-full "
                                src={getPathUrl(
                                  history?.invest_contract?.cover_image
                                )}
                              />
                            ) : (
                              <img
                                className="h-16 w-16 object-cover rounded-full "
                                src={"../card/card.jpg"}
                              />
                            )}
                          </div>
                        </div>
                        <div className="ml-3">
                          <span className="font-medium  font-sans text-sm line-clamp-1">
                            <div>
                              {checkName({
                                history_type: history?.history_type,
                                status_sell: history?.status_sell,
                              })}
                            </div>
                          </span>
                          <p className="text-sm  font-sans line-clamp-1">
                            ได้รับ : {history?.coin} (coins)
                          </p>
                          <div className="text-sm  font-sans text-blue font-semibold">
                            {timeDifference(
                              new Date().getTime(),
                              new Date(history?.createdAt).getTime()
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <div className="flex justify-center items-center ">
                  {false
                    ? ""
                    : [
                        loadingMore ? (
                          <div>Loading ... </div>
                        ) : (
                          <button
                            onClick={() => clickViewMore()}
                            className=" border w-full text-sm hover:shadow-lg cursor-pointer  font-Times  flex justify-center p-2 mt-4 text-textaboutus border-textaboutus rounded-md border-opacity-50 "
                          >
                            VIEW MORE
                          </button>
                        ),
                      ]}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default BellNoti;
