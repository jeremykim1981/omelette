/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import { ZeroPad } from "../../function/functions";
import classNames from "classnames";
import { useSelector } from "react-redux";

import LoadingMutation from "../../components/Loading/LoadingMutation";
import { postHistory } from "../../api/history";
import SwalAlert from "../../event/SwalAlert";

const Fieldnput = ({ title, setForm, value, name, ...rest }) => {
  const onForm = (e) => {
    const value = e.target.value;
    if (name === "coins") {
      if (parseInt(value)) {
        setForm((prev) => {
          return {
            ...prev,
            coins: value,
          };
        });
      }
    }

    setForm((prev) => {
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  };

  return (
    <div className="w-full ">
      <label className=" text-sm md:text-base  text-black">{title}</label>
      <input
        className="border px-3 py-2 w-full  focus:outline-none rounded-md"
        onChange={onForm}
        value={value}
        {...rest}
      />
    </div>
  );
};

function ModalBuyCrypto({ open, setOpen }) {
  const cancelButtonRef = useRef(null);

  const { user } = useSelector((state) => state.initializeApp);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    link: "",
    coins: 0,
    transfer_date: "",
    transfer_time: "",
  });
  const [error, setError] = useState(false);

  const onClickSubmit = async () => {
    try {
      if (
        !form.link &&
        !form.coins &&
        !form.transfer_date &&
        !form.transfer_time
      ) {
        return setError(true);
      }

      setLoading(true);
      await postHistory({
        transection: "EARNING",
        me: user?.id,
        history_type: "DEPOSIT_CRYPTO",
        link: form.link,
        coin: form.coins,
        transfer_date: form.transfer_date,
        transfer_time: form.transfer_time,
      });
      await SwalAlert.Success();
    } catch (error) {
      console.log("Crypto error", error);
      await SwalAlert.Fail();
    } finally {
      setLoading(false);
    }
  };

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
            <div className="inline-block  align-middle  h-cardbg mb-4 rounded-lg text-left bg-white overflow-hidden shadow-xl transform transition-all    sm:max-w-lg sm:w-full overflow-y-auto">
              <div className=" p-4 flex flex-col justify-between items-center    ">
                <div className="">
                  <div className="sm:flex justify-center sm:items-center space-y-4 ">
                    <div className="flex flex-col justify-center text-textgray ">
                      <Dialog.Title
                        as="h3"
                        className="text-xl leading-6 text-center   text-textlogingreen font-bold"
                      >
                        ยืนยันการซื้อเหรียญ Rakjang
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="flex flex-col my-4 items-center justify-center py-4 px-6 space-y-6">
                    <div><Fieldnput
                      name="link"
                      title="กรุณาใส่ Link หลักฐานการแลกเหรียญ"
                      setForm={setForm}
                    />
                    <div className="text-gray-500 font-light text-xs  line-clamp-1     ">https://bscscan.com/tx/0x329a17712ac68c1f5567622cd655...</div>
                    </div>
                    <Fieldnput
                      name="coins"
                      title="จำนวนเหรียญ"
                      setForm={setForm}
                    />
                    <Fieldnput
                      name="transfer_date"
                      title="วันที่โอน"
                      type="date"
                      setForm={setForm}
                    />
                    <Fieldnput
                      name="transfer_time"
                      title="เวลาที่ทำการโอน"
                      type="time"
                      setForm={setForm}
                    />
                  </div>
                  {error && (
                    <div className="text-center">โปรดกรอกข้อมูลให้ครบ</div>
                  )}
                </div>
                <div className="flex space-x-1 justify-center items-center">
                  <button
                    type="button"
                    className={classNames(
                      "w-28 flex justify-center rounded-md  shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none    sm:text-sm ",
                      {
                        "bg-textlogingreen hover:bg-textdarkgreen cursor-pointer":
                          !loading,
                        "bg-gray-400 cursor-not-allowed": loading,
                      }
                    )}
                    onClick={onClickSubmit}
                  >
                    {loading && <LoadingMutation />}
                    ยืนยัน
                  </button>
                  <button
                    disabled={loading}
                    type="button"
                    className={classNames(
                      " w-28 flex justify-center rounded-md  shadow-sm px-4 py-2  text-base  font-medium text-white focus:outline-none    sm:text-sm",
                      {
                        "bg-gray-400 cursor-not-allowed": loading,
                        "bg-textpink hover:bg-red-700  cursor-pointer":
                          !loading,
                      }
                    )}
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalBuyCrypto;
