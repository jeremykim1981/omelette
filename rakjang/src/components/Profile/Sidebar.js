import { S3Image } from "aws-amplify-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Sidebar({ pages, setPages }) {
  const { user, status } = useSelector((state) => state.initializeApp);

  return (
    <div className="lg:w-2/6 xl:w-1/6 grid grid-cols-2 md:grid-cols-4 lg:flex   lg:flex-col  lg:justify-start lg:items-start items-center gap-4 mx-auto lg:mx-0 lg:space-y-4 mb-4 lg:mb-0">
      <div className=" hidden lg:flex  justify-start items-center">
        {/* <img className="w-14 mr-4" src="../icon/user.png" /> */}
        {/* {user.cover_image ? (
          <img className="w-14 mr-4 rounded-full" src="../icon/user.png" />
        ) : (
          <S3Image
            className="w-14 mr-4 rounded-full"
            imgKey={user?.cover_image}
          />
        )} */}
        {/* <div className=" flex">{user?.first_name + " " + user?.last_name}</div> */}
      </div>
      <div
        onClick={() => {
          localStorage.removeItem("State");

          setPages("Account");
        }}
        className={`${pages === "Account" ? " text-textdarkgreen " : ""} " flex  justify-start items-center cursor-pointer hover:text-textlogingreen focus:text-textlogingreen "`}
      >
        <svg
          className="w-6 h-6 mr-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <div>บัญชีของฉัน</div>
      </div>
      <div
        onClick={() => {
          localStorage.removeItem("State");
          setPages("History");
        }}
        className={`${pages === "History" ? " text-textdarkgreen " : ""} " flex  justify-start items-center cursor-pointer hover:text-textlogingreen focus:text-textlogingreen "`}
      >
        <svg
          className="w-6 h-6 mr-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <div>History</div>
      </div>
      <div
        onClick={() => {
          localStorage.removeItem("State");
          setPages("Wallet");
        }}
        className={`${pages === "Wallet" ? " text-textdarkgreen " : ""} " flex  justify-start items-center cursor-pointer hover:text-textlogingreen focus:text-textlogingreen "`}
      >
        <img className="w-6 mr-4" src="../icon/coin.png" />
        <div>RJC Coin</div>
      </div>
      <div
        onClick={() => {
          localStorage.removeItem("State");
          setPages("Port");
        }}
        className={`${pages === "Port" ? " text-textdarkgreen " : ""} " flex  justify-start items-center cursor-pointer hover:text-textlogingreen focus:text-textlogingreen "`}
      >
        <svg
          className="w-6 h-6 mr-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <div>Portfolio</div>
      </div>
    </div>
  );
}

export default Sidebar;
