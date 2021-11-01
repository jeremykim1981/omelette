import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BlogHeader from "../../component/BlogHeader";
import withAuth from "../../hoc/withAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

const Marketer = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [oneClick, setOneClick] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  const sentEmail = async (data) => {
    await axios.post(`https://admin.jajoin.co/myEmail`, {
      subject: ` ${data?.name} ${data?.lastname} ติดต่อ Marketer`,
      type: "marketer",
      company: data?.company,
      type_company: data?.type,
      email: data?.email,
      phone_number: data?.phonenumber,
      name: data?.name,
      lastname: data?.lastname,
      facebook: data?.facebook,
      instargram: data?.instargram,
      twitter: data?.twitter,
      blog: data?.blog,
    });
  };

  const onSubmit = async (data) => {
    if (
      data?.company?.length > 0 &&
      data?.email?.length > 0 &&
      data?.lastname?.length > 0 &&
      data?.name?.length > 0 &&
      data?.phonenumber?.length > 0 &&
      data?.type?.length > 0
    ) {
      setOneClick(true);
      await sentEmail(data);
      toast(" 🦄  Thank you for Register! ");
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } else {
      setError(true);
    }
  };

  const RadioButton = ({ name, useRegister, placeholder }) => {
    return (
      <div className="flex flex-row-reverse  items-center mb-2">
        <div className=" font-Times ml-4">{placeholder}</div>
        <input {...useRegister(`${name}`)} type="radio" value={name} />
      </div>
    );
  };
  const Text_Field = ({ name, useRegister, placeholder }) => {
    return (
      <div className=" p-4 flex justify-center items-center font-light  text-textaboutus  ">
        <div className="flex flex-col justify-start items-start w-full md:w-4/5  lg:w-3/5  xl:w-2/5">
          <div className="mb-2">{placeholder}</div>
          <input
            className="p-2 rounded-md w-full"
            type="text"
            placeholder={placeholder}
            {...useRegister(`${name}`, {})}
          />
        </div>
      </div>
    );
  };
  const Email_Field = ({ name, useRegister, placeholder }) => {
    return (
      <div className="p-4 flex justify-center items-center font-light  text-textaboutus  ">
        <div className="flex flex-col justify-start items-start w-full md:w-4/5  lg:w-3/5  xl:w-2/5">
          <div className="mb-2">{placeholder}</div>
          <input
            className="p-2 rounded-md w-full"
            type="email"
            placeholder={placeholder}
            {...useRegister(`${name}`, { pattern: /@/i })}
          />
        </div>
      </div>
    );
  };

  // const sentEmail =async()=>{
  //   (generatePdf, email = "nsuntiphp@gmail.com") {
  //     await axios.post(`${process.env.NEXTAUTH_BACKEND_URL}/rentalsheetEmail`, {
  //       email: email,
  //       attachments: generatePdf,
  //     });
  //   },
  // };

  // }

  return (
    <div>
      <div
        className="py-20 "
        style={{
          backgroundImage: "url(" + "../contact/bgmarketer.jpg" + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <BlogHeader name="Marketer" />
        <div className="text-center text-lg font-light  text-textaboutus mt-10">
          ขอใบเสนอราคาและรายละเอียด สำหรับ Social Media Marketing
        </div>
        <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
          <Text_Field useRegister={register} name="name" placeholder="ชื่อ" />
          <Text_Field
            useRegister={register}
            name="lastname"
            placeholder="นามสกุล"
          />
          <Text_Field
            useRegister={register}
            name="company"
            placeholder="บริษัท"
          />
          <Text_Field
            useRegister={register}
            name="type"
            placeholder="ประเภทธุรกิจ"
          />
          <Email_Field
            useRegister={register}
            name="email"
            placeholder="อีเมล"
          />
          <Text_Field
            useRegister={register}
            name="phonenumber"
            placeholder="เบอร์โทรศัพท์มือถือ"
          />
          <div className="p-4 flex justify-center items-center font-light  text-textaboutus  ">
            <div className="flex flex-col justify-start items-start w-full md:w-4/5 lg:w-3/5    xl:w-2/5">
              <div className="mb-2">ช่องทางที่สนใจ</div>
              <div className="flex flex-col justify-start  items-start">
                <div className="flex flex-row-reverse  items-center mb-2"></div>
                <RadioButton
                  useRegister={register}
                  name="facebook"
                  placeholder="Facebook"
                />
                <RadioButton
                  useRegister={register}
                  name="instargram"
                  placeholder="Instargram"
                />
                <RadioButton
                  useRegister={register}
                  name="twitter"
                  placeholder="Twitter"
                />
                <RadioButton
                  useRegister={register}
                  name="blog"
                  placeholder="Blog real user review"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center mt-10 ">
            {oneClick ? (
              <div className="text-center   bg-gray-400 text-white font-Times p-3  w-80 cursor-pointer text-lg font-semibold rounded-lg">
                submit
              </div>
            ) : (
              <div className="grid grid-cols-1 w-80">
                {error && (
                  <div class="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2">
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

                    <div class="text-white max-w-xs ">
                      โปรดกรอกข้อมูลให้ครบถ้วน
                    </div>
                  </div>
                )}
                <button
                  className="  bg-textaboutus text-white font-Times p-3   cursor-pointer text-lg font-semibold rounded-lg"
                  type="submit"
                >
                  submit
                </button>
              </div>
            )}

            <Toast />
          </div>
        </form>
      </div>
      <div className="h-16 bg-creambg"></div>
    </div>
  );
};
export default Marketer;
