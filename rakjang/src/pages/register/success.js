import Lottie from "react-lottie";
import animationData from "../../../public/64787-success.json";

const CelesLottie = () => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        isStopped: false,
        isPaused: false,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      className="w-auto h-auto  "
    />
  );
};
const success = () => {
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center loginblog max-w-md mx-4 md:mx-auto border-textlogingreen border border-separate border-opacity-10  mt-10 p-6 space-y-4  ">
        <div className=" font-bold text-2xl   text-textlogingreen">
          ยืนยันตัวตนสำเร็จ
        </div>
        <div className="w-2/3 mx-auto">
          <CelesLottie />
        </div>
        {/* <img className="w-32" src="../icon/verify.png" /> */}
        <div className="  font-normal  text-center   text-textgray">
          รักจังฟาร์ม ยินดีต้อนรับ
          <div>เข้าสู่ระบบเพื่อชมฟาร์ม</div>
        </div>

        <div className="w-80 text-white bg-textlogingreen rounded-md py-2 flex justify-center items-center">
          เข้าสู่ระบบ
        </div>
      </div>
    </div>
  );
};
export default success;
