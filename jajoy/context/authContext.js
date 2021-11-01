import React, { createContext, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const SetLocalStorageUser = (jwt, user) => {
    localStorage.setItem("accessToken", jwt);
    localStorage.setItem("uid", user.id);
    localStorage.setItem("email", user.email);
    localStorage.setItem("userName", user.username);
    localStorage.setItem("rid", user.role.id);
    localStorage.setItem("roleName", user.role.name);
    localStorage.setItem("name", user.name);
  };

  const getLocalStorageUser = () => {
    const accessToken = localStorage.getItem("accessToken");
    const uid = localStorage.getItem("uid");
    const email = localStorage.getItem("email");
    const userName = localStorage.getItem("userName");
    const rid = localStorage.getItem("rid");
    const roleName = localStorage.getItem("roleName");
    const name = localStorage.getItem("name");
    if (
      !accessToken &&
      !uid &&
      !email &&
      !userName &&
      !rid &&
      !roleName &&
      !name
    ) {
      return null;
    }
    return {
      accessToken,
      uid,
      email,
      userName,
      rid,
      roleName,
      name,
    };
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    return router.push("/login");
  };

  const value = {
    isAuth: !!user,
    user,
    setUser,
    logout,
    SetLocalStorageUser,
    getLocalStorageUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
