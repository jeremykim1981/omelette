import Header from "../Attribute/Header";
import { useQuery } from "react-query";

//API
import { fetchInvests } from "../../api/invest";
import InvestCard from "../Card/InvestCard";

const InvestSession = () => {
  const { data, isLoading, error } = useQuery(
    "invests",
    fetchInvests("?limit=4")
  );

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 mb-20  ">
      <Header title="Invest" herf="/Invest" />
      <div className="flex overflow-x-scroll  space-x-4  pb-6">
        {data?.invests?.map((invest, index) => {
          return (
            <div className=" ">
              <InvestCard
                key={invest?._id}
                id={invest?._id}
                duration_display={invest?.duration_display}
                quantity={invest?.quantity}
                cover_image={invest?.cover_image}
                name={invest?.name}
                coin={invest?.coin}
                code={invest?.code}
                period={invest?.period}
                profit={invest?.profit}
                detail={invest?.detail}
                unit_baht={invest?.unit_baht}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default InvestSession;
