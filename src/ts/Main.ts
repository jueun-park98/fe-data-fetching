import { fetchRandomTitles } from "./action/Actions.js";
import { newsContentStore, newsTitlesStore } from "./store/Store.js";
import { renderIndex } from "./view/Renderer.js";
import { initializeListeners, updateLoading, updateNewstitles, updateNewsContent, initializeTimer } from "./view/Updating.js";

const main: () => void = function () {
  const root: HTMLElement | null = document.querySelector("main");

  if (root) root.innerHTML = renderIndex();
  newsTitlesStore.subscribe(updateNewstitles);
  newsTitlesStore.subscribe(updateLoading);
  newsContentStore.subscribe(updateNewsContent);
  newsContentStore.subscribe(updateLoading);
  fetchRandomTitles();
  initializeListeners();
};

main();
