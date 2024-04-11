import { fetchRandomTitles } from "./action/Actions.js";
import { newsContentStore, newsTitlesStore } from "./store/Store.js";
import { renderIndex } from "./view/Renderer.js";
import { initializeListeners, updateLoading, updateNewstitles, updateNewsContent } from "./view/Updating.js";

const main: () => void = function () {
  const root: HTMLElement | null = document.querySelector("main");

  if (root) root.innerHTML = renderIndex();
  newsTitlesStore.subscribe(updateNewstitles, ["titles"]);
  newsTitlesStore.subscribe(updateLoading, ["loading"]);
  newsContentStore.subscribe(updateNewsContent, ["content"]);
  newsContentStore.subscribe(updateLoading, ["loading"]);
  fetchRandomTitles();
  initializeListeners();
};

main();
