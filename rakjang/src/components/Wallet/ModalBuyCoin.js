/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import { ZeroPad } from "../../function/functions";
import classNames from "classnames";

const FieldDateInput = ({ title, input, value, ...rest }) => {
  return (
    <div>
      <div className="text-xs text-textlogingray">{title}</div>
      <input
        className="border w-full p-1  text-textlogingray focus:outline-none rounded-md"
        onChange={(e) => input(e.target.value)}
        value={value}
        {...rest}
      />
    </div>
  );
};

function ModalBuyCoin({
  price,
  open,
  setOpen,
  coins,
  imageSrc,
  handleUploadChange,
  transferDate,
  transferTime,
  setTransfetDate,
  setTransferTime,
  loading,
  onClickSubmit,
  error,
  setBankName,
  exchange_rate,
}) {
  const cancelButtonRef = useRef(null);

  // useEffect(() => {
  //   setDay(ZeroPad(new Date().getDate(), 2));
  //   setMonth(ZeroPad(new Date().getMonth() + 1, 2));
  //   setYear(new Date().getFullYear());
  //   setHour(ZeroPad(new Date().getHours(), 2));
  //   setMin(ZeroPad(new Date().getMinutes(), 2));
  // }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto  font-Kanit"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-0 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block  align-middle h-screen  max-h-bill mb-4 rounded-lg text-left overflow-hidden shadow-xl transform transition-all   sm:max-w-lg sm:w-full overflow-y-auto">
              <div className="bg-white p-4 ">
                <div className="sm:flex justify-center sm:items-center space-y-4 ">
                  <div className="flex flex-col justify-center text-textgray ">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 text-center   text-textlogingreen font-bold"
                    >
                      ยืนยันการซื้อเหรียญ Rakjang
                    </Dialog.Title>
                  </div>
                </div>
                <div className="text-textgray space-y-4">
                  <div className="flex justify-between items-center  ">
                    <div>จำนวนเหรียญที่ซื้อ (เหรียญ)</div>
                    <div>{coins}</div>
                  </div>
                  <div className="flex justify-between items-center font-bold">
                    <div>ราคา (บาท)</div>
                    <div>{price}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>ชำระผ่าน</div>
                    <div className="text-textlogingreen  font-semibold">
                      โอนเงิน
                    </div>
                  </div>
                  <div>โอนจากธนาคาร</div>
                  <Select
                    onChange={(e) => setBankName(e.label)}
                    className="w-full  focus:outline-none "
                    options={[
                      { value: "ธนาคารกรุงเทพ", label: "ธนาคารกรุงเทพ" },
                      { value: "ธนาคารกสิกรไทย", label: "ธนาคารกสิกรไทย" },
                      { value: "ธนาคารกรุงไทย", label: "ธนาคารกรุงไทย" },
                      {
                        value: "ธนาคารทหารไทยธนชาต",
                        label: "ธนาคารทหารไทยธนชาต",
                      },
                      { value: "ธนาคารไทยพาณิชย์", label: "ธนาคารไทยพาณิชย์" },
                      {
                        value: "ธนาคารกรุงศรีอยุธยา",
                        label: "ธนาคารกรุงศรีอยุธยา",
                      },
                      {
                        value: "ธนาคารเกียรตินาคินภัทร",
                        label: "ธนาคารเกียรตินาคินภัทร",
                      },
                      {
                        value: "ธนาคารซีไอเอ็มบีไทย",
                        label: "ธนาคารซีไอเอ็มบีไทย",
                      },
                      { value: "ธนาคารทิสโก้", label: "ธนาคารทิสโก้" },
                      { value: "ธนาคารยูโอบี", label: "ธนาคารยูโอบี" },
                      { value: "ธนาคารออมสิน", label: "ธนาคารออมสิน" },
                    ]}
                  />
                  <div>ไปยัง</div>
                  <Select
                    className="w-full"
                    options={[
                      { value: "ธนาคารกรุงไทย", label: "ธนาคารกรุงไทย" },
                    ]}
                  />
                  <div>วันที่ทำการโอน</div>
                  <div className=" grid grid-cols-2 md:grid-cols-2 gap-1">
                    <FieldDateInput
                      title="วันที่"
                      type="date"
                      input={setTransfetDate}
                      value={transferDate}
                    />
                    <FieldDateInput
                      title="เวลา"
                      type="time"
                      input={setTransferTime}
                      value={transferTime}
                    />
                  </div>

                  <div className="mb-4">สลิปโอนเงิน</div>
                  <label for="button-file" className="">
                    <div
                      className={`${
                        imageSrc ? " h-auto " : " h-32 "
                      } " border border-dashed rounded flex justify-center items-center "`}
                    >
                      {imageSrc ? (
                        <img alt="" src={imageSrc} />
                      ) : (
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
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                      <input
                        accept="image/jpeg,image/gif,image/png"
                        className="hidden"
                        id="button-file"
                        type="file"
                        onChange={handleUploadChange}
                        onLoad={loading}
                      />
                    </div>
                  </label>
                </div>
              </div>
              {error && (
                <div class="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2">
                  <div class="text-red-500 rounded-full bg-white mr-3">
                    <svg
                      width="1.8em"
                      height="1.8em"
                      viewBox="0 0 16 16"
                      class="bi bi-x"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                      />
                    </svg>
                  </div>
                  <div class="text-white max-w-xs ">
                    <div>โปรดกรอกข้อมูลของท่านให้ครบถ้วน</div>
                  </div>
                </div>
              )}
              <div className="bg-white px-4 py-3 sm:px-6  space-x-1 flex justify-center items-center">
                {loading ? (
                  <div></div>
                ) : (
                  <button
                    type="button"
                    className="w-28 flex justify-center rounded-md  shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none  ml-10  sm:text-sm bg-textlogingreen hover:bg-textdarkgreen cursor-pointer"
                    onClick={onClickSubmit}
                  >
                    ยืนยัน
                  </button>
                )}
                {/* <button
                  // disabled={loading}
                  type="button"
                  className={classNames(
                    ` w-28 flex justify-center rounded-md  shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none  ml-10  sm:text-sm`,
                    {
                      "bg-gray-400 cursor-not-allowed": loading,
                      "bg-textlogingreen hover:bg-textdarkgreen cursor-pointer":
                        !loading,
                    }
                  )}
                  onClick={onClickSubmit}
                >
                  ยืนยัน
                </button> */}
                <button
                  type="button"
                  className=" w-28 flex justify-center rounded-md  shadow-sm px-4 py-2 bg-textpink text-base font-medium text-white hover:bg-red-700 focus:outline-none    sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalBuyCoin;
