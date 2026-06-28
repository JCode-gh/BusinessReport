let registered = false;

function prepareForBfcache(): void {
  void import("./firebase").then(({ releaseFirestoreForBfcache }) => releaseFirestoreForBfcache());
}

/** Close Firestore long-polling before the page enters the back/forward cache. */
export function initBfcacheLifecycle(): void {
  if (registered || typeof window === "undefined") return;
  registered = true;

  window.addEventListener("pagehide", prepareForBfcache);
  document.addEventListener("freeze", prepareForBfcache);
}
