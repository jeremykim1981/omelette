import React, { useState, Fragment, useRef } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { renderHtml } from "../utils/renderHtml";

const Image_Pop_Up = ({
  image,
  open,
  setOpen,
  choose = false,
  title,
  choose1 = "Yes",
  choose2,
  onfunction = () => setOpen(false),
  description,
  thumnail,
  html,
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <div className="break-all">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          open={open}
          onClose={setOpen}
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
              {choose ? (
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {thumnail ? (
                        <img
                          src={thumnail}
                          className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                        ></img>
                      ) : (
                        ""
                      )}

                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        {title ? (
                          <div className="text-lg leading-6 font-medium text-gray-900">
                            {title}
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="mt-2">
                          {description ? (
                            <p className="text-sm text-gray-500">
                              {description}
                            </p>
                          ) : (
                            ""
                          )}

                          {html ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: renderHtml(html),
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onfunction}
                    >
                      {choose1}
                    </button>
                    {choose2 ? (
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        {choose2}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ">
                  <div className="bg-yellow px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start bg-yellow">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                        {image ? <img src={image} className="z-50" /> : ""}
                      </div>
                    </div>
                  </div>
                  <div
                    className="mx-auto text-center bg-yellowtext my-2"
                    onClick={() => setOpen(false)}
                  >
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center px-4 py-2 font-semibold text-black text-xl sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm border-dashed"
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
export default Image_Pop_Up;
