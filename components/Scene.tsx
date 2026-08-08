import { ShirtType } from "@/lib/textures"
import { FirstWhiteModel } from "./FirstWhiteModel";
import { FirstGrayModel } from "./FirstGrayModel";
import { FirstSportModel } from "./FirstSportModel";
import { SecondModel } from "./SecondModel";
import ThirdModel from "./ThirdModel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


type Props = {
    shirtType: ShirtType;
}

gsap.registerPlugin(ScrollTrigger);
const Scene = ({shirtType}: Props) => {
    return (
        <main className="min-h-screen">
            <section id="first-section" className="h-screen">
                <view className="w-dvw h-dvh">
                   {shirtType === "white" && <FirstWhiteModel/>}
                   {shirtType === "gray" && <FirstGrayModel/>}
                   {shirtType === "sport" && <FirstSportModel/>}
                </view>
            </section>

            <section id="third-section" className="absolute left-0 top-[500vh] h-screen">
                <view className="w-dvw h-dvh">
                    <ThirdModel shirtType={shirtType} />
                </view>
            </section>
            <section id="second-section" className="absolute inset-0 -z-10 h-screen">
                <view className="w-dvw h-dvh">
                    <SecondModel shirtType={shirtType} />
                </view>
            </section>
             </main>
    )
}

export default Scene;