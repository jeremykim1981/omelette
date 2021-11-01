import React, { useState, useEffect, memo } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import ApolloClient from "../../apollo/apolloClient";
import useAuth from "../../hooks/useAuth";
import LOGIN from "../../apollo/mutation/login";
import { getPathUrl } from "../../utils/getPathUrl";
import { useMutation } from "@apollo/client";
import Skeleton from "react-loading-skeleton";
import Head from "next/head";
import CelesSocialButton from "../../lib/CelesSocialButton";
import { GoogleLogin } from "react-google-login";
import QUERY_USER_SOCIAL_ID from "../../apollo/queries/querySocialId";
import { LOGIN_SOCIAL } from "../../apollo/mutation/creatComments";
import Link from "next/link";
import { QUERY_ID } from "../../apollo/queries/queryBlogger";
import UPDATE_USER from "../../apollo/mutation/updateCoverImage";

function login() {
  const router = useRouter();
  const { client } = ApolloClient();
  const { user, setUser, SetLocalStorageUser } = useAuth();
  const [seePassword, setSeePasswold] = useState("password");
  const checkToChangeType = (input) => {
    if (input === "password") setSeePasswold("type");
    if (input === "type") setSeePasswold("password");
  };
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [Login] = useMutation(LOGIN);

  useEffect(() => {
    if (user) {
      return router.push("/");
    }
  }, [user]);

  const onChangeField = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    setForm((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const onClickLogin = async () => {
    const { data } = await client.query({
      query: QUERY_ID,
      variables: {
        where: {
          email: form?.identifier,
        },
      },
    });
    if (
      data?.users[0]?.social_id !== null &&
      data?.users[0]?.social_id !== null
    )
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "อีเมลหรือรหัสผ่านผิด",
      });
    if (
      data?.users[0]?.social_id === null &&
      data?.users[0]?.social_id === null
    ) {
      try {
        setLoading(true);
        const { data } = await Login({
          variables: {
            input: {
              identifier: form.identifier,
              password: form.password,
            },
          },
        });

        if (data?.login) {
          const { jwt, user } = data.login;
          setUser(user);
          SetLocalStorageUser(jwt, user);
        }
        setLoading(false);
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "อีเมลหรือรหัสผ่านผิด",
        });
        setLoading(false);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "อีเมลหรือรหัสผ่านผิด",
      });
    }
  };

  const responseGoogle = async (user) => {
    try {
      const { data } = await client.query({
        query: QUERY_ID,
        variables: {
          where: { email: user?.profileObj?.email },
        },
      });
      if (data?.users?.length > 0) {
        setLoading(true);
        const { data } = await Login({
          variables: {
            input: {
              identifier: user?.profileObj?.email,
              password: `token`,
            },
          },
        });
        if (data?.login) {
          const { jwt, user } = data.login;
          setUser(user);
          SetLocalStorageUser(jwt, user);
        }
        setLoading(false);
        return;
      }
      setLoading(true);
      await client.mutate({
        mutation: LOGIN_SOCIAL,
        variables: {
          username: user?.profileObj?.name,
          email: user?.profileObj?.email,
          password: `token`,
          social_id: user?.profileObj?.googleId,
          image_social: user?.profileObj?.imageUrl,
          provider_id: user?.tokenObj?.idpId,
          name: user?.profileObj?.name,
        },
      });
      const { data: data_login } = await Login({
        variables: {
          input: {
            identifier: user?.profileObj?.email,
            password: `token`,
          },
        },
      });
      if (data_login?.login) {
        const { jwt, user } = data_login.login;
        setUser(user);
        SetLocalStorageUser(jwt, user);
      }
      setLoading(false);
    } catch (error) {
      location.reload();
    }
  };
  const responseFacebook = async (user) => {
    try {
      const { data } = await client.query({
        query: QUERY_ID,
        variables: {
          where: { email: user?._profile?.email },
        },
      });
      if (data?.users?.length > 0) {
        setLoading(true);
        const { data } = await Login({
          variables: {
            input: {
              identifier: user?._profile?.email,
              password: `token`,
            },
          },
        });
        if (data?.login) {
          const { jwt, user } = data.login;
          setUser(user);
          SetLocalStorageUser(jwt, user);
        }
        setLoading(false);
        return;
      }
      setLoading(true);
      await client.mutate({
        mutation: LOGIN_SOCIAL,
        variables: {
          username: user?._profile?.name,
          email: user?._profile?.email,
          password: `token`,
          social_id: user?._profile?.id,
          image_social: user?._profile?.profilePicURL,
          provider_id: user?._provider,
          name: user?._profile?.name,
        },
      });
      const { data: data_login } = await Login({
        variables: {
          input: {
            identifier: user?._profile?.email,
            password: `token`,
          },
        },
      });
      if (data_login?.login) {
        const { jwt, user } = data_login.login;
        setUser(user);
        SetLocalStorageUser(jwt, user);
      }
      setLoading(false);
    } catch (error) {
      location.reload();
    }
  };

  const Faillogin = (e) => {};

  if (loading || user) return <Skeleton />;

  const boxstyle = "text-gray-400 text-sm my-1 ";

  const BoxStyle =
    "appearance-none rounded relative block w-full px-3 py-3 border-b placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-blue-kp-logo focus:z-10 sm:text-sm";
  return (
    <div className=" font-sans  text-textaboutus min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Jajoin.co</title>
      </Head>
      <div className="max-w-md w-full space-y-7   shadow-lg  bg-creambg p-10 rounded-xl">
        <div></div>
        <div>
          <img
            className=" h-16 flex justify-center items-center mx-auto -mt-10   "
            src="../icon/Jajoinlogo.png"
          ></img>
        </div>
        <div className="-mt-4">
          <div className="text-2xl text-center font-Times mb-4 font-thin   ">
            Hello, Welcome!
          </div>

          <div className="">
            <div className="rounded-md -space-y-px ">
              <div className="my-3 text-sm relative">
                <input
                  onChange={onChangeField}
                  className={BoxStyle}
                  type="email"
                  required
                  placeholder="Email"
                  autoComplete="email"
                  name="identifier"
                />
                <div className="my-2 " />

                <input
                  onChange={onChangeField}
                  className={BoxStyle}
                  type={seePassword}
                  autoComplete="password"
                  required
                  placeholder="Password"
                  name="password"
                />
                <svg
                  onClick={() => checkToChangeType(seePassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 absolute right-2 bottom-3 cursor-pointer "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between ">
              <div className="flex items-center"></div>
            </div>
          </div>
          <div className="my-4">
            <button
              className=" cursor-pointer bg-brownnav  shadow-sm text-white text-base sm:text-lg w-full h-12 lg:h-12 rounded-3xl flex justify-center "
              onClick={onClickLogin}
            >
              <div className=" my-auto font-Times font-bold  text-base  sm:text-lg   ">
                Log in
              </div>
            </button>
          </div>

          <div>
            <CelesSocialButton
              provider="facebook"
              appId="163074562465422"
              autoLogin={false}
              onLoginSuccess={responseFacebook}
              // onLogoutFailure={failfacebook}
            >
              <div className="nm-flat-gray-50-sm  font-Times  text-textaboutus text-base sm:text-lg w-full h-10 lg:h-12 py-3 rounded-3xl flex justify-start items-center  ">
                <img
                  className=" cursor-pointer h-7 w-auto ml-4 md:ml-6 mr-6 md:mr-14  pt-1 pl-1 pr-0.5 bg-blue-500 rounded-sm"
                  src="../icon/facebook.png"
                />
                Log in with Facebook
              </div>
            </CelesSocialButton>
            <div className="mt-4" />
            <div className="w-full">
              <GoogleLogin
                clientId="551219618903-e5hn8kojj8c14vct732igvgm5ou96v4n.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={Faillogin}
                render={(renderPros) => (
                  <button
                    onClick={renderPros.onClick}
                    className="nm-flat-gray-50-sm  font-Times text-textaboutus text-base sm:text-lg w-full h-10 lg:h-12 py-3 rounded-3xl flex justify-start items-center"
                  >
                    <img
                      className="cursor-pointer h-7 w-auto ml-4 md:ml-6 mr-6 md:mr-14  pt-1 pl-1 pr-0.5 rounded-sm"
                      src="../icon/google.png"
                    ></img>
                    Log in with Google
                  </button>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center mx-auto mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-4 text-gray-400 pb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div className="text-xs text-gray-400 ">
              Do Not Share Your Password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
