import { useQuery } from "react-query";
import router from "next/router";
import LazyLoad from "react-lazyload";
import { useSelector } from "react-redux";

// COMPONENT
import InvestCard from "../Card/InvestCard";

// API
import { fetchInvests } from "../../api/invest";
import { fetchInvestsContracts } from "../../api/invest_contract";
import MarketplaceCard from "../Card/MarketplaceCard";
import Breadcrumb from "../Attribute/BreadCrumb";

function InvestSection({ menu }) {
  // const { data, isLoading, error } = useQuery(
  //   "invests",
  //   fetchInvests(`?limit=4`)
  // );

  const { user } = useSelector((state) => state.initializeApp);

  const { data, isLoading, error } = useQuery("invests", fetchInvests());
  const {
    data: market,
    isLoading: isMarketLoading,
    refetch,
    // : refetchMarket,
  } = useQuery(
    "invest_contracts",
    fetchInvestsContracts(`?contract_type=MARKETPLACE`)
  );

  return (
    <LazyLoad>
      {menu === "Invest" ? (
        <div>
          <div className="mt-4 flex justify-between items-center">
            <Breadcrumb first={"Invest"} />
            <div className="text-textdarkgreen">
              ทั้งหมด {data?.invests?.length} รายการ
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2  xl:gap-4  xl:grid-cols-4 gap-4 mt-10">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              data?.invests?.length > 0 &&
              data?.invests?.map((invest, index) => {
                return (
                  <InvestCard
                    key={invest?._id}
                    id={invest?._id}
                    quantity={invest?.quantity}
                    cover_image={invest?.cover_image}
                    name={invest?.name}
                    coin={invest?.coin}
                    code={invest?.code}
                    period={invest?.period}
                    profit={invest?.profit}
                    detail={invest?.detail}
                    unit_baht={invest?.unit_baht}
                    duration_display={invest?.duration_display}
                  />
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-4 flex justify-between items-center">
            <Breadcrumb first={"Invest"} />
            <div className="text-textdarkgreen">
              ทั้งหมด {market?.invest_contracts?.length || 0} รายการ
            </div>
          </div>
          <div className=" ">
            {isMarketLoading ? (
              <div>Loading....</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2  xl:gap-4  xl:grid-cols-4 gap-4 mt-10">
                {market?.invest_contracts?.length > 0 &&
                  market?.invest_contracts?.map((invest) => {
                    console.log("1", invest);
                    return (
                      <div>
                        <MarketplaceCard
                          key={invest?._id}
                          history={invest?.history}
                          owner={invest?.owner}
                          name={invest?.name}
                          quantity={invest?.quantity}
                          coin={invest?.coin}
                          code={invest?.code}
                          period={invest?.period}
                          price={invest?.price}
                          profit={invest?.profit}
                          detail={invest?.detail}
                          cover_image={invest?.cover_image}
                          duration_startTime={invest?.duration_startTime}
                          duration_endTime={invest?.duration_endTime}
                          duration_startDate={invest?.duration_startDate}
                          duration_endDate={invest?.duration_endDate}
                          duration_time={invest?.duration_time}
                          duration_display={invest?.duration_display}
                          unit_baht={invest?.unit_baht}
                          contract_type={invest?.contract_type}
                          sell={user?.id !== invest?.owner._id}
                          owner={invest?.owner}
                          invest_contract_sell_id={invest?._id}
                          id={invest?.invest_original}
                          refetch={refetch}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}
    </LazyLoad>
  );
}

export default InvestSection;
