import React, { useState, useContext, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import Swal from "sweetalert2";
import AppolloClient from "../appllo/apolloClient";
import { CREATE_LOGIN_LOG, CREATE_TIME, LOGIN } from "../appllo/mutations";
import { QUERY_ID } from "../appllo/queries";
const LoginButton = ({}) => {
  return (
    <div className="borderlinear p-0.5 rounded-3xl text-sm  w-60 mx-auto ">
      <div className="flex justify-center items-center linearbutton rounded-3xl py-1 ">
        <div className="flex flex-col justify-center items-center  font-semibold text-xl text-textyellow">
          Log in
        </div>
      </div>
    </div>
  );
};
const Login = () => {
  const { client } = AppolloClient();
  const router = useHistory();
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem("jwt");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (p) => {
    setPassword(p.target.value);
  };

  const onClickSubmitSignIn = async () => {
    setLoading(true);
    try {
      const { data } = await client.mutate({
        mutation: LOGIN,
        variables: {
          identifier: email,
          password: password,
        },
      });
      const dataLogin = data.login;
      localStorage.setItem("jwt", dataLogin.jwt);
      localStorage.setItem("uid", dataLogin.user.id);
      localStorage.setItem("userName", dataLogin.user.username);
      localStorage.setItem("roleName", dataLogin.user.role.name);
      localStorage.setItem("email", dataLogin.user.email);
      setUser({
        userId: dataLogin.user.id,
        userName: dataLogin.user.username,
        roleName: dataLogin.user.role.name,
        uid: dataLogin.user.id,
      });
      const { data: query_users } = await client.query({
        query: QUERY_ID,
        variables: {
          where: {
            email: dataLogin.user.email,
          },
        },
      });
      localStorage.setItem("department", query_users?.users[0]?.department);
      const hours = new Date().getHours();
      const mins = new Date().getMinutes();
      await client.mutate({
        mutation: CREATE_TIME,
        variables: {
          input: {
            data: {
              user_id: dataLogin.user.id,
              time_in: `${hours + ":" + mins}`,
              name: dataLogin.user.username,
              email: dataLogin.user.email,
              department: query_users?.users[0]?.department,
            },
          },
        },
      });
      setTimeout(() => {
        router.push("/");
      }, [500]);
    } catch (error) {
      setLoading(false);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "อีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดลองใหม่อีกครั้ง",
      });
      setPassword("");
      console.log("ERROR", JSON.stringify(error));
    }
  };
  if (loading)
    return (
      <div
        className=" pt-32 md:pt-6 2xl:pt-10  text-white min-h-screen  flex flex-col justify-center items-center "
        style={{
          backgroundImage: "url(" + "../icon/bg.png" + ")",
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {" "}
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white  bg-logintext hover:logintext focus:border-logouttext active:bg-logouttext transition ease-in-out duration-150 cursor-not-allowed"
          disabled
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </button>
      </div>
    );
  if (accessToken) return <Redirect to="/" />;

  return (
    <div
      className="pt-32 md:pt-6 2xl:pt-10  text-white min-h-screen  flex flex-col justify-between "
      style={{
        backgroundImage: "url(" + "../icon/bg.png" + ")",
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <img
          className="h-24 md:h-32 xl:h-40 object-cover  w-auto absolute top-0.5 left-4"
          src="../icon/Asset 1.png"
        ></img>
        <img
          className="h-14 w-auto absolute top-4 right-4"
          src="../icon/Asset 2.png"
        ></img>
      </div>
      <div className="px-4 md:px-8 lg:px-16 mb-auto">
        <div className="hidden md:block">
          <img className="md:w-7/12 lg:w-5/12 mx-auto" src="/krungsrihero.png"></img>
        </div>
        <div className="block md:hidden">
          <div className=" font-semibold text-2xl lg:text-5xl mb-4 flex flex-col justify-center items-center shadowtext   xl:max-w-screen-xl mx-auto">
            <div>
              Krungsri<span></span> Business{" "}
              <span className=" text-textyellow shadowtext">Talk</span>
            </div>
            <div className="border-b-2  border-textyellow w-10/12 md:w-5/12 lg:w-65% xl:w-45%   mx-auto mt-4  "></div>
            <div className="  text-center  text-lg md:text-2xl lg:text-xl xl:text-xl mt-4 shadowtext px-4  w-full md:w-2/3 lg:w-full uppercase">
              <div className="mb-2 text-xl md:text-2xl  xl:text-4xl text-textyellow">
                Thailand after covid-19
              </div>{" "}
              Business opportunities and transformation
            </div>
            <div className="border-b-2  border-textyellow w-10/12 md:w-5/12 lg:w-65% xl:w-45% mt-4  mx-auto  "></div>
          </div>

          <div className="flex justify-center items-center mt-2"></div>
          <div className=" shadowtext  mb-4 flex flex-col md:flex-row justify-center items-center  md:text-xl">
            <span className=" flex justify-start items-center font-semibold  text-textyellow mr-4">
              Wednesday, 15 <span className="mb-6 mr-2">th</span> September 2021
            </span>
            14.00 - 16.00 hrs.
          </div>
        </div>
        <div className="sm:bg-user2 bg-user1  bg-no-repeat sm:w-full sm:max-w-3xl sm:mx-auto absolute  right-0 left-0">
          <div className=" mx-auto  ">
            <div className="p-5">
              <div className="relative"></div>

              <div className=" flex flex-col items-center sm:ml-4">
                <form>
                  <div className="flex justify-center items-center">
                    <div className=" h-12 w-3/12   borderlinear rounded-full rounded-r-none flex justify-center items-center pl-0.5    ">
                      <div className="linearbutton h-11  w-full rounded-full rounded-r-none flex justify-center items-center  ">
                        <svg
                          className="w-6 h-6   text-logouttext"
                          fill="#906D31"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      value={email}
                      onChange={onChangeEmail}
                      className="p-4 my-2 bg-white h-12 w-80  outline-none  text-logintext rounded-r-3xl"
                      type="text"
                      placeholder=""
                      name="email"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <div className=" h-12 w-3/12   borderlinear rounded-full rounded-r-none flex justify-center items-center pl-0.5    ">
                      <div className="linearbutton h-11  w-full rounded-full rounded-r-none flex justify-center items-center  ">
                        <svg
                          className="w-6 h-6 text-logouttext"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      value={password}
                      onChange={onChangePassword}
                      className="p-4 my-2 bg-white h-12 w-80  outline-none text-logintext rounded-r-3xl"
                      type="password"
                      id="pass"
                      placeholder=""
                      name="password"
                    />
                  </div>
                  <div className=" flex justify-center items-center mt-4">
                    <button onClick={() => onClickSubmitSignIn()}>
                      <LoginButton />
                    </button>
                  </div>
                </form>
                <div className="py-16 sm:py-10  "></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-60">
        <div className=" flex justify-end items-center px-4 mb-4">
          <img className="w-20 md:hidden block " src="../icon/qrcode.png" />
        </div>
        <div className="text-xs sm:text-sm px-4 py-4 mx-auto bg-bgbottom relative  flex flex-col md:flex-row justify-end md:justify-between items-end md:items-start ">
          <a href="https://web.facebook.com/KrungsriBusinessEmpowerment/">
            <div className=" flex justify-start items-center pb-6 cursor-pointer ">
              <div>
                <img
                  className="w-6 h-6 border border-white rounded-full p-0.5 mr-2"
                  src="../icon/fb.png"
                />
              </div>
              <div>
                <img className="w-6 h-6  mr-2" src="../icon/global.png" />
              </div>
              Krungsri Business Empowerment
            </div>
          </a>
          <div className="text-textyellow  flex  justify-end  items-center">
            <div className="text-right xl:mr-32">
              <div>Line Help กรุณาแสกน QR Code เพื่อแจ้งรายละเอียดของปัญหา</div>
              <div className="text-xs">
                หรือติดต่อสอบถามเพิ่มเติมโทร. 061-598-8365, 097-126-3888,
                080-175-9914
              </div>
            </div>
            <div>
              <img
                className="w-20 hidden md:block absolute bottom-28 lg:bottom-24 right-4 xl:bottom-4 xl;right-10"
                src="../icon/qrcode.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
