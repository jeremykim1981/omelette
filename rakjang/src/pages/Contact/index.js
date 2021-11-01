import ShowSocial from "../../components/Layouts/ShowSocial";

const Contact = () => {
  return (
    <div>
      <div className=" bg-bg-contact h-xl  bg-center relative w-full"></div>
      <div className="px-4 md:px-8 lg:px-16 py-10">
        <div className="text-center text-textblue   bg-white">
          {/* <div className=" font-bold text-3xl">contact us</div> */}
          <div className="px-4 md:px-8  text-textdarkgreen lg:px-16 flex flex-col md:flex-row justify-between text-base ">
            <div className="flex flex-col items-start justify-start text-left">
              {/* <div className="text-xl">Address</div> */}
              <div className=" ">รักจังเมล่อนฟาร์ม</div>
              <div>เลขที่ 105 หมู่ที่ 1 ถนน ตำบลไทยสามัคคี </div>
              <div>อำเภอวังน้ำเขียว จังหวัดนครราชสีมา 30370</div>
            </div>
            <div className="mt-10 md:mt-0  flex flex-col items-start justify-start">
              <a
                rel="noreferrer"
                target="_blank"
                href="mailto:3792397@gmail.com"
              >
                {" "}
                <div className="">
                  E-mail :{" "}
                  <span className="ml-2    text-textdarkgreen hover:underline">
                    3792397@gmail.com
                  </span>
                </div>
              </a>
              <a rel="noreferrer" target="_blank" href={`${"tel:0813484444"}`}>
                <div className="">
                  Phone :
                  <span className="ml-2  text-textdarkgreen hover:underline">
                    081 348 4444
                  </span>
                </div>
              </a>
              <ShowSocial />
            </div>
          </div>
          <div className="mx-auto   bg-textdarkgreen p-4   lg:w-2/3 mt-10 rounded-xl    ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.2330485285124!2d101.9232804149339!3d14.355920589958718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311c0d2d3210ccb1%3A0x181f77bec001365e!2sSweet%20melon%20farm!5e0!3m2!1sen!2sth!4v1631033969717!5m2!1sen!2sth"
              className="w-full "
              height={450}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
