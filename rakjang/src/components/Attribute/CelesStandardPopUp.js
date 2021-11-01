import { Fragment, useCallback, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import LoadingMutation from "../Loading/LoadingMutation";
import classNames from "classnames";

export const CelesStandardPopUp = ({
  open = false,
  setOpen,
  panel,
  title,
  save = null,
  clearInput = null,
  createLoading = null,
  disabled = false,
  pathname = null,
  hidden,
  error,
}) => {
  const router = useRouter();
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  const onSubmit = async () => {
    if (save) {
      await save();
    }
    setOpen(false);

    if (pathname) {
      router.push(pathname);
    }
  };

  const onClose = () => {
    if (clearInput) {
      clearInput();
    }
    setOpen(false);
  };

  return (
    <Transition.Root show={open || false} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 inset-0"
        open={open}
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen text-center font-Kanit ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30   transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0"
          >
            <div className="inline-block align-middle bg-white text-left z-20 shadow-xl transform transition-all rounded-lg shadowModal ">
              <div className="text-xl font-bold  flex flex-col justify-center items-center  p-4 px-10 pb-0">
                {title}
              </div>
              {panel}
              <div
                className={`${
                  hidden ? " hidden " : ""
                }+" bg-white px-4 h-13 z-10 space-x-10  py-auto  fixed bottom-0 w-full rounded-b-lg flex justify-center items-center"`}
              >
                {error && <div>กรอกข้อมูลไม่ครบถ้วน</div>}
                <button
                  disabled={createLoading ? createLoading : disabled}
                  type="button"
                  className={classNames(
                    "w-24 my-2 inline-flex justify-center text-base rounded-lg  px-4 py-1 mx-4  text-white focus:outline-none",
                    {
                      "bg-textdarkgreen cursor-pointer": createLoading
                        ? !createLoading
                        : !disabled,
                      "bg-gray-400 cursor-not-allowed": createLoading
                        ? createLoading
                        : disabled,
                    }
                  )}
                  onClick={disabled ? () => {} : () => onSubmit()}
                >
                  {createLoading ? <LoadingMutation /> : "ยืนยัน"}
                </button>
                <button
                  type="button"
                  className="w-24 my-2 inline-flex justify-center rounded-lg  px-4 py-1 bg-textpink text-base  text-white focus:outline-none"
                  onClick={() => onClose()}
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
};
