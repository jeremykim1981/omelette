import WalletCard from "../Card/WalletCard";

const All = () => {
    return (
        <div className="grid grid-cols-1 gap-4 mt-4">
            <WalletCard
                type="Witdraw"
                serial="123456789"
                date="06-07-2021"
                time="22:07"
                status="APPROVE"
                name="นายสุข ไปด้วยกัญ"
                id="xxxxxxx"
                coin="- 500"
            />
            <WalletCard
                type="Witdraw"
                serial="123456789"
                date="06-07-2021"
                time="22:07"
                status="APPROVE"
                name="นายสุข ไปด้วยกัญ"
                id="xxxxxxx"
                coin="- 500"
            />
        </div>
    );
};

export default All