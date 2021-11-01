import FilterWallet from "../Filter/FilterWallet";
import WalletCard from "../Card/WalletCard";

const Deposit = () => {
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
      <FilterWallet />
      <div className="flex justify-end items-center mt-4 font-bold">
        ทั้งหมด 10 รายการ{" "}
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
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
    </div>
  );
};

export default Deposit;
