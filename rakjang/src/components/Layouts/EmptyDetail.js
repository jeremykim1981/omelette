import Link from "next/link";
const EmptyDetail = ({}) => {
    return (
      <div>
        <div className="bg-bgbasket  h-90vh m-4 p-4 flex flex-col justify-center items-center text-textdarkgreen space-y-4">
          <div>
            <img src="../icon/shopping-basket.png" />
          </div>
          <div className=" font-medium">ตะกร้าของคุณว่างเปล่า</div>
          <Link href="/Product"><div className="hover:underline cursor-pointer">เลือกซื้อสินค้า</div></Link>
        </div>
      </div>
    );
  };
  export default EmptyDetail;