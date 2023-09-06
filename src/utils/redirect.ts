export function redirect(newURL: string) {
  window.history.pushState({}, "", newURL);
  const popstateEvent = new PopStateEvent("popstate", { state: null });
  window.dispatchEvent(popstateEvent);
}
