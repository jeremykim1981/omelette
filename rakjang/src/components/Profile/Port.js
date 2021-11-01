import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MarketplaceCard from "../Card/MarketplaceCard";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

// API
import { fetchInvestsContracts } from "../../api/invest_contract";

const Port = ({ setPages, setNavs }) => {
  const router = useRouter();

  const limit = 10;

  const { user, status } = useSelector((state) => state.initializeApp);

  const default_failter = `sort=createdAt:-1&owner=${user.id}`;

  const onClickInvest = () => {
    if (!user.coin) {
      setPages("Wallet");
      setNavs("BuyCoin");
      return;
    }
    router.push("/Invest");
  };

  const { data, isLoading, refetch } = useQuery(
    "invest_contracts",
    fetchInvestsContracts(`?limit=${limit}&skip=0&${default_failter}`)
  );

  const [skip, setSkip] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    if (!data) return;
    setContracts(data.invest_contracts);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const newSkip = skip + limit;
      const dataContracts = await fetchInvestsContracts(
        `?limit=${limit}&sort=createdAt:-1&skip=${newSkip}&${default_failter}`
      )();
      setContracts((prev) => {
        return [...prev, ...dataContracts.invest_contracts];
      });
      setSkip(newSkip);
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div>
      {contracts?.length > 0 ? (
        <div className="flex flex-col lg:flex-row items-start xl:space-x-2">
          <div className="grid grid-cols-1 md:grid-cols-2  xl:gap-4  xl:grid-cols-3 gap-4 mt-10">
            {contracts?.map((contract) => {
              return (
                <MarketplaceCard
                  setPages={setPages}
                  refetch={refetch}
                  user={user}
                  key={contract._id}
                  name={contract.name}
                  quantity={contract.quantity}
                  id={contract._id}
                  coin={contract.coin}
                  code={contract.code}
                  period={contract.period}
                  price={contract.price}
                  profit={contract.profit}
                  detail={contract.detail}
                  cover_image={contract.cover_image}
                  duration_startTime={contract.duration_startTime}
                  duration_endTime={contract.duration_endTime}
                  duration_startDate={contract.duration_startDate}
                  duration_endDate={contract.duration_endDate}
                  duration_time={contract.duration_time}
                  duration_display={contract.duration_display}
                  unit_baht={contract.unit_baht}
                  invest_contract={{ ...contract }}
                  invest_contract_sell_id={contract?._id}
                  history={contract.history}
                  owner={contract.owner}
                  contract_type={contract?.contract_type}
                />
              );
            })}
          </div>
          {contracts?.length > 0 && (
            <button
              className="w-28 text-textdarkgreen hover:underline flex   justify-center items-center "
              onClick={loadMore}
            >
              Load More...
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col  justify-center items-center">
          <img className="w-2/3 mx-auto h-auto" src="../icon/sorry.jpg" />
          <div className=" text-xl  text-textpink">คุณยังไม่มีหน่วยลงทุน</div>
          <div className=" text-xl text-textgray">
            “ ลงทุนได้กำไร เชื่อมั่นใน รักจังฟาร์ม “
          </div>
          <div
            onClick={() => onClickInvest()}
            className=" w-1/3 bg-bgbuttongreen text-white py-2 px-4 rounded-3xl mt-10 flex justify-center items-center cursor-pointer mx-auto "
          >
            {!user.coin ? "Buy Coin" : "Invest now"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Port;
