import Lottie from "react-lottie";
import animationData from "../../../public/lf30_editor_fpjbnfdt.json";

const UnbuyCoinLottie = () => {
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

export default UnbuyCoinLottie