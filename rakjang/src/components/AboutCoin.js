import Lottie from "react-lottie";
import animationData from "../../public/3164-coinfall.json";
import farm from "../../public/8206-modern-farm.json";
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
const Button = () => {
  return <div></div>;
};
const AboutCoin = ({}) => {
  return (
    <div>
      <div className="px-4 md:px-8 lg:px-16 pb-10 ">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="my-auto  xl:w-2/3 mx-auto">
            <div className="text-2xl mb-6">What is Rakjang Coin ?</div>
            <div className="text-textgray ">
              รักจังฟาร์ม อำเภอวังน้ำเขียว จังหวัดนครราชสีมา
              เป็นหนึ่งในวิสาหกิจชุมชนต้นแบบที่มีพื้นที่ปลูกกัญชาเพื่อเรียนรู้
              รวมถึงการแปรรูปเป็นผลิตภัณฑ์จากกัญชาที่เหมาะสมและยังพัฒนา
              ให้เป็นแหล่งท่องเที่ยวกัญชาครบวงจร ทั้งการดูต้นกัญชา กัญชงของจริง
              การฝึกอบรม การให้ความรู้และพัฒนาผลิตภัณฑ์
              <div>
                รักจังฟาร์มยังเป็นผู้ริเริ่มการลงทุนกับสินค้าการเกษตรด้วยวิธีที่ทันสมัย
                เพื่อสร้างมูลค่าและส่งเสริมการลงทุนกับสินค้าการเกษตรภายในชุมชน
              </div>
              <div>
                โดยผู้ลงทุนสามารถร่วมลงทุนและเติบโตไปกับเราได้ด้วยเหรียญ RAK
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
            <div className="w-1/3 bg-bgbuttongreen text-white py-2 px-4 rounded-3xl mt-10 flex justify-center items-center cursor-pointer ">
              Invest now
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
              What will you get from Rakjang Coin ?
            </div>
            <div className="text-textgray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque dapibus sagittis nisl, interdum lacinia nunc placerat
              sed. Phasellus at luctus nisl. Maecenas eros eros, ullamcorper
              vitae lacinia blandit, efficitur vel eros. Nulla eget ipsum nec
              enim cursus interdum nec tempus risus . Praesent lobortis urna sit
              amet erat volutpat, et lacinia lacus pulvinar.
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
            <div className=" w-1/3 bg-bgbuttongreen text-white py-2 px-4 rounded-3xl mt-10 flex justify-center items-center cursor-pointer mx-auto ">
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
