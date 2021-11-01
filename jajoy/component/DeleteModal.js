import { Dialog, Transition } from "@headlessui/react";
import React, {
  useState,
  useEffect,
  useCallback,
  memo,
  Fragment,
  useRef,
} from "react";

const DeleteModal = ({
  popCon,
  setPopCon,
  functionDelete,
  deleteId,
  cancelButtonRef,
}) => {
  return (
    <div className="break-all">
      <Transition.Root show={popCon} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          open={popCon}
          onClose={setPopCon}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 shadow-xl break-all">
                  <div className="sm:flex sm:items-start border border-dashed rounded-lg p-2">
                    <div className="w-full">
                      <div className="mx-auto text-center">
                        <div className="text-xl">
                          คุณต้องการลบความคิดเห็นใช่หรือไม่
                        </div>
                      </div>
                      {deleteId?.__typename === "Comment" ? (
                        <div className="text-center mt-4">
                          {deleteId?.comment}
                        </div>
                      ) : (
                        <div className="text-center mt-4">{deleteId?.text}</div>
                      )}

                      <div className="flex justify-center mt-6 mb-2">
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orangetext sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm hover:bg-create hover:text-white"
                          onClick={() => functionDelete(deleteId?.id)}
                          ref={cancelButtonRef}
                        >
                          ยืนยัน
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-create hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orangetext sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setPopCon(false)}
                          ref={cancelButtonRef}
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
export default DeleteModal;
