import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { fetchProducts } from "../../api/product";
import Breadcrumb from "../../components/Attribute/BreadCrumb";
import ProductCard from "../../components/Card/ProductCard";
import classNames from "classnames";
import LoadingMutation from "../../components/Loading/LoadingMutation";

// API
import { fetchTags } from "../../api/tags";
import { fetchRate } from "../../api/rate";
import numeral from "numeral";

// const exchangeRate = 1;

const FilterTags = ({
  filter,
  setFilter,
  skip,
  setSkip,
  loadProduct,
  default_filter,
}) => {
  const { data, isLoading, error } = useQuery("tags", fetchTags());

  const [selectTag, setSelectTag] = useState();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onFilterTag = async (selectTag, index) => {
    setSelectTag(index);
    if (selectTag.name !== "ทั้งหมด") {
      const newFilter = `${default_filter}&tags=in:${selectTag.name}`;
      setFilter(newFilter);
      setSkip(0);
      await loadProduct(newFilter);
    } else {
      await loadProduct(default_filter);
    }
  };

  return (
    <div>
      <div className="flex space-x-10 py-3  mt-10 overflow-x-scroll  lg:overscroll-x-none justify-start   pb-6">
        {[{ name: "ทั้งหมด" }, ...data?.tags]?.map((tag, index) => {
          return (
            <div className=" flex-shrink-0 ">
              <button
                onClick={() => onFilterTag(tag, index)}
                className={classNames(
                  "text-sm hover:text-white hover:bg-textgreen bg-greenblog  cursor-pointer rounded-full w-20 border border-textgreen text-textgreen  flex justify-center items-center bg-opacity-30",
                  {
                    "bg-textgreen": selectTag === index,
                  }
                )}
              >
                {tag.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Product = () => {
  const limit = 15;
  const default_filter = `?limit=${limit}`;

  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = useState(default_filter);

  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    data: dataExchangeRate,
    isLoading: isLoadingExchangeRate,
    error: errorExchangeRate,
  } = useQuery("rate", fetchRate);

  const exchangeRate = dataExchangeRate?.exchange_rate;

  useEffect(() => {
    loadProduct(filter);
  }, []);

  const loadProduct = async (newFilter) => {
    try {
      setLoading(true);
      const { products } = await fetchProducts(newFilter)();
      setProducts(products);
    } catch (error) {
      setError(true);
      console.log("Load product error", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const newSkip = `skip=${skip + limit}`;
      const newFilter = `${filter}&${newSkip}`;
      const { products } = await fetchProducts(newFilter)();

      if (products.length) {
        setProducts((prev) => [...prev, ...products]);
      }
    } catch (error) {
      console.log("load more error", error);
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      <div className="flex justify-center items-center flex-col">
        <div className="text-3xl  text-textdarkgreen font-bold">
          Welcome to your smart agriculture marketplace
        </div>
        {/* <div className="md:w-2/3 text-center mt-4 text-textgray">
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..."
          <div>
            "There is no one who loves pain itself, who seeks after it and wants
            to have it, simply because it is pain..."
          </div>
        </div> */}
      </div>
      <div className="flex justify-between items-center mt-10">
        <Breadcrumb first="Product" />
        <div className="textlinear text-sm md:text-base">
          ทั้งหมด {products?.length || 0} รายการ
        </div>
      </div>
      <FilterTags
        default_filter={default_filter}
        loadProduct={loadProduct}
        setFilter={setFilter}
        filter={filter}
        skip={skip}
        setSkip={setSkip}
      />
      <div className="grid md:grid-cols-2  xl:grid-cols-4 gap-10 mt-10">
        {loading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product, index) => {
            return (
              <ProductCard
                key={index}
                id={product?._id}
                baht={`${numeral(
                  Number(product?.price.replaceAll(",", "")) * exchangeRate
                ).format("0,0")} บาท`}
                name={product?.name}
                price={product?.price}
                unit={product?.unit}
                serialnumber={product?.code}
                detail={product?.detail}
                cover_image={[product?.cover_image]}
                countleft={product?.amount}
                view={product?.view}
              />
            );
          })
        )}
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={loadMore}
          disabled={loadingMore}
          className={classNames(
            "px-4 py-3 flex items-center text-white focus:outline-none outline-none duration-300 transition-all rounded-md shadow",
            {
              "bg-gray-400 cursor-not-allowed": loadingMore,
              "bg-green-500 cursor-pointer": !loadingMore,
            }
          )}
        >
          {loadingMore && <LoadingMutation />} Load more
        </button>
      </div>
    </div>
  );
};
export default Product;
