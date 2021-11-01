import Card from "./Card";
import React, { useState, useEffect, memo } from "react";
import Title from "./Title";
import Link from "next/link";
import { useRouter } from "next/router";
import { QUERY_CARD } from "../apollo/queries/queryBlog";
import ApolloClient from "../apollo/apolloClient";
import Skeleton from "react-loading-skeleton";
import { EngDate } from "../function/functions";
import { getPathUrl } from "../utils/getPathUrl";
import gql from "graphql-tag";
import useAuth from "../hooks/useAuth";

const UPDATE_VIEW = gql`
  mutation updateBlogView($id: ID!) {
    updateBlogView(id: $id) {
      id
    }
  }
`;

const SplitSkeleton = () => {
  return (
    <div className="w-full bg-white  rounded-md  cursor-pointer hover:shadow-xl  ">
      <div className="h-52  object-cover sm:object-contain xl:object-cover w-full rounded rounded-b-none border border-gray-200">
        <Skeleton width={"100%"} height={"100%"} />
      </div>
      <div className="mx-2 my-1">
        <Skeleton width={"100%"} height={25} />
        <Skeleton width={"100%"} height={"100%"} count={3} />
      </div>
      <div className="border-b mx-2 mb-2 "></div>
      <div className="mx-2 my-1">
        <Skeleton circle={true} height={40} width={40} />
        <div className="p-2"></div>
      </div>
    </div>
  );
};
const LoadingSkeleton = () => {
  return (
    <div className="mx-1 md:mx-4 xl:mx-12  p-2 grid grid-cols-1 gap-4  md:grid-cols-2 xl:grid-cols-4 lg:justify-between">
      <SplitSkeleton />
      <SplitSkeleton />
      <SplitSkeleton />
      <SplitSkeleton />
    </div>
  );
};

const LoadData = memo(({ data, count, user, status }) => {
  const router = useRouter();
  const { client } = ApolloClient();
  const clickCard = async (blog) => {
    router.push(`/blogs/${blog}`);
    await client.mutate({
      mutation: UPDATE_VIEW,
      variables: { id: blog },
    });
  };
  const Window = () => {
    return (
      <div className="">
        <div className="flex overflow-x-scroll md:overflow-hidden md:grid   md:gap-8 lg:gap-16 xl:gap-4  md:grid-cols-2 xl:grid-cols-4  lg:justify-between ">
          {data?.slice(0, count)?.map((card, index) => {
            const post_date = EngDate(card.createdAt);
            const writter = card?.users_permissions_user?.name;
            const image_avatar = card?.users_permissions_user?.avatar_image
              ? getPathUrl(card?.users_permissions_user?.avatar_image?.url)
              : card?.users_permissions_user?.image_social;
            const image = getPathUrl(card?.image?.url);
            const image_height = card?.image?.height;
            return (
              <div className="mx-auto" onClick={() => clickCard(card.id)}>
                <Card
                  card_id={card?.id}
                  key={index}
                  checkMyBlog={card?.users_permissions_user?.id === user?.uid}
                  type={card.type}
                  count_view={card.count_view}
                  title={card.title}
                  createAt={post_date}
                  writer={writter}
                  image_avatar={image_avatar}
                  image={image}
                  comment_count={card?.comments?.length}
                  status={status}
                  approve={card?.approve}
                  image_height={image_height}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className=" ">
      <Window />
    </div>
  );
});

// refetchQueries: [
//   { query: GET_ALL_TODOS }
// ]

export const BlogSession = memo(
  ({ name, mode, count, profile_id, status, approve = "Accept" }) => {
    const router = useRouter();
    const { client } = ApolloClient();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuth, user, setUser } = useAuth();

    useEffect(async () => {
      setLoading(true);
      let where = {
        type: mode,
        users_permissions_user: profile_id,
        approve: approve,
        // fetchPolicy: "no-cache",
      };

      if (approve === "All") {
        delete where.approve;
      }

      const { data } = await client.query({
        query: QUERY_CARD,
        variables: {
          where: where,
        },
        // fetchPolicy: "no-cache",
      });
      setData(data?.blogs);
      setLoading(false);
    }, [profile_id, approve]);

    return (
      <div>
        <div className=" font-Times font-semibold">
          {name ? <Title name={name} /> : ""}
        </div>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <React.Fragment>
            <LoadData data={data} count={count} user={user} status={status} />
          </React.Fragment>
        )}
      </div>
    );
  }
);
