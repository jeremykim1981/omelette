import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// REDUX
import { initializeApp } from "../_redux/initializeAppSlice";

const withAuth = (Component) => {
  return function (props) {
    const dispatch = useDispatch();
    const { user, status } = useSelector((state) => state.initializeApp);

    useEffect(async () => {
      dispatch(initializeApp());
    }, []);

    if (status === "loading" || status === "idle") {
      return <div>Loading...</div>;
    }

    if (status === "succeeded" && !user) {
      return (
        <div className="flex items-center justify-center">UnAuthenticated</div>
      );
    }

    return <Component {...props} />;
  };
};

export default withAuth;
