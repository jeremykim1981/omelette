import BlogHeader from "../../component/BlogHeader";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

const Reviewer = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [oneClick, setOneClick] = useState(false);
  const [error, setError] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const clickShow = (id) => {
    if (!id) return;
    switch (id) {
      case 1:
        setShow1(!show1);
        break;
      case 2:
        setShow2(!show2);
        break;
      case 3:
        setShow3(!show3);
        break;
      case 4:
        setShow4(!show4);
        break;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  const sentEmail = async (data) => {
    await axios.post(`https://admin.jajoin.co/myEmail`, {
      subject: ` ${data?.name} ${data?.lastname} ติดต่อ Reviewer`,
      type: "reviewer",
      account_name: data?.account_name,
      age: data?.age,
      canornot: data?.canornot,
      follower: data?.follower,
      gender: data?.gender,
      lastname: data?.lastname,
      line_id: data?.line_id,
      name: data?.name,
      phone_number: data?.phone_number,
      province: data?.province,
      facebook_account_name: data?.facebook_account_name,
      facebook_link: data?.facebook_link,
      facebook_follower: data?.facebook_follower,
      twitter_account_name: data?.twitter_account_name,
      twitter_link: data?.twitter_link,
      twitter_follower: data?.twitter_follower,
      instrgram_account_name: data?.instrgram_account_name,
      instrgram_link: data?.instrgram_link,
      instrgram_follower: data?.instrgram_follower,
      tiktok_account_name: data?.tiktok_account_name,
      tiktok_link: data?.tiktok_link,
      tiktok_follower: data?.tiktok_follower,
    });
  };

  const onSubmit = async (data) => {
    if (
      data?.account_name?.length > 0 &&
      data?.age?.length > 0 &&
      data?.canornot !== null &&
      data?.gender !== null &&
      data?.lastname?.length > 0 &&
      data?.name?.length > 0 &&
      data?.phone_number?.length > 0 &&
      data?.province.length > 0
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
  const Text_Field_Flex = ({ name, useRegister, placeholder }) => {
    return (
      // <div className=" p-4 flex justify-center items-center font-light  text-textaboutus  ">
      //   <div className="flex flex-col justify-start items-start w-full md:w-4/5  lg:w-3/5  xl:w-2/5">

      //   </div>
      // </div>
      <div className="flex my-2">
        <div className="mb-2 m-auto">{placeholder}</div>
        <input
          className="p-2 rounded-md w-10/12"
          type="text"
          placeholder={placeholder}
          {...useRegister(`${name}`, {})}
        />
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

  const RadioButton = ({ name, useRegister, placeholder, value }) => {
    return (
      <div className="flex flex-row-reverse  items-center mb-2">
        <div className=" font-Times ml-4">{placeholder}</div>
        <input {...useRegister(`${name}`)} type="radio" value={value} />
      </div>
    );
  };
  // const submitEmail = () => {
  //   //alert("submit email")
  //   toast(" 🦄  Thank you for Register! ");
  // };
  return (
    <div className="bg-creambg">
      <BlogHeader name="Reviewer" />
      <div className="text-center text-lg font-light  text-textaboutus mt-10">
        กรอกข้อมูลเพื่อร่วมเป็นนักรีวิวกับ Jajoin.co
      </div>
      <form
        className="grid grid-cols-1 font-light  text-textaboutus "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text_Field name="name" placeholder="ชื่อ" useRegister={register} />
        <Text_Field
          name="lastname"
          placeholder="นามสกุล"
          useRegister={register}
        />
        <div className=" p-4 flex justify-center items-center font-light  text-textaboutus  ">
          <div className="flex flex-col justify-start items-start w-full md:w-4/5 lg:w-3/5    xl:w-2/5">
            <div className="mb-2">เพศ</div>
            <div className="flex flex-col justify-start items-start">
              <RadioButton
                name="gender"
                placeholder="ชาย"
                useRegister={register}
                value="male"
              />
              <RadioButton
                name="gender"
                placeholder="หญิง"
                useRegister={register}
                value="female"
              />
              <RadioButton
                name="gender"
                placeholder="LGBT"
                useRegister={register}
                value="LGBT"
              />
            </div>
          </div>
        </div>
        <Text_Field name="age" placeholder="อายุ" useRegister={register} />
        <Text_Field
          name="province"
          placeholder="จังหวัด"
          useRegister={register}
        />
        {/* <div className=" p-4 flex justify-center items-center font-light  text-textaboutus  ">
          <div className="flex flex-col justify-start items-start w-full md:w-4/5 lg:w-3/5    xl:w-2/5">
            <div className="mb-2">ช่องทาง Social</div>
            <div className="flex flex-col justify-start items-start">
              <RadioButton
                name="social_type"
                placeholder="Facebook"
                useRegister={register}
                value="facebook"
              />
              <RadioButton
                name="social_type"
                placeholder="Twitter"
                useRegister={register}
                value="twitter"
              />
              <RadioButton
                name="social_type"
                placeholder="Instargram"
                useRegister={register}
                value="instargram"
              />
            </div>
          </div>
        </div> */}

        <div className="my-4 mx-auto w-full md:w-4/5 lg:w-3/5 xl:w-2/5">
          <div className=" font-light  text-textaboutus   border border-dashed border-b border-yellow-200 rounded-md ">
            <div
              onClick={() => {
                clickShow(1);
              }}
              className="cursor-pointer text-center my-4 font-Times text-2xl"
            >
              Facebook
            </div>
            {show1 && (
              <div>
                <Text_Field_Flex
                  name="facebook_account_name"
                  placeholder="ชื่อแอคเค้าท์"
                  useRegister={register}
                />
                <Text_Field_Flex
                  name="facebook_link"
                  placeholder="ลิงค์แอคเค้าท์"
                  useRegister={register}
                />
                <Text_Field_Flex
                  name="facebook_follower"
                  placeholder="ยอดผู้ติดตาม"
                  useRegister={register}
                />
                <div className="pb-8"></div>
              </div>
            )}
          </div>
        </div>
        <div className="my-4 mx-auto w-full md:w-4/5 lg:w-3/5 xl:w-2/5">
          <div className=" font-light  text-textaboutus   border border-dashed border-b border-yellow-200 rounded-md ">
            <div
              onClick={() => {
                clickShow(2);
              }}
              className="cursor-pointer text-center my-4 font-Times text-2xl"
            >
              Twitter
            </div>
            {show2 && (
              <div>
                <Text_Field_Flex
                  name="twitter_account_name"
                  placeholder="ชื่อแอคเค้าท์"
                  useRegister={register}
                />
                <Text_Field_Flex
                  name="twitter_link"
                  placeholder="ลิงค์แอคเค้าท์"
                  useRegister={register}
                />
                <Text_Field_Flex
                  name="twitter_follower"
                  placeholder="ยอดผู้ติดตาม"
                  useRegister={register}
                />
                <div className="pb-8"></div>
              </div>
            )}
          </div>
        </div>
        <div className="my-4 mx-auto w-full md:w-4/5 lg:w-3/5 xl:w-2/5">
          <div className=" font-light  text-textaboutus   border border-dashed border-b border-yellow-200 rounded-md ">
            <div
              onClick={() => {
                clickShow(3);
              }}
              className="cursor-pointer text-center my-4 font-Times text-2xl"
            >
              Instargram
            </div>
            {show3 && (
              <div>
                <Text_Field_Flex
                  name="instrgram_account_name"
                  placeholder="ชื่อแอคเค้าท์"
                  useRegister={register}
                />
                <Text_Field_Flex
                  name="instrgram_link"
                  placeholder="ลิงค์แอคเค้าท์"
                  useRegister={register}
                />
                <Text_Field_Flex
                  name="instrgram_follower"
                  placeholder="ยอดผู้ติดตาม"
                  useRegister={register}
                />
                <div className="pb-8"></div>
              </div>
            )}
          </div>
        </div>
        <div className="my-4 mx-auto w-full md:w-4/5 lg:w-3/5 xl:w-2/5">
          <div className=" font-light  text-textaboutus   border border-dashed border-b border-yellow-200 rounded-md ">
            <div
              onClick={() => {
                clickShow(4);
              }}
              className="cursor-pointer text-center my-4 font-Times text-2xl"
            >
              Tiktok
            </div>
            {show4 && (
              <div>
                <Text_Field_Flex
                  name="tiktok_account_name"
                  placeholder="ชื่อแอคเค้าท์"
                  useRegister={register}
                />
                <Text_Field_Flex
                  name="tiktok_link"
                  placeholder="ลิงค์แอคเค้าท์"
                  useRegister={register}
                />
                <Text_Field_Flex
                  name="tiktok_follower"
                  placeholder="ยอดผู้ติดตาม"
                  useRegister={register}
                />
                <div className="pb-8"></div>
              </div>
            )}
          </div>
        </div>

        <div className=" p-4 flex justify-center items-center font-light  text-textaboutus  ">
          <div className="flex flex-col justify-start items-start w-full md:w-4/5 lg:w-3/5    xl:w-2/5">
            <div className="mb-2">สามารถเขียน Blog ได้หรือไม่</div>
            <div className="flex flex-col justify-start items-start">
              <RadioButton
                name="canornot"
                placeholder="ได้"
                useRegister={register}
                value="can"
              />
              <RadioButton
                name="canornot"
                placeholder="ไม่ได้"
                useRegister={register}
                value="cannot"
              />
            </div>
          </div>
        </div>
        <Text_Field
          name="line_id"
          placeholder="Line ID"
          useRegister={register}
        />
        <Text_Field
          name="phone_number"
          placeholder="เบอร์โทรศัพท์"
          useRegister={register}
        />
        <div className="w-full flex justify-center items-center mt-10 ">
          {oneClick ? (
            <div className="text-center  bg-gray-400 text-white font-Times p-3  w-80 cursor-pointer text-lg font-semibold rounded-lg">
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
        <div className="h-16 bg-creambg"></div>
      </form>
    </div>
  );
};
export default Reviewer;
