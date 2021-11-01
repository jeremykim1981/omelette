const News = () => {
  return (
    <div>
      <div className="bglinearsecsion grid md:grid-cols-2 gap-6 lg:gap-10 my-10 px-4 md:px-8 lg:px-16 py-10">
        <div>
          <img
            className="w-full h-full object-contain"
            src="../news/news.png"
          />
        </div>
        <div className=" text-textgray xl:w-2/3 my-10 mx-auto">
          <div className=" text-3xl md:text-4xl mb-10  text-textgreen  text-center ">
            ลงทุนได้กำไร <div className="text-center">เชื่อมั่นใน รักจังฟาร์ม</div>
          </div>
          <div className=" textlinear font-light ">
            การลงทุนที่คุณจะมีแต่ได้กับได้ รักจังฟาร์มเรามีทีมงานคุณภาพ
            เป็นผู้ดูแลผลิตภัณฑ์และฟาร์มของเรา ผู้ลงทุนสามารถมั่นใจได้เลย
            ว่าผลิตภัณฑ์ที่ท่านลงทุนกับเรานั้น จะสร้างกำไรให้ท่านได้อย่างงดงาม
          </div>
          <div className="grid grid-cols-2 mt-4 gap-4">
            <img className="rounded-2xl" src="../news/icon1.png/" /> <img className="rounded-2xl" src="../news/icon2.png/" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default News;
