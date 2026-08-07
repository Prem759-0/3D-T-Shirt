import { ShirtType } from "@/lib/textures";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const ScrollIndicator = ({shirtType}: {shirtType: ShirtType}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useGSAP(() => {
    if(!divRef.current) return;
    gsap.to(divRef.current,{
      y: 50,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  });

  useEffect(() => {
  const handleScroll = () => {
    setIsScrolling(true);

    if(timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 2000);
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
    if(timeoutRef.current) clearTimeout(timeoutRef.current);
  };
}, []);

}

