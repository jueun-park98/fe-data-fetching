const main: () => void = function() {
  const root: HTMLElement | null = document.querySelector("main");

  if (root) root.innerHTML = renderIndex();
}