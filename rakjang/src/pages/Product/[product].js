import { useRouter, withRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { Storage } from "aws-amplify";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchProductById } from "../../api/product";
import { fetchRate } from "../../api/rate";
import { CartContext } from "../../context/CartContext";
import Breadcrumb from "../../components/Attribute/BreadCrumb";
import classNames from "classnames";
import numeral from "numeral";

const product = () => {
  const { user } = useSelector((state) => state.initializeApp);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState("");
  // const [product_price, setProductPrice] = useState();
  const [count, setCount] = useState(0);

  const { data: all_rate } = useQuery("rates", fetchRate);

  const exchange_rate = all_rate?.exchange_rate;
  const fee_rate = all_rate?.fee_rate;

  const { addProduct, cartItems } = useContext(CartContext);

  useEffect(() => {
    LoadProduct();
  }, [router]);

  const onAddProduct = (data) => {
    addProduct(data);
    setCount(0);
  };

  const getMultiImages = async (multi_images) => {
    try {
      return await Promise.all(
        multi_images.map(async (multi_image) => {
          const url = await Storage.get(multi_image);
          return { original: url, thumbnail: url };
        })
      );
    } catch (error) {}
  };

  const LoadProduct = async () => {
    try {
      setLoading(true);
      const { product } = await fetchProductById(router?.query?.product);
      // const product_price = numeral(
      //   product?.product?.price?.replaceAll(",", "")
      // ).format("0,0");
      // setProductPrice(product_price);
      setProduct({
        product,
        url_multi_images: product.multi_images.length
          ? await getMultiImages(product.multi_images)
          : [],
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const product_price = Number(product?.product?.price);
  // setProductPrice(product_price);

  const Filter = ({ name = "" }) => {
    return (
      <div className="text-sm hover:text-white hover:bg-textgreen  cursor-pointer rounded-full w-20 border border-textgreen text-textgreen bg-greenblog flex justify-center items-center bg-opacity-30">
        {name}
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10 ">
      <div className="flex justify-start  items-start flex-col">
        <div className="text-3xl  textlinear font-bold ">
          {product?.product?.name}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center mt-4">
        <Breadcrumb first={"Product"} secound={product?.product?.name} />
        <div className="text-textgray flex justify-center  items-center mt-4 md:mt-0 ">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <div>{product?.product?.view > 0 ? product?.product?.view : 0}</div>
        </div>
      </div>
      <div>
        {/* <div className="flex space-x-10 text-textdarkgreen mt-10 overflow-x-scroll">
          <div className="text-lg">Tag</div>
          {product?.product?.tag?.map((row, i) => {
            return <Filter name={row} key={i} />;
          })}
        </div> */}
      </div>
      {product?.url_multi_images && (
        <div>
          <div className="md:hidden block w-full xl:w-2/3 mx-auto mt-10">
            <ImageGallery
              items={product?.url_multi_images}
              thumbnailPosition={"bottom"}
              showNav={true}
              showBullets={true}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </div>
          <div className="hidden md:block w-full xl:w-2/3 mx-auto mt-10">
            <ImageGallery
              items={product?.url_multi_images}
              thumbnailPosition={"right"}
              showNav={true}
              showBullets={true}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4 mt-10">
        <div className=" bg-bgproduct rounded-xl p-4">
          <div className=" text-textdarkgreen text-2xl">รายละเอียดสินค้า</div>
          <div className=" font-light space-y-4 mt-4">
            <div>{product?.product?.detail}</div>

            <div>ราคา {product_price} เหรียญ</div>
          </div>
        </div>
        <div className="  bg-bgcareerblog bg-opacity-30 text-xl rounded-xl p-4 flex flex-col justify-between ">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className=" text-textdarkgreen ">ราคาหน่วยบาท</div>
              <div className="font-light text-textgray text-right">
                {product_price} บาท / {product?.product?.unit}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className=" text-textdarkgreen ">รหัสสินค้า </div>
              <div className="font-light text-textgray">
                {product?.product?.code}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className=" text-textdarkgreen ">ราคา </div>
              <div className="font-light text-textgray">
                {product_price} / {product?.product?.unit}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="">
                <div className="flex justify-start items-center  text-textpink ">
                  <img className="w-8 h-8 mr-4" src="../icon/coin.png" />
                  {product_price * count}
                </div>
              </div>
              <div className="text-textgray flex justify-center items-center space-x-1.5">
                <button
                  disabled={count > 0}
                  onClick={() => setCount(count > 0 ? count - 1 : count)}
                  className={classNames(
                    " text-white w-14 h-7  flex justify-center items-center rounded",
                    {
                      "bg-gray-400 cursor-not-allowed": !user || count > 0,
                      "bg-textdarkgreen cursor-pointer": user && count !== 0,
                    }
                  )}
                >
                  -
                </button>
                <div className=" bg-white border w-14 h-7 text-base flex justify-center items-center rounded">
                  {count}
                </div>
                <button
                  disabled={!user}
                  onClick={() => setCount(count + 1)}
                  className={classNames(
                    " text-white w-14 h-7  flex justify-center items-center rounded",
                    {
                      "bg-gray-400 cursor-not-allowed": !user,
                      "bg-textdarkgreen cursor-pointer": user,
                    }
                  )}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {product_price * count > user?.coin ? (
            <div className="  bg-gray-600 text-white py-1 px-4 rounded-3xl  flex justify-center items-center  ">
              เงินของท่านไม่พอ
            </div>
          ) : (
            <div>
              {count > 0 ? (
                <div
                  onClick={() =>
                    onAddProduct({
                      name: product?.product?.name,
                      code: product?.product?.code,
                      coin: product_price,
                      unit: product?.product?.unit,
                      count: count,
                      product: product?.product?._id,
                    })
                  }
                  className={
                    "mt-8 mb-4 bg-textdarkgreen text-white py-1 px-4 rounded-3xl  flex justify-center items-center cursor-pointer  "
                  }
                >
                  Add to basket
                </div>
              ) : (
                <div className="mt-8 mb-4 bg-gray-400 text-white py-1 px-4 rounded-3xl  flex justify-center items-center cursor-not-allowed ">
                  Add to basket
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default withRouter(product);
