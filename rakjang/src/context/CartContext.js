import React, { createContext, useEffect, useState } from "react";

const Storage = (cartItems) => {
  sessionStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const increaseCount = (count, index) => {
    setCartItems((current) => {
      const temp = [...current];
      temp[index].count = count + 1;

      Storage([...temp]);
      return [...temp];
    });
  };

  const decreaseCount = (count, index) => {
    setCartItems((current) => {
      const temp = [...current];
      temp[index].count = count - 1;

      Storage([...temp]);
      return [...temp];
    });
  };

  const addProduct = (data) => {
    // setCartItems(cartItems.concat({ ...data }))

    let temp = [...cartItems];
    const findItem = temp?.findIndex((item) => item.name === data.name);
    if (findItem >= 0) {
      temp[findItem].count += data.count;
      setCartItems(temp);
      Storage(temp);
    } else {
      setCartItems(cartItems.concat({ ...data }));
      Storage(cartItems.concat({ ...data }));
    }
  };

  const onClciktoDelete = (index) => {
    setCartItems((current) => current.filter((item, i) => i !== index));
    Storage(cartItems.filter((item, i) => i !== index));
  };

  useEffect(() => {
    const storage = sessionStorage.getItem("cart")
      ? JSON.parse(sessionStorage.getItem("cart"))
      : [];
    setCartItems(storage);
  }, []);

  const contextValues = {
    cartItems,
    setCartItems,
    addProduct,
    increaseCount,
    decreaseCount,
    onClciktoDelete,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
