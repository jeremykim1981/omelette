import { Auth } from "aws-amplify";
import { useState } from "react";
import * as yup from "yup";
import produce from "immer";
import useForm from "../../hooks/useForm";
import SwalAlert from "../../event/SwalAlert";
import { checkValidateProfile } from "../../api/profile";
import Button from "../../components/Button/Button";
import { useRouter } from "next/router";

const schema = yup.object({
  username: yup.string().required("โปรดกรอก Username"),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  first_name: yup.string().max(255).required("firstname is required"),
  last_name: yup.string().max(255).required("lastname is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  phone_number: yup
    .string()
    // .phone_number()
    .required("โปรดกรอกหมายเลขโทรศัพท์"),
  password: yup
    .string()
    .required("โปรดกรอกรหัสผ่าน")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "โปรดกรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร และมีตัวอักษรพิมเล็กและใหญ่อย่างน้อย 1 ตัว"
    ),
  confirm_password: yup
    .string()
    .required()
    // .min(8, "โปรดกรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร")
    .test("passwords-match", "โปรดกรอกรหัสผ่านให้ตรงกัน", function (value) {
      return this.parent.password === value;
    }),
});

const initialState = { username: "", password: "" };

const account = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { form, setForm, setValue, handleSubmit, errors } = useForm({
    initialState,
    resolver: schema,
  });

  const signUp = async () => {
    try {
      setLoading(true);
      const { values, errors, isError } = handleSubmit();
      if (isError) {
        return setForm(
          produce(form, (draftState) => {
            draftState.password = "";
            draftState.confirm_password = "";
          })
        );
      }
      const format_phone_number = `+66${values.phone_number.slice(
        1,
        values.phone_number.length
      )}`;

      await checkValidateProfile({
        username: values.username,
        phone_number: values.phone_number,
      });
      await Auth.signUp({
        username: values.username,
        password: values.password,
        attributes: {
          ["custom:first_name"]: values.first_name,
          ["custom:last_name"]: values.last_name,
          ["custom:fixed_phone_number"]: values.phone_number,
          email: values.email,
          phone_number: format_phone_number,
        },
      });
      await SwalAlert.Success({ text: "สมัครสมาชิกสำเร็จ" });
      localStorage.clear();
      router.push("/login");
    } catch (error) {
      console.log("error", error);
      await SwalAlert.Fail({
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const Error = ({ text }) => {
    return (
      <div class="my-2 flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2">
        <div class="text-red-500 rounded-full bg-white mr-3">
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
        <div class="text-white max-w-xs ">{text}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center loginblog mx-4 md:w-2/3 xl:w-1/3 md:mx-auto border-textlogingreen border border-separate border-opacity-10  mt-10 md:mt-20 lg:mt-14 p-6 space-y-4  ">
      <div className=" font-bold text-2xl   text-textlogingreen">
        Rakjang Farm
      </div>
      <img className="w-32" src="../logo/logo.png" />
      <div className="  font-medium text-2xl   text-textlogingreen">
        Create an account
      </div>
      <div className="text-textlogingreen flex justify-center items-center space-x-4">
        <div className="border-b-4 w-14 border-textlogingreen"></div>
        <div className="text-lg">บัญชีผู้ใช้</div>
        <div className="border-b-4 w-14 border-textlogingreen"></div>
      </div>
      <div className="">
        <div className="text-textgray">ชื่อบัญชี</div>
        <input
          placeholder="กรุณากรอกชื่อบัญชีผู้ใช้งาน"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 "
          onChange={setValue}
          value={form.username}
          name="username"
        />
        {errors.username && !form.username && (
          <Error text={errors.username.message} />
        )}
      </div>
      <div className="">
        <div className="text-textgray">E-mail</div>
        <input
          placeholder="Enter your email address"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 "
          onChange={setValue}
          value={form.email}
          name="email"
        />
        {errors.email && !form.email && <Error text={errors.email.message} />}
      </div>
      <div className="">
        <div className="text-textgray">ชื่อ</div>
        <input
          placeholder="กรุณากรอกชื่อ"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 "
          onChange={setValue}
          value={form.first_name}
          name="first_name"
        />
        {errors.first_name && !form.first_name && (
          <Error text={errors.first_name.message} />
        )}
      </div>
      <div className="">
        <div className="text-textgray">นามสกุล</div>
        <input
          placeholder="กรุณากรอกนามสกุล"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 "
          onChange={setValue}
          value={form.last_name}
          name="last_name"
        />
        {errors.last_name && !form.last_name && (
          <Error text={errors.last_name.message} />
        )}
      </div>
      <div className="">
        <div className="text-textgray">หมายเลขโทรศัพท์</div>
        <input
          placeholder="กรุณากรอกหมายเลขโทรศัพท์"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 "
          onChange={setValue}
          value={form.phone_number}
          name="phone_number"
        />
        {errors.phone_number && !form.phone_number && (
          <Error text={errors.phone_number.message} />
        )}
      </div>
      <div className="">
        <div className="text-textgray">รหัสผ่าน</div>
        <input
          placeholder="กรุณากรอกรหัสผ่าน 8 หลัก"
          className="w-80 border rounded-md focus:outline-none px-4 py-2"
          onChange={setValue}
          value={form.password}
          name="password"
          type="password"
        />
        <div className=" text-xs font-light text-gray-400 mt-1">
          รหัสผ่านต้องมี ตัวอักษรพิมพ์เล็ก ตัวอักษรพิมพ์ใหญ่ และตัวเลข
        </div>
        {errors.password && !form.password && (
          <Error text={errors.password.message} />
        )}
      </div>
      <div className="">
        <div className="text-textgray">ยืนยันรหัสผ่าน</div>
        <input
          placeholder="กรุณายืนยันรหัสผ่าน 8 หลัก"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 "
          onChange={setValue}
          value={form.confirm_password}
          name="confirm_password"
          type="password"
        />
        <div className=" text-xs font-light text-gray-400 mt-1">
          รหัสผ่านต้องมี ตัวอักษรพิมพ์เล็ก ตัวอักษรพิมพ์ใหญ่ และตัวเลข
        </div>
        {errors.confirm_password && !form.confirm_password && (
          <Error text={errors.confirm_password.message} />
        )}
      </div>
      <Button
        text="Sign Up"
        onClick={signUp}
        loading={loading}
        bgColor="bg-textlogingreen"
        className="w-80 text-white rounded-md py-2"
      />
    </div>
  );
};
export default account;
