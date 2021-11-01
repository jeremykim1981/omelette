import React, { useState, useEffect, memo } from "react";
import ApolloClient from "../../apollo/apolloClient";
import { QUERY_CAREERS } from "../../apollo/queries/queryBlog";
import { EngDate } from "../../function/functions";
import { DebounceInput } from "react-debounce-input";
import withAuth from "../../hoc/withAuth";

const Blog = ({
  position = "",
  number = "",
  education = "",
  date = "",
  salary = "",
  view = "",
}) => {
  return (
    <div className=" bg-bgsection flex flex-col md:flex-row justify-start md:justify-between rounded-2xl p-6 mt-10 mb-10 text-xs md:text-md lg:text-base">
      <div className=" flex">
        <div className="break-all">
          <div className="flex">
            <div className="w-2/6">ตำแหน่ง </div>
            <div className="w-1/6">-</div>
            <div className="w-3/6"> {position} </div>
          </div>
          <div className="flex">
            <div className="w-2/6">จำนวน </div>
            <div className="w-1/6">-</div>
            <div className="w-3/6"> {number} </div>
          </div>
          <div className="flex">
            <div className="w-2/6">คุณสมบัติ </div>
            <div className="w-1/6">-</div>
            <div className="w-3/6"> {education} </div>
          </div>
          <div className="flex">
            <div className="w-2/6">เงินเดือน </div>
            <div className="w-1/6">-</div>
            <div className="w-3/6"> {salary} </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start md:justify-between items-start  md:items-end text-orangetext text-sm ">
        <a target="_blank" href="mailto:thanthon868@gmail.com">
          <div className="bg-orangetext p-2 px-4 cursor-pointer text-white rounded-lg mt-4 md:mt-0  ">
            สมัครงาน
          </div>
        </a>
        <div className="flex justify-between items-center mt-4 md:mt-0">
          <div className="font-Times ">{date}</div>
        </div>
      </div>
    </div>
  );
};
const Career = () => {
  const { client } = ApolloClient();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchchValue, setSearchValue] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isRefetch, setIsRefetch] = useState(false);
  const [_where, setWhere] = useState([]);
  const editSearchTerm = async (e) => {
    const value = e.target.value;
    let where = { ..._where };

    where = {
      ...where,
      _q: value,
    };
    setWhere(where);

    if (value) {
      setLoading(true);
      setIsRefetch(true);
      load(where);
      setLoading(false);
    } else {
      setHasMore(true);
    }
    setSearchValue(value);
  };

  const load = async (where = _where) => {
    try {
      setLoading(true);
      let newWhere = {
        ...where,
      };
      const queryCareers = {
        query: QUERY_CAREERS,
        variables: {
          where: newWhere,
        },
      };
      const { data } = await client.query(queryCareers);
      let formatDatas = data?.careers?.map((careers) => {
        const ret = {
          id: careers?.id,
          position: careers?.position,
          salary: careers?.salary,
          detail: careers?.detail,
          count: careers?.count,
          count_click: careers?.count_click,
          createdAt: careers?.createdAt,
        };
        return ret;
      });

      setData(formatDatas);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!searchchValue) {
      load();
      setIsRefetch(false);
    }
  }, [searchchValue]);
  return (
    <div className=" mx-auto text-textaboutus   font-Times  bg-creambg   max-w-screen-2xl   ">
      <div className="mb-20">
        <img className="w-full" src="../career/careerhero.jpg" />
      </div>
      <div className="bg-white flex items-center rounded-3xl shadow-xl w-11/12 mx-auto  mb-20 ">
        <DebounceInput
          minLength={0}
          debounceTimeout={500}
          className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="search"
          type="text"
          placeholder="Search ..."
          value={searchchValue}
          onChange={editSearchTerm}
        />

        <div className="p-4">
          <svg
            className=" bg-orangetext text-white rounded-full p-2 mx-4  "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className=" px-4 md:px-8 lg:px-16 ">
        <div className="flex justify-between text-orangetext ">
          <div className="text-2xl font-bold">ประกาศรับสมัคร</div>
          <div className="text-lg">ทั้งหมด : {data?.length}</div>
        </div>
        {data?.map((careers) => {
          const date = EngDate(careers.createdAt);
          return (
            <Blog
              position={careers.position}
              number={careers.count}
              education={careers.detail}
              salary={careers.salary}
              date={date}
              view={careers.count_click}
            />
          );
        })}
      </div>
      <div className=" flex justify-center items-center px-4 md:px-8 lg:px-16  pb-10  "></div>
    </div>
  );
};
export default Career;
