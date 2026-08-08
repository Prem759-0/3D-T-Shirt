"use client";

import { useEffect, useState } from "react";
import Bars from "./Bars";
import { useCumulativeProgress } from "@/lib/useCumulativeProgress";
import { cumulativeLoading } from "@/lib/cumulativeLoading";

/**
 * Full-screen loading overlay for the shirts pages.
 *
 * It stays visible until every asset (models, textures, cube maps, videos)
 * has finished loading. The progress bar accumulates across all loading
 * batches and animates from 0 to 100% a single time, then fades out.
 *
 * Phase derivation:
 *  - "idle":  assets not started loading yet.
 *  - "active": assets are loading.
 *  - "done":   all assets finished loading (fade out).
 */
const ShirtLoadingScreen = () => {
  const { progress, isComplete, hasStarted } = useCumulativeProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Initialize our loading manager tracker once.
    cumulativeLoading.init();
  }, []);

let phase: "idle" | "active" | "done" = "idle";
  if (isComplete) phase = "done";
  else if (hasStarted) phase = "active";

  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(t);
  }, [phase]);

  if (!visible || phase === "idle") return null;

  const fading = phase === "done";

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-600 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center w-40 md:w-3xs mt-5 gap-4">
        <Bars />
        <div className="w-full">
          <p className="mt-2 text-sm text-white/50 text-center">
            {Math.floor(progress)}% loaded
          </p>
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div
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
