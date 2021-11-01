import Link from "next/link";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { S3Image } from "aws-amplify-react";
import { getPathUrl } from "../../function/functions";

const ProductCard = ({
  cover_image,
  name = "",
  price = "",
  unit = "",
  serialnumber = "",
  detail = "",
  baht = "",
  id,
  countleft,
}) => {
  const { user } = useSelector((state) => state.initializeApp);

  return (
    <Link href={`/Product/${id}`}>
      <div className="w-80  md:w-80   relative rounded-lg  cursor-pointer flex-shrink-0    ">
        <div className=" bg-gray-100 rounded-lg z-10 relative mr-auto  w-95% mb-6 mt-6 hover:shadow-xl    ">
          <div className="bg-black text-xs   text-white bg-opacity-40 rounded-lg p-1 right-2 top-2 flex justify-center items-center absolute z-10  ">
            {countleft} left
          </div>
          <img
            className=" w-full h-52 rounded-t-lg object-cover "
            src={getPathUrl(cover_image)}
          />

          <div className=" p-4 grid grid-cols-1 gap-2 ">
            <div className=" flex justify-between  items-start ">
              <div className="  text-textdarkgreen ">
                {name}
                <div className="font-light text-textgold text-xs">
                  {serialnumber}
                </div>
              </div>

              <div className="">
                <div className=" flex   justify-end   items-end ">
                  <img className="w-6 h-6 mr-4" src="../icon/coin.png" />
                  <div className="text-textpink">{price}</div>
                </div>
                <div className=" text-textgray text-xs font-light text-right w-20">
                  ราคา / {unit}
                </div>
              </div>
            </div>
            {/*    */}
            <div className=" font-light text-xs text-textgray line-clamp-3 h-12 ">
              {detail}
            </div>
            <div className=" border-b"></div>
            <div className="text-sm text-textgraysec">
              <div className="flex justify-between items-center">
                <div>ราคาหน่วยบาท </div>
                <div className="font-light text-right">
                  {baht} <div className="text-xs">บาท / ต้น</div>
                </div>
              </div>
            </div>
            {/* <div className="text-sm text-textgraysec">
              <div className="flex justify-between items-center">
                <div>รหัสสินค้า </div>
                <div className="font-light">{serialnumber}</div>
              </div>
            </div> */}

            {/* <button
              className={classNames(
                "text-white py-1 px-4 rounded-3xl  flex justify-center items-center cursor-pointer w-2/3 mx-auto focus:outline-none",
                {
                  "bg-gray-400 cursor-not-allowed": !user,
                  "addtobasketbutton cursor-pointer": user,
                }
              )}
            >
              Add to basket
            </button> */}
          </div>
        </div>
        <div className="decoratecard w-64  rounded-lg  h-96 absolute top-0 left-0 ml-16      "></div>
      </div>
    </Link>
  );
};
export default ProductCard;
