const TextArea = ({
  label = "",
  name,
  value,
  setFieldMulti,
  setField,
  placeholder,
  index,
  primaryField,
  className = "text-lg mb-2 text-gray-600",
}) => {
  const onChange = (e) => {
    if (primaryField) {
      return setFieldMulti(name, primaryField, index)(e.target.value);
    }
    setField(name)(e.target.value);
  };

  return (
    <div>
      <div className={className}>{label}</div>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-white border text-lg text-textgray border-textgray   border-opacity-30 my-1 rounded p-1 px-2 w-full lg:w-2/3 focus:ring-1 focus:ring-orangetext outline-none "
        rows={2}
      />
    </div>
  );
};
export default TextArea;
