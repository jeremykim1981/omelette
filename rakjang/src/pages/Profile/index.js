import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

// HOC
import withAuth from "../../hoc/withAuth";

// REDUX
import { initializeApp } from "../../_redux/initializeAppSlice";

// COMPONENTS
import Sidebar from "../../components/Profile/Sidebar";
import Account from "../../components/Profile/Account";
import Wallet from "../../components/Wallet/Wallet";
import History from "../../components/History/History";
import Port from "../../components/Profile/Port";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, status } = useSelector((state) => state.initializeApp);

  const username = user?.username;

  const phone_number =
    user?.phone_number?.slice(0, 3) === "+66"
      ? user?.phone_number?.replace("+66", "0")
      : user?.phone_number;

  const coins = user?.coin;

  const wallet_id = user?.wallet_id;

  useEffect(() => {
    dispatch(initializeApp());
  }, [router]);

  const [pages, setPages] = useState("Account");
  const [navs, setNavs] = useState("BuyCoin");

  useEffect(async () => {
    const checkInvest = localStorage.getItem("State");
    if (checkInvest === "Wallet") {
      setPages("Wallet");
      setNavs("BuyCoin");
    } else if (checkInvest === "Port") {
      setPages("Port");
    } else if (checkInvest === "History") {
      setPages("History");
    } else {
      setPages("Account");
    }
  }, [localStorage]);

  return (
    <div className="px-4 md:px-8 bg-white lg:px-16 py-10 flex flex-col lg:flex-row lg:justify-start lg:items-start  mt-10 lg:mt-0 ">
      <Sidebar pages={pages} setPages={setPages} />
      <div className="w-full mx-auto ">
        {pages === "Account" && <Account />}
        {pages === "History" && (
          <History
            phone_number={phone_number}
            username={username}
            coins={coins}
          />
        )}
        {pages === "Wallet" && (
          <Wallet
            wallet_id={wallet_id}
            phone_number={phone_number}
            username={username}
            setPages={setPages}
            setNavs={setNavs}
            navs={navs}
            coins={coins}
          />
        )}
        {pages === "Port" && <Port setPages={setPages} setNavs={setNavs} />}
      </div>
    </div>
  );
};
export default withAuth(Profile);
