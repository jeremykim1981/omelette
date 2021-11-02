import { useState, createContext, useEffect } from "react";

// create context
const AppContext = createContext({});

// context provider
const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(async () => {
    setUser({
      userName: localStorage.getItem("userName"),
      uid: localStorage.getItem("uid"),
      roleName: localStorage.getItem("roleName"),
    });
  }, [localStorage]);

  const value = { user, setUser };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
