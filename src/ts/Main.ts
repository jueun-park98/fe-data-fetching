interface Action {
  type: string;
  newsList?: any[];
}

const main: () => void = function() {

  document.body.innerHTML = renderContainer();
}