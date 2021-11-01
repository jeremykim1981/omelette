import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import React, { useState, Fragment, useEffect, useContext } from "react";
import Drawer from "react-modern-drawer";
import { Popover, Transition } from "@headlessui/react";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import { initializeApp } from "../../_redux/initializeAppSlice";
import ShoppingCart from "./ShoppingCart";
import { CartContext } from "../../context/CartContext";
import BellNoti from "./BellNoti";
import { updateNotiProfile, updateProfile } from "../../api/profile";

const NavbarHead = ({ setIsOpen, isOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [clickNoti, setClickNoti] = useState(false);
  const [illusion, setIllusion] = useState(false);

  const { user, status } = useSelector((state) => state.initializeApp);
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    dispatch(initializeApp());
  }, [router]);

  const routeSignIn = () => {
    router.push("/login");
  };

  const onLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const onRefreshCoin = () => {
    dispatch(initializeApp());
  };

  const onClickNotification = async () => {
    setClickNoti(!clickNoti);
    if (user?.unread === true) {
      try {
        await updateNotiProfile(user?.id, {
          unread: false,
        });
      } catch (error) {
        console.log("ERROR UPDATE NOIT : ", error);
      }
    }
    setIllusion(true);
  };

  return (
    <div className="bg-white border-b z-20  py-4 text-xs md:text-base   flex justify-end items-end px-4 md:px-8 lg:px-16 ">
      {status === "loading" ? (
        <Skeleton width="40%" height="10%" />
      ) : !user ? (
        <button
          className="flex items-center cursor-pointer  bg-textdarkgreen text-white px-4 py-2 rounded"
          onClick={routeSignIn}
        >
          Sign In
        </button>
      ) : (
        <React.Fragment>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center mr-8 cursor-pointer   "
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-textgray mr-2 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="text-textdarkgreen hover:underline  focus:text-textdarkgreen mr-2 hidden md:flex "
            >
              My basket
            </div>
            <div className="bg-textgreen rounded-full w-5 h-5 md:w-6 md:h-6 flex justify-center items-center text-white">
              {cartItems?.length > 0 ? cartItems?.length : 0}
            </div>
          </div>
          <div className="flex items-center mr-8 cursor-pointer">
            <img
              className="w-5 h-5 md:w-6 md:h-6 mr-2"
              src="../icon/coin.png"
            />
            <div
              onClick={() => {
                router.push("/Profile");
              }}
              className="text-textdarkgreen mr-2 hidden md:flex  hover:underline  focus:text-textdarkgreen "
            >
              My coin :
            </div>
            <div className="   flex justify-center items-center text-textdarkgreen">
              {user?.coin}
              <button className="ml-2 bg-transparent" onClick={onRefreshCoin}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center cursor-pointer mr-4  ">
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-textgray mr-2 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={"text-textdarkgreen line-clamp-1 "}
                  >
                    <div className="text-textdarkgreen line-clamp-1 ">
                      {user.first_name + " " + user.last_name}
                    </div>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 top-7 right-0">
                      <div className=" rounded shadow  py-2 grid grid-cols-1 bg-white w-48 space-y-2 text-textdarkgreen">
                        <div className=" hover:underline  cursor-pointer  mx-auto  ">
                          <Link href="/Profile">Profile</Link>
                        </div>
                        <div className="border-b"></div>
                        <div className="hover:underline cursor-pointer px-3 mx-auto">
                          <div onClick={onLogout}>Logout</div>
                        </div>
                      </div>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </React.Fragment>
      )}
      {user && (
        <div className="relative">
          <svg
            onClick={() => onClickNotification()}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          {user?.unread && illusion ? (
            <div className="absolute bottom-0 right-0 text-xs text-white m-auto   flex justify-center items-center  bg-red-600 w-2 h-2 rounded-full" />
          ) : (
            <div></div>
          )}
        </div>
      )}
      <BellNoti clickNoti={clickNoti} setClickNoti={setClickNoti} />
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const toggleDrawerCart = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className=" fixed z-20 w-full   max-w-screen-2xl     ">
      <ShoppingCart toggleDrawer={toggleDrawerCart} isOpen={isOpen} />
      <Drawer open={open} onClose={toggleDrawer} size={380} direction="right">
        <div className="  text-center  text-xl  mx-auto  relative  ">
          <svg
            onClick={toggleDrawer}
            className="w-6 h-6 left-5 top-4.5 absolute cursor-pointer    text-textlogingreen"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="flex flex-col justify-between  h-90vh">
            <div className="space-y-10 ">
              <Link href="/">
                <div className=" text-textlogingreen uppercase cursor-pointer font-semibold  ">
                  Rakjangfarm
                </div>
              </Link>
              <Link href="/">
                <div className="cursor-pointer text-textdarkgreen            ">
                  Home
                </div>
              </Link>
              {/* <div className="border-b w-full"></div> */}
              <Link href="/Invest">
                <div className="cursor-pointer  text-textdarkgreen focus:text-textgreen ">
                  Invest
                </div>
              </Link>
              <Link href="/Product">
                <div className="cursor-pointer  text-textdarkgreen focus:text-textgreen ">
                  Product
                </div>
              </Link>

              <Link href="/Career">
                <div className=" cursor-pointer  text-textdarkgreen focus:text-textgreen ">
                  Career
                </div>
              </Link>
              <Link href="/AboutUs">
                <div className="cursor-pointer  text-textdarkgreen focus:text-textgreen ">
                  About us
                </div>
              </Link>
              <Link href="/Contact">
                <div
                  onFocus="bg-red-500"
                  className="cursor-pointer  text-textdarkgreen focus:text-textgreen "
                >
                  Contact Us
                </div>
              </Link>
            </div>
            <div className=" text-base font-light flex flex-col justify-start items-start px-8     text-textgray">
              <div>หากพบเห็นปัญหาสามารถติดต่อได้ที่</div>
              <a rel="noreferrer" target="_blank" href={`${"tel:0813484444"}`}>
                <div className="">
                  Tel :
                  <span className="ml-2   hover:underline">081 348 4444</span>
                </div>
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                href="mailto:3792397@gmail.com"
              >
                {" "}
                <div className="">
                  E-mail :{" "}
                  <span className="ml-2     hover:underline">
                    3792397@gmail.com
                  </span>
                </div>
              </a>
              {/* <a
                rel="noreferrer"
                target="_blank"
                href="https://www.google.com/maps/place/Sweet+melon+farm/@14.3559206,101.9232804,17z/data=!3m1!4b1!4m5!3m4!1s0x311c0d2d3210ccb1:0x181f77bec001365e!8m2!3d14.3559206!4d101.9254691"
              >
                <div className=" flex flex-col justify-start items-start">
                  <div>Address :</div>
                  <div className="hover:underline text-left">
                    เลขที่ 105 หมู่ที่ 1 ถนน ตำบลไทยสามัคคี อำเภอวังน้ำเขียว
                    จังหวัดนครราชสีมา
                  </div>
                </div>
              </a> */}
            </div>
          </div>
        </div>
      </Drawer>
      <NavbarHead setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="bg-white py-2 lg:py-0   px-4 md:px-8 lg:px-16 shadow-lg relative">
        <div className="flex justify-between lg:justify-start  items-center  ">
          <Link href="/">
            <div className="w-1/12 cursor-pointer ">
              <img className="w-full lg:w-2/3 " src="../logo/logo.png" />
            </div>
          </Link>
          {/* <div className="flex lg:hidden justify-start items-center bg-gray-100 text-textgray py-2 px-4 w-9/12 text-sm font-thin rounded-3xl">
            <svg
              className="w-6 h-6 mr-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            ลองค้นหา น้ำสลัดครีมเมล่อน
          </div> */}
          <div className="flex flex-col lg:hidden   ">
            <svg
              onClick={toggleDrawer}
              className="w-6 h-6 text-textdarkgreen"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <div className="absolute top-10 md:top-20 md:-mt-2 right-0 bg-white  w-screen  ">
              <div className="flex flex-col justify-start items-start text-sm xl:text-base   "></div>
            </div>
          </div>

          {/* // */}
          <div className="hidden lg:flex text-sm xl:text-base  ">
            <div className=" grid grid-cols-6 gap-4 xl:gap-10 text-center  mx-auto   ">
              <Link href="/">
                <div className="cursor-pointer text-textdarkgreen  hover:bg-textdarkgreen rounded-xl hover:text-white px-2 ">
                  Home
                </div>
              </Link>
              <Link href="/Invest">
                <div className="cursor-pointer text-textdarkgreen hover:bg-textdarkgreen rounded-xl hover:text-white px-2 ">
                  Invest
                </div>
              </Link>
              <Link href="/Product">
                <div className="cursor-pointer text-textdarkgreen hover:bg-textdarkgreen rounded-xl hover:text-white px-2 ">
                  Product
                </div>
              </Link>

              <Link href="/Career">
                <div className=" cursor-pointer text-textdarkgreen hover:bg-textdarkgreen rounded-xl hover:text-white px-2 ">
                  Career
                </div>
              </Link>
              <Link href="/AboutUs">
                <div className="cursor-pointer text-textdarkgreen hover:bg-textdarkgreen rounded-xl hover:text-white px-2 ">
                  About us
                </div>
              </Link>
              <Link href="/Contact">
                <div className="cursor-pointer text-textdarkgreen hover:bg-textdarkgreen rounded-xl hover:text-white px-2 ">
                  Contact Us
                </div>
              </Link>
            </div>
            {/* <div className="flex justify-start items-center bg-gray-100 text-textgray py-2 px-4 w-4/12  text-sm font-thin rounded-3xl  ">
              <svg
                className="w-4 h-4 xl:w-6 xl:h-6 mr-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              ลองค้นหา น้ำสลัดครีมเมล่อน
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
