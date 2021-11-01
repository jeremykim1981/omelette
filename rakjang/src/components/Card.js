import Link from "next/link";
const Card = () => {
  return (
    <Link href="/Invest/investBlog">
      <div className="w-80  md:w-80 xl:w-auto  relative rounded-lg mr-14 md:mr-0 flex-shrink-0 mx-auto cursor-pointer    ">
        <div className=" bg-gray-100 rounded-lg z-40 relative  w-95% mb-6 mt-6    ">
          <div className="bg-white text-xs  text-white bg-opacity-40 rounded-lg p-1 right-0 rounded-b-none  rounded-tl-none flex justify-center items-center absolute ">
            {/* <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg> */}
            200 left
          </div>
          <img
            className="w-full h-52 object-cover rounded-t-lg "
            src="../card/card.jpg"
          />
          <div className=" p-4 grid grid-cols-1 gap-2 ">
            <div className=" flex justify-between  items-start ">
              <div className="  text-textdarkgreen ">
                Cannabis sativa (Colorado)
              </div>
              <div className="">
                <div className=" flex   justify-end   items-end ">
                  <img className="w-6 h-6 mr-4" src="../icon/coin.png" />
                  <div className="text-textpink">100 </div>
                </div>
                <div className=" text-textgray text-xs font-light text-right w-20">
                  ราคาลงทุน / ต้น
                </div>
              </div>
            </div>
            <div className="text-sm text-textgraysec">
              <div className="flex justify-between items-center">
                <div>รหัสสินค้า </div>
                <div className="font-light">12345A</div>
              </div>
            </div>
            <div className="text-sm text-textgraysec">
              <div className="flex justify-between items-center">
                <div>ระยะเวลาการลงทุน </div>
                <div className="font-light">45 สัปดาห์</div>
              </div>
            </div>
            <div className="text-sm text-textgraysec">
              <div className="flex justify-between items-center">
                <div>ผลตอบแทน </div>
                <div>
                  <div className=" flex flex-col justify-end items-end">
                    <div className=" flex   justify-end   items-center ">
                      {/* <img className="w-4 h-4 mr-2" src="../icon/coin.png" /> */}
                      <div className="text-textgray">150</div>
                    </div>
                    <div className=" text-textgray text-xs font-light">
                      บาท / ต้น
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-textgray">คำอธิบาย</div>
            <div className=" font-light text-xs text-textgray  line-clamp-3 ">
              ซาติวามีลำต้นหนา ความสูงเมื่อเติบโตเต็มที่ประมาณ 6 เมตร ใบยาว
              เรียว สีเขียวอ่อน ชอบแดดและ อากาศร้อน ซาติวามีสาร THC
              (Tetrahydrocannabinol) ที่ออกฤทธิ์กระตุ้นประสาท
            </div>
            <div className=" addtobasketbutton text-white py-1 px-4 rounded-3xl  flex justify-center items-center cursor-pointer xl:w-2/3 mx-auto ">
              Buy
            </div>
          </div>
        </div>
        <div className="decoratecard w-64 h-card absolute top-0 left-0 ml-14         "></div>
      </div>
    </Link>
  );
};
export default Card;
