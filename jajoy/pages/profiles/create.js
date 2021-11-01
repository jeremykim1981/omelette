import React, { useState, useCallback, useEffect, useRef } from "react";
import { useFileUpload } from "use-file-upload";
import { useRouter } from "next/router";
import BlogHeader from "../../component/BlogHeader";

import useAuth from "../../hooks/useAuth";
import { getPathUrl } from "../../utils/getPathUrl";
import { EngDate, getFetchBlob, uploadFile } from "../../function/functions";

import FormCreate from "../../component/FormCreate";
import ApolloClient from "../../apollo/apolloClient";
import { CREAT_BLOG } from "../../apollo/mutation/creatComments";
import CelesPopUp from "../../lib/CelesPopUp";
import { QUERY_RULE } from "../../apollo/queries/queryBlog";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const marginStyle = "mx-2 md:mx-4";

const Create = () => {
  const { client } = ApolloClient();
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState();
  const [content, setContent] = useState();
  const [preview, setPreview] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [upLoading, setUpLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [rule, setRule] = useState("");
  const [error, setError] = useState(false);
  const [file, setFile] = useState([]);

  useEffect(() => {
    if (error == true) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (!user) {
      return router.push("/login");
    }
  }, []);

  useEffect(async () => {
    const { data } = await client.query({
      query: QUERY_RULE,
    });
    setRule(data?.rule?.rule);
  }, []);

  const onCreateBlog = async () => {
    if (
      form?.title?.length > 0 &&
      form?.description?.length > 0 &&
      content?.length > 0 &&
      form?.type?.length > 0 &&
      file?.size > 0
    ) {
      try {
        const blob = await getFetchBlob(croppedImage);
        const userId = localStorage.getItem("uid");
        setUpLoading(true);
        const { data } = await client.mutate({
          mutation: CREAT_BLOG,
          variables: {
            input: {
              data: {
                users_permissions_user: userId,
                title: form?.title,
                description: form?.description,
                content: content,
                type: form?.type,
              },
            },
          },
        });
        const { id } = data?.createBlog?.blog;
        const formDataUpload = new FormData();
        formDataUpload.append("refId", id);
        formDataUpload.append("ref", "blog");
        formDataUpload.append("field", "image");
        formDataUpload.append("files", blob, `BLOG_${new Date().getTime()}`);
        await uploadFile(formDataUpload);
        setUpLoading(false);
        router.push(`/`);
      } catch (error) {}
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-creambg font-Times text-3xl text-textaboutus mx-auto break-all">
      <div className=" font-Times text-5xl pt-20 mb-20 text-center ">BLOG</div>
      <CelesPopUp
        choose="true"
        open={open}
        setOpen={setOpen}
        choose1="ยืนยัน"
        // choose2="ยกเลิก"
        html={rule}
        onfunction={() => setOpen(false)}
      />
      {preview ? (
        <div className="px-4 md:px-8 lg:px-16  bg-white py-20 max-w-screen-2xl mx-auto">
          <BlogHeader name={form?.title} />
          <div className="mt-20 mb-6 flex flex-col md:flex-row justify-start md:justify-between md:items-center">
            <div className="flex justify-start items-center">
              <div className={marginStyle}>
                <img
                  className="w-14 h-14 md:w-20 md:h-20 object-cover  rounded-full"
                  src={
                    user?.avatar_image
                      ? getPathUrl(user?.avatar_image?.url)
                      : user?.image_social || "/bg/defualt.jpeg"
                  }
                ></img>
              </div>
              <div
                className={
                  { marginStyle } +
                  " cursor-pointer text-textaboutus text-xl  font-light"
                }
              >
                {user?.name}
              </div>
            </div>
            <div className="flex justify-start md:justify-end items-center cursor-pointer text-textaboutus  font-light mt-4 md:mt-0 text-sm md:text-base">
              <div className={marginStyle}>{EngDate(new Date())}</div>
              <div className={marginStyle}>
                <div className="flex items-center text-textaboutus ">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="#7E6252"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  0
                </div>
              </div>
              <div className="flex items-center">
                <div className={marginStyle + " flex"}>
                  <img className="w-6 h-6 mr-2" src="../icon/comment.png" />
                  <div className="mr-2"> 0 </div>
                </div>
                <div className={marginStyle + " flex"}>
                  <img className="w-6 h-6 mr-2 " src="../icon/like.png" />
                  <div>0</div>
                </div>
              </div>
            </div>
          </div>
          {file ? <img className="w-full h-full" src={croppedImage} /> : ""}
          <div className="text-center  my-10 font-bold   text-textaboutus text-2xl uppercase font-Times ">
            {form?.description}
          </div>
          {/* <div className="px-4 md:px-8 lg:px-16  bg-white py-20 max-w-screen-2xl mx-auto"> */}
          <SunEditor
            hideToolbar={true}
            disableToolbar={true}
            defaultValue={content}
            disable={true}
            enableToolbar={false}
            showToolbar={false}
            // setContents={content}
            width="100%"
            height="100%"
            setOptions={{
              buttonList: [],
            }}
          />
          {/* </div> */}
        </div>
      ) : (
        <div>
          <FormCreate
            create="create"
            setForm={setForm}
            form={form}
            content={content}
            setContent={setContent}
            setFile={setFile}
            file={file}
            setCroppedImage={setCroppedImage}
            croppedImage={croppedImage}
          />
        </div>
      )}

      <div className="text-center font-Times text-3xl text-textaboutus px-4 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
        {error && (
          <div className="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2 text-sm w-full md:w-2/3 mx-auto my-4">
            <div className="text-red-500 rounded-full bg-white mr-3">
              <svg
                width="1.8em"
                height="1.8em"
                viewBox="0 0 16 16"
                className="bi bi-x"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                />
              </svg>
            </div>

            <div className="text-white max-w-xs ">โปรดกรอกข้อมูลไม่ครบถ้วน</div>
          </div>
        )}
        {upLoading ? (
          <button
            type="button"
            className="bg-gray-500 text-white font-Times p-3  w-40  text-lg font-semibold rounded-lg my-8 mb-20"
          >
            UPLOADING...
          </button>
        ) : (
          <div className="flex justify-center">
            {preview ? (
              <button
                type="button"
                className="bg-textaboutus text-white font-Times p-3  w-40 cursor-pointer text-lg font-semibold rounded-lg my-8 mb-20 mx-2"
                onClick={() => setPreview(false)}
              >
                แก้ไข
              </button>
            ) : (
              <button
                type="button"
                className="bg-textaboutus text-white font-Times p-3  w-40 cursor-pointer text-lg font-semibold rounded-lg my-8 mb-20 mx-2"
                onClick={() => setPreview(true)}
              >
                Preview
              </button>
            )}
            <button
              type="button"
              className="bg-textaboutus text-white font-Times p-3  w-40 cursor-pointer text-lg font-semibold rounded-lg my-8 mb-20 mx-2"
              onClick={onCreateBlog}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Create;
