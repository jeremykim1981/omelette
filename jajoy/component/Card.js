import { useState, useEffect } from "react";
import ApolloClient from "../apollo/apolloClient";
import { DELETE_BLOG } from "../apollo/mutation/deleteBlog";
import Pop_Up from "../lib/CelesPopUp";
import { useRouter } from "next/router";
import QUERY_LIKE from "../apollo/queries/queryLike";
import classNames from "classnames";

const Card = ({
  type = "Beauty",
  count_view = "100",
  title = "The Best New Beauty Products",
  createAt = "APRIL 9, 2021",
  writer = "BELLA CACCIATORE",
  image_avatar = "https://image.freepik.com/free-photo/beautiful-young-asian-woman-with-clean-fresh-skin-face-care-facial-treatment-cosmetology-beauty-asian-woman-portrait_65293-4687.jpg",
  image = "https://i.pinimg.com/564x/49/84/81/498481549f4c69ce7e2ff5ca144df486.jpg",
  checkMyBlog = false,
  card_id,
  comment_count = 0,
  status = "false",
  approve,
  image_height,
}) => {
  const { client } = ApolloClient();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const router = useRouter();
  const Delete = async () => {
    return (
      await client.mutate({
        mutation: DELETE_BLOG,
        variables: {
          input: {
            where: {
              id: card_id,
            },
          },
        },
      }),
      setOpen(false),
      router.push(`/`)
    );
  };
  useEffect(async () => {
    const { data: likes } = await client.query({
      query: QUERY_LIKE,
      variables: {
        where: {
          blogId: card_id,
        },
      },
    });
    setCount(likes?.likes?.length);
  }, []);

  const onDelete = async (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <div className="shadow relative w-wcard mx-auto rounded-2xl bg-bgcard cursor-pointer mr-4 md:mr-0">
      {status === "true" && checkMyBlog === true && (
        <div
          className={classNames(
            // "absolute top-0 left-0 text-xs w-16 h-9    text-center  p-2   text-white  rounded-b-full    rounded-lg shadow-lg ml-1",
            "absolute top-0 left-0 text-xs w-16 h-8  rounded-b-md  text-center  p-2   text-white   shadow-lg ml-1",
            {
              " bg-orangetext": approve === "Waiting",
              " bg-green-400": approve === "Accept",
              " bg-yellow-400": approve === "Edited",
            }
          )}
        >
          {approve === "Accept"
            ? "Accept"
            : [approve === "Waiting" ? "Waiting" : "Edited"]}
        </div>
      )}
      {/* {image_height } */}
      {/* <img
        // className="w-80 xl:w-full h-48 rounded-2xl rounded-b-none object-cover"
        className="w-full h-full rounded-2xl rounded-b-none object-cover"
        src={image}
      /> */}
      <img
        className="w-wcard h-hcard rounded-2xl rounded-b-none object-cover"
        src={image}
      />

      <Pop_Up
        choose="true"
        setOpen={setOpen}
        open={open}
        title="คุณต้องการจะลบใช่หรือไม่ ?"
        description="ถ้าหากคุณลบแล้วจะไม่สามารถนำข้อมูลกลับมาได้ต้องการจะลบจริงหรือไม่"
        choose1="ใช่"
        choose2="ยกเลิก"
        thumnail={image}
        onfunction={Delete}
      />

      {checkMyBlog && (
        <button
          onClick={onDelete}
          className="absolute top-4 right-10  text-white hover:text-textred"
        >
          <svg
            className="w-6 h-6 absolute"
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
        </button>
      )}
      <div className="p-4 flex flex-col justify-between h-48   ">
        <div>
          <div className="flex justify-between text-sm">
            <div className="text-textred font-bold  ">{type}</div>
            <div className="flex items-center text-viewbrown ">
              <svg
                className="w-4 h-4 mr-2"
                fill="#CB9374"
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
              {count_view}
            </div>
          </div>
          <div className="font-Times text-xl font-bold mt-4  line-clamp-1 ">
            {title}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <img
                className="h-10 w-10  object-cover rounded-full   "
                src={image_avatar}
              ></img>
              <div className=" w-24 text-xs font-semibold mx-2  ">
                <div className="  text-gray-600 flex flex-row items-center  font-sans">
                  BY{" "}
                  <span className="text-black line-clamp-1  ml-1  font-sans">
                    {writer}
                  </span>
                </div>
                <div className="text-gray-600 font-sans">{createAt}</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mx-2">{comment_count}</div>
              <img className="w-6 h-6 mr-2" src="../icon/comment.png" />
              <div className="mx-2"> {count}</div>
              <img className="w-6 h-6" src="../icon/like.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
