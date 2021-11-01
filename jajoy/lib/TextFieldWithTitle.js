import React, { useState } from "react";

function autoTab(obj) {
  var pattern = new String("_-____-_____-__-_"); // กำหนดรูปแบบในนี้
  var pattern_ex = new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
  var returnText = new String("");
  var obj_l = obj.length;
  var obj_l2 = obj_l - 1;
  for (var i = 0; i < pattern.length; i++) {
    if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
      returnText += obj + pattern_ex;
      obj = returnText;
    }
  }
  if (obj_l >= pattern.length) {
    obj = obj.substr(0, pattern.length);
  }
  return obj;
}

const CelesTextFieldWithTitle = ({
  label,
  name,
  setField,
  value,
  setFieldMulti,
  primaryField,
  classNameinbox,
  placeholder = "",
  index,
  className = "w-full ",
}) => {
  const onChange = (e) => {
    setField(name)(e.target.value);
  };

  return (
    <div className="w-full ">
      <div className={className}>{label}</div>
      <input
        type=""
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={
          "bg-white border   text-textgray border-textgray   border-opacity-30 my-1 rounded p-1 px-2 w-full focus:ring-1 focus:ring-orangetext outline-none   " +
          classNameinbox
        }
      />
    </div>
  );
};

export default CelesTextFieldWithTitle;
