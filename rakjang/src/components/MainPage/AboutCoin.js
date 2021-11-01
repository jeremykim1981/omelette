import Lottie from "react-lottie";
import animationData from "../../../public/3164-coinfall.json";
import farm from "../../../public/8206-modern-farm.json";
const CelesLottie = () => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        isStopped: false,
        isPaused: false,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      className="w-auto h-auto  "
    />
  );
};

const AboutCoin = ({ onClickInvest }) => {
  return (
    <div className="  ">
      <div className="px-4 md:px-8 lg:px-16 pb-10  ">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="my-auto  xl:w-2/3 mx-auto">
            <div className="text-2xl mb-6">What is RJC Coin ?</div>
            <div className="text-textgray ">
              รักจังฟาร์ม อำเภอวังน้ำเขียว จังหวัดนครราชสีมา เป็นหนึ่งใน{" "}
              <span className=" text-textgreen">วิสาหกิจชุมชน</span>{" "}
              ต้นแบบที่มีพื้นที่ปลูกกัญชาเพื่อเรียนรู้
              รวมถึงการแปรรูปเป็นผลิตภัณฑ์จาก
              <span className=" text-textgreen">กัญชา </span>{" "}
              ที่เหมาะสมและยังพัฒนา ให้เป็นแหล่งท่องเที่ยวกัญชาครบวงจร
              ทั้งการดูต้นกัญชา กัญชงของจริง การฝึกอบรม
              การให้ความรู้และพัฒนาผลิตภัณฑ์
              <div>
                รักจังฟาร์มยังเป็นผู้ริเริ่มการลงทุนกับสินค้าการเกษตรด้วยวิธีที่ทันสมัย
                เพื่อสร้างมูลค่าและส่งเสริมการลงทุนกับสินค้าการเกษตรภายในชุมชน
              </div>
              <div>
                โดยผู้ลงทุนสามารถ
                <span className=" text-textgreen">ร่วมลงทุน </span>{" "}
                และเติบโตไปกับเราได้ด้วยเหรียญ{" "}
                <span className=" text-textgreen"> RJC </span>
                การลงทุนมีระยะเวลาที่ชัดเจน สามารถเลือกรับผลการลงทุนได้
                ทั้งในรูปแบบของกำไร และ รูปแบบของผลิตภัณฑ์
              </div>
              <div>
                นอกจากจะเป็นการสนับสนุนสินค้าชุมชนแล้ว
                ผู้ลงทุนสามารถมั่นใจได้ว่า ผลิตภัณฑ์ที่ท่านลงทุนกับเรา
                จะสร้างกำไรให้ท่านได้อย่างงดงามแน่นอน
              </div>
              <div className="font-semibold">
                “ ลงทุนได้กำไร เชื่อมั่นใน รักจังฟาร์ม “
              </div>
            </div>
          </div>
          <div className="xl:w-2/3 mx-auto">
            <CelesLottie />
          </div>
          <div>
            <img className="xl:w-2/3 mx-auto" src="../coin/coin2.png"></img>
          </div>
          <div className="xl:w-2/3 mx-auto">
            <div className="text-2xl mb-6">
              What will you get from RJC Coin ?
            </div>
            <div className="text-textgray flex flex-col justify-start  items-start space-y-4">
              <div className="flex justify-center items-center space-x-4">
                <img className="w-10 h-10" src="../icon/rjc1.png" />
                <div className=" font-light">
                  สามารถใช้ซื้อหน่วยลงทุนได้ทั้ง หน่วยลงทุนแบบ มือ 1 และ
                  หน่วยลงทุนแบบ มือ 2
                </div>
              </div>
              <div className="flex justify-center items-center space-x-4">
                <img className="w-10 h-10" src="../icon/rjc2.png" />
                <div className=" font-light">
                สามารถใช้อุดหนุนสินค้าจากชุมชนได้
                </div>
              </div>
              <div className="flex justify-center items-center space-x-4">
                <img className="w-10 h-10" src="../icon/rjc3.png" />
                <div className=" font-light">
                ให้ผลการลงทุนที่งดงามทั้งรูปแบบกำไรและผลิตภัณฑ์
                </div>
              </div>
              <div className=" font-semibold">รักจังฟาร์ม ขอเชิญชวนนักลงทุนทุกท่าน “ ร่วมเติบโตไปกับเรา ”</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src="../mock/cycle.jpg" />
      </div>
      <div className="px-4 md:px-8 lg:px-16 pb-10 ">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="xl:w-2/3 mx-auto my-auto">
            <div>
              <img src="../mock/cyclemock.png" />
            </div>
            <div
              onClick={() => onClickInvest()}
              className=" w-1/3 bg-bgbuttongreen text-white py-2 px-4 rounded-3xl mt-10 flex justify-center items-center cursor-pointer mx-auto "
            >
              Invest now
            </div>
          </div>
          <div className="xl:w-2/3 mx-auto">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: farm,
                isStopped: false,
                isPaused: false,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              className="w-auto h-auto  "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutCoin;
