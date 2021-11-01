import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  memo,
  useCallback,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { getPathUrl } from "../utils/getPathUrl";
import SocketServer from "../utils/socketServer";
import {
  QUERY_COMMENT_BY_USER,
  QUERY_IMAGE,
} from "../apollo/queries/queryBlogger";
import ApolloClient from "../apollo/apolloClient";
import { timeDifference } from "../function/functions";
import Skeleton from "react-loading-skeleton";
import UPDATE_USER from "../apollo/mutation/updateCoverImage";

import gql from "graphql-tag";
import withAuth from "../hoc/withAuth";
import Emitter from "../utils/EventEmitter";

const QUERY_COUNT = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      notification_count
    }
  }
`;

const NavBar = () => {
  const router = useRouter();
  const { client } = ApolloClient();
  const [noti, setNoti] = useState(false);
  const ref = useRef();
  const { isAuth, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [count, setCount] = useState(0);
  const [clickNoti, setClickNoti] = useState(false);
  const [showComment, setShowComment] = useState(5);
  const [notiComment, setNotiCommnet] = useState("");
  const [loading, setLoading] = useState(true);
  const [notiCount, setNotiCount] = useState(0);
  const [userImage, setUserImage] = useState("");
  const amount_of_comment = notiComment?.length;

  useEffect(async () => {
    Emitter.on("new_image", async () => {
      const { data } = await client.query({
        query: QUERY_IMAGE,
        variables: {
          id: user?.uid,
        },
      });
      setUserImage(data?.user?.avatar_image?.url);
      // }
    });
    return () => {
      Emitter.off("new_image");
    };
  }, []);

  // const isRoleBlogger = user?.role === "Blogger";
  const clickViewMore = () => {
    setShowComment((prev) => prev + 5);
  };
  const isNoMoreComment = showComment >= amount_of_comment;

  useEffect(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data } = await client.query({
        query: QUERY_COMMENT_BY_USER,
        variables: {
          id: user?.uid,
        },
      });
      setNotiCommnet(data?.comments);
      const { data: noti_count } = await client.query({
        query: QUERY_COUNT,
        variables: {
          id: user?.uid,
        },
      });
      setNotiCount(noti_count?.user?.notification_count);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    SocketServer.establishSocketConnection();
    SocketServer.onNoti(onNoti);
  }, []);

  const onNoti = (data) => {
    setNoti(data);
    setCount((prev) => prev + notiCount + 1);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("rid");
    localStorage.removeItem("name");
    localStorage.removeItem("uid");
    localStorage.removeItem("userName");
    localStorage.removeItem("roleName");
    if (router.pathname === "/") {
      setShowProfileMenu(false);
      location.reload();
    } else {
      setShowProfileMenu(false);
      router.push("/");
    }
  };

  const onClickToZero = async () => {
    setNotiCount(0);
    setCount(0);
    setClickNoti(!clickNoti);
    await client.mutate({
      mutation: UPDATE_USER,
      variables: {
        input: {
          where: {
            id: user.uid,
          },
          data: {
            notification_count: 0,
          },
        },
      },
    });
  };
  const Notification = memo(() => {
    return (
      <div className=" relative md:mx-8 flex items-center">
        {notiCount > 0 ? (
          <div
            onClick={() => onClickToZero()}
            className=" cursor-pointer w-8 h-8 "
          >
            <img src="../icon/notification.png"></img>
          </div>
        ) : (
          <div
            onClick={() => setClickNoti(!clickNoti)}
            className=" cursor-pointer w-8 h-8 "
          >
            <img src="../icon/notification.png"></img>
          </div>
        )}

        {noti ? (
          <div className=" text-xs text-white m-auto   flex justify-center items-center  bg-red-600 w-5 h-5 rounded-full">
            {noti}
            {count}
          </div>
        ) : (
          [
            notiCount > 0 ? (
              <div className="absolute top-8 right-0 text-xs text-white m-auto  flex justify-center items-center  bg-red-600 w-5 h-5 rounded-full">
                {noti}
                {notiCount}
              </div>
            ) : (
              ""
            ),
          ]
        )}
      </div>
    );
  });

  const onClickProfile = () => {
    router.push(`/profiles/${user?.uid}`);
    setShowProfileMenu(false);
  };

  // STYLE
  const NavStyle =
    " my-auto text-navtext px-4   flex-shrink-0 flex  font-sans  md:text-xl cursor-pointer";
  return (
    <div>
      <div className=" bg-brownnav   h-24  items-center relative ">
        <div className="mx-auto w-full h-full flex justify-center items-center     ">
          <Link href={`/`}>
            <img
              className=" h-28 md:h-40 cursor-pointer  z-50"
              src="../icon/AW Jajoin.co(white).png"
            ></img>
          </Link>
        </div>
        <div className="absolute  top-0 flex flex-row h-full w-full ">
          <div className="mx-0 md:mx-8 lg:mx-16 flex items-center h-full w-full">
            <div className="items-center  sm:static sm:inset-auto  w-full  lg:mt-6 xl:mt-8 z-10">
              {isAuth ? (
                <div className="grid grid-cols-2 w-full">
                  <div className="flex justify-start my-auto">
                    <div className="text-blue-500  flex items-center ml-2  md:mx-6 mb-2 lg:mb-9 xl:mb-6">
                      <Link href={`/profiles/create`}>
                        <div className=" text-xs md:text-base   border flex items-center cursor-pointer  w-20 md:w-auto text-center font-sans  text-white bg-yellowtext hover:bg-green1 hover:text-yellowtext px-1 py-1 md:px-3 md:py-3 rounded-md  font-medium  xl:-mt-2">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          CREATE
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="ml-3 relative  mb-2 lg:mb-9 xl:mb-7 flex justify-end ">
                    {isAuth && <Notification />}
                    <div className="relative mr-4">
                      <button
                        className=" bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-300 focus:ring-white"
                        id="user-menu"
                        aria-haspopup="true"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                      >
                        <img
                          className=" h-10 w-10 md:h-16  md:w-16   object-cover rounded-full z-10"
                          src={
                            userImage
                              ? getPathUrl(userImage)
                              : [
                                  user?.avatar_image
                                    ? getPathUrl(user?.avatar_image?.url)
                                    : user?.image_social || "/bg/defualt.jpeg",
                                ]
                          }
                        />
                      </button>
                    </div>
                    <div
                      ref={ref}
                      className={
                        (showProfileMenu ? "" : "hidden") +
                        " origin-top-right absolute right-0 top-16 mt-4 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10"
                      }
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div>
                        <a
                          className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={() => onClickProfile()}
                        >
                          <div className="flex ">
                            <svg
                              class="w-6 h-6 my-auto"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <div className="my-auto ml-2">Profile</div>
                          </div>
                        </a>
                        <Link href={`/profiles/create`}>
                          <a
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <div className="flex">
                              <svg
                                class="w-6 h-6 my-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                ></path>
                              </svg>
                              <div className="my-auto ml-2">Write blog</div>
                            </div>
                          </a>
                        </Link>
                      </div>
                      <a
                        onClick={() => logout()}
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                        role="menuitem"
                      >
                        <div className="flex">
                          <svg
                            class="ml-1 w-6 h-6 my-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            ></path>
                          </svg>
                          <div className="my-auto ml-2">Sign out</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                [
                  router.pathname === "/login" ? (
                    ""
                  ) : (
                    <div className="flex justify-between">
                      <div className="text-blue-500  flex items-center ml-2  md:mx-6 mb-2 lg:mb-9 xl:mb-6">
                        <Link href={`/login`}>
                          <div className=" text-xs md:text-base   border flex items-center cursor-pointer  w-20 md:w-auto text-center font-sans  text-white bg-yellowtext hover:bg-green1 hover:text-yellowtext px-1 py-1 md:px-3 md:py-3 rounded-md  font-medium  xl:-mt-2">
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            CREATE
                          </div>
                        </Link>
                      </div>
                      <div className="text-blue-500  flex items-center ml-2  md:mx-6 mb-2 lg:mb-9 xl:mb-6">
                        <Link href={`/login`}>
                          <div className="cursor-pointer w-20 md:w-auto text-center text-sm md:text-base  font-sans  text-white bg-yellowtext hover:bg-green1 hover:text-yellowtext block px-3 py-3 rounded-md  font-medium  xl:-mt-2">
                            Sign in
                          </div>
                        </Link>
                      </div>
                    </div>
                  ),
                ]
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative ">
        <div className=" absolute right-16 z-40">
          {clickNoti && (
            <div className=" bg-white  px-4 py-3 rounded-lg shadow-md max-w-xs break-all ">
              {loading ? (
                <div className="flex items-center mt-3 hover:bg-gray-100 rounded-lg px-1 py-1 cursor-pointer">
                  <div className="flex flex-shrink-0 items-end">
                    <Skeleton width={"100%"} height={"100%"} />
                  </div>
                </div>
              ) : (
                <div>
                  {notiComment
                    ?.filter(
                      (id) => id?.users_permissions_user?.id !== user?.uid
                    )
                    ?.slice(0, showComment)
                    ?.map((notification) => {
                      const blog_id = notification?.blog?.id;
                      return (
                        <Link href={`/blogs/${blog_id}`}>
                          <div className="flex items-center mt-3 hover:bg-gray-100 rounded-lg px-1 py-1 cursor-pointer">
                            <div className="flex flex-shrink-0 items-end">
                              <img
                                className="h-16 w-16 object-cover rounded-full"
                                src={
                                  notification?.users_permissions_user
                                    ?.social_id
                                    ? notification?.users_permissions_user
                                        ?.image_social
                                    : getPathUrl(
                                        notification?.users_permissions_user
                                          ?.avatar_image?.url
                                      )
                                }
                              />
                            </div>
                            <div className="ml-3">
                              <span className="font-medium  font-sans text-sm line-clamp-1">
                                {notification?.blog?.title}
                              </span>
                              <p className="text-sm  font-sans line-clamp-1">
                                {notification?.comment}
                              </p>
                              <div className="text-sm  font-sans text-blue font-semibold">
                                {timeDifference(
                                  new Date().getTime(),
                                  new Date(notification?.createdAt).getTime()
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  <div className="flex justify-center items-center ">
                    {isNoMoreComment ? (
                      ""
                    ) : (
                      <button
                        onClick={clickViewMore}
                        className=" border text-sm hover:shadow-lg cursor-pointer  font-Times  flex justify-center p-2 mt-4 text-textaboutus border-textaboutus rounded-md border-opacity-50 "
                      >
                        VIEW MORE
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className=" bg-creambg  w-full    overflow-x-scroll md:overflow-hidden flex justify-start  md:justify-center h-24 text-navtext ">
        <Link href={`/`}>
          <div className={NavStyle}>Home</div>
        </Link>
        <Link href={`/about_us`}>
          <div className={NavStyle}>About Us</div>
        </Link>
        <Link href={`/blogs`}>
          <div className={NavStyle}>Blogs</div>
        </Link>
        <Link href={`/career`}>
          <div className={NavStyle}>Career</div>
        </Link>
        <Link href={`/contact_us`}>
          <div className={NavStyle}>Contact Us</div>
        </Link>
      </div>
    </div>
  );
};
export default withAuth(NavBar);
