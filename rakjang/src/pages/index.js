import "react-multi-carousel/lib/styles.css";
import { checkParthName, openInNewTab } from "../function/functions";
import React, { useState, memo, useEffect } from "react";
import Link from "next/link";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { initializeApp } from "../_redux/initializeAppSlice";

import { useQuery } from "react-query";

// AWS
import { Storage } from "aws-amplify";

// COMPONENT
import InvestSession from "../components/Main/InvestSession";
import ProductSession from "../components/Main/ProductSession";
import { fetchBanners } from "../api/banner";
import { useRouter } from "next/router";
import AboutCoin from "../components/MainPage/AboutCoin";
import Channel from "../components/MainPage/Channel";
import News from "../components/MainPage/News";
import Gallery from "../components/MainPage/Gallery";
import BlogSession from "../components/Main/BlogSession";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "react-toastify";



const zoomOutProperties = {
  indicators: true,
  scale: 0.4,
  duration: 3000,
  canSwipe: true,
  indicators: (i) => <div className="indicator rounded-full"></div>,


  prevArrow: <div className="text-white  absolute   bg-black  rounded-full bg-opacity-50 left-4 cursor-pointer " ></div>,
  nextArrow: <div className="text-white  absolute  bg-black  rounded-full bg-opacity-50 right-4 cursor-pointer " ></div>,
};



const Slideshow = ({ onClickInvest }) => {
  const { data, isLoading, error } = useQuery("banners", fetchBanners);

  const [newData, setNewData] = useState({ banners: [] });

  useEffect(() => {
    if (!data) return;
    prePareData();
  }, [data]);

  const prePareData = async () => {
    setNewData({
      banners: await Promise.all(
        data.banners.map(async (banner) => {
          return {
            ...banner,
            image: await Storage.get(banner.image),
          };
        })
      ),
    });
  };

  return (
    <div className=" ">
      <Slide  {...zoomOutProperties} >
        {newData?.banners?.length > 0 &&
          newData?.banners?.map((row, i) => {
            const image = row?.image;
            return (
              <div
                onClick={
                  row?.link
                    ? () => openInNewTab(row?.link)
                    : () => onClickInvest()
                }
                key={i}
                className="each-slide "
              >
                <div key={i}>
                  <img
                    className=" w-full  h-cardbg object-cover "
                    key={i}
                    src={image}
                  />
                </div>
              </div>
            );
          })}
      </Slide>
    </div>
  );
};

const Catagory = memo(({ name, image }) => {
  return (
   
      <div className=" w-28 md:w-full mb-10 md:my-0   text-textlightgray flex-shrink-0 mr-4 md:mr-0 flex flex-col justify-center text-xs md:text-base items-center  font-sans font-medium ">
        <img
          className="w-14 md:w-16 rounded-full   object-cover h-auto mx-auto mb-4 "
          src={image}
        />
        <div className=" text-center">{name}</div>
      </div>
    
  );
});

const Seccion = memo(() => {
  return (
    <div className="bglinearsecsion grid grid-cols-1 md:grid-cols-2 my-10 px-4 md:px-8 lg:px-16">
      <div>
        <img
          className="w-full h-full object-contain"
          src="../seccion/seccion1.png"
        />
      </div>
      <div className=" text-textgray xl:w-2/3 my-10 mx-auto">
        <div className=" text-4xl mb-10 text-textdarkgray text-center md:text-left ">
          Let’s Build Something Great Together
        </div>
        <div className=" text-textgraysec font-light ">
          Semaj Africa is an online education platform that delivers video
          courses, programs and resources for Individual, Advertising & Media
          Specialist, Online Marketing Professionals, Freelancers and anyone
          looking to pursue a career in digital marketing, Accounting, Web
          development, Programming. Multimedia and CAD design.
        </div>
        <div className=" bg-bgbuttongreen text-white py-2 px-4 rounded-3xl mt-10 flex justify-center items-center cursor-pointer ">
          Live Streaming Our Farm On Facebook
        </div>
      </div>
    </div>
  );
});

