const Detail = ({
  code,
  coin,
  count,
  unit,
  name,
  index,
  increaseCount,
  decreaseCount,
  onClciktoDelete
}) => {
  return (
    <div className="space-y-2 text-textdarkgreen relative">
      <div className=" font-semibold text-lg  ">{name}</div>
      <div className="flex justify-between items-center">
        <div className=" font-semibold">รหัสสินค้า </div>
        <div className="font-light text-textgray">{code}</div>
      </div>
      <div className="flex justify-between  items-start ">
        <div className="">
          <div className="flex justify-start items-center  text-textpink font-semibold ">
            <img className="w-8 h-8 mr-4" src="../icon/coin.png"></img>
            {coin * count}
          </div>
          <div className="font-light text-sm text-textgray ">ราคา / {unit}</div>
        </div>
        <div className=" text-textgray flex justify-center items-center space-x-1.5">
          <div
            onClick={count > 0 ? () => decreaseCount(count, index) : () => {}}
            className={`${
              count > 0 ? "bg-textdarkgreen text-white" : "bg-gray-200 "
            } cursor-pointer  w-14 h-7  flex justify-center items-center rounded`}
          >
            -
          </div>
          <div className=" bg-white border w-14 h-7 text-base flex justify-center items-center rounded">
            {count}
          </div>
          <div
            onClick={() => increaseCount(count, index)}
            className=" cursor-pointer bg-textdarkgreen text-white w-14 h-7  flex justify-center items-center rounded"
          >
            +
          </div>
        </div>
      </div>
      <div className="border-b"></div>
      <div onClick={()=>onClciktoDelete( index)} className="cursor-pointer text-textpink absolute  bottom-1  right-0"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg></div>
    </div>
  );
};
export default Detail;
