'use client'


import { MainStudioModel } from "@/components/MainStudioModel";
import {View} from "@react-three/drei"
import { useState } from "react"
import {useMediaQuery} from "react-responsive"

export default  function Home () {
    const isMobile = useMediaQuery({maxWidth:400});
    const [currentIndex, setCurrentIndex] = useState(1)
    const [navigating, setNavigating] = useState(false)
    const handlePrev = () => {
        if(currentIndex < 2) setCurrentIndex((prev) => prev + 1)
    }
    const handleNext = () => {
        if(currentIndex > 0) setCurrentIndex((prev) => prev - 1)
    }

    return (
        <>
         <View className="w-full h-dvh">
           <MainStudioModel
              currentIndex={currentIndex}
              scale={isMobile ? 0.8 : 1}
              onNavigate={() => setNavigating(true)}
           />
         </View>

         {navigating && (
           <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black">
             <div className="size-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
             <p className="mt-6 text-white/80 text-sm tracking-wider">LOADING...</p>
           </div>
         )}

         <p className="absolute z-10 top-11/12 place-self-center 
                        text-white/80 md:text-xs text-[10px] font-medium 
                        tracking-wider"
        >
          SELECT A PRODUCT TO BEGIN
         </p>
          <div
            id="left-icon"
            className="absolute z-10 top-10/12 left-1/12
                        bg-white [mask-image:url('/icons/left.svg')]
                        size-12 mask-no-repeat border hover-animation
                         md:hidden block"
            onClick={handlePrev}
          >

          </div>
          <div
            id="right-icon"
            className="absolute z-20 top-10/12 right-1/12
                        bg-white [mask-image:url('/icons/right.svg')]
                        size-12 mask-no-repeat border hover-animation
                         md:hidden block"
            onClick={handleNext}
          >

          </div>
        </>
    )
}
