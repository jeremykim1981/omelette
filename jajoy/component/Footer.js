import { useRouter } from "next/router";
import Link from "next/link";
// import { getPathUrl } from "../utils/getPathUrl";

const Footer = () => {
  const router = useRouter();
  // if (router.pathname === "/login") return null;
  return (
    <div className="  ">
      <div className="   bg-brownnav text-white   py-10 p-4 md:p-0 md:pl-8 xl:pl-24 2xl:pl-60   md:pr-10   ">
        <div className="flex flex-col lg:flex-row lg:gap-4 2xl:gap-10 lg:flex-nowrap justify-between items-center  ">
          <Link href={`/`}>
            <div className="inline-block mx-auto lg:mx-0 text-3xl font-semibold leading-none cursor-pointer">
              <div className="mx-auto w-full h-full flex justify-center items-center     ">
                <img
                  className="h-40   "
                  src="../icon/AW Jajoin.co(white).png"
                ></img>
              </div>
              {/* <img
              className="w-auto h-32  2xl:h-42    justify-center flex items-center mx-auto lg:mx-0  outline-none"
              // src={location logo}
            /> */}
            </div>
          </Link>

          <div className="flex flex-col lg:flex-row lg:gap-10 xl:gap-32 2xl:gap-48   rounded-xl p-8 mt-10 2xl:mt-16 xl:mr-16 2xl:mr-48    ">
            <div className=" font-Times flex  flex-col  text-gold font-semibold text-center lg:text-left  text-lg   ">
              Location
              <div className="text-sm mt-3  font-normal    lg:w-56 ">
                GLOWON IDEA ACWORK
                <div className="mt-2">
                  168/22 ซอย1 โครงการพลีโน่พหลโยธิน-วัชรพล2 แขวง คลองถนน
                  เขตสายไหม กรุงเทพมหานคร 10220
                </div>
              </div>
            </div>

            <div className=" font-Times  flex flex-col text-gold font-semibold mt-4 md:mt-0  text-lg  text-center lg:text-left">
              CONTACT US
              <div className="text-sm mt-3  ">
                <a target="_blank" href=" tel: 083-935-4424">
                  <p className=" cursor-pointer ">Tel: 083-935-4424</p>
                </a>
                <a target="_blank" href="mailto:thanthon868@gmail.com">
                  <p className="">E-mail: thanthon868@gmail.com </p>
                </a>
                <div className="flex justify-center lg:justify-start  gap-4 items-center mt-4">
                  <div>
                    <a href="#" target="_blank" className="cursor-pointer">
                      <img
                        className="w-6 h-6 rounded mr-2 "
                        src="../icon/line.svg"
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      className="cursor-pointer"
                      href="https://www.facebook.com/Jajoinco-107657968179063"
                      target="_blank"
                    >
                      <img
                        className="w-6 h-6 rounded mr-2 "
                        src="../icon/facebook.svg"
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      className="cursor-pointer"
                      href="https://www.instagram.com/jajoin.co/"
                      target="_blank"
                    >
                      <img
                        className=" bg-white w-6 h-6 rounded-lg mr-2 "
                        src="../icon/instagram.svg"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  flex-col-reverse gap-4  lg:flex-row  items-center  lg:items-end lg:justify-between  py-10">
          <p className="text-xs  ">2020 JaJoin Co . All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
