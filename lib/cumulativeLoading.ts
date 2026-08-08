import * as THREE from "three";

/**
 * A cumulative loading tracker that monitors THREE.DefaultLoadingManager.
 *
 * Unlike drei's `useProgress`, this does NOT reset to 0 when a batch of
 * assets finishes. Instead it accumulates the total number of items started
 * and the number of items completed across ALL loading batches, producing a
 * single smooth 0-100% progress that stays until everything is loaded.
 */
class CumulativeLoading {
  private total = 0;
  private loaded = 0;
  private listeners = new Set<() => void>();
  private inited = false;

  /** Initialize the DefaultLoadingManager handlers. Call once. */
  init() {
    if (this.inited || typeof window === "undefined") return;
    this.inited = true;

    const manager = THREE.DefaultLoadingManager;

manager.itemStart = () => {
      this.total++;
      this.emit();
    };

manager.itemEnd = () => {
      this.loaded++;
      this.emit();
    };
  }

  /** Overall progress in the range 0-100. */
  get progress(): number {
    if (this.total === 0) return 0;
    return Math.min(100, (this.loaded / this.total) * 100);
  }

  /** True once every started item has finished loading. */
  get isComplete(): boolean {
    return this.total > 0 && this.loaded >= this.total;
  }

  /** True when the manager has started tracking items. */
  get hasStarted(): boolean {
    return this.total > 0;
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit() {
    this.listeners.forEach((fn) => fn());
  }

  /** Reset counters (used when navigating between pages). */
  reset() {
    this.total = 0;
    this.loaded = 0;
    this.emit();
  }
}

export const cumulativeLoading = new CumulativeLoading();

// Auto-initialize as early as possible in the browser so we don't miss the
// first batch of asset loads that happen during initial render.
if (typeof window !== "undefined") {
  cumulativeLoading.init();
}
