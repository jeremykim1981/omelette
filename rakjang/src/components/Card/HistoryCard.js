import { S3Image } from "aws-amplify-react";
import classNames from "classnames";
import { format } from "date-fns";
import { getPathUrl } from "../../function/functions";

const HistoryCard = ({
  _id,

  invest = { cover_image: "", name: "" },
  createdAt = "",
  status_sell = "",
  history_type = "",
  serial = "",
  transfer_time = "",
  status = "",
  text = "",
  coin = "",
  diff,
}) => {
  return (
    <div className="cardwallet flex flex-row p-4 items-center justify-between text-xs lg:text-sm relative pt-16 md:pt-4 ">
      <div className="  items-center text-textorange font-semibold text-lg md:hidden flex absolute top-4 left-4">
        {history_type === "SELL_INVEST" && <div>{status_sell}</div>}
        <img className="w-10 h-10 mr-2" src="../icon/coin.png" /> {coin}
      </div>

      <div className="flex justify-center items-center space-x-4">
        {invest.cover_image ? (
          <img
            className="w-16 h-16  hidden md:block object-cover rounded-full "
            src={getPathUrl(invest.cover_image)}
          />
        ) : (
          <img
            className="w-16 h-16   hidden md:block object-cover rounded-full "
            src={"../card/card.jpg"}
          />
        )}
        <div className="space-y-1">
          <div className=" font-semibold text-xl  ">
            {history_type}
            <div>{invest.name}</div>
          </div>
          <div className="text-blue-400">{_id}</div>
          <div>{transfer_time}</div>
        </div>
      </div>
      <div className="text-textgreen absolute top-4 right-4 md:hidden block">
        {status}
      </div>

      <div className="space-y-1 flex flex-col justify-end items-end">
        {/* <div
          className={classNames(
            "items-center font-semibold text-lg hidden md:flex",
            { "text-textorange": diff === "+", "text-red-500": diff === "-" }
          )}
        >
          
          <img className="w-10 h-10 mr-2" src="../icon/coin.png" /> {coin}
        </div> */}
        <div className=" flex justify-end items-end">
          {format(new Date(createdAt), "dd/MM/yyyy HH:mm")}
        </div>
      </div>
    </div>
  );
};
export default HistoryCard;
