import Header from "../Attribute/Header";
import { useQuery } from "react-query";
import { fetchProducts } from "../../api/product";
import ProductCard from "../Card/ProductCard";

//API

const ProductSession = () => {
  const { data, isLoading, error } = useQuery(
    "products",
    fetchProducts("?limit=4")
  );

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 mb-20  ">
      <Header title="Product" herf="/Product" />
      <div className="flex overflow-x-scroll space-x-4 pb-6">
        {data?.products.map((product, index) => {
          return (
            <ProductCard
              cover_image={product?.cover_image}
              name={product?.name}
              view={product?.view}
              price={product?.price}
              unit={product?.unit}
              serialnumber={product?.code}
              detail={product?.detail}
              key={index}
              id={product?._id}
              countleft={product?.amount}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ProductSession;
