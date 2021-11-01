import React, { useState } from "react";
import Select from "react-select";

const CelesSelect = ({
  name,
  options,
  className = "bg-white   text-lg  my-1 rounded mx-auto w-full lg:w-2/3 focus:ring-1 focus:ring-orangetext outline-none  text-gray-700",
  disable = false,
  value,
  placeholder,
  defaultValue,
  // selectedOption = "",
  // setSelectOption,
  setField,
}) => {
  const [label, setLabel] = useState("");

  const handleChange = (e) => {
    setLabel(e.label);
    setField(name)(e.value);

    // if (setSelectOption != undefined) setSelectOption(selectedOption);
  };
  const customStyles = {
    input: () => ({
      height: 36,
      // border: "0px solid black",
    }),
    control: (base, state) => ({
      ...base,
      // border: "0px solid #D1733D",

      /*
            boxShadow: 'none',
            '&:hover': {
                border: '1px solid black',
            }*/
    }),
  };
  return (
    <Select
      styles={customStyles}
      // isDisabled={disable}
      isSearchable={true}
      className={
        className + " focus:ring-1 focus:ring-orangetext outline-none   "
      }
      options={options}
      placeholder={placeholder}
      onChange={handleChange}
      value={options?.filter(function (option) {
        return option.value === value;
      })}
      // value={value}
    />
  );
};

export default CelesSelect;
