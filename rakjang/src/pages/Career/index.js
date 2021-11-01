import { format } from "date-fns";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import { DebounceInput } from "react-debounce-input";

import api from "../../api";

const CareerCard = ({
  position = "",
  count = "",
  qualification = "",
  job_startDate = "",
  salary = "",
  views = "",
}) => {
  const notify = () => toast.success("การสมัครงานเสร็จสิ้น!");

  return (
    <div className="  bg-bgcareerblog  bg-opacity-30 text-textgray flex flex-col md:flex-row justify-start md:justify-between rounded-2xl p-6  text-xs md:text-md lg:text-base w-">
      <div className=" flex w-2/3">
        <div className="break-all  space-y-1 w-full">
          <div className="flex space-x-1">
            <div className="w-2/12">ตำแหน่ง </div>
            <div className="w-1/12">-</div>
            <div className="w-10/12"> {position} </div>
          </div>
          <div className="flex space-x-1">
            <div className="w-2/12">จำนวน </div>
            <div className="w-1/12">-</div>
            <div className="w-10/12"> {count} </div>
          </div>
          <div className="flex space-x-1">
            <div className="w-2/12">คุณสมบัติ </div>
            <div className="w-1/12">-</div>
            <div className="w-10/12"> {qualification} </div>
          </div>
          <div className="flex space-x-1">
            <div className="w-2/12">เงินเดือน </div>
            <div className="w-1/12">-</div>
            <div className="w-10/12"> {salary} </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start md:justify-between items-start  md:items-end  text-textdarkgreen text-sm w-1/3 ">
        <a target="_blank" href="mailto:thanthon868@gmail.com">
          <div
            onClick={notify}
            className=" bg-textdarkgreen p-2 px-4 cursor-pointer text-white rounded-lg mt-4 md:mt-0  "
          >
            สมัครงาน{" "}
            <ToastContainer
              theme="colored"
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </a>
        <div className="flex justify-between items-center mt-4 md:mt-0">
          <div className=" ">{job_startDate}</div>
        </div>
      </div>
    </div>
  );
};
const Career = () => {
  const limit = 15;
  const default_filter = `?limit=${limit}`;

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState(default_filter);
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCareer(filter);
  }, []);

  const loadCareer = async (newFilter) => {
    try {
      setLoading(true);
      const { data: responseData } = await api.get(`/careers${newFilter}`);
      setCareers(responseData.careers);
    } catch (error) {
      console.log("load career error", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const { data: responseData } = await api.get(`/careers`);
      setCareers(responseData.careers);
    } catch (error) {
      console.log("load more career error", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const onSearch = async (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      const newFilter = `${filter}&search=${value}`;
      await loadCareer(newFilter);
    } else {
      await loadCareer(filter);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className=" bg-bg-career h-xl bg-bottom relative">
        <div className="blur absolute top-6 w-1/3 rounded-3xl rounded-l-none text-white flex flex-col justify-center items-center py-20">
          <div className="text-5xl font-bold">ร่วมงานกับเรา</div>
          <div className="text-2xl mt-4">Rakjangfarm</div>
        </div>
      </div>
      <div className="py-10 px-4 md:px-8 lg:px-16">
        <div className=" bg-searchbg  text-blueGray-400 flex  justify-between px-4 py-3 items-center rounded-full">
          <DebounceInput
            className="bg-searchbg rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
            debounceTimeout={500}
            onChange={onSearch}
            value={search}
            placeholder="ค้นหาตำแหน่งงาน..."
          />
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex justify-between text-textdarkgreen items-center mt-10">
          <div className="text-2xl font-bold ">ประกาศรับสมัคร</div>
          <div>ทั้งหมด : {careers.length}</div>
        </div>
        <div className=" space-y-4 mt-2">
          {careers?.map((career) => {
            return (
              <CareerCard
                position={career.position}
                count={career.count}
                qualification={career.qualification}
                salary={career.salary}
                date={
                  career.job_startDate &&
                  format(new Date(career.job_startDate), "dd/MM/yyyy")
                }
                views={career.views}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Career;
