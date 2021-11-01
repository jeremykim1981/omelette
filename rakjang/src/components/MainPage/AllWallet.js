import Link from "next/link";

import WalletCard from "./Card/WalletCard";

const Filter = () => {
  return (
    <div className="mt-4 flex flex-col lg:flex-row justify-between lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 ">
      <div className=" border rounded p-2 w-40 flex justify-center items-center">
        Transfer
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div className=" flex justify-between items-center space-x-4">
        <div className=" border rounded p-2 w-36  md:w-40 flex justify-center items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          1 / 08 / 2021
        </div>
        <div>TO</div>
        <div className=" border rounded p-2 w-36  md:w-40 flex justify-center items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          1 / 08 / 2021
        </div>
      </div>
      <div className=" border rounded p-2 w-40 flex justify-center items-center">
        APPROVE
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

const AllWallet = () => {
  return (
    <div className="flex flex-col  text-textgray ">
      <div className="  rounded-full w-full border flex justify-start items-start py-2 px-4 ">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <Filter />
      <div className="flex justify-end items-center mt-4 font-bold">
        ทั้งหมด 10 รายการ{" "}
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <WalletCard
          type="Transfer"
          serial="123456789"
          date="06-07-2021"
          time="22:07"
          status="APPROVE"
          name="นายสุข ไปด้วยกัญ"
          id="xxxxxxx"
          coin="- 500"
        />
        <WalletCard
          type="Witdraw"
          serial="123456789"
          date="06-07-2021"
          time="22:07"
          status="APPROVE"
          name="นายสุข ไปด้วยกัญ"
          id="xxxxxxx"
          coin="- 500"
        />
        <WalletCard
          type="Buycoin"
          serial="123456789"
          date="06-07-2021"
          time="22:07"
          status="APPROVE"
          name="นายสุข ไปด้วยกัญ"
          id="xxxxxxx"
          coin="+ 500"
        />
        <WalletCard
          type="Deposit"
          serial="123456789"
          date="06-07-2021"
          time="22:07"
          status="APPROVE"
          name="นายสุข ไปด้วยกัญ"
          id="xxxxxxx"
          coin="+ 500"
        />
      </div>
      {/* <div className="text-xl">
        "เหรียญรอบนี้ จำหน่ายหมดแล้ว กรุณารอบการเปิดขายรอบถัดไป”
      </div>
      <div className="text-textpink font-light">
        * เริ่มจำหน่ายอีกครั้งวันที่ 20 - 30 กันยายน 2021 หรือจนกว่าสินค้าจะหมด
      </div> */}
    </div>
  );
};
export default AllWallet;
