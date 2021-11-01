import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { transferCoin, exchangeCoin } from "../../api/otps";
import { useDispatch } from "react-redux";
import OtpInput from "react-otp-input";
import { initializeApp } from "../../_redux/initializeAppSlice";
import SwalAlert from "../../event/SwalAlert";
import { createInvestContract } from "../../api/invest_contract";
import { useRouter } from "next/router";
import LoadingMutation from "../../components/Loading/LoadingMutation";

const OtpRakjang = ({
  otp,
  username,
  count,
  setOtp,
  setOpen,
  clearData,
  otp_type,
  data = { crypto_wallet: "" },
}) => {
  const dispatch = useDispatch();

  console.log("data", data);
  const router = useRouter();
  const { user } = useSelector((state) => state.initializeApp);

  const [loading, setLoading] = useState(false);

  const goToPortfolio = () => {
    localStorage.setItem("State", "Port");
    router.push("/Profile");
  };

  useEffect(async () => {
    if (otp.length === 6) {
      switch (otp_type) {
        case "TRANSFER":
          await otpTransfer();
          break;
        case "INVEST":
          await otpInvest();
          break;
        case "EXCHANGE":
          await otpExchange();
          break;
        default:
          break;
      }
    }
  }, [otp]);

  const otpExchange = async () => {
    try {
      setLoading(true);
      await exchangeCoin({
        transection: "SPENDING",
        crypto_wallet: data.crypto_wallet,
        phone_number: user.phone_number,
        random_number: otp,
        profileId: user.id,
        coins: Number(count),
      });
      await SwalAlert.Success({
        text: "เราได้รับคำขอของคุณแล้ว กำลังดำเนินการให้เร็วที่สุด",
      });
      dispatch(initializeApp());
      setOtp("");
      setOpen(false);
      clearData();
    } catch (error) {
      await SwalAlert.Fail({ text: error?.message });
      setOtp("");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const otpTransfer = async () => {
    try {
      setLoading(true);
      await transferCoin({
        // phone_number: data.my_phone_number,
        phone_number: user.phone_number,
        random_number: otp,
        profileId: user.id,
        username: username,
        coins: Number(count),
      });
      await SwalAlert.Success({
        text: "โอนเงินสำเร็จ",
        confirmButtonText: "ตกลง",
      });
      dispatch(initializeApp());
      setOpen(false);
      clearData();
    } catch (error) {
      await SwalAlert.Fail({ text: error?.response?.data?.message });
      setOtp("");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const otpInvest = async () => {
    try {
      setLoading(true);
      const formInput = {
        invest: { ...data.invest },
        phone_number: data?.phone_number,
        random_number: data?.random_number,
        multi_images: data?.multi_imagesm,
        temp_buy_type: data?.temp_buy_type,
        temp_buy_quantity: data?.temp_buy_quantity,
        temp_invest_id: data?.temp_invest_id,
        owner: user.id,
        invest_id: data?.invest?._id,
      };
      await createInvestContract(formInput);
      await SwalAlert.Success({
        text: "การลงทุนของคุณสำเร็จแล้ว",
        confirmButtonText: "ดู portforlio",
      });
      await goToPortfolio();
      router.push("/Profile");
    } catch (error) {
      console.log("JSON", JSON.stringify(error));
      await SwalAlert.Fail({ text: error?.response?.data?.message });
      if (error?.type_error === "INVEST_QUANTITY") {
        await data.refetch();
      }
      setOtp("");
      setOpen(true);
      // clearData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center  max-w-md mx-4 md:mx-auto   p-6 space-y-4  ">
      <div className=" font-bold text-2xl text-center   text-textlogingreen ">
        OTP
      </div>
      <img className="w-20" src="../icon/verify.png" />
      <div className="  font-normal text-lg md:text-xl xl:text-2xl text-center   text-textlogingreen  ">
        กรุณากรอกรหัส 6 หลัก
        <div>ที่เราส่งให้คุณทางมือถือ</div>
      </div>
      <div className="">
        <OtpInput
          isDisabled={loading}
          inputStyle="focus:outline-none border rounded     h-12 w-12 text-3xl  md:text-5xl "
          value={otp}
          onChange={(e) => setOtp(e)}
          numInputs={6}
          separator={<span className="mx-2"> </span>}
        />
      </div>
    </div>
  );
};
export default OtpRakjang;
