import Head from "next/head";
import ApolloClient from "../../apollo/apolloClient";
import { QUERY_PORTFOLIO } from "../../apollo/queries/queryBlog";
import React, { useState, useEffect, memo } from "react";
import { getPathUrl } from "../../utils/getPathUrl";
import Skeleton from "react-loading-skeleton";
import withAuth from "../../hoc/withAuth";
import { QUERY_ADS } from "../../apollo/queries/queryAds";

const Port = memo(({ name = "", img = "" }) => {
  return (
    <div className="w-full  flex flex-col justify-center  items-center mb-10 ">
      <img
        className="w-96 h-80 mx-auto object-cover  justify-center  items-center   "
        src={img}
      />
      <div className="w-96  h-20  font-Times  bg-creamads text-center flex items-center justify-center p-2">
        {name}
      </div>
    </div>
  );
});
const Social = memo(({ name = "", img = "" }) => {
  return (
    <div className="w-full  flex  justify-center items-center mb-10 md:mb-20 lg:mb-32">
      <img
        className=" w-14 h-14 md:w-20 md:h-20 object-cover mr-10 "
        src={img}
      />
      <div className=" w-10 md:w-32   text-center flex items-center justify-center ">
        {name}
      </div>
    </div>
  );
});
const AboutUs = () => {
  const { client } = ApolloClient();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ad, setAd] = useState(null);
  const [loadingAd, setLoadingAd] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const { data } = await client.query({
      query: QUERY_PORTFOLIO,
    });
    setData(data?.portfolios);
    setLoading(false);
    setLoadingAd(true);
    const { data: ads } = await client.query({
      query: QUERY_ADS,
    });
    setAd(ads?.ad);
    setLoadingAd(false);
  }, []);

  const imageStyle = "border-4 border-brownnav w-96 h-96 object-cover mx-auto";

  return (
    <div className=" mx-auto font-Times  bg-creambg   max-w-screen-2xl   ">
      <Head>
        <title>JAJOIN</title>
        <meta name="description" content="JAJOY BLOGGER" />
        <link rel="icon" href="../icon/AW Jajoin.co(brown).png" />
      </Head>
      <div
        className=" flex flex-col justify-center items-center py-14 "
        style={{
          backgroundImage: "url(" + "../bg/aboutusbg.jpg" + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img className=" mx-auto w-2/3 md:w-1/3" src="../icon/idealogo.png" />
        <div className=" text-lg md:text-2xl text-textaboutus font-Times  ">
          Social Media Marketing
        </div>
        <div className="text-lg  md:text-2xl text-textaboutus font-Times   mt-6">
          You’re invited Our Special client
        </div>
      </div>
      <div className="text-2xl md:text-3xl  font-bold text-textaboutus text-center font-Times   mt-20 mb-6">
        OUR STORY
      </div>

      {loadingAd ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mx-4 md:mx-8 lg:mx-16 py-10 md:py-20">
          <Skeleton width={"100%"} height={400} />
          <Skeleton width={"100%"} height={400} />
          <Skeleton width={"100%"} height={400} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mx-4 md:mx-8 lg:mx-16 py-10 md:py-20">
          <img className={imageStyle} src={getPathUrl(ad?.our_story_1?.url)} />
          <img className={imageStyle} src={getPathUrl(ad?.out_story_2?.url)} />
          <img
            className={imageStyle}
            src={getPathUrl(ad?.our_story_3?.url)}
          />{" "}
        </div>
      )}

      <div className=" font-Times text-textaboutus text-lg text-center md:mx-auto w-full px-4 md:px-0 md:w-2/3 xl:w-2/5  ">
        Glow on idea acwork provides about Social Media agency service
      </div>
      <div className=" font-Times text-textaboutus text-lg text-center md:mx-auto w-full px-4 md:px-0 md:w-2/3 xl:w-2/5 mb-4  ">
        such as Facebook, Instagram, Twitter and community website.
      </div>
      <div className=" font-Times text-textaboutus text-lg text-center md:mx-auto w-full px-4 md:px-0 md:w-2/3 xl:w-2/5  ">
        The team is built with a combination of reviewers who love to do
      </div>
      <div className=" font-Times text-textaboutus text-lg text-center md:mx-auto w-full px-4 md:px-0 md:w-2/3 xl:w-2/5  ">
        reviews. And specialize in each channel to support and coordinate
      </div>
      <div className=" font-Times text-textaboutus text-lg text-center md:mx-auto w-full px-4 md:px-0 md:w-2/3 xl:w-2/5   ">
        with nano - micro influencers to get the best work possible
      </div>
      <div className=" font-Times text-textaboutus text-lg text-center md:mx-auto w-full px-4 md:px-0 md:w-2/3 xl:w-2/5 mb-4 ">
        and matching with the target group.
      </div>
      <div className=" font-Times text-textaboutus text-lg text-center md:mx-auto w-full px-4 md:px-0 md:w-2/3 xl:w-2/5  ">
        We Truly believe that nano - micro influencers
      </div>
      <div className=" font-Times text-textaboutus text-lg text-center md:mx-auto w-full px-4 md:px-0 md:w-2/3 xl:w-2/5  ">
        will help your business reach target customers
      </div>
      <div className=" font-Times text-textaboutus text-lg text-center md:mx-auto w-full px-4 md:px-0 md:w-2/3 :w-2/5 mb-4  ">
        and achieved one more successful step.
      </div>
      <div className=" font-Times text-textaboutus text-lg text-center md:mx-auto w-full px-4 md:px-0 md:w-2/3 xl:w-2/5  ">
        We promise to find a reviewer that match with your brand
      </div>
      <div className=" font-Times text-textaboutus text-lg text-center md:mx-auto w-full px-4 md:px-0 md:w-2/3 xl:w-2/5 mb-20  ">
        and Your Target audience to work out the best.
      </div>

      <div className=" bg-bgsection text-textaboutus py-10 md:py-32">
        <div className="text-2xl md:text-3xl font-bold  text-center  font-Times  ">
          WHAT WE DO
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-10   md:grid-cols-5 items-start mt-10 px-4 md:px-8 lg:px-16">
          <div className="flex  flex-col justify-center items-center  text-xl font-Times ">
            <img className="w-20 h-20 mb-4" src="../whatwedo/w1.png"></img>
            <div className="text-center font-Times">INFLUENCER STRATEGY</div>
          </div>
          <div className="flex  flex-col justify-center items-center text-xl font-Times">
            <img className="w-20 h-20 mb-4" src="../whatwedo/w2.png"></img>
            <div className="text-center font-Times">CONTENTS USER REVIEW</div>
          </div>
          <div className="flex  flex-col justify-center items-center text-xl font-Times">
            <img className="w-20 h-20 mb-4" src="../whatwedo/w3.png"></img>
            <div className="text-center font-Times">CAMPAIGN MANAGEMENT</div>
          </div>
          <div className="flex  flex-col justify-center items-center text-xl font-Times">
            <img className="w-20 h-20 mb-4" src="../whatwedo/w4.png"></img>
            <div className="text-center font-Times">REVIEWERS PARTNERSHIP</div>
          </div>
          <div className="flex  flex-col justify-center items-center text-xl font-Times">
            <img className="w-20 h-20 mb-4" src="../whatwedo/w5.png"></img>
            <div className="text-center font-Times">ETC.</div>
          </div>
        </div>
      </div>
      <div className="  text-textaboutus py-10 md:py-20">
        <div className="text-2xl md:text-3xl font-bold font-Times  text-center  uppercase mb-10   ">
          Portfolio
        </div>
        {loading ? (
          <div className=" grid grid-cols-1 md:grid-cols-2  ">
            <Skeleton width={"100%"} height={350} />
            <Skeleton width={"100%"} height={350} />
            <Skeleton width={"100%"} height={350} />
            <Skeleton width={"100%"} height={350} />
          </div>
        ) : (
          <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  ">
            {data?.map((portfolio) => {
              const image = getPathUrl(portfolio?.image?.url);
              return <Port img={image} name={portfolio?.name} />;
            })}
          </div>
        )}
      </div>
      <div className=" bg-creamads  text-textaboutus py-10 md:py-20">
        <div className="text-2xl md:text-3xl font-bold font-Times  text-center  uppercase mb-10 md:mb-20   ">
          SOCIAL MEDIA STATS IN THAILAND 2020
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3">
          <Social img="../whatwedo/fb.png" name="51 Million " />
          <Social img="../whatwedo/ig.png" name="16 Million" />
          <Social img="../whatwedo/twitter.png" name="7.35 Million " />
          <Social img="../whatwedo/google.png" name="86.4 Billion/ Month" />
          <Social img="../whatwedo/tiktok.png" name="18.5 Million  " />
          <Social img="../whatwedo/youtube.png" name="37.3 Million" />
        </div>
        <div className="text-left px-4 md:px-8 lg:px-16 ">
          <div className=" font-Times">Refer : We Are Social</div>
          <div className=" font-Times">Unicornhouse</div>{" "}
        </div>
      </div>
      <div className=" text-xl   text-textaboutus px-4 md:px-8 lg:px-16 pt-20">
        <div className=" flex flex-col justify-center  items-center">
          <div className="text-2xl md:text-3xl font-bold font-Times  text-center  uppercase mb-10   ">
            STATISTIC OF ONLINE INFLUENCER MARKETING
          </div>
          <div className=" w-full md:w-3/5">
            <div className="mb-4 font-Times">
              <span className=" font-Times text-orangetext  mr-2"># 92 %</span>{" "}
              customers trust a micro-influencer more than a traditional ad or
              an endorsement from celebs.
            </div>
            <div className="mb-4  font-Times ">
              <span className="  font-Times text-orangetext  mr-2">
                {" "}
                # 74 %
              </span>{" "}
              of micro-influencers tend to be direct in their recommendations
              and encourage people to{" "}
              <span className="  font-Times text-orangetext  mr-2">
                “try”
              </span>{" "}
              a certain product.
            </div>
            <div className="mb-4 font-Times">
              <span className="  font-Times text-orangetext  mr-2">
                {" "}
                # 82%{" "}
              </span>{" "}
              consumers are likely to
              <span className="  font-Times text-orangetext  mr-2">
                {" "}
                “buy”{" "}
              </span>{" "}
              something a micro-influencer recommends.
            </div>
            <div className="mb-4 font-Times">
              # Micro-influencers engage in conversations 22.2 times with the
              average consumer
            </div>
            <div className="">
              <span className="  font-Times text-orangetext  mr-2">
                # Return on investment +++
              </span>
            </div>
          </div>
        </div>
        <div className=" flex justify-between items-center">
          <div className="text-left  px-4 md:px-8 lg:px-16  ">
            <div className=" font-Times ">Refer : We Are Social</div>
            <div className=" font-Times ">Unicornhouse</div>{" "}
          </div>
          <img className=" w-4/12 md:w-3/12" src="../whatwedo/decorate.png" />
        </div>
      </div>
      <div className="bg-white px-4 md:px-8 lg:px-16 py-20">
        {" "}
        <img className="w-full h-full" src="../whatwedo/client.jpg"></img>
      </div>
    </div>
  );
};

export default AboutUs;
