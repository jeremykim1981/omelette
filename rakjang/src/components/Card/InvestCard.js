import Link from "next/link";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// AWS
import { S3Image } from "aws-amplify-react";
import { getPathUrl } from "../../function/functions";

const InvestCard = ({
  id,
  quantity = "1",
  duration_display,
  name,
  coin,
  code,
  period,
  profit,
  detail,
  cover_image,
  unit_baht = "",
}) => {
  const router = useRouter();

  const onRouteInvest = () => {
    router.push(`/Invest/${id}`);
  };

  return (
    <div onClick={onRouteInvest}>
      <div className="w-80  md:w-80 xl:w-80  flex-shrink-0     relative rounded-lg  cursor-pointer   ">
        <div className=" bg-gray-100 rounded-lg z-10 relative  mr-auto w-95% mb-6 mt-6 hover:shadow-xl   ">
          <div
            className={classNames(
              " bg-black text-xs text-white  bg-opacity-40 rounded-lg p-1 top-2 right-2  flex justify-center items-center absolute z-10  ",
              {}
            )}
          >
            {quantity !== 0 ? quantity + " left" : "สินค้าหมด"}
          </div>
          {cover_image ? (
            <img
              className="w-full h-52 rounded-t-lg object-cover "
              src={getPathUrl(cover_image)}
            />
          ) : (
            <img
              className="w-full h-52 rounded-t-lg object-cover"
              src="../card/card.jpg"
            />
          )}
          <div className="p-4 pt-2 grid grid-cols-1 gap-2 ">
            <div className=" flex  justify-start flex-col  items-start ">
              <div className="  text-textdarkgreen text-xl ">{name}</div>
              <div className="font-light text-xs  text-textgold ">{code}</div>
              <div className=" font-light text-xs text-coolGray-500     line-clamp-3 h-12  mt-2">
                {detail}
              </div>
              <div className="border-b  w-full py-1 "></div>
            </div>
            <div className="text-textgray flex justify-between items-center mt-2  ">
              <div className="flex justify-start items-center text-sm">
                ราคา (ต้น)
              </div>
              <div className=" flex    justify-end  items-center ">
                <img className="w-4 h-4 mr-1" src="../icon/coin.png" />
                <div className="text-textdarkgreen pr-2 text-lg font-light">
                  {coin}
                </div>
                <div className="font-light text-sm text-coolGray-400">
                  ( {unit_baht} บาท ){" "}
                </div>
              </div>
            </div>

            <div className="text-sm text-textgraysec">
              <div className="flex justify-between items-center">
                <div>ระยะเวลาการลงทุน </div>
                <div className="">{duration_display}</div>
              </div>
            </div>
            <div className="text-sm text-textgraysec">
              <div className="flex justify-between items-center">
                <div>ผลตอบแทน (บาท ต่อต้น)</div>
                <div>
                  <div className=" flex flex-col justify-end items-end">
                    <div className=" flex   justify-end   items-center ">
                      <div className="text-textgray">{profit} บาท</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="decoratecard w-64 rounded-lg  h-decorate absolute top-0 left-0 ml-16 -mt-4"></div>
      </div>
    </div>
  );
};
export default InvestCard;