const Detail = memo(({ name, image }) => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className=" text-textdarkgreen text-3xl text-center">
        Rakjangfarm rewards you simply for buying trees
      </div>
      <div className="text-textgray text-center mt-4 md:w-3/5 mx-auto">
        And not with just a pat on the back. We reward you financially. It's all
        about how your tree contributes to a sustainable future over its
        lifetime.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
        <div className="flex flex-col justify-start items-center">
          <img className="w-1/3 h-32 object-contain" src="../icon/icon1.png" />
          <div className="text-textdarkgreen text-lg  font-medium mt-4 ">
            A carbon sink for the climate
          </div>
          <div className=" text-textgray text-center font-light mt-2 md:w-2/3 lg:w-full ">
            Forests are brilliant. The forests we have need preservation. And we
            need more forests to capture carbon and combat climate change.
          </div>
        </div>
        <div className="flex flex-col justify-start items-center">
          <img className="w-1/3 h-32 object-contain" src="../icon/icon2.png" />
          <div className="text-textdarkgreen text-lg  font-medium mt-4 ">
            A haven for plants & animals
          </div>
          <div className=" text-textgray text-center font-light mt-2 md:w-2/3 lg:w-full">
            Biodiversity is at the heart of our forestry. Your trees grow over a
            lifetime in vibrant ecosystems where wildlife thrives.
          </div>
        </div>
        <div className="flex flex-col justify-start items-center">
          <img className="w-3/5 h-32 object-contain" src="../icon/icon3.jpg" />
          <div className="text-textdarkgreen text-lg  font-medium mt-4 ">
            Get profit from your tree
          </div>
          <div className=" text-textgray text-center font-light mt-2 md:w-2/3 lg:w-full">
            Your tree can be profitable. and can be exchanged for something else
            such as rice, eggs or vegetables.
          </div>
        </div>
      </div>
      <Link href="/Invest">
        <div className=" text-textdarkgreen underline cursor-pointer text-center mt-4">
          Buy one tree or go wild and buy many
        </div>
      </Link>
    </div>
  );
});

const People = memo(({ name = "", image = "", position = "" }) => {
  return (
    <div className="">
      <div className="flex flex-col  justify-center items-center">
        <img className="w-32 h-32 object-cover rounded-full" src={image}></img>
        <div className="flex flex-col justify-center items-center font-light space-y-1 mt-2">
          <div>{name}</div>
          <div className="text-textgray">{position}</div>
        </div>
      </div>
    </div>
  );
});

const Oursteam = memo(({}) => {
  return (
    <div className="px-4 md:px-8 lg:px-16 bgourteam py-10 mb-10 ">
      <div className=" text-black text-4xl text-center">
        We are Rakjang Farm
      </div>
      <div className="text-textgray text-xl flex justify-center items-center my-3">
        ลงทุนได้กำไร เชื่อมั่นใน รักจังฟาร์ม
      </div>
      <div className=" flex flex-col  md:flex-row justify-center items-center md:space-x-20 mt-10">
        <img
          className="w-44 h-44 object-cover rounded-full mb-4 md:mb-0"
          src="../icon/user.png"
        ></img>
        <div className="lg:w-2/3 xl:w-1/3 space-y-2 ">
          <div className="text-2xl text-center">นายสมชาย มีมาก</div>
          <div className="text-lg text-textgraysec text-center ">
            ประธานวิสาหกิจชุมชน
          </div>
          <div className="text-textgray text-center  font-light">
            การลงทุนที่คุณจะมีแต่ได้กับได้ รักจังฟาร์มเรามีทีมงานคุณภาพ
            เป็นผู้ดูแลผลิตภัณฑ์และฟาร์มของเรา ผู้ลงทุนสามารถมั่นใจได้เลย
            ว่าผลิตภัณฑ์ที่ท่านลงทุนกับเรานั้น จะสร้างกำไรให้ท่านได้อย่างงดงาม
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-10">
        <People
          name="นายสุขใจ จิตใจดี"
          image="../icon/user.png"
          position="กรรมการ"
        />
        <People
          name="นายสุขใจ จิตใจดี"
          image="../icon/user.png"
          position="กรรมการ"
        />
        <People
          name="นายสุขใจ จิตใจดี"
          image="../icon/user.png"
          position="กรรมการ"
        />
        <People
          name="นายสุขใจ จิตใจดี"
          image="../icon/user.png"
          position="กรรมการ"
        />
        <People
          name="นายสุขใจ จิตใจดี"
          image="../icon/user.png"
          position="กรรมการ"
        />
        <People
          name="นายสุขใจ จิตใจดี"
          image="../icon/user.png"
          position="กรรมการ"
        />
      </div>
    </div>
  );
});

export default function Home() {
  const dispatch = useDispatch();

  const router = useRouter();
  const onClickInvest = () => {
    localStorage.setItem("State", "Wallet");
    router.push("/Profile");
  };

  const handleRouteChange = () => {
    dispatch(initializeApp());
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className=" ">
      <Slideshow onClickInvest={onClickInvest} />
      <div className="mx-4 md:mx-0">
        <div className="flex   overflow-x-scroll md:overflow-hidden md:grid md:grid-cols-5 my-10    text-textgray px-4 md:px-0  ">
          <Catagory name="Herb" image="../category/herb.png" />
          <Catagory name="Vegetable" image="../category/vegetable.png" />
          <Catagory name="Eco tree" image="../category/ecotree.png" />
          <Catagory name="Flower" image="../category/flower.png" />
          <Catagory name="Other" image="../category/other.png" />
        </div>
      </div>
      <Seccion />
      <div className="bgourteam">
        <AboutCoin onClickInvest={onClickInvest} />
      </div>

      <InvestSession />
      <ProductSession />
      <News />
      <Channel />
      <Gallery />
      <BlogSession />
      <Oursteam />
      <Detail />
    </div>
  );
}
