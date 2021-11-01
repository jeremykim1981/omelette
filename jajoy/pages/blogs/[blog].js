import Link from "next/link";
import {
  QUERY_BLOGGER,
  UPDATE_BLOGGER,
} from "../../apollo/queries/queryBlogger";
import BlogHeader from "../../component/BlogHeader";
import ApolloClient from "../../apollo/apolloClient";
import { EngDate, getFetchBlob, uploadFile } from "../../function/functions";
import Comment from "../../component/Comment";
import { getPathUrl } from "../../utils/getPathUrl";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { NextSeo } from "next-seo";

import React, { useEffect, useState } from "react";
import { UPDATE_CROWN } from "../../apollo/mutation/crown";
import useAuth from "../../hooks/useAuth";
import QUERY_LIKE from "../../apollo/queries/queryLike";
import FormCreate from "../../component/FormCreate";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const marginStyle = "mx-2 md:mx-4";

const Blog = ({ blog_serverside }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: blog_serverside.title,
    description: blog_serverside.description,
    type: blog_serverside.type,
    name: blog_serverside.name,
  });
  const [dataBlog, setDataBlog] = useState(blog_serverside);
  const [file, setFile] = useState([]);
  const { client } = ApolloClient();
  const { isAuth, user } = useAuth();
  const [givedCrown, setGivedCrown] = useState(false);
  const [dataLike, setDataLike] = useState([]);
  const [loadingLike, setLoadingLike] = useState(true);
  const [content, setContent] = useState(dataBlog?.content);
  const [errorLike, setErrorLike] = useState(null);
  const [editing, setEditng] = useState(false);
  const [loadingEditing, setLoadingEditing] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const isMyBlog = user?.uid === blog_serverside.users_permissions_user.id;
  const [croppedImage, setCroppedImage] = useState(
    getPathUrl(dataBlog?.image?.url)
  );
  const [commentCount, setCommentCount] = useState(0);

  useEffect(async () => {
    if (blog_serverside.approve === "Waiting") {
      router.push("/");
    }
    if (blog_serverside.approve === "Edited") {
      if (!isMyBlog) {
        router.push("/");
      }
    }
    const blocksFromHTML = convertFromHTML(blog_serverside?.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
    try {
      setLoadingLike(true);
      await queryLike();
    } catch (error) {
      setErrorLike(error);
    } finally {
      setLoadingLike(false);
    }
  }, []);

  const queryLike = async () => {
    const { data } = await client.query({
      query: QUERY_LIKE,
      variables: {
        where: {
          blogId: blog_serverside.id,
        },
      },
    });
    const likes = data.likes;
    setGivedCrown(likes.some((like) => like.userId === user?.uid));
    setDataLike(likes);
  };

  const onClickUpdateCrown = async () => {
    setGivedCrown(!givedCrown);
    await client.mutate({
      mutation: UPDATE_CROWN,
      variables: {
        userId: user?.uid,
        blogId: blog_serverside.id,
      },
    });
    await queryLike();
  };

  const onClicksubmitEditing = async () => {
    setLoadingEditing(true);
    const blob = await getFetchBlob(croppedImage);
    if (file) {
      const formDataUpload = new FormData();
      formDataUpload.append("refId", user?.uid);
      formDataUpload.append("ref", "blog");
      formDataUpload.append("field", "image");
      formDataUpload.append("files", blob, `BLOG_${new Date().getTime()}`);
      var dataUpload = await uploadFile(formDataUpload);
    }
    await client.mutate({
      mutation: UPDATE_BLOGGER,
      variables: {
        input: {
          where: {
            id: blog_serverside.id,
          },
          data: {
            title: form?.title,
            description: form?.description,
            content: content,
            type: form?.type,
            approve: "Edited",
            image: dataUpload ? dataUpload.data[0].id : dataBlog?.image.id,
            edit: "edited",
          },
        },
      },
    });
    setEditng(false);
    setLoadingEditing(false);
    router.push("/");
    // await queryBlog();
  };

  return (
    <div className="px-4 md:px-8 lg:px-16  bg-white py-20 max-w-screen-2xl mx-auto">
      <NextSeo
        title={blog_serverside.title}
        openGraph={{
          title: blog_serverside.title,
          description: blog_serverside.description,
          images: [
            {
              url: getPathUrl(blog_serverside?.image?.url),
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
      {isMyBlog && [
        editing ? (
          <div
            onClick={() => setEditng(false)}
            className="bg-gray-200 w-16 p-1 text-center ml-auto cursor-pointer rounded-md mb-4"
          >
            ยกเลิก
          </div>
        ) : (
          <div
            onClick={() => setEditng(true)}
            className="bg-gray-200 w-16 p-1 text-center ml-auto cursor-pointer rounded-md mb-4"
          >
            แก้ไข
          </div>
        ),
      ]}

      {editing ? (
        <div className="">
          <FormCreate
            create="update"
            setForm={setForm}
            form={form}
            content={content}
            setContent={setContent}
            file={file}
            setFile={setFile}
            setCroppedImage={setCroppedImage}
            croppedImage={croppedImage}
          />

          {loadingEditing ? (
            <div className="text-center bg-gray-200 p-2 rounded-md text-base cursor-pointer mt-4 mx-auto">
              กำลังอัพโหลด....
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <div
                className="bg-gray-200 p-2 mx-2 rounded-md text-base cursor-pointer"
                onClick={() => setEditng(false)}
              >
                ยกเลิก
              </div>
              <div
                className="bg-gray-200 p-2 mx-2 rounded-md text-base cursor-pointer"
                onClick={onClicksubmitEditing}
              >
                ยืนยัน
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <BlogHeader name={dataBlog?.title} />
          <div className="mt-20 mb-6 flex flex-col md:flex-row justify-start md:justify-between md:items-center">
            <div className="flex justify-start items-center">
              <div className={marginStyle}>
                <img
                  className="w-14 h-14 md:w-20 md:h-20 object-cover  rounded-full"
                  src={
                    dataBlog?.users_permissions_user.avatar_image
                      ? getPathUrl(
                          dataBlog?.users_permissions_user.avatar_image.url
                        )
                      : dataBlog?.users_permissions_user.image_social
                  }
                ></img>
              </div>
              <Link href={`/profiles/${dataBlog?.users_permissions_user.id}`}>
                <div
                  className={
                    { marginStyle } +
                    " cursor-pointer text-textaboutus  font-light"
                  }
                >
                  {dataBlog?.users_permissions_user.name}
                </div>
              </Link>
            </div>
            <div className="flex justify-start md:justify-end items-center cursor-pointer text-textaboutus  font-light mt-4 md:mt-0 text-sm md:text-base">
              <div className={marginStyle}>{EngDate(dataBlog?.createdAt)}</div>
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
                  {dataBlog?.count_view}
                </div>
              </div>
              <div className="flex items-center">
                <div className={marginStyle + " flex"}>
                  <img className="w-6 h-6 mr-2" src="../icon/comment.png" />
                  <div className="mr-2"> {commentCount}</div>
                </div>
                {isAuth ? (
                  [
                    <div
                      onClick={onClickUpdateCrown}
                      className={marginStyle + " flex"}
                    >
                      {givedCrown ? (
                        <img className="w-6 h-6 mr-2" src="../icon/like.png" />
                      ) : (
                        <img className="w-6 h-6 mr-2" src="../icon/crown.png" />
                      )}
                      <div>{dataLike.length || 0}</div>
                    </div>,
                  ]
                ) : (
                  <div className={marginStyle + " flex"}>
                    <img className="w-6 h-6 mr-2 " src="../icon/like.png" />
                    <div>{dataLike.length || 0}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <img
            className=" w-full h-full "
            src={getPathUrl(dataBlog?.image?.url)}
          />
          <div className=" my-10 font-bold text-center  text-textaboutus text-2xl uppercase font-Times ">
            {dataBlog?.description}
          </div>
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
        </div>
      )}
      <div className=" flex justify-center items-center text-textgray mt-10"></div>
      <Comment
        blogId={dataBlog?.id}
        owner={dataBlog?.users_permissions_user.id}
        setCommentCount={setCommentCount}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { blog } = context.query;
  const { client } = ApolloClient();
  const { data } = await client.query({
    query: QUERY_BLOGGER,
    variables: {
      id: blog,
    },
  });

  return {
    props: {
      blog_serverside: data?.blog,
    },
  };
}

export default Blog;
