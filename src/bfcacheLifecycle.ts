type LifecycleFn = () => void | Promise<void>;

const releaseCallbacks: LifecycleFn[] = [];
const restoreCallbacks: Array<() => void> = [];
let registered = false;
let releasing = false;

export function registerBfcacheRelease(fn: LifecycleFn): void {
  releaseCallbacks.push(fn);
}

export function registerBfcacheRestore(fn: () => void): void {
  restoreCallbacks.push(fn);
}

function releaseForBfcache(): void {
  if (releasing) return;
  releasing = true;

  for (const fn of releaseCallbacks) {
    void Promise.resolve(fn()).catch(() => {});
  }
}

function handlePageShow(event: PageTransitionEvent): void {
  if (!event.persisted) return;

  releasing = false;
  for (const fn of restoreCallbacks) {
    fn();
  }
}

/** Close Firebase connections before the page enters the back/forward cache. */
export function initBfcacheLifecycle(): void {
  if (registered || typeof window === "undefined") return;
  registered = true;

  // pagehide / freeze only — not visibilitychange (that also fires on tab switches).
  window.addEventListener("pagehide", releaseForBfcache);
  document.addEventListener("freeze", releaseForBfcache);
  window.addEventListener("pageshow", handlePageShow);
}
