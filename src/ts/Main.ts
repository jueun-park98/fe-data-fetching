import { renderIndex } from "./view/View.js";

const main: () => void = function () {
  const root: HTMLElement | null = document.querySelector("main");

  if (root) root.innerHTML = renderIndex();
};

main();
