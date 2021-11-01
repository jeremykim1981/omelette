import { EngDate } from "../function/functions";
import { getPathUrl } from "../utils/getPathUrl";
import BlogHeader from "./BlogHeader";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { UPDATE_CROWN } from "../apollo/mutation/crown";
import ApolloClient from "../apollo/apolloClient";
import React, { useState } from "react";
import QUERY_LIKE from "../apollo/queries/queryLike";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const marginStyle = "mx-2 md:mx-4";

const FormBlog = ({ dataBlog, commentCount = "0" }) => {
  const { isAuth, user } = useAuth();
  const { client } = ApolloClient();
  const [givedCrown, setGivedCrown] = useState(false);
  const [dataLike, setDataLike] = useState(0);

  const onClickUpdateCrown = async () => {
    setGivedCrown(!givedCrown);
    await client.mutate({
      mutation: UPDATE_CROWN,
      variables: {
        userId: user?.uid,
        blogId: dataBlog?.id,
      },
    });
    await queryLike();
  };

  const queryLike = async () => {
    const { data } = await client.query({
      query: QUERY_LIKE,
      variables: {
        where: {
          blogId: dataBlog.id,
        },
      },
    });
    const likes = data.likes;
    // setGivedCrown(likes.some((like) => like.userId === user?.uid));
    setDataLike(likes);
  };
  return (
    <div>
      <BlogHeader name={dataBlog.title} />
      <div className="mt-20 mb-6 flex flex-col md:flex-row justify-start md:justify-between md:items-center">
        <div className="flex justify-start items-center">
          <div className={marginStyle}>
            <img
              className="w-14 h-14 md:w-20 md:h-20 object-cover  rounded-full"
              src={
                dataBlog.users_permissions_user.avatar_image
                  ? getPathUrl(dataBlog.users_permissions_user.avatar_image.url)
                  : dataBlog.users_permissions_user.image_social
              }
            ></img>
          </div>
          <Link href={`/profiles/${dataBlog.users_permissions_user.id}`}>
            <div
              className={
                { marginStyle } + " cursor-pointer text-textaboutus  font-light"
              }
            >
              {dataBlog.users_permissions_user.name}
            </div>
          </Link>
        </div>
        {/* <div className="flex justify-start md:justify-end items-center cursor-pointer text-textaboutus  font-light mt-4 md:mt-0 text-sm md:text-base"> */}
        <div>
          <div className={marginStyle}>{EngDate(dataBlog.createdAt)}</div>
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
              {dataBlog.count_view}
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
      <img className=" mx-auto  " src={getPathUrl(dataBlog.image.url)} />
      <div className=" my-10 font-bold text-center  text-textaboutus text-2xl uppercase font-Times ">
        {dataBlog.description}
      </div>

      <SunEditor
        hideToolbar={true}
        disableToolbar={true}
        defaultValue={content}
        disable={true}
        enableToolbar={false}
        showToolbar={false}
        setContents={content}
        width="100%"
        height="100%"
        setOptions={{
          buttonList: [],
        }}
      />
    </div>
  );
};
export default FormBlog;
