import { memo, useEffect, useState } from "react";
import ApolloClient from "../apollo/apolloClient";
import gql from "graphql-tag";
import { SumOfArray } from "../function/functions";
import { getPathUrl } from "../utils/getPathUrl";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { QUERY_COUNT_VIEW } from "../apollo/queries/queryBlogger";

const Member = memo(({ name = "", no = "", img = "", userId }) => {
  return (
    <Link href={`/profiles/${userId}`}>
      <div className="cursor-pointer">
        <div className="h-10 md:h-14 bg-topbg flex     mx-4 ">
          <div
            className=" font-bold w-1/3 flex items-center pl-4 md:pl-7 text-lg md:text-2xl text-white  "
            style={{
              backgroundImage: "url(" + "../bg/top.svg" + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {no}
          </div>
          <div className="flex items-center  w-2/3  ">
            <div className="flex items-center text-xs  md:text-lg font-medium">
              <img
                className=" h-8 w-8 md:h-12 md:w-12  object-cover rounded-full mr-4  "
                src={img}
              />
              <div className="line-clamp-1">{name}</div>
            </div>
          </div>
          {/* <div className=" border bg-creambg  flex items-center mr-2 md:mr-4   my-2 px-4 font-sans text-xs md:text-sm  font-medium rounded">
            following
            <img className="h-2 w-2 ml-2 md:ml-4" src="../icon/down.svg" />
          </div> */}
        </div>
      </div>
    </Link>
  );
});

const TopFive = () => {
  const { client } = ApolloClient();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const { data } = await client.query({
      query: QUERY_COUNT_VIEW,
    });
    setData(data?.users);
    setLoading(false);
  }, []);

  const Point_Each_User = data
    ?.filter((user) => {
      const count_view = user?.blogs?.map((view) => {
        return view.count_view;
      });
      const cal_view = SumOfArray(count_view);
      return cal_view > 0;
    })
    ?.sort((a, b) => {
      const count_viewA = a?.blogs?.map((view) => {
        return view.count_view;
      });
      const cal_viewA = SumOfArray(count_viewA);
      const count_viewB = b?.blogs?.map((view) => {
        return view.count_view;
      });
      const cal_viewB = SumOfArray(count_viewB);
      return cal_viewB - cal_viewA;
    })
    ?.map((point) => {
      const count_view = point?.blogs?.map((view) => {
        return view.count_view;
      });
      const cal_view = SumOfArray(count_view);
      return { user: point, view_point: cal_view };
    });

  return (
    <div className=" border border-black w-auto h-full  ">
      <div className="text-center text-2xl md:text-3xl font-bold  font-Times mt-4 ">
        JAJOIN TOP 5
      </div>
      {loading ? (
        <div className=" grid grid-cols-1 gap-4  my-4 w-full h-full ">
          <div className="h-10 md:h-14   mx-4 ">
            <Skeleton width={"100%"} height={"100%"} />
          </div>
          <div className="h-10 md:h-14   mx-4 ">
            <Skeleton width={"100%"} height={"100%"} />
          </div>{" "}
          <div className="h-10 md:h-14   mx-4 ">
            <Skeleton width={"100%"} height={"100%"} />
          </div>{" "}
          <div className="h-10 md:h-14   mx-4 ">
            <Skeleton width={"100%"} height={"100%"} />
          </div>{" "}
          <div className="h-10 md:h-14   mx-4 ">
            {/* <Skeleton width={"100%"} height={"100%"} /> */}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4  my-4">
          {Point_Each_User?.slice(0, 5)?.map((blogger, index) => {
            return (
              <Member
                key={index}
                userId={blogger?.user?.id}
                no={index + 1}
                img={
                  blogger.user.avatar_image
                    ? getPathUrl(blogger?.user?.avatar_image?.url)
                    : blogger?.user?.image_social
                }
                name={blogger?.user?.name}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default TopFive;
