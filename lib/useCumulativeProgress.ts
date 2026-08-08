"use client";

import { useEffect, useState } from "react";
import { cumulativeLoading } from "./cumulativeLoading";

/**
 * React hook that subscribes to the shared cumulative loading store and
 * returns the overall progress (0-100) plus whether loading has completed.
 */
export function useCumulativeProgress() {
  const [progress, setProgress] = useState(() => cumulativeLoading.progress);
  const [isComplete, setIsComplete] = useState(() => cumulativeLoading.isComplete);
  const [hasStarted, setHasStarted] = useState(() => cumulativeLoading.hasStarted);

  useEffect(() => {
    const update = () => {
      setProgress(cumulativeLoading.progress);
      setIsComplete(cumulativeLoading.isComplete);
      setHasStarted(cumulativeLoading.hasStarted);
    };
    const unsubscribe = cumulativeLoading.subscribe(update);
    update();
    return unsubscribe;
  }, []);

  return { progress, isComplete, hasStarted };
}
