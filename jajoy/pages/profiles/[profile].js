import Link from "next/link";
import QUERY_PROFILE from "../../apollo/queries/queryProfile";
import { BlogSession } from "../../component/BlogSession";
import ApolloClient from "../../apollo/apolloClient";
import { NextSeo } from "next-seo";
import { getPathUrl } from "../../utils/getPathUrl";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { getCroppedImg } from "../../utils/canvas";
import {
  Check_Https,
  Check_Link,
  getFetchBlob,
  readFile,
  resizeFile,
  uploadFile,
} from "../../function/functions";
import React, { useEffect, useState, useCallback } from "react";
import Image_Pop_Up from "../../lib/CelesPopUp";
import UPDATE_USER from "../../apollo/mutation/updateCoverImage";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";
import Cropper from "react-easy-crop";
import Emitter from "../../utils/EventEmitter";

const Text_Field = ({ name, useRegister, placeholder }) => {
  return (
    <div className=" border-dashed flex justify-center items-center font-light  text-textaboutus  ">
      <div className="flex flex-col justify-start items-start w-full">
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

const Profile = ({ profile_serverside }) => {
  const { client } = ApolloClient();
  const router = useRouter();
  const { user } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState([]);
  const IsMyProfile = user?.uid === profile_serverside.id;
  const [socialBar, setSocialBar] = useState(false);
  const UserUpdateSocial = IsMyProfile && socialBar;
  const [dataLink, setDataLink] = useState({});
  const [editingDescription, setEditingDescription] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  // Cover
  const [newCover, setNewCover] = useState(null);
  const [haveSrc, setHaveSrc] = useState(false);
  const [imageSrc, setImageSrc] = React.useState(null);
  const UserUpdateCover = IsMyProfile && !!imageSrc;
  const [upLoadingCover, setUpLoadingCover] = useState(false);
  const [upLoadCoverAlready, setUpLoadCoverAlready] = useState(false);

  // Avatar
  const [newAvatar, setNewAvatar] = useState(null);
  const [haveSrcAvatar, setHaveSrcAvatar] = useState(false);
  const [avatarimageSrc, setAvatarImageSrc] = React.useState(null);
  const UserUpdateProfile = IsMyProfile && !!avatarimageSrc;
  const [upLoadingAvartar, setUpLoadingAvartar] = useState(false);
  const [upLoadAvatarAlready, setUpLoadAvatarAlready] = useState(false);

  //
  const [where, setWhere] = useState("All");
  const [hower, setHower] = useState(false);
  const [howerAvatar, setHowerAvatar] = useState(false);
  const user_form_router = router?.query?.profile;

  const { register, handleSubmit, watch, setValue } = useForm();

  useEffect(() => {
    setDataLink(profile_serverside);
    setValue("name", profile_serverside?.name);
    setValue("description", profile_serverside?.description);
    setValue("facebook_link", profile_serverside?.facebook_link);
    setValue("instragram_link", profile_serverside?.instragram_link);
    setValue("youtube_link", profile_serverside?.youtube_link);
    setValue("tiktok_link", profile_serverside?.tiktok_link);
    setValue("twitter_link", profile_serverside?.twitter_link);
  }, [profile_serverside]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const newCroppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setNewCover(newCroppedImage);
      setHaveSrc(true);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  // const onClickNewCover = async () => {
  // setUpLoadingCover(true);
  // const blob = await getFetchBlob(newCover);
  // const formDataUpload = new FormData();
  // formDataUpload.append("refId", user?.uid);
  // formDataUpload.append("field", "cover_image");
  // formDataUpload.append("files", blob, `BLOG_${new Date().getTime()}`);
  // var dataUpload = await uploadFile(formDataUpload);
  // await client.mutate({
  //   mutation: UPDATE_USER,
  //   variables: {
  //     input: {
  //       where: {
  //         id: user.uid,
  //       },
  //       data: {
  //         cover_image: dataUpload.data[0].id,
  //       },
  //     },
  //   },
  // });
  // setHaveSrc(false);
  // setUpLoadCoverAlready(true);
  // setUpLoadingCover(false);
  // };

  // const onClickNewAvatar = async () => {
  //   setUpLoadingAvartar(true);
  //   const blob = await getFetchBlob(newAvatar);
  //   const formDataUpload = new FormData();
  //   formDataUpload.append("refId", user?.uid);
  //   formDataUpload.append("field", "avatar_image");
  //   formDataUpload.append("files", blob, `BLOG_${new Date().getTime()}`);
  //   var dataUpload = await uploadFile(formDataUpload);
  //   await client.mutate({
  //     mutation: UPDATE_USER,
  //     variables: {
  //       input: {
  //         where: {
  //           id: user.uid,
  //         },
  //         data: {
  //           avatar_image: dataUpload.data[0].id,
  //         },
  //       },
  //     },
  //   });
  //   setHaveSrcAvatar(false);
  //   setOpenMenu(false);
  //   setUpLoadAvatarAlready(true);
  //   Emitter.emit("new_image", { inputValue: "Hi image!" });
  //   setUpLoadingAvartar(false);
  // };

  useEffect(async () => {
    if (!newAvatar) return;
    setUpLoadingAvartar(true);
    const blob = await getFetchBlob(newAvatar);
    const formDataUpload = new FormData();
    formDataUpload.append("refId", user?.uid);
    formDataUpload.append("field", "avatar_image");
    formDataUpload.append("files", blob, `BLOG_${new Date().getTime()}`);
    var dataUpload = await uploadFile(formDataUpload);
    await client.mutate({
      mutation: UPDATE_USER,
      variables: {
        input: {
          where: {
            id: user.uid,
          },
          data: {
            avatar_image: dataUpload.data[0].id,
          },
        },
      },
    });
    setHaveSrcAvatar(false);
    setOpenMenu(false);
    setUpLoadAvatarAlready(true);
    Emitter.emit("new_image", { inputValue: "Hi image!" });
    setUpLoadingAvartar(false);
  }, [newAvatar]);

  useEffect(async () => {
    if (!newCover) return;
    setUpLoadingCover(true);
    const blob = await getFetchBlob(newCover);
    const formDataUpload = new FormData();
    formDataUpload.append("refId", user?.uid);
    formDataUpload.append("field", "cover_image");
    formDataUpload.append("files", blob, `BLOG_${new Date().getTime()}`);
    var dataUpload = await uploadFile(formDataUpload);
    await client.mutate({
      mutation: UPDATE_USER,
      variables: {
        input: {
          where: {
            id: user.uid,
          },
          data: {
            cover_image: dataUpload.data[0].id,
          },
        },
      },
    });
    setHaveSrc(false);
    setUpLoadCoverAlready(true);
    setUpLoadingCover(false);
  }, [newCover]);

  const AvatarshowCroppedImage = useCallback(async () => {
    try {
      const newCroppedImage = await getCroppedImg(
        avatarimageSrc,
        croppedAreaPixels
      );
      setNewAvatar(newCroppedImage);
      setHaveSrcAvatar(true);
      // await onClickNewAvatar(file);
    } catch (e) {
      console.error(e);
    }
  }, [avatarimageSrc, croppedAreaPixels]);

  const onSubmit = async (data) => {
    await client.mutate({
      mutation: UPDATE_USER,
      variables: {
        input: {
          where: {
            id: user.uid,
          },
          data: {
            description: data?.description,
            name: data?.name,
          },
        },
      },
    });
    setEditingDescription(false);
  };

  const onSocialSubmit = async (data) => {
    await client.mutate({
      mutation: UPDATE_USER,
      variables: {
        input: {
          where: {
            id: user.uid,
          },
          data: {
            instragram_link: data.instragram_link,
            youtube_link: data.youtube_link,
            tiktok_link: data.tiktok_link,
            twitter_link: data.twitter_link,
            facebook_link: data.facebook_link,
          },
        },
      },
    });
    setSocialBar(false);
  };

  const onClickChangeUpdateCover = async ({ target: { files } }) => {
    setNewCover(null);
    setHaveSrc(false);
    const file = await files[0];
    setFile(file);
    if (file?.size < 500000) {
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    } else {
      const format_file = await resizeFile(file);
      let imageDataUrl = await readFile(format_file);
      setImageSrc(imageDataUrl);
    }
  };

  const onClickChangeUpdateAvatar = async ({ target: { files } }) => {
    setNewAvatar(null);
    setHaveSrcAvatar(false);

    const file = await files[0];
    setFile(file);
    if (file?.size < 500000) {
      let imageDataUrl = await readFile(file);
      setAvatarImageSrc(imageDataUrl);
    } else {
      const format_file = await resizeFile(file);
      let imageDataUrl = await readFile(format_file);
      setAvatarImageSrc(imageDataUrl);
    }
  };
  useEffect(() => {
    setUpLoadCoverAlready(false);
  }, [newCover]);

  useEffect(() => {
    setUpLoadAvatarAlready(false);
  }, [newAvatar]);

  const onClickEditProfile = () => {
    setEditingDescription(true);
  };

  const onclickCancle = async () => {
    setNewCover(null);
    setImageSrc(null);
  };
  const onClickNewImageAvter = async () => {
    setNewAvatar(null);
    setAvatarImageSrc(null);
  };

  const avartar_image = dataLink.avatar_image
    ? getPathUrl(dataLink.avatar_image.url)
    : dataLink?.image_social;

  const avartar_image_profile = profile_serverside.avatar_image
    ? getPathUrl(profile_serverside?.avatar_image?.url)
    : "/bg/defualt2.jpeg";

  const cover_image_profile = profile_serverside.cover_image
    ? getPathUrl(profile_serverside?.cover_image?.url)
    : "/bg/defualt.jpeg";

  const styleOnClick =
    "cursor-pointer bg-viewbrown hover:shadow-lg text-white hover:bg-viewbrown hover:text-white focus:bg-viewbrown focus:text-white focus:outline-none font-Times w-24 md:w-32  mr-2 px-4 p-2 rounded";
  const styleOnUnClick =
    "cursor-pointer bg-bgtag hover:shadow-lg text-textaboutus hover:bg-viewbrown hover:text-white focus:bg-viewbrown focus:text-white focus:outline-none font-Times w-24 md:w-32  mr-2 px-4 p-2 rounded";

  const onClickApprove = (event) => {
    if (event === "All") setWhere("All");
    else if (event === "Accept") setWhere("Accept");
    else if (event === "Edited") setWhere("Edited");
    else if (event === "Waiting") setWhere("Waiting");
    else {
      setWhere("All");
    }
  };

  const StatusButton = ({ name }) => {
    return (
      <button
        onClick={() => onClickApprove(name)}
        className={where === name ? styleOnClick : styleOnUnClick}
      >
        {name}
      </button>
    );
  };

  return (
    <div className=" bg-creambg max-w-screen-2xl mx-auto relative">
      <NextSeo
        title={profile_serverside.name}
        openGraph={{
          title: profile_serverside.name,
          description: profile_serverside.description,
          images: [
            {
              url: profile_serverside.avartar_image,
              width: 800,
              height: 600,
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <div>
        {upLoadingCover ? (
          <div className="h-96  w-full object-cover object-bottom">
            <Skeleton width={"100%"} height={"100%"} />
          </div>
        ) : (
          [
            newCover ? (
              <img
                className=" h-cover-360 md:h-cover  w-full object-cover object-bottom"
                src={newCover}
              ></img>
            ) : (
              [
                imageSrc ? (
                  <div>
                    <div className="relative h-cover-360 md:h-cover  w-full object-cover object-bottom">
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        aspect={3 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                      />
                    </div>
                  </div>
                ) : (
                  <img
                    className=" h-cover-360 md:h-cover  w-full object-cover  object-bottom   "
                    src={cover_image_profile}
                  ></img>
                ),
              ]
            ),
          ]
        )}

        {IsMyProfile && (
          <label
            for="button-file"
            className="absolute md:w-52 -mt-14 bg-white hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer right-4  md:right-10 flex items-center justify-end"
          >
            <svg
              className="w-6 h-6 md:mr-4  "
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            {hower ? (
              <div
                onMouseLeave={() => setHower(false)}
                className="hidden md:block text-xs"
              >
                Recommended(2160x720)
              </div>
            ) : (
              <div
                onMouseEnter={() => setHower(true)}
                className="hidden md:block "
              >
                แก้ไขรูปภาพหน้าปก
              </div>
            )}
          </label>
        )}
        {upLoadCoverAlready
          ? ""
          : [
              UserUpdateCover && (
                <div className="absolute -mt-40   cursor-pointer right-4  md:right-10 ">
                  <div>
                    <div
                      onClick={() => showCroppedImage()}
                      className="md:w-52 mb-3 text-center  bg-white hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer  items-center justify-end"
                    >
                      <svg
                        className="w-6 h-6 md:hidden"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="hidden md:block">ยืนยัน</div>
                    </div>
                    {/* {!haveSrc ? (
                      <div
                        onClick={() => showCroppedImage()}
                        className="md:w-52 mb-3 text-center  bg-white hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer  items-center justify-end"
                      >
                        <svg
                          className="w-6 h-6 md:hidden"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="hidden md:block">ยืนยัน</div>
                      </div>
                    ) : (
                      <div
                        onClick={() => onClickNewCover(file)}
                        className="md:w-52 mb-3 text-center  bg-white hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer  items-center justify-end"
                      >
                        <svg
                          className="w-6 h-6 md:hidden"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="hidden md:block">อัพเดทภาพหน้าปก</div>
                      </div>
                    )} */}

                    <div
                      onClick={() => onclickCancle()}
                      className="md:w-52   bg-white hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer  flex items-center  justify-center"
                    >
                      <svg
                        className="w-6 h-6 md:hidden "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="hidden md:block">ยกเลิก</div>
                    </div>
                  </div>
                </div>
              ),
            ]}
      </div>
      <div className="w-full  ">
        <div className="relative  flex justify-center items-center ml-40 md:ml-48 ">
          {IsMyProfile && (
            <svg
              onClick={() => setOpenMenu(!openMenu)}
              className="w-10 h-10   cursor-pointer  absolute  mt-28 bg-gray-100 rounded-full p-1.5 "
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        {upLoadingAvartar ? (
          <div className="-mt-28 md:-mt-32 mx-auto h-52 w-52 md:w-60 md:h-60 object-cover  rounded-full  z-40">
            <Skeleton width={"100%"} height={"100%"} circle={true} />
          </div>
        ) : (
          [
            newAvatar ? (
              <img
                className=" -mt-28 md:-mt-32 mx-auto h-52 w-52 md:w-60 md:h-60 object-cover  rounded-full  z-40"
                src={newAvatar}
              ></img>
            ) : (
              [
                avatarimageSrc ? (
                  <div>
                    <div className="relative -mt-28 md:-mt-32 mx-auto h-52 w-52 md:w-60 md:h-60 object-cover  rounded-full  z-40">
                      <Cropper
                        image={avatarimageSrc}
                        crop={crop}
                        aspect={1}
                        cropShape="round"
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                      />
                    </div>
                  </div>
                ) : (
                  <img
                    className=" -mt-28 md:-mt-32 mx-auto h-52 w-52 md:w-60 md:h-60 object-cover  rounded-full  z-40"
                    src={avartar_image_profile}
                  ></img>
                ),
              ]
            ),
          ]
        )}
      </div>
      {openMenu ? (
        <div className="w-52 bg-white  p-2 rounded-lg shadow-md max-w-xs break-all absolute  left-1/2 transform -translate-x-1/2 ">
          <div className="flex flex-col items-center ">
            <div
              onClick={() => setOpen(true)}
              className=" text-sm mt-2  cursor-pointer  py-2 hover:bg-gray-100 rounded-md w-full text-center"
            >
              ดูรูปโปรไฟล์
            </div>
            <Image_Pop_Up
              image={
                dataLink?.avatar_image
                  ? getPathUrl(dataLink?.avatar_image?.url)
                  : "/bg/defualt.jpeg"
              }
              setOpen={setOpen}
              open={open}
            />
            {IsMyProfile ? (
              <label
                for="button-file-avatar"
                className=" text-sm mt-2  cursor-pointer  py-2 hover:bg-gray-100 rounded-md w-full text-center"
              >
                {howerAvatar ? (
                  <div onMouseLeave={() => setHowerAvatar(false)}>
                    Recommended(1024x1024)
                  </div>
                ) : (
                  <div onMouseEnter={() => setHowerAvatar(true)}>
                    เลือกภาพโปรไฟล์
                  </div>
                )}
              </label>
            ) : (
              ""
            )}
            {upLoadAvatarAlready
              ? ""
              : [
                  UserUpdateProfile && (
                    <div className="w-full">
                      <div
                        onClick={() => AvatarshowCroppedImage()}
                        className=" text-sm mt-2  cursor-pointer  py-2 hover:bg-gray-100 rounded-md w-full text-center"
                      >
                        ยืนยัน
                      </div>
                      {/* {!haveSrcAvatar ? (
                        <div
                          onClick={() => AvatarshowCroppedImage()}
                          className=" text-sm mt-2  cursor-pointer  py-2 hover:bg-gray-100 rounded-md w-full text-center"
                        >
                          ยืนยัน
                        </div>
                      ) : (
                        <div
                          onClick={() => onClickNewAvatar(file)}
                          className=" text-sm mt-2  cursor-pointer  py-2 hover:bg-gray-100 rounded-md w-full text-center"
                        >
                          อัพโหลดรูปโปรไฟล์
                        </div>
                      )} */}
                      <div
                        onClick={() => onClickNewImageAvter()}
                        className=" text-sm mt-2  cursor-pointer  py-2 hover:bg-gray-100 rounded-md w-full text-center"
                      >
                        ยกเลิก
                      </div>
                    </div>
                  ),
                ]}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="px-4 md:px-8 lg:px-16 pt-20">
        {IsMyProfile ? (
          <div className="flex justify-end  text-xl  text-orangetext">
            <Link href={`/profiles/create`}>
              <div className="flex font-bold cursor-pointer font-Times">
                Add Blog
                <svg
                  className="w-6 h-6 ml-3"
                  fill="#D1733D"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          </div>
        ) : (
          ""
        )}
        {editingDescription ? (
          <div className=" flex justify-center items-center">
            <Text_Field useRegister={register} name="name" placeholder="name" />
          </div>
        ) : (
          <div className="text-center   text-orangetext text-4xl uppercase font-Times mt-10 ">
            {watch("name")}
            {/* {profile_name} */}
          </div>
        )}

        {editingDescription ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" p-4 flex justify-center items-center font-light  text-textaboutus  ">
              <div className="flex flex-col justify-start items-start w-full md:w-4/5  lg:w-3/5  xl:w-2/5">
                <div className="mb-2 text-center mx-auto">Description</div>
                <textarea
                  className="p-2 rounded-md w-full shadow-sm"
                  placeholder="Description"
                  {...register("description", {})}
                />
              </div>
            </div>
            <div className="w-full mx-auto text-center">
              <button
                className="mx-auto text-center justify-center bg-white shadow-md rounded-md p-2"
                type="submit"
              >
                ยืนยัน
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="text-center my-10 w-4/5 xl:w-2/3 mx-auto    text-textaboutus   font-light font-Times ">
              {watch("description")}
              {/* {profile_description} */}
            </div>
            {IsMyProfile && (
              <div
                onClick={onClickEditProfile}
                className="bg-white shadow-md p-2 rounded-md w-12 text-center cursor-pointer mx-auto mb-4"
              >
                แก้ไข
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between    items-center">
          <div className="text-center   text-orangetext text-lg  uppercase font-Times ">
            STAY CONNECTED
          </div>
          <div>
            <div className="flex flex-col  justify-center lg:justify-end  gap-4 items-end mt-4">
              <div>
                {IsMyProfile && (
                  <div
                    onClick={() => setSocialBar(!socialBar)}
                    className=" mt-2 bg-white hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer  flex items-center justify-end"
                  >
                    <img
                      className="w-6 h-6 mr-4"
                      src="https://image.flaticon.com/icons/png/512/4187/4187272.png"
                    />
                    <div className=" text-sm font-sans font-semibold   ">
                      Update Social Media
                    </div>
                  </div>
                )}
              </div>
              {socialBar && (
                <div className="bg-white rounded-lg p-4 flex flex-col justify-end items-end">
                  <form onSubmit={handleSubmit(onSocialSubmit)}>
                    <div className=" flex justify-center items-center">
                      <img
                        className="w-6 h-6 rounded mr-2"
                        src="../whatwedo/fb.png"
                      />

                      <Text_Field
                        useRegister={register}
                        name="facebook_link"
                        placeholder="facebook_link"
                      />
                    </div>
                    <div className=" flex justify-center items-center">
                      <img
                        className="w-6 h-6 rounded mr-2"
                        src="../whatwedo/ig.png"
                      />

                      <Text_Field
                        useRegister={register}
                        name="instragram_link"
                        placeholder="Instagram Link"
                      />
                    </div>
                    <div className=" flex justify-center items-center">
                      <img
                        className="  w-6 h-6 rounded-lg mr-2"
                        src="../whatwedo/twitter.png"
                      />

                      <Text_Field
                        useRegister={register}
                        name="twitter_link"
                        placeholder="twitter_link"
                      />
                    </div>
                    <div className=" flex justify-center items-center">
                      <img
                        className="  w-6 h-6 rounded-lg mr-2"
                        src="../whatwedo/tiktok.png"
                      />

                      <Text_Field
                        useRegister={register}
                        name="tiktok_link"
                        placeholder="tiktok_link"
                      />
                    </div>
                    <div className=" flex justify-center items-center">
                      <img
                        className="  w-6 h-6 rounded-lg mr-2"
                        src="../whatwedo/youtube.png"
                      />

                      <Text_Field
                        useRegister={register}
                        name="youtube_link"
                        placeholder="youtube_link"
                      />
                    </div>

                    <button
                      className=" flex justify-center items-center cursor-pointer p-2 px-4 bg-textaboutus text-white rounded-md text-sm mt-4 w-full"
                      type="submit"
                    >
                      ยืนยัน
                    </button>
                  </form>
                </div>
              )}

              {UserUpdateSocial
                ? ""
                : [
                    <div className="flex">
                      {Check_Link(watch("facebook_link")) && (
                        <div>
                          <a
                            className="cursor-pointer mx-2"
                            href={Check_Https(watch("facebook_link"))}
                            target="_blank"
                          >
                            <img
                              className="w-6 h-6 rounded mr-2"
                              src="../whatwedo/fb.png"
                            />
                          </a>
                        </div>
                      )}
                      {Check_Link(watch("instragram_link")) && (
                        <div>
                          <a
                            className="cursor-pointer mx-2"
                            href={Check_Https(watch("instragram_link"))}
                            target="_blank"
                          >
                            <img
                              className="w-6 h-6 rounded mr-2"
                              src="../whatwedo/ig.png"
                            />
                          </a>
                        </div>
                      )}
                      {Check_Link(watch("twitter_link")) && (
                        <div>
                          <a
                            className="cursor-pointer mx-2"
                            href={Check_Https(watch("twitter_link"))}
                            target="_blank"
                          >
                            <img
                              className="  w-6 h-6 rounded-lg mr-2"
                              src="../whatwedo/twitter.png"
                            />
                          </a>
                        </div>
                      )}
                      {Check_Link(watch("tiktok_link")) && (
                        <div>
                          <a
                            className="cursor-pointer mx-2"
                            href={Check_Https(watch("tiktok_link"))}
                            target="_blank"
                          >
                            <img
                              className="  w-6 h-6 rounded-lg mr-2"
                              src="../whatwedo/tiktok.png"
                            />
                          </a>
                        </div>
                      )}
                      {Check_Link(watch("youtube_link")) && (
                        <div>
                          <a
                            className="cursor-pointer mx-2"
                            href={Check_Https(watch("youtube_link"))}
                            target="_blank"
                          >
                            <img
                              className="  w-6 h-6 rounded-lg mr-2"
                              src="../whatwedo/youtube.png"
                            />
                          </a>
                        </div>
                      )}
                    </div>,
                  ]}
            </div>
          </div>
        </div>
        <div className=" border-b border-orangetext my-10"></div>
        <div className="text-center   text-orangetext text-3xl font-bold  uppercase font-Times my-10 ">
          Blogs
        </div>
        {IsMyProfile && (
          <div className="flex justify-start items-center">
            <StatusButton name="All" index={0} />
            <StatusButton name="Accept" index={1} />
            <StatusButton name="Edited" index={2} />
            <StatusButton name="Waiting" index={3} />
          </div>
        )}

        <div className="  border-b border-orangetext my-10 "></div>
        <div className="pb-20 grid grid-cols-1 gap-4 mt-4">
          <BlogSession
            profile_id={user_form_router}
            status="true"
            approve={IsMyProfile ? where : "Accept"}
          />
        </div>
      </div>
      <input
        accept="image/jpeg,image/gif,image/png"
        className="hidden"
        id="button-file"
        type="file"
        onChange={onClickChangeUpdateCover}
      />
      <input
        accept="image/jpeg,image/gif,image/png"
        className="hidden"
        id="button-file-avatar"
        type="file"
        onChange={onClickChangeUpdateAvatar}
      />
    </div>
  );
};
export async function getServerSideProps(context) {
  const { client } = ApolloClient();
  const { profile } = context.query;

  const { data } = await client.query({
    query: QUERY_PROFILE,
    variables: {
      id: profile,
    },
  });
  return {
    props: {
      profile_serverside: data?.user,
    },
  };
}
export default Profile;
