import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { RESGISTER } from "../../apollo/mutation/creatComments";
import ApolloClient from "../../apollo/apolloClient";
import { useRouter } from "next/router";
import { QUERY_ID } from "../../apollo/queries/queryBlogger";

const Text_Field = ({
  name,
  useRegister,
  placeholder,
  type = "text",
  className = "",
}) => {
  return (
    <div className=" p-4 flex justify-center items-center font-light  text-textaboutus  ">
      <div className="flex flex-col justify-start items-start w-full md:w-4/5  lg:w-3/5  xl:w-2/5">
        <div className="mb-2">{placeholder}</div>
        <input
          className={`p-2 rounded-md w-full ${className}`}
          type={type}
          placeholder={placeholder}
          {...useRegister(`${name}`, {})}
        />
      </div>
    </div>
  );
};

const Alert = ({ title }) => {
  return (
    <div className=" p-4 flex justify-center items-center font-light  text-textaboutus  ">
      <div className="flex flex-col justify-start items-start w-full md:w-4/5  lg:w-3/5  xl:w-2/5">
        <div className="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2 w-full">
          <div className="text-red-500 rounded-full bg-white mr-3">
            <svg
              width="1.8em"
              height="1.8em"
              viewBox="0 0 16 16"
              class="bi bi-x"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
              />
            </svg>
          </div>
          <div className="text-white max-w-xs ">{title}</div>
        </div>
      </div>
    </div>
  );
};
const Register = () => {
  const { client } = ApolloClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const [same, setSame] = useState(false);

  useEffect(async () => {
    const { data } = await client.query({
      query: QUERY_ID,
      variables: {
        where: {
          email: watch("email"),
        },
      },
    });
    if (data?.users[0]?.email === watch("email")) {
      setSame(true);
    } else {
      setSame(false);
    }
  }, [watch("email")]);

  const onSubmit = async (form) => {
    const passwordError = form.password !== form.re_password;
    const userError = form.username.length < 6 && form.username.length > 30;
    if (passwordError) {
      setError("password", {
        type: "manual",
        message: "รหัสผ่านไม่ตรงกัน",
      });
      return;
    }
    if (userError) {
      setError("email");
    }
    if (same) {
      return;
    }
    await client.mutate({
      mutation: RESGISTER,
      variables: {
        username: form.username,
        email: form.email,
        password: `${form.password}`,
        name: form.username,
      },
    });
    router.push("/");
  };

  return (
    <div className="">
      <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
        <Text_Field
          useRegister={register}
          name="username"
          placeholder="Username"
        />
        <div className=" p-4 flex justify-center items-center font-light  text-textaboutus  ">
          <div className="flex flex-col justify-start items-start w-full md:w-4/5  lg:w-3/5  xl:w-2/5">
            <div className="mb-2">Email</div>
            <input
              className={`p-2 rounded-md w-full ${
                same ? "border border-red-600" : ""
              }`}
              type="text"
              placeholder="Email"
              {...register(`email`, { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>
        </div>
        {errors.email && (
          <Alert title="ขออภัย อีเมลผู้ใช้งานจะต้องมีความยาวระหว่าง 6 ถึง 30 ตัวอักษร" />
        )}
        {same && <Alert title="ขออภัย อีเมลนี้ถูกใช้งานแล้ว" />}
        <Text_Field
          useRegister={register}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Text_Field
          useRegister={register}
          name="re_password"
          placeholder="Re-Password"
          type="password"
        />
        {errors.password && <Alert title="ขออภัย รหัสผ่านไม่ตรงกัน" />}
        <button
          className=" my-8 bg-textaboutus text-white font-Times p-3  w-40 cursor-pointer text-lg font-semibold rounded-lg mx-auto"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
};
export default Register;
