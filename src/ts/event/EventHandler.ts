import { fetchNewsContent, fetchRandomTitles } from '../action/Actions.js';

export const initializeListeners: () => void = function() {
  const tag = document.querySelector("main");
  
  tag?.addEventListener("click", handleClick);
}

const handleClick: (event: Event) => void = function(event) {
  const target = event.target as HTMLElement;

  if(target && target.tagName === "BUTTON") fetchRandomTitles();
  if(target && target.tagName === "SPAN" && target.textContent) fetchNewsContent(target.textContent);
}