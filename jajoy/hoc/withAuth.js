import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import initialApollo from "../apollo/apolloClient";
import useAuth from "../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import QUERY_PROFILE from "../apollo/queries/queryProfile";

const withAuth = (Component) => {
  return function (props) {
    const { client } = initialApollo();
    const router = useRouter();
    const { user, setUser, isAuth, SetLocalStorageUser } = useAuth();

    const [loading, setLoading] = useState(true);

    useEffect(async () => {
      setLoading(true);
      await fetchDataUser();
      setLoading(false);
    }, []);

    const fetchDataUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const uid = localStorage.getItem("uid");
        if (token) {
          const { data } = await client.query({
            query: QUERY_PROFILE,
            nextFetchPolicy: "network-only",
            variables: {
              id: uid,
            },
          });

          if (data?.user) {
            const { user } = data;
            SetLocalStorageUser(token, user);
            return setUser({
              accessToken: localStorage.getItem("accessToken"),
              uid: user?.id,
              email: user?.email,
              userName: user?.username,
              avatar_image: user?.avatar_image,
              social_id: user.social_id,
              role: user?.role?.name,
              rid: user?.role?.id,
              image_social: user?.image_social,
              name: user?.name,
            });
          }
        }
        localStorage.clear();
        setUser(null);
        // return router.push("/login");
      } catch (error) {
        localStorage.clear();
        // await Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Session หมดอายุโปรดล็อคอินใหม่อีกครั้ง",
        // });
        setUser(null);
        // return router.push("/login");
      }
    };

    if (loading) {
      return <Skeleton />;
    }
    return <Component {...props} />;
  };
};

export default withAuth;
