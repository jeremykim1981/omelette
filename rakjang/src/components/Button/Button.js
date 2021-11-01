import React from "react";
import className from "classnames";

function Button({ text, loading, bgColor, ...props }) {
  return (
    <button
      {...props}
      className={className(`cursor-pointer ${props.className}`, {
        "bg-gray-400 cursor-not-allowed": loading,
        "bg-textlogingreen": !loading,
      })}
    >
      {loading ? "กำลังบันทึก" : text}
    </button>
  );
}

export default Button;
