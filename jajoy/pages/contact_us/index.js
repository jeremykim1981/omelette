import Link from "next/link";
import withAuth from "../../hoc/withAuth";
const Contact_us = () => {
  const buttonStyle =
    " shadowbox font-Times text-xl  p-8 px-10 md:px-14 border    rounded bg-creambg  cursor-pointer";

  return (
    <div className="bg-creambg     font-Times text-textaboutus pb-20 max-w-screen-2xl mx-auto">
      <div
        className="text-center text-5xl md:text-7xl font-Times  py-32  "
        style={{
          backgroundImage: "url(" + "../contact/contact.jpg" + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        CONTACT US
        <div className="px-4 md:px-8 lg:px-16 ">
          <div className="font-Prompt font-light text-lg mt-20 ">
            เพราะเราเชื่อว่าการบอกต่อสิ่งดี ๆ จากเพื่อนถึงเพื่อน เชื่อใจได้เสมอ
            <span className="font-Timesfont-light  mx-2 ">
              JAJOIN x GLOW ON IDEA
            </span>
            ขอเป็นส่วนหนึ่งในการเชื่อมต่อสิ่งดี ๆ เหล่านี้
          </div>
          <div className="font-Prompt font-light text-lg mt-8 ">
            <span className="font-light font-Times mx-2">
              GLOW ON IDEA ACWORK
            </span>
            ให้บริการด้าน
            <span className="font-Times font-light mx-2">
              Social Media Marketing / Influencer / KOL & KOC
            </span>
            รวมถึง
            <span className="font-Times font-light mx-2">Real User review</span>
          </div>
        </div>
      </div>
      <div className="font-Times text-center text-3xl my-10 ">
        WANNA JOIN US ?
      </div>
      <div className="flex justify-center pb-10">
        <Link href={`/contact_us/marketer`}>
          <div className={buttonStyle + " mr-4 md:mr-10"}>Marketer</div>
        </Link>
        <Link href={`/contact_us/reviewer`}>
          <div className={buttonStyle}>Reviewer</div>
        </Link>
      </div>
      <div className="px-4 md:px-8 lg:px-16 flex flex-col md:flex-row justify-between text-base">
        <div>
          <div className=" font-Times">GLOWON IDEA ACWORK</div>
          <div>168/22 ซอย1 โครงการพลีโน่พหลโยธิน-วัชรพล 2 </div>
          <div>แขวง คลองถนน เขตสายไหม กรุงเทพมหานคร 10220</div>
        </div>
        <div className="mt-10 md:mt-0">
          <div className=" font-Times">
            <a target="_blank" href="mailto:thanthon868@gmail.com">
              <p className="">
                E-mail:
                <span className="ml-2 font-Times text-blue-500">
                  thanthon868@gmail.com
                </span>
              </p>
            </a>
          </div>
          <div className=" font-Times">
            <a target="_blank" href=" tel: 083-935-4424">
              <p className=" cursor-pointer ">
                Phone:
                <span className="ml-1 font-Times text-blue-500">
                  083-935-4424
                </span>
              </p>
            </a>
          </div>
          <div className="flex justify-start gap-2  md:gap-4 items-center mt-4">
            <div>
              <img className="w-6 h-6 rounded mr-2" src="../whatwedo/fb.png" />
            </div>
            <div>
              <img className="w-6 h-6 rounded mr-2" src="../whatwedo/ig.png" />
            </div>
            <div>
              <img
                className="  w-6 h-6 rounded-lg mr-2"
                src="../whatwedo/twitter.png"
              />
            </div>
            <div>
              <img
                className="  w-6 h-6 rounded-lg mr-2"
                src="../whatwedo/tiktok.png"
              />
            </div>
            <div>
              <img
                className="  w-6 h-6 rounded-lg mr-2"
                src="../whatwedo/youtube.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto border-4 border-brownnav  md:w-2/3 mt-10    ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.9662352325477!2d100.64579885013048!3d13.90096639751735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d7da1e69692f3%3A0x9aa70ca66e51102c!2sGLOWON%20IDEA%20ACWORK!5e0!3m2!1sen!2sth!4v1622452411072!5m2!1sen!2sth"
          className="w-full "
          height={450}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};
export default Contact_us;
