"use client";

import { useEffect, useRef, useState } from "react";
import Bars from "./Bars";
import { cumulativeLoading } from "@/lib/cumulativeLoading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Because all shirt assets are preloaded (and thus browser-cached) from the
// home page, THREE.DefaultLoadingManager fires few/no new progress events when
// navigating to a shirt page. Instead of relying on real asset progress (which
// may stay at 0%), we deterministically animate a short loading sequence so the
// loading bar always visibly runs 0% -> 100% before fading out.
const MIN_LOADING_MS = 1100;

const ShirtLoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize our cumulative loading manager tracker once (harmless if
    // already inited) so that any genuinely slow/cold assets still get counted.
    cumulativeLoading.init();
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    // Animate the animated bars + progress bar.
    tl.to(
      {},
      {
        duration: MIN_LOADING_MS / 1000,
        ease: "power1.inOut",
        onUpdate: () => {
          const target = 92;
          const eased = gsap.utils.clamp(0, target, target * tl.progress());
          setProgress(eased);
        },
      }
    )
      .to(
        {},
        {
          duration: 0.25,
          onUpdate: () => setProgress(gsap.utils.clamp(0, 100, 100 * tl.progress())),
          onComplete: () => setProgress(100),
        }
      )
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500"
    >
      <div className="flex flex-col items-center w-40 md:w-3xs mt-5 gap-4">
        <Bars />
        <div className="w-full">
          <p className="mt-2 text-sm text-white/50 text-center">
            {Math.floor(progress)}% loaded
          </p>
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShirtLoadingScreen;
