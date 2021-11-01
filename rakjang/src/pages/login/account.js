const account = () => {
  return (
    <div className="flex flex-col justify-center items-center loginblog max-w-md mx-4 md:mx-auto border-textlogingreen border border-separate border-opacity-10  mt-10 p-6 space-y-4  ">
      <div className=" font-bold text-2xl   text-textlogingreen">
        Rakjang Farm
      </div>
      <img className="w-32" src="../logo/logo.png" />
      <div className="  font-medium text-2xl   text-textlogingreen">
        Create an account
      </div>
      <div className="text-textlogingreen flex justify-center items-center space-x-4">
        <div className="border-b-4 w-14 border-textlogingreen"></div>
        <div className="text-lg">บัญชีผู้ใช้</div>
        <div className="border-b-4 w-14 border-textlogingreen"></div>
      </div>
      <div className="">
        <div className="text-textgray">ชื่อบัญชี</div>
        <input
          value="กรุณากรอกชื่อบัญชีผู้ใช้งาน"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 text-textlogingray"
        ></input>
      </div>
      <div className="">
        <div className="text-textgray">E-mail</div>
        <input
          value="Enter your email address"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 text-textlogingray"
        ></input>
      </div>
      <div className="">
        <div className="text-textgray">หมายเลขโทรศัพท์</div>
        <input
          value="กรุณากรอกหมายเลขโทรศัพท์"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 text-textlogingray"
        ></input>
      </div>
      <div className="">
        <div className="text-textgray">รหัสผ่าน</div>
        <input
          value="กรุณากรอกรหัสผ่าน 6 หลัก"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 text-textlogingray"
        ></input>
      </div>
      <div className="">
        <div className="text-textgray">ยืนยันรหัสผ่าน
</div>
        <input
          value="กรุณายืนยันรหัสผ่าน 6 หลัก"
          className="w-80 border rounded-md focus:outline-none px-4 py-2 text-textlogingray"
        ></input>
      </div>
      <div className="w-80 text-white bg-textlogingreen rounded-md py-2 flex justify-center items-center">
      Sign up
      </div>
      
    </div>
  );
};
export default account;
