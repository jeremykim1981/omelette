import UnbuyCoinLottie from "../../components/Lottie/UnbuyCoinLottie"

const UnbuyCoin = () => {
    return (
        <div className="flex flex-col justify-center items-center text-textgray font-bold ">
            <div className="w-1/3 mx-auto">
                <UnbuyCoinLottie />
            </div>
            <div className="text-xl">
                "เหรียญรอบนี้ จำหน่ายหมดแล้ว กรุณารอบการเปิดขายรอบถัดไป”
            </div>
            <div className="text-textpink font-light">
                * เริ่มจำหน่ายอีกครั้งวันที่ 20 - 30 กันยายน 2021 หรือจนกว่าสินค้าจะหมด
            </div>
            {/* <button className=" flex justify-center  font-medium items-center w-80  rounded-3xl bg-yellow-500 text-white py-2 px-4 uppercase mt-6 cursor-pointer focus:outline-none">แลกเหรียญจาก crypto</button> */}
        </div>
    );
};

export default UnbuyCoin