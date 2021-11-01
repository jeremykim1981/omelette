import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect, memo } from "react";
import { BlogSession } from "../component/BlogSession";
import Channel from "../component/Channel";
import { checkParthName, openInNewTab } from "../function/functions";
import { QUERY_BANNER } from "../apollo/queries/queryAds";
import ApolloClient from "../apollo/apolloClient";
import { getPathUrl } from "../utils/getPathUrl";
import withAuth from "../hoc/withAuth";
// import Skeleton from "react-loading-skeleton";
import TopFive from "../component/TopFive";
import { NextSeo } from "next-seo";
// import AliceCarousel from "react-alice-carousel";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-alice-carousel/lib/alice-carousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Catagory = memo(({ name, image }) => {
  return (
    <Link href={`${checkParthName(name)}`}>
      <div className="  flex flex-col justify-center items-center uppercase font-sans text-xs md:text-base font-medium cursor-pointer">
        <img className="w-8 md:w-14 h-auto mx-auto mb-4" src={image} />
        {name}
      </div>
    </Link>
  );
});

const Top = memo(() => {
  return (
    <div className="grid xl:grid-cols-2  ">
      <div>
        <img className="w-full h-full" src="../bg/linebg.png" />
      </div>
      <div
        style={{
          backgroundImage: "url(" + "../bg/linebg.png" + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className=" border border-black w-auto h-full p-2 md:mx-8 lg:mx-36   xl:mr-14  "
          style={{
            backgroundImage:
              "url(" +
              "https://image.freepik.com/free-photo/paperboard-texture_95678-72.jpg" +
              ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <TopFive />
        </div>
      </div>
    </div>
  );
});
function Home() {
  const { client } = ApolloClient();
  const [banner, setBanner] = useState(null);

  useEffect(async () => {
    const { data } = await client.query({
      query: QUERY_BANNER,
    });
    setBanner(data?.banner?.image);
  }, []);

  const onClickBanner = (link) => {
    if (!link) return;
    if (link) {
      openInNewTab(link);
    }
    return;
  };

  const Ads = () => {
    return (
      <div>
        <div className="  ">
          {banner && (
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
            >
              {banner?.map((image, index) => {
                return (
                  <div>
                    <img
                      key={index}
                      onClick={() => onClickBanner(image?.link)}
                      className="p-1"
                      src={getPathUrl(image?.image?.url)}
                    />
                  </div>
                );
              })}
            </Carousel>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className=" bg-creambg max-w-screen-2xl  mx-auto  ">
      <NextSeo
        title="JAJOIN"
        openGraph={{
          title: "JAJOIN",
          description: "JAJOY BLOGGER",
          images: [
            {
              url: "../icon/AW Jajoin.co(brown).png",
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
      <Ads />
      <div className="mx-4 md:mx-0">
        <div className="grid grid-cols-6 my-10 ">
          <Catagory name="BEAUTY" image="../icon/beauty.png" />
          <Catagory name="CAFE" image="../icon/cafe.png" />
          <Catagory name="FASHION" image="../icon/fashion.png" />
          <Catagory name="TRAVEL" image="../icon/travel.png" />
          <Catagory name="WITCHCRAFT" image="../icon/wichcraft.png" />
          <Catagory name="OTHER" image="../icon/other.png" />
        </div>
      </div>
      <div>
        <Top />
      </div>
      <div className="mx-4 md:mx-8 lg:mx-16 mb-20 ">
        <BlogSession name="BEAUTY" mode="BEAUTY" count="8" />
      </div>
      <div className="px-4 md:px-8 lg:px-16 bg-bgsection pb-20 ">
        <BlogSession name="FASHION" mode="FASHION" count="8" />
      </div>
      <div className="mx-4 md:mx-8 lg:mx-16 mb-20 ">
        <BlogSession name="CAFE" mode="CAFE" count="8" />
      </div>
      <div className="px-4 md:px-8 lg:px-16 bg-bgsection pb-20 ">
        <BlogSession name="TRAVEL" mode="TRAVEL" count="8" />
      </div>
      <div className="mx-4 md:mx-8 lg:mx-16 pb-20  ">
        <BlogSession name="WITCHCRAFT" mode="WITCHCRAFT" count="8" />
      </div>
      <div className="px-4 md:px-8 lg:px-16 bg-bgsection pb-20 ">
        <BlogSession name="OTHER" mode="OTHER" count="8" />
      </div>
      <div className="mx-4 md:mx-8 lg:mx-16 pb-20  ">
        <Channel />
      </div>
    </div>
  );
}
export default withAuth(Home);
