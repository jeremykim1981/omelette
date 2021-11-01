import Link from "next/link";
import ShowSocial from "./ShowSocial";
const Footer = () => {
  return (
    <div className=" bg-bgbuttongreen flex flex-col md:flex-row justify-center md:justify-between items-start px-4 md:px-8 lg:px-16 py-10 mt-10 w-full">
      <div className="flex flex-col h-60 justify-between items-center mx-auto md:mx-0">
        <img className="w-40 mx-auto" src="../logo/logo.png" />
        <div>
          {/* <ShowSocial/> */}
          <div className="grid grid-cols-4 gap-4">
          <a target="_blank" rel="noreferrer" href={"https://www.facebook.com/RAKJANGFARM"} >
          <img
            className="w-auto h-8 mr-2  outline-none"
            src={"../icon/1.png"}
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={"http://line.me/ti/p/@rakjangmelonfarm "}
          
        >
          <img
            className="w-auto h-8 mr-2  outline-none"
            src={"../icon/5.png"}
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://www.youtube.com/channel/UCmcNeRfc3FO6865XhoHiptA"}
        >
          <img className="w-auto h-8 mr-2  outline-none" src={"../icon/3.png"} />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://www.instagram.com/rakjangfarm/"}
          
        >
          <img className="w-auto h-8 mr-2  outline-none rounded-full" src={"../icon/instagram.png"} />
        </a>
          </div>
          <div className="text-xs mt-4 text-white font-light">
            2021 CelestialCode Co.,Ltd. All rights reserved.
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row   md:justify-end  items-start mx-12 space-y-4 md:space-y-0 mt-4 md:mt-0 font-light ">
        <div className="grid grid-cols-1  gap-1 text-white md:mr-20  xl:mr-40">
          <div className="text-lg mb-4  font-medium  ">Quicklinks</div>
          <Link href="/">
            <div className="cursor-pointer  hover:underline ">Home</div>
          </Link>
          <Link href="/Product">
            <div className="cursor-pointer  hover:underline ">Product</div>
          </Link>

          <Link href="/Invest">
            <div className="cursor-pointer  hover:underline ">Invest</div>
          </Link>
          <Link href="/Career">
            <div className="cursor-pointer  hover:underline ">Career</div>
          </Link>
          <Link href="/AboutUs">
            <div className="cursor-pointer  hover:underline ">About us</div>
          </Link>
          <Link href="/Contact">
            <div className="cursor-pointer  hover:underline ">Contact Us</div>
          </Link>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-1 text-white">
            <div className="text-lg mb-4 font-medium">Contact Us</div>
            <a  rel="noreferrer" target="_blank" href={`${"tel:0813484444"}`}><div className="">
                Phone :<span className="ml-2   hover:underline">081 348 4444</span>
              </div></a>
              <a  rel="noreferrer" target="_blank" href="https://www.google.com/maps/place/Sweet+melon+farm/@14.3559206,101.9232804,17z/data=!3m1!4b1!4m5!3m4!1s0x311c0d2d3210ccb1:0x181f77bec001365e!8m2!3d14.3559206!4d101.9254691"><div className="w-40">
              <div>Address :</div>
              <div className="hover:underline">เลขที่ 105 หมู่ที่ 1 ถนน ตำบลไทยสามัคคี อำเภอวังน้ำเขียว
              จังหวัดนครราชสีมา</div>
            </div></a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
