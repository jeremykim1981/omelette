import { useState } from "react";
import EvidenceModal from "../basket/EvidenceModal";

const WalletCard = ({
  type = "",
  serial = "",
  date = "",
  time = "",
  status = "",
  name = "",
  wallet_id = "",
  coin = "",
  evidence_url = "",
  transfer_time = "",
  id,
}) => {
  const [open, setOpen] = useState(false);

  const checkWalletId = (type) => {
    switch (type) {
      case "TRANSFER":
      case "WITHDRAW":
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="cardwallet flex flex-row p-4 items-center justify-between text-xs lg:text-sm relative pt-16 md:pt-4 ">
      <div className="  items-center text-textorange font-semibold text-lg md:hidden flex absolute top-4 left-4">
        <img className="w-10 h-10 mr-2" src="../icon/coin.png" /> {coin}
      </div>
      <div className="flex justify-center items-center space-x-4">
        <img
          className="w-16 h-16 lg:w-16 lg:h-16 hidden md:block rounded-full "
          src="../icon/coin.png"
        />
        <div className="space-y-1">
          <div className=" font-semibold text-lg text-black">{type}</div>
          <div>หมายเลขการทำรายการ : {serial}</div>
          <div
            className={
              (Number(coin) > 0 ? "text-green-500 " : "text-red-500 ") +
              " items-center font-semibold text-base hidden md:flex"
            }
          >
            {coin}
          </div>

          {evidence_url && (
            <div className="">
              <div
                onClick={() => setOpen(true)}
                className="text-blue-500 underline text-sm cursor-pointer"
              >
                หลักฐานการทำรายการ
              </div>
              <EvidenceModal
                open={open}
                setOpen={setOpen}
                evidence_url={evidence_url}
              />
            </div>
          )}
        </div>
      </div>

      <div className="">
        {status && (
          <div className="text-textgreen hidden md:block text-right">
            {status}
          </div>
        )}

        <div>{name}</div>
        {checkWalletId() && wallet_id && <div> id wallet : {wallet_id}</div>}
        <div className="text-right"> {transfer_time}</div>

        <div className="  items-center text-textorange font-semibold text-lg hidden md:flex">
          <img className="w-10 h-10 mr-2" src="../icon/coin.png" /> {coin}
        </div>
      </div>
    </div>
  );
};
export default WalletCard;
