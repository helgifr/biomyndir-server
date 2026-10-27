"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "biomyndir:cookie-consent";
const CHANGE_EVENT = "biomyndir:cookie-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

export function CookieConsent() {
  // Sourced from an external store (localStorage) rather than an effect, so hydration can
  // resolve the real value on its first client render instead of a later state update.
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (consent === "true") return null;

  function dismiss() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center justify-between gap-3 bg-zinc-900 p-4 text-sm text-white sm:flex-row">
      <p>Þessi síða notar kökur til að bæta notendaupplifunina.</p>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 rounded-full bg-white px-4 py-2 font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
      >
        Allt í góðu
      </button>
    </div>
  );
}
