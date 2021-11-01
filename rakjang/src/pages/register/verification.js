const verification = () => {
    return (
      <div className="flex flex-col justify-center items-center loginblog max-w-md mx-4 md:mx-auto border-textlogingreen border border-separate border-opacity-10  mt-10 p-6 space-y-4  ">
        <div className=" font-bold text-2xl   text-textlogingreen">
        Verification
        </div>
        <img className="w-32" src="../icon/verify.png" />
        <div className="  font-normal text-2xl text-center   text-textlogingreen">
        กรุณากรอกรหัส 6 หลัก
<div>ที่เราส่งให้คุณทางมือถือ</div>

        </div>
        <div className="grid grid-cols-6 gap-4">
            <input className="flex justify-center items-center shadow-lg border w-10 py-2 px-2 focus:outline-none" />
            <input className="flex justify-center items-center shadow-lg border w-10 py-2 px-2 focus:outline-none" />
            <input className="flex justify-center items-center shadow-lg border w-10 py-2 px-2 focus:outline-none" />
            <input className="flex justify-center items-center shadow-lg border w-10 py-2 px-2 focus:outline-none" />
            <input className="flex justify-center items-center shadow-lg border w-10 py-2 px-2 focus:outline-none" />
            <input className="flex justify-center items-center shadow-lg border w-10 py-2 px-2 focus:outline-none" />
        </div>
        
        <div className="w-80 text-white bg-textlogingreen rounded-md py-2 flex justify-center items-center">
        ขอรหัสยืนยันใหม่
        </div>
        
      </div>
    );
  };
  export default verification;
  