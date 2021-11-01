import React, { useState, useEffect, useRef } from "react";
import ApolloClient from "../apollo/apolloClient";
import useAuth from "../hooks/useAuth";
import {
  CREAT_COMMENT,
  CREAT_REPLY_COMMENT,
  UPDATE_NOTIFICATION,
} from "../apollo/mutation/creatComments";
import { QUERY_COMMENT } from "../apollo/queries/queryBlogger";
import { timeDifference } from "../function/functions";
import { getPathUrl } from "../utils/getPathUrl";
import {
  DELETE_COMMENT,
  DELETE_REPLY_COMMENT,
} from "../apollo/mutation/deleteBlog";
import DeleteModal from "./DeleteModal";

const Comment = ({ blogId, owner, setCommentCount }) => {
  const { isAuth, user, setUser } = useAuth();
  const [getComment, setGetComment] = useState("");
  const [getReplyComment, setGetReplyComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComment, setShowComment] = useState(5);
  const { client } = ApolloClient();
  const [reply, setReply] = useState(false);
  const [popCon, setPopCon] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const cancelButtonRef = useRef(null);

  const DeleteMain = async (id) => {
    return (
      await client.mutate({
        mutation: DELETE_COMMENT,
        variables: {
          input: {
            where: {
              id: id,
            },
          },
        },
      }),
      setPopCon(false),
      setDeleteId(),
      loadComment()
    );
  };
  const DeleteSub = async (id) => {
    return (
      await client.mutate({
        mutation: DELETE_REPLY_COMMENT,
        variables: {
          input: {
            where: {
              id: id,
            },
          },
        },
      }),
      setPopCon(false),
      setDeleteId(),
      loadComment()
    );
  };

  const onClickDelete = (comment) => {
    if (!comment || undefined || null) return;
    setDeleteId(comment);
    setPopCon(true);
  };

  const sentNotification = async () => {
    if (user?.uid === owner) return;
    await client.mutate({
      mutation: UPDATE_NOTIFICATION,
      variables: { id: owner },
    });
  };

  const handleCommentChange = (e) => {
    setGetComment(e?.target?.value);
  };
  const handleReplyCommentChange = (e) => {
    setGetReplyComment(e?.target?.value);
  };
  const loadComment = async () => {
    const { data } = await client.query({
      query: QUERY_COMMENT,
      variables: {
        id: blogId,
      },
    });
    setComments(data?.blog?.comments);
    setCommentCount(data?.blog?.comments?.length);
  };

  useEffect(() => {
    if (blogId) {
      loadComment();
    }
  }, [blogId]);

  const amount_of_comment = comments?.length;
  const clickViewMore = () => {
    setShowComment((prev) => prev + 5);
  };
  const isNoMoreComment = showComment >= amount_of_comment;

  const onSubmitComment = async () => {
    if (getComment.length > 0) {
      const userId = localStorage.getItem("uid");
      await client.mutate({
        mutation: CREAT_COMMENT,
        variables: {
          input: {
            data: {
              users_permissions_user: userId,
              blog: blogId,
              comment: getComment,
            },
          },
        },
      });
      setGetComment("");
      await sentNotification();
      loadComment();
    }
  };

  const onSubmitReplyComment = async (comment_id) => {
    if (getReplyComment.length > 0) {
      const userId = localStorage.getItem("uid");
      await client.mutate({
        mutation: CREAT_REPLY_COMMENT,
        variables: {
          input: {
            data: {
              users_permissions_user: userId,
              comment: comment_id,
              text: getReplyComment,
            },
          },
        },
      });
      setGetReplyComment("");
      await sentNotification();
      loadComment();
    }
    return;
  };

  return (
    <div className="mt-10 ">
      {isAuth ? (
        <div className=" bg-bgtag rounded-md text-lg font-bold   text-textbrown font-Times py-4 px-6 md:px-10">
          Comment
          <div className=" bg-creambg rounded-md mt-6   comment   ">
            <div className=" text-textgray flex justify-between items-center py-2 px-4 font-Times font-light text-sm ">
              <textarea
                placeholder="Write a comment..."
                onChange={(e) => handleCommentChange(e)}
                value={getComment}
                className="w-full mt-4 p-2 outline-none rounded-md  text-gray-700 border border-gray-200 mb-2"
              />
              <button
                onClick={onSubmitComment}
                className=" text-textbrown bg-bgtag  nm-flat-bgtag-sm rounded-md p-2 px-4 font-Times text-xs shadow-md cursor-pointer ml-2"
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      ) : (
        "โปรด Sign-In เพื่อ แสดงความคิดเห็น"
      )}
      <div className="flex justify-between text-textbrown my-10">
        <div className=" font-Times">Recent comments</div>
        <div className=" font-Times">All comments : {comments?.length}</div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {/* ---------------------------------------------------------------------- */}
        {comments?.slice(0, showComment)?.map((comment, index) => {
          return (
            <div className="text-textaboutus text-sm border   border-navtext border-opacity-50  rounded-xl p-4 ">
              <div className="flex  justify-between  items-start md:items-center">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10  object-cover rounded-full   "
                    src={
                      comment?.users_permissions_user?.avatar_image
                        ? getPathUrl(
                            comment?.users_permissions_user?.avatar_image?.url
                          )
                        : comment?.users_permissions_user?.image_social
                    }
                  />
                  <div className="  font-semibold font-Times ml-3 line-clamp-1">
                    <div className=" font-Times  ">
                      {comment?.users_permissions_user?.name}
                    </div>
                  </div>
                </div>
                <div className="text-xs md:text-sm flex items-center  my-auto  ">
                  <svg
                    className="w-4 h-4 mr-2 md:mr-4"
                    fill="#7E6252"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="line-clamp-1">
                    {timeDifference(
                      new Date().getTime(),
                      new Date(comment?.createdAt).getTime()
                    )}
                  </div>
                </div>
              </div>

              <div className="ml-0 md:ml-12 font-Times pb-1 pt-2 px-2 rounded-lg my-2 border border-dashed flex justify-between">
                <div className=""> {comment?.comment}</div>
                {user?.uid === owner ||
                user?.uid === comment?.users_permissions_user?.id ? (
                  <div>
                    <svg
                      onClick={() => onClickDelete(comment)}
                      xmlns="http://www.w3.org/2000/svg"
                      className=" h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {deleteId?.__typename === "Comment" && (
                      <DeleteModal
                        cancelButtonRef={cancelButtonRef}
                        popCon={popCon}
                        setPopCon={setPopCon}
                        functionDelete={DeleteMain}
                        deleteId={deleteId}
                      />
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {comment?.replies?.length > 0 ? (
                <div className="border-navtext border-opacity-50  rounded-xl p-2 border border-dashed  h-auto ml-0 md:ml-12">
                  <div className="font-Times  rounded-lg px-3 py-2 ">
                    {comment?.replies?.map((comment) => {
                      return (
                        <div className="w-full">
                          <div className="flex  justify-start md:justify-between items-start md:items-center">
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10  object-cover rounded-full   "
                                src={
                                  comment?.users_permissions_user?.avatar_image
                                    ? getPathUrl(
                                        comment?.users_permissions_user
                                          ?.avatar_image?.url
                                      )
                                    : comment?.users_permissions_user
                                        ?.image_social
                                }
                              />
                              <div className="  font-semibold font-Times ml-3 line-clamp-1">
                                <div className=" font-Times  ">
                                  {comment?.users_permissions_user?.name}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs md:text-sm flex items-center  my-auto  ">
                              <svg
                                className="w-4 h-4 mr-2 md:mr-4"
                                fill="#7E6252"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <div className="line-clamp-1">
                                {timeDifference(
                                  new Date().getTime(),
                                  new Date(comment?.createdAt).getTime()
                                )}
                              </div>
                            </div>
                          </div>
                          <div className=" font-Times pb-1 pt-2 px-2 rounded-lg my-4 border border-dashed flex justify-between">
                            {comment?.text}
                            {user?.uid === owner ||
                            user?.uid ===
                              comment?.users_permissions_user?.id ? (
                              <div>
                                <svg
                                  onClick={() => onClickDelete(comment)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className=" h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                {deleteId?.__typename === "Reply" && (
                                  <DeleteModal
                                    cancelButtonRef={cancelButtonRef}
                                    popCon={popCon}
                                    setPopCon={setPopCon}
                                    functionDelete={DeleteSub}
                                    deleteId={deleteId}
                                  />
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {isAuth
                      ? [
                          reply === index ? (
                            <div className=" text-textgray  grid grid-cols-1 md:flex md:justify-between items-center font-Times font-light text-sm">
                              <textarea
                                placeholder="Write a comment..."
                                onChange={(e) => handleReplyCommentChange(e)}
                                value={getReplyComment}
                                className="w-full mt-4 p-2 outline-none rounded-md  text-gray-700 border border-gray-200 mb-2"
                              />
                              <button
                                onClick={() => setReply(false)}
                                className=" text-textbrown bg-bgtag  nm-flat-bgtag-sm rounded-md p-2 px-4 font-Times text-xs shadow-md cursor-pointer ml-2 my-2 md:my-0"
                              >
                                ยกเลิก
                              </button>
                              <button
                                onClick={() =>
                                  onSubmitReplyComment(comment?.id)
                                }
                                className=" text-textbrown bg-bgtag  nm-flat-bgtag-sm rounded-md p-2 px-4 font-Times text-xs shadow-md cursor-pointer ml-2 my-2 md:my-0"
                              >
                                ส่ง
                              </button>
                            </div>
                          ) : (
                            <div
                              className="cursor-pointer ml-4 mt-6"
                              onClick={() => setReply(index)}
                            >
                              ตอบกลับ
                            </div>
                          ),
                        ]
                      : ""}
                  </div>
                </div>
              ) : (
                [
                  isAuth
                    ? [
                        reply === index ? (
                          <div className=" text-textgray grid grid-cols-1 md:flex md:justify-between items-center font-Times font-light text-sm">
                            <textarea
                              placeholder="Write a comment..."
                              onChange={(e) => handleReplyCommentChange(e)}
                              value={getReplyComment}
                              className="ml-0 md:ml-12 w-full mt-4 p-2 outline-none rounded-md  text-gray-700 border border-gray-200 mb-2"
                            />
                            <button
                              onClick={() => setReply(false)}
                              className=" text-textbrown bg-bgtag  nm-flat-bgtag-sm rounded-md p-2 px-4 font-Times text-xs shadow-md cursor-pointer ml-2 my-2 md:my-0 "
                            >
                              ยกเลิก
                            </button>
                            <button
                              onClick={() => onSubmitReplyComment(comment?.id)}
                              className=" text-textbrown bg-bgtag  nm-flat-bgtag-sm rounded-md p-2 px-4 font-Times text-xs shadow-md cursor-pointer ml-2 my-2 md:my-0"
                            >
                              ส่ง
                            </button>
                          </div>
                        ) : (
                          <div
                            className="cursor-pointer ml-0 md:ml-12 mt-4"
                            onClick={() => setReply(index)}
                          >
                            ตอบกลับ
                          </div>
                        ),
                      ]
                    : "",
                ]
              )}
            </div>
          );
        })}
        {/* ---------------------------------------------------------------------- */}
      </div>
      <div className="flex justify-center items-center ">
        {isNoMoreComment ? (
          ""
        ) : (
          <button
            onClick={clickViewMore}
            className=" border text-sm hover:shadow-lg cursor-pointer  font-Times  flex justify-center p-2 mt-4 text-textaboutus border-textaboutus rounded-md border-opacity-50 "
          >
            VIEW MORE COMMENTS
          </button>
        )}
      </div>
    </div>
  );
};
export default Comment;
