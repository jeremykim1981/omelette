import MarketplaceCard from "../../components/Card/MarketplaceCard";
import InvestSection from "../../components/Invest/InvestSection";
import { useQuery } from "react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

// const Filter = ({ name = "" }) => {
//   return (
//     <div className="text-sm hover:text-white hover:bg-textgreen  cursor-pointer rounded-full w-20 border border-textgreen text-textgreen bg-greenblog flex justify-center items-center bg-opacity-30">
//       {name}
//     </div>
//   );
// };

// const Category = () => {
//   return (
//     <div className="flex space-x-10 mt-10 overflow-x-scroll lg:overflow-x-hidden  pb-6">
//       <div className=" flex-shrink-0 ">
//         <Filter name="All" />
//       </div>
//       <div className=" flex-shrink-0 ">
//         <Filter name="Herb" />
//       </div>
//       <div className=" flex-shrink-0 ">
//         <Filter name="Vegetable" />
//       </div>
//       <div className=" flex-shrink-0 ">
//         <Filter name="Eco Tree" />
//       </div>
//       <div className=" flex-shrink-0 ">
//         <Filter name="Flower" />
//       </div>
//       <div className=" flex-shrink-0 ">
//         <Filter name="Animals" />
//       </div>
//     </div>
//   );
// };

const Invest = () => {
  const router = useRouter();
  const onClickInvest = () => {
    localStorage.setItem("State", "Wallet");
    router.push("/Profile");
  };

  const [menu, setMenu] = useState("Invest");

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10 ">
      <div>
        <div className="flex  flex-col md:flex-row justify-start items-start md:justify-between  md:items-center">
          <div>
            <ul className="flex">
              <li className="mr-3">
                <a
                  onClick={() => setMenu("Invest")}
                  className={`${
                    menu === "Invest"
                      ? " cursor-pointer inline-block border border-textdarkgreen rounded  bg-textdarkgreen text-white py-1 px-3 "
                      : " cursor-pointer inline-block border border-white rounded hover:border-b hover:border-textdarkgreen text-textdarkgreen hover:bg-white py-1 px-3 "
                  }} `}
                >
                  Invest
                </a>
              </li>
              <li className="mr-3">
                <a
                  onClick={() => setMenu("Marketplace")}
                  className={`${
                    menu === "Marketplace"
                      ? " cursor-pointer inline-block border border-textdarkgreen rounded  bg-textdarkgreen text-white py-1 px-3 "
                      : " cursor-pointer inline-block border border-white rounded hover:border-b hover:border-textdarkgreen text-textdarkgreen hover:bg-white py-1 px-3 "
                  }} `}
                >
                  Marketplace
                </a>
              </li>
            </ul>
          </div>
          <div
            onClick={() => onClickInvest()}
            className="flex justify-center cursor-pointer items-center text-textdarkgreen mt-4 md:mt-0"
          >
            <img className="w-6 h-6 mr-2" src="../icon/coin.png" />
            ซื้อเหรียญ
          </div>
        </div>
        <div className="border-b border-gray-300 pt-4"></div>
      </div>

      <div>
        <InvestSection menu={menu} />
      </div>
    </div>
  );
};
export default Invest;
