import { fetchRandomTitles } from "./action/Actions.js";
import { initializeListeners } from "./event/EventHandler.js";
import { newsContentStore, newsTitlesStore } from "./store/Store.js";
import { renderIndex, updateNewsContent, updateNewstitles } from "./view/View.js";

const main: () => void = function () {
  const root: HTMLElement | null = document.querySelector("main");

  if (root) root.innerHTML = renderIndex();
  newsTitlesStore.subscribe(updateNewstitles);
  newsContentStore.subscribe(updateNewsContent);
  fetchRandomTitles();
  initializeListeners();
};

main();
