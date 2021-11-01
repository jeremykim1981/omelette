import React, { useState, memo } from "react";
import AboutCoin from "../../components/MainPage/AboutCoin";
import News from "../../components/MainPage/News";
import { useRouter } from "next/router";
const People = memo(({ name = "", image = "", position = "" }) => {
  return (
    <div className="">
      <div className="flex flex-col  justify-center items-center">
        <img
          className="md:w-32 md:h-32 w-20 h-20 object-cover rounded-full"
          src={image}
        ></img>
        <div className="flex flex-col text-sm md:text-base justify-center items-center font-light space-y-1 mt-2">
          <div>{name}</div>
          <div className="text-textgray">{position}</div>
        </div>
      </div>
    </div>
  );
});
const Team = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className="text-3xl flex justify-center items-center">
        We are Rakjang farm
      </div>
      <div className="grid grid-cols-3 gap-6 mt-20">
        <People
          name="นายสุขใจ จิตใจดี"
          image="../icon/user.png"
          position="กรรมการ"
        />
        <div className="-mt-10">
          <People
            name="นายสุขใจ จิตใจดี"
            image="../icon/user.png"
            position="กรรมการ"
          />
        </div>
        <People
          name="นายสุขใจ จิตใจดี"
          image="../icon/user.png"
          position="กรรมการ"
        />
      </div>
    </div>
  );
};

const AboutUs = () => {
  const router = useRouter();
  const onClickInvest = () => {
    localStorage.setItem("State", "Wallet");
    router.push("/Profile");
  };
  return (
    <div>
      <div className=" bg-bg-aboutushero h-xl bg-bottom relative">
        <div className="blur absolute top-6 w-1/3 rounded-3xl rounded-l-none text-white flex flex-col justify-center items-center py-20">
          <div className="text-5xl font-bold">เกี่ยวกับเรา</div>
          <div className="text-2xl mt-4">Rakjangfarm</div>
        </div>
      </div>
      <div className="px-4 md:px-8 lg:px-16 py-10">
        <div className=" flex flex-col md:flex-row justify-start   items-center md:space-x-20  lg:space-x-40">
          <div className="flex  flex-col  space-y-4 mb-4 md:mb-0 ">
            <div className="text-3xl">Rakjangfarm</div>
            <div className="flex  items-center text-textgreen">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div className="w-40">สอบถามข้อมูลเพิ่มเติม</div>
            </div>
            <a rel="noreferrer" target="_blank" href={`${"tel:0813484444"}`}> <div className=" font-medium  hover:underline cursor-pointer">081-348-4444</div></a>
          </div>
          <div className="text-textgray text-center md:text-left lg:w-2/3 ">
            <div> รักจังฟาร์ม อำเภอวังน้ำเขียว จังหวัดนครราชสีมา</div>
            ถือได้ว่าเป็นหนึ่งในวิสาหกิจชุมชนต้นแบบที่มีพื้นที่ปลูกกัญชาเพื่อเรียนรู้รูปแบบการปลูกตลอดจนเทคนิคการปลูกเพื่อแปรรูปเป็นผลิตภัณฑ์จากกัญชาที่เหมาะสมและมีประสิทธิภาพ
            และยังพัฒนาให้เป็นแหล่งท่องเที่ยวกัญชาครบวงจร ทั้งการดูต้นกัญชา
            กัญชงของจริง การฝึกอบรม การให้ความรู้และพัฒนาผลิตภัณฑ์
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
          <div>
            <img
              className="h-full w-full object-cover"
              src="../coin/1.jpg"
            ></img>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <img
              className="h-auto w-full object-cover"
              src="../coin/2.jpg"
            ></img>
            <img
              className="h-auto w-full object-cover"
              src="../coin/3.jpg"
            ></img>
          </div>
          <div>
            <img
              className="h-full w-full object-cover"
              src="../coin/4.jpg"
            ></img>
          </div>
        </div>
      </div>
      <div>
        <AboutCoin onClickInvest={onClickInvest} />
      </div>
      <div>
        <News />
      </div>
      <div>
        <Team />
      </div>
    </div>
  );
};
export default AboutUs;
