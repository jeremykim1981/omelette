import React, { useContext, useState } from "react";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import { CartContext } from "../../context/CartContext";
import ModalCart from "../../pages/Product/ModalCart";
import Detail from "./Detail";
import EmptyDetail from "./EmptyDetail";

const ShoppingCart = ({ toggleDrawer, isOpen }) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const {
    cartItems,
    increaseCount,
    decreaseCount,
    setCartItems,
    onClciktoDelete,
  } = useContext(CartContext);

  const AddProduct = () => {
    toggleDrawer();
    setOpen(true);
  };

  return (
    <div>
      {cartItems?.length > 0 && (
        <ModalCart
          cartItems={cartItems}
          setCartItems={setCartItems}
          data={cartItems}
          open={open}
          setOpen={setOpen}
          count={count}
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
          onClciktoDelete={onClciktoDelete}
        />
      )}

      <Drawer open={isOpen} onClose={toggleDrawer} size={450} direction="right">
        <div className=" relative ">
          <div>
            <svg
              onClick={toggleDrawer}
              className="w-6 h-6 absolute cursor-pointer top-1 left-4 text-textdarkgreen"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="text-2xl text-textdarkgreen text-center mt-4 font-semibold">
            ตะกร้าสินค้า
          </div>
          <div className="bg-bgbasket  h-90vh m-4 p-4  text-textdarkgreen flex flex-col justify-between  space-y-4   ">
            {cartItems?.length > 0 ? (
              <div className="  h-75vh   space-y-4  pr-6 overflow-y-scroll ">
                {cartItems?.map((row, i) => {
                  return (
                    <Detail
                      key={i}
                      count={row?.count}
                      setCount={setCount}
                      code={row?.code}
                      coin={row?.coin}
                      unit={row?.unit}
                      name={row?.name}
                      increaseCount={increaseCount}
                      decreaseCount={decreaseCount}
                      index={i}
                      onClciktoDelete={onClciktoDelete}
                    />
                  );
                })}
              </div>
            ) : (
              <EmptyDetail />
            )}
            <div className=" flex  justify-between items-center text-base">
              <div
                onClick={() => AddProduct()}
                className=" cursor-pointer text-white bg-textdarkgreen w-24 py-2 rounded-full flex justify-center items-center"
              >
                ซื้อสินค้า
              </div>
              <div
                onClick={toggleDrawer}
                className=" cursor-pointer text-white bg-red-600 w-24 py-2 rounded-full flex justify-center items-center"
              >
                ยกเลิก
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
export default ShoppingCart;
