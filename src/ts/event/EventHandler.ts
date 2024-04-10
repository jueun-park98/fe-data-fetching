import { fetchNewsContent } from '../action/Actions.js';

export const initializeListeners: () => void = function() {
  const tag = document.querySelector("main");
  
  tag?.addEventListener("click", handleNewsClick);
}

const handleNewsClick: (event: Event) => void = function(event) {
  const target = event.target as HTMLElement;

  if(target && target.tagName === "SPAN" && target.textContent) fetchNewsContent(target.textContent);
}