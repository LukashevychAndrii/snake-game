import { URL } from "../types/URL";

export function redirect(newURL: URL) {
  window.history.pushState({}, "", newURL);
  const popstateEvent = new PopStateEvent("popstate", { state: null });
  window.dispatchEvent(popstateEvent);
}
