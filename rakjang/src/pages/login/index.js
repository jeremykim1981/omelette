import React, { useState, useEffect } from "react";
import * as yup from "yup";
import useForm from "../../hooks/useForm";
import Swal from "sweetalert2";
import produce from "immer";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import SwalAlert from "../../event/SwalAlert";
import router from "next/router";

// REDUX
import { initializeApp } from "../../_redux/initializeAppSlice";

// AWS
import { Auth, Hub } from "aws-amplify";

const schema = yup.object({
  username: yup.string().required("โปรดกรอก Username"),
  password: yup.string().required("โปรดกรอกรหัสผ่าน"),
});

const initialState = { username: "", password: "" };

const login = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.initializeApp);
  const { form, setForm, handleSubmit, setValue, errors } = useForm({
    initialState,
    resolver: schema,
  });
  const [loading, setLoading] = useState(false);

  const onClickLoginFacebook = async () => {
    localStorage.clear();
    await Auth.federatedSignIn({ provider: "Facebook" });
  };

  const onClickLoginGoogle = async () => {
    localStorage.clear();
    await Auth.federatedSignIn({ provider: "Google" });
  };

  const onClickLogin = async () => {
    const { values, errors, isError } = handleSubmit();
    if (isError) {
      return setForm(
        produce(form, (draftState) => {
          draftState.password = "";
        })
      );
    }
    setLoading(true);
    try {
      const userSignIn = await Auth.signIn({
        username: values.username,
        password: values.password,
      });
      if (userSignIn?.challengeName === "NEW_PASSWORD_REQUIRED") {
        await Auth.completeNewPassword(userSignIn, values.password);
      }
      dispatch(initializeApp());
      router.push("/");
    } catch (error) {
      await SwalAlert.Fail({ text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center loginblog   max-w-md mx-4 md:mx-auto border-textlogingreen border border-separate border-opacity-10  mt-10 p-6 space-y-4  ">
      <div className=" font-bold text-2xl   text-textlogingreen">
        Rakjang Farm
      </div>
      <img className="w-32" src="../logo/logo.png" />
      <div className="  font-medium text-2xl   text-textlogingreen">
        Sign in or create an account
      </div>
      <div className=" grid grid-cols-2 gap-4">
        <div
          onClick={() => onClickLoginFacebook()}
          className="flex justify-center cursor-pointer  items-center border rounded-md p-2 w-40 text-textlogingray mx-auto"
        >
          <img className="w-6 mr-4 " src="../icon/fblogin.png" />
          <div>Facebook</div>
        </div>
        <div
          onClick={() => onClickLoginGoogle()}
          className="flex justify-center  cursor-pointer items-center border rounded-md p-2 w-40 text-textlogingray mx-auto"
        >
          <img className="w-6 mr-4" src="../icon/googlelogin.png" />
          <div>Google</div>
        </div>
      </div>
      <div className="">
        <div className="text-textgray">Username</div>
        <input
          onChange={setValue}
          value={form.username}
          type="text"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 text-textlogingray"
          name="username"
          placeholder="Username"
        />
      </div>
      <div className="">
        <div className="flex flex-col justify-between  items-start">
          <div className="text-textgray">Password</div>
          <input
            onChange={setValue}
            value={form.password}
            type="password"
            className="w-80 border rounded-md focus:outline-none px-4 py-2 text-textlogingray"
            name="password"
            placeholder="Password"
          />
          {/* <div className=" text-blue-500">Forgotten password ?</div> */}
        </div>
      </div>
      <Button
        text="Sign In"
        loading={loading}
        onClick={() => onClickLogin()}
        bgColor="bg-textlogingreen"
        className="w-80 text-white rounded-md py-2 flex justify-center items-center"
      />
      {/* <div className=" text-textlogingreen  hover:underline cursor-pointer">
        Don't have an Rakjang farm account ?
      </div> */}
      <div
        onClick={() => {
          router.push("/register");
        }}
        className=" text-blue-500  hover:underline cursor-pointer"
      >
        Create Rakjang farm account
      </div>
    </div>
  );
};
export default login;
