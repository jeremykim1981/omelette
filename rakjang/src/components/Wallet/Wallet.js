import { useState } from "react";

// COMPONENT
import Deposit from "./Deposit";
import Witdraw from "./Withdraw";
import Transfer from "./Transfer";
import BuyCoin from "./BuyCoin";
import All from "./WalletAll";
import Nav from "./Nav";

const Wallet = ({
  navs,
  setNavs,
  setPages,
  phone_number,
  username,
  coins,
  wallet_id,
}) => {
  return (
    <div>
      <Nav
        navs={navs}
        setNavs={setNavs}
        phone_number={phone_number}
        username={username}
        coins={coins}
        wallet_id={wallet_id}
      />
      {/* {navs === "All" && <All />} */}
      {navs === "Transfer" && (
        <Transfer my_phone_number={phone_number} coins={coins} />
      )}
      {navs === "Witdraw" && <Witdraw wallet_id={wallet_id} />}
      {navs === "BuyCoin" && <BuyCoin setPages={setPages} />}
      {/* {navs === "Deposit" && <Deposit />} */}
    </div>
  );
};
export default Wallet;
