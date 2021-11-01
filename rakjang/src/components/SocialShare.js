import React, { useState } from "react";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  LineShareButton,
  FacebookIcon,
  TwitterIcon,
  LineIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
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
  );
};

const SocialShare = ({
  shareUrl = "https://www.google.co.th/",
  title = "",
}) => {
  return (
    <div className="flex">
      <div className="mt-1 mx-1">
        <svg
          onClick={() => {
            navigator.clipboard.writeText(shareUrl);
            toast.success("คัดลอกเรียบร้อยแล้ว", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }}
          className="w-6 h-6 cursor-pointer my-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </div>
      <div className="mx-1">
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
      <div className="mx-1">
        <FacebookMessengerShareButton url={shareUrl} appId="708298743448685">
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
      </div>
      <div className="mx-1">
        <LineShareButton url={shareUrl} title={title}>
          <LineIcon size={32} round />
        </LineShareButton>
      </div>
      <div className="mx-1">
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
      <div className="mx-1">
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
      <Toast />
    </div>
  );
};

export default SocialShare;
