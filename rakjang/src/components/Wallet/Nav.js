import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "../Attribute/Toast";
const ButtonNavStyle = "cursor-pointer p-2";

const CopyField = ({ title, value }) => {
  return (
    <div className="text-base text-textgray flex   justify-center   items-center">
      <div className=" mr-4 font-light">
        {title} : {value}
      </div>
      <svg
        onClick={() => {
          navigator.clipboard.writeText(value);
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
  );
};

const Nav = ({ navs, setNavs, username, coins, phone_number, wallet_id }) => {
  return (
    <div>
      <Toast />
      <div className="flex justify-start items-center">
        <img className="w-16 mr-4" src="../icon/coin.png" />
        <div className="flex flex-col justify-start items-start">
          <div className=" font-bold text-xl ">{coins} Coins available</div>
          <CopyField title="Username : " value={username} />
          <CopyField title="telephone : " value={phone_number} />
          <CopyField title="walled ID : " value={wallet_id} />
        </div>
      </div>
      <div>
        <div className="my-4">
          <div className="topnav grid  md:grid-cols-3">
            <a
              className={
                navs === "Transfer"
                  ? `${" active focus:outline-none " + ButtonNavStyle}`
                  : ButtonNavStyle
              }
              onClick={() => setNavs("Transfer")}
            >
              Transfer
            </a>
            <a
              className={
                navs === "Witdraw"
                  ? `${" active focus:outline-none " + ButtonNavStyle}`
                  : ButtonNavStyle
              }
              onClick={() => setNavs("Witdraw")}
            >
              Exchange
            </a>
            <a
              className={
                navs === "BuyCoin"
                  ? `${" active focus:outline-none " + ButtonNavStyle}`
                  : ButtonNavStyle
              }
              onClick={() => setNavs("BuyCoin")}
            >
              Deposit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
