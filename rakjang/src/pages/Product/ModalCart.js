import { memo, useEffect } from "react";
import Detail from "../../components/Layouts/Detail";
import Link from "next/link";
import numeral from "numeral";
import { useState } from "react";
import { CelesStandardPopUp } from "../../components/Attribute/CelesStandardPopUp";
import { fetchRate } from "../../api/rate";
import { useQuery } from "react-query";
import { postHistory } from "../../api/history";
import { useSelector } from "react-redux";
import { TransferDateTime } from "../../function/functions";
import { checkOutProduct } from "../../api/product";

const ModalCart = memo(
  ({
    open,
    setOpen,
    pathname,
    data,
    count,
    setCount,
    increaseCount,
    decreaseCount,
    onClciktoDelete,
    cartItems,
    setCartItems,
  }) => {
    const [radio, setRadio] = useState("front");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("");
    const [address, setAddress] = useState("");
    const [openFinish, setOpenFinish] = useState(false);
    const [dataPopUp, setDataPopUp] = useState("");
    const [popPrice, setPopPrice] = useState(0);

    const { user } = useSelector((state) => state.initializeApp);

    const { data: all_rate } = useQuery("rates", fetchRate);

    const shopping_cost = all_rate?.shipping_rate;

    useEffect(() => {
      setName(user?.first_name + " " + user?.last_name);
      setPhone(user?.phone_number);
      setAddress(user?.address);
      setZip(user?.postal_code);
    }, []);

    const all_price =
      data &&
      data?.reduce((prev, cur) => {
        const count = cur?.count;
        const price = cur?.coin;
        const result = count * price;
        return Number(result + prev);
      }, 0);

    const { transfer_date, transfer_time } = TransferDateTime();

    const onSave = async () => {
      if (!data) return;
      await setDataPopUp(cartItems);
      await setPopPrice(all_price + shopping_cost);
      await setOpenFinish(true);
      await checkOutProduct({
        coin: all_price + shopping_cost,
        history_type: "BUY_PRODUCT",
        status: "PENDING",
        me: user.id,
        title: `ซื้อสิ้นค้าเป็นจำนวนทั้งหมด ${all_price + shopping_cost} Coins`,
        transfer_date,
        transfer_time,
        transection: "SPENDING",
        products: data,
        userFullname: name || "",
        phone_number: phone || "",
        address: radio === "zip" ? address : "รับที่สวน",
      });
      await setCartItems([]);
      await sessionStorage.setItem("cart", []);
    };

    return (
      <div>
        <CelesStandardPopUp
          open={openFinish}
          setOpen={setOpenFinish}
          hidden
          panel={
            <div className="relative w-96  border shadowModal rounded-xl h-screen  max-h-bill text-textdarkgreen ">
              <div className="m-4 flex flex-col justify-center items-center  space-y-2">
                <div className="text-2xl ">ซื้อสินค้าสำเร็จ !</div>
                <img className="w-20 h-auto" src="../icon/correct.png" />
                {/* <div className="text-lg">หมายเลขการสั่งซื้อ</div> */}
                {/* <div className="text-2xl text-black">1234ABCD</div> */}
                <div className=" text-textgray  font-light">
                  {new Date().toLocaleString("th-TH")}
                </div>

                {/* <div className=" text-black">รับสินค้าที่หน้าฟาร์ม</div> */}
                <div className=" text-black">
                  {radio === "front" ? "รับหน้าฟาร์ม" : "ส่งพัสดุ"}
                </div>
                <div className="w-2/3">
                  {dataPopUp &&
                    dataPopUp?.map((row) => {
                      return (
                        <div className=" flex justify-between text-textgray  font-light  ">
                          <div>{row?.name} </div>
                          <div>x{row?.count}</div>
                        </div>
                      );
                    })}
                </div>

                <div className=" flex justify-between text-textgray  font-light w-2/3  ">
                  <div>ราคาสินค้ารวม </div>
                  <div className="flex justify-end items-center">
                    <img className="w-8 h-8 mr-4" src="../icon/coin.png" />
                    {popPrice}
                  </div>
                </div>
                <div className=" mr-auto w-4/6 mx-auto mt-2">
                  <div className="flex  justify-start flex-col items-start text-gray-900 text-sm ">
                    ที่อยู่สำหรับจัดส่ง
                  </div>
                  <div className=" text-textgray text-sm font-light">
                    {radio === "front" ? "หน้าฟาร์ม" : address}
                  </div>
                </div>
                <button
                  onClick={() => setOpenFinish(false)}
                  className="absolute bottom-4  w-11/12 bg-green-500 text-center px-4 py-2 rounded "
                >
                  ปิด
                </button>
                {/* <div className=" space-y-4">
            <div className=" text-white bg-textdarkgreen flex justify-center items-center rounded-full  py-2 w-80">
              บันทึกภาพ
            </div>
            <div className=" text-textdarkgreen bg-white border border-textdarkgreen flex justify-center items-center rounded-full  py-2 w-80">
              ประวัติการสั่งซื้อ
            </div>
            <div className=" text-textdarkgreen bg-white border border-textdarkgreen flex justify-center items-center rounded-full  py-2 w-80">
              เลือกซื้อสินค้าต่อ
            </div>
          </div> */}
              </div>
            </div>
          }
        />
        <CelesStandardPopUp
          // pathname={pathname}
          disabled={!cartItems?.length || all_price + shopping_cost > user?.coin}
          save={onSave}
          open={open}
          setOpen={setOpen}
          panel={
            <div className="">
              <div className="p-4  w-screen max-w-3xl  h-screen max-h-card mb-10 bg-white grid md:grid-cols-2 gap-4  overflow-y-scroll  ">
                <div className="bg-bgbasket p-4  rounded-lg flex flex-col justify-between ">
                  <div className=" h-96 py-2  space-y-4 pr-6 overflow-y-scroll ">
                    {data?.map((row, i) => {
                      return (
                        <Detail
                          key={i}
                          count={row?.count}
                          setCount={setCount}
                          code={row?.code}
                          coin={row?.coin}
                          unit={row?.unit}
                          increaseCount={increaseCount}
                          decreaseCount={decreaseCount}
                          onClciktoDelete={onClciktoDelete}
                          index={i}
                        />
                      );
                    })}
                  </div>
                  <div className="flex flex-col  space-y-4 font-semibold ">
                    <div className="border-b "></div>
                    <div className="flex justify-between items-center text-textdarkgreen">
                      <div>ราคาสินค้า</div>
                      <div className=" flex justify-center items-center">
                        <img className="w-8 h-8" src="../icon/coin.png" />
                        {numeral(all_price)?.format("0,0")}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-textpink">
                      <div>ราคาสินค้ารวมค่าจัดส่ง</div>
                      <div className=" flex justify-center items-center">
                        <img className="w-8 h-8" src="../icon/coin.png" />
                        {numeral(all_price + shopping_cost)?.format("0,0")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-bgbasket p-4  rounded-lg flex flex-col justify-between text-textdarkgreen">
                  <div className="mt-4">
                    <div className="mt-2 flex flex-col justify-start items-start space-y-4 ">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio border text-textdarkgreen focus:border-textdarkgreen"
                          name="accountType"
                          onChange={() => setRadio("front")}
                          checked={radio === "front"}
                        />
                        <span className="ml-2">รับสินค้าที่หน้าฟาร์ม</span>
                      </label>
                      <label className="inline-flex items-center ">
                        <input
                          type="radio"
                          className="form-radio border text-textdarkgreen focus:border-textdarkgreen"
                          name="accountType"
                          onChange={() => setRadio("zip")}
                          checked={radio === "zip"}
                        />
                        <span className="ml-2">จัดส่งสินค้าทางไปรษณีย์</span>
                      </label>
                      <div className="text-textpink text-sm">
                        *** มีค่าจัดส่งจำนวน {shopping_cost} เหรียญ
                      </div>
                    </div>
                    {radio === "zip" && (
                      <div className="mt-4 space-y-2">
                        <div>ที่อยู่สำหรับจัดส่ง</div>
                        <input
                          type="text"
                          className="border focus:outline-none rounded-full py-2 w-full px-4 text-textgray font-light text-xs "
                          placeholder="ชื่อ - นามสกุล"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="text"
                          className="border focus:outline-none rounded-full py-2 w-full px-4 text-textgray font-light text-xs "
                          placeholder="เบอร์โทรศัพท์"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />

                        <input
                          type="text"
                          className="border focus:outline-none rounded-full py-2 w-full px-4 text-textgray font-light text-xs "
                          placeholder="รายละเอียดที่อยู่"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                          type="text"
                          className="border focus:outline-none rounded-full py-2 w-full px-4 text-textgray font-light text-xs "
                          placeholder="รหัสไปรษณีย์"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className=" text-textgray text-sm font-light">
                คุณได้ตรวจสอบและยอมรับการสั่งซื้อแล้วใช่หรือไม่
              </div>
            </div>
          }
          title={
            <div className="flex flex-col justify-center items-center font-semibold text-xl text-textdarkgreen space-y-4">
              <div>ยืนยันการซื้อสินค้า</div>
            </div>
          }
        />
      </div>
    );
  }
);
export default ModalCart;
