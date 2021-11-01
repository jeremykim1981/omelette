import { format } from "date-fns";
import { CelesStandardPopUp } from "../Attribute/CelesStandardPopUp";
import { useSelector } from "react-redux";
import router from "next/router";

const TwoModal = ({
  open,
  setOpen,
  id,
  code,
  coin,
  price,
  profit,
  quantity,
}) => {
  const { user } = useSelector((state) => state.initializeApp);

  const onRouteHistory = () => {
    setOpen(false);
    router.push("/Profile");
    localStorage.setItem("State", "History");
  };

  return (
    <CelesStandardPopUp
      title={""}
      hidden
      panel={
        <div className="w-full h-full    max-w-md border shadowModal rounded-xl  text-textdarkgreen ">
          <div className="m-4 flex flex-col justify-center items-center  space-y-2">
            <div className="text-2xl font-semibold  ">
              ยืนยันการเก็บเกี่ยวสำเร็จ!
            </div>
            <img className="w-32 h-auto" src="../icon/correct.png" />
            {/* <div className="text-xl font-semibold text-center">
              หมายเลขการลงทุน {id}
            </div> */}
            <div className="text-lg text-textdarkgreen ">
              คุณเลือกรับผลการลงทุนเป็นเงินสด
            </div>
            <div className=" text-textgray  font-light">
              {format(new Date(), "dd/MM/yyyy HH:mm")}
            </div>
            <div className="w-full ">
              <div className=" flex justify-between items-start   text-textdarkgreen font-semibold  ">
                <div>
                  <div>Cannabis sativa </div>
                  <div className="font-light text-xs text-textgold">{code}</div>
                </div>
                <div className="flex justify-end items-center">
                  <img className="w-6 h-6 mr-0.5" src="../icon/coin.png" />
                  {coin}
                  <span className="pl-1 text-textgray font-light">
                    ({price} บาท)
                  </span>
                </div>
              </div>
              <div className=" flex justify-between   text-textdarkgreen  ">
                <div>จำนวน</div>
                <div className="text-textgray ">x{quantity}</div>
              </div>
              <div className="border-b my-2"></div>
              <div className=" flex justify-between   text-textdarkgreen  ">
                <div>ผลตอบแทนรวม</div>
                <div className="text-textgray ">{profit} บาท</div>
              </div>
              <div className="text-textgray font-light text-xs">
                <div className="text-textdarkgreen  text-sm font-normal ">
                  รายละเอียด
                </div>
                <div>{user.first_name + " " + user.last_name}</div>
                <div>{user.phone_number}</div>
              </div>
            </div>

            <div className=" space-y-4">
              {/* <div className=" text-white cursor-pointer hover:shadow-md bg-textdarkgreen flex justify-center items-center rounded-full  py-2 w-80">
                บันทึกภาพ
              </div> */}
              <button
                onClick={onRouteHistory}
                className=" text-textdarkgreen cursor-pointer hover:shadow-md bg-white border border-textdarkgreen flex justify-center items-center rounded-full  py-2 w-80"
              >
                ประวัติการลงทุน
              </button>
            </div>
          </div>
        </div>
      }
      open={open}
      setOpen={setOpen}
    />
  );
};
export default TwoModal;
