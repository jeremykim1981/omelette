const SuccessCard = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 pt-10  flex justify-center items-center">
      <div className=" w-screen  max-w-lg border shadowModal rounded-xl h-screen  max-h-bill text-textdarkgreen  overflow-y-scroll">
        <div className="m-4 flex flex-col justify-center items-center  space-y-2">
          <div className="text-2xl ">ซื้อสินค้าสำเร็จ !</div>
          <img className="w-20 h-auto" src="../icon/correct.png" />
          <div className="text-lg">หมายเลขการสั่งซื้อ</div>
          <div className="text-2xl text-black">1234ABCD</div>
          <div className=" text-textgray  font-light">06-07-2021 22:07</div>

          {/* <div className=" text-black">รับสินค้าที่หน้าฟาร์ม</div> */}
          <div className=" text-black">ส่งพัสดุ</div>
          <div className="w-2/3">
            <div className=" flex justify-between text-textgray  font-light  ">
              <div>น้ำสลัดครีมเมล่อน </div>
              <div>x1</div>
            </div>
            <div className=" flex justify-between text-textgray  font-light  ">
              <div>ชาดีจัง สุขไปด้วยกัญ </div>
              <div>x1</div>
            </div>
          </div>

          <div className=" flex justify-between text-textgray  font-light w-2/3  ">
            <div>ราคาสินค้ารวม </div>
            <div className="flex justify-end items-center">
              <img className="w-8 h-8 mr-4" src="../icon/coin.png" />
              200
            </div>
          </div>
          <div className=" mr-auto w-4/6 mx-auto mt-2">
            <div className="flex  justify-start flex-col items-start text-gray-900 text-sm ">
              ที่อยู่สำหรับจัดส่ง
            </div>
            <div className=" text-textgray text-sm font-light">
              เลขที่ 105 หมู่ที่ 1 ถนน ตำบลไทยสามัคคี อำเภอวังน้ำเขียว
              จังหวัดนครราชสีมา 12345
            </div>
          </div>
          <div className=" space-y-4">
            <div className=" text-white bg-textdarkgreen flex justify-center items-center rounded-full  py-2 w-80">
              บันทึกภาพ
            </div>
            <div className=" text-textdarkgreen bg-white border border-textdarkgreen flex justify-center items-center rounded-full  py-2 w-80">
              ประวัติการสั่งซื้อ
            </div>
            <div className=" text-textdarkgreen bg-white border border-textdarkgreen flex justify-center items-center rounded-full  py-2 w-80">
              เลือกซื้อสินค้าต่อ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuccessCard;
