import ImageGallery from "react-image-gallery";
import ProductCard from "../../components/Card/ProductCard";

const images = [
  {
    original: "../mock/mock1.jpg",
    thumbnail: "../mock/mock1.jpg",
  },
  {
    original: "../mock/mock2.jpg",
    thumbnail: "../mock/mock2.jpg",
  },
  {
    original: "../mock/mock3.jpg",
    thumbnail: "../mock/mock3.jpg",
  },
  {
    original: "../mock/mock4.jpg",
    thumbnail: "../mock/mock4.jpg",
  },
];

const Breadcrumb = () => {
  return (
    <div className=" flex justify-start items-center space-x-2">
      <div className="text-textgray">Home</div>
      <svg
        className="w-4 h-4 text-textdarkgreen"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
      <div className=" text-textgray">Product</div>
      <svg
        className="w-4 h-4 text-textdarkgreen"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
      <div className=" text-textdarkgreen">น้ำสลัดครีมเมล่อน</div>
    </div>
  );
};
const Filter = ({ name = "" }) => {
  return (
    <div className="text-sm hover:text-white hover:bg-textgreen  cursor-pointer rounded-full w-20 border border-textgreen text-textgreen bg-greenblog flex justify-center items-center bg-opacity-30">
      {name}
    </div>
  );
};
const ProductBlog = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-10 ">
      <div className="flex justify-start  items-start flex-col">
        <div className="text-3xl  textlinear font-bold ">นำ้สลัดครีมเมล่อน</div>
      </div>
      <div className="flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center mt-4">
        <Breadcrumb />
        <div className="text-textgray flex justify-center  items-center mt-4 md:mt-0 ">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <div>120</div>
          <svg
            className="w-6 h-6 ml-4"
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
      </div>
      <div>
        <div className="flex space-x-10 text-textdarkgreen mt-10 overflow-x-scroll">
          <div className="text-lg">Tag</div>

          <Filter name="ผลไม้" />

          <Filter name="ข้าว" />
        </div>
      </div>
      <div className="w-2/3 mx-auto mt-10">
        <ImageGallery items={images} thumbnailPosition={"right"} />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-10">
        <div className=" bg-bgproduct rounded-xl p-4">
          <div className=" text-textdarkgreen text-2xl">รายละเอียดสินค้า</div>
          <div className=" font-light space-y-4 mt-4">
            <div>น้ำสลัดครีมเมล่อน Melon Salad Cream Dressing </div>
            <div>
              เมล่อน หวาน หอม เป็นผลไม้ที่มีโซเดียมต่ำ
              และมีโพแทสเซียมสูงอาจช่วยรักษาระดับ
              ความดันโลหิตให้แข็งแรงอีกทั้งยังช่วยลด
              ความเสี่ยงของความดันโลหิตสูงและโรคหัวใจ
            </div>
            <div>
              น้ำสลัดครีมเมล่อน หอม อร่อย สูตร Homemade Healthy Food
              เพื่อสุขภาพที่ดี ทานกับผัดสด ผักสลัด หรือผลไม้ก็ได้
            </div>
            <div>EXP : 20 / 12 / 2021 แบบขวด น้ำหนักสุทธิ 370 กรัม</div>
            <div>ราคา 50 เหรียญ</div>
          </div>
        </div>
        <div className="  bg-bgcareerblog bg-opacity-30 text-xl rounded-xl p-4 flex flex-col justify-between ">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className=" text-textdarkgreen ">รหัสสินค้า </div>
              <div className="font-light text-textgray">12345A</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="">
                <div className="flex justify-start items-center  text-textpink ">
                  <img className="w-8 h-8 mr-4" src="../icon/coin.png"></img>50{" "}
                </div>
                <div className="font-light text-base">ราคา / ขวด</div>
              </div>{" "}
              <div className=" text-textgray flex justify-center items-center space-x-1.5">
                <div className=" bg-gray-200 w-14 h-7  flex justify-center items-center rounded">
                  -
                </div>
                <div className=" bg-white border w-14 h-7 text-base flex justify-center items-center rounded">
                  1
                </div>
                <div className="  bg-textdarkgreen text-white w-14 h-7  flex justify-center items-center rounded">
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="  bg-textdarkgreen text-white py-1 px-4 rounded-3xl  flex justify-center items-center cursor-pointer  ">
            Add to basket
          </div>
        </div>
      </div>
      <div>
        <div className=" text-textdarkgreen text-2xl mt-10">
          สินค้าที่คล้ายกัน
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mt-4">
          <ProductCard
            name="ไข่ไก่ แม่ไก่สาว"
            view="200"
            price="100"
            unit="แพค"
            serialnumber="12345A"
            detail="ไข่ไก่ฟองแรกๆจากแม่ไก่สาวแรกรุ่น 
อายุประมาณ 18-30 สัปดาห์
ซึ่งเป็นช่วงอายุที่แม่ไก่มีความสมบูรณ์มากที่สุด 
อุดมด้วยคุณค่าทางโภชนาการ"
          />
          <ProductCard
            name="ไข่ไก่ แม่ไก่สาว"
            view="200"
            price="100"
            unit="แพค"
            serialnumber="12345A"
            detail="ไข่ไก่ฟองแรกๆจากแม่ไก่สาวแรกรุ่น 
อายุประมาณ 18-30 สัปดาห์
ซึ่งเป็นช่วงอายุที่แม่ไก่มีความสมบูรณ์มากที่สุด 
อุดมด้วยคุณค่าทางโภชนาการ"
          />
          <ProductCard
            name="ไข่ไก่ แม่ไก่สาว"
            view="200"
            price="100"
            unit="แพค"
            serialnumber="12345A"
            detail="ไข่ไก่ฟองแรกๆจากแม่ไก่สาวแรกรุ่น 
อายุประมาณ 18-30 สัปดาห์
ซึ่งเป็นช่วงอายุที่แม่ไก่มีความสมบูรณ์มากที่สุด 
อุดมด้วยคุณค่าทางโภชนาการ"
          />
          <ProductCard
            name="ไข่ไก่ แม่ไก่สาว"
            view="200"
            price="100"
            unit="แพค"
            serialnumber="12345A"
            detail="ไข่ไก่ฟองแรกๆจากแม่ไก่สาวแรกรุ่น 
อายุประมาณ 18-30 สัปดาห์
ซึ่งเป็นช่วงอายุที่แม่ไก่มีความสมบูรณ์มากที่สุด 
อุดมด้วยคุณค่าทางโภชนาการ"
          />
        </div>
      </div>
    </div>
  );
};
export default ProductBlog;
