import { ContentProps, LoadingProps, NewstitlesProps, renderNewsContent, renderNewstitles } from "./Renderer.js";
import { fetchNewsContent, fetchRandomTitles } from "../action/Actions.js";

export const initializeListeners: () => void = function () {
  const tag = document.querySelector("main");

  tag?.addEventListener("click", handleClick);
};

const handleClick: (event: Event) => void = function (event) {
  const target = event.target as HTMLElement;

  if (target && target.tagName === "BUTTON") fetchRandomTitles();
  if (target && target.tagName === "SPAN" && target.textContent) fetchNewsContent(target.textContent);
};

export const updateNewstitles: (props: NewstitlesProps) => void = function (props) {
  const tag = document.querySelector(`.${props.className}`);
  let firstNews;

  if (tag) {
    tag.outerHTML = renderNewstitles(props);
    firstNews = props.titles[0];

    fetchNewsContent(firstNews);
  }
};

export const updateNewsContent: (props: ContentProps) => void = function (props) {
  const tag = document.querySelector(`.${props.className}`);

  if (tag) tag.outerHTML = renderNewsContent(props);
};

export const updateLoading: (props: LoadingProps) => void = function (props) {
  const loadingImg = document.querySelector(`.${props.className}`) as HTMLElement;

  if (props.isLoading) {
    loadingImg.style.visibility = "visible";
    document.querySelectorAll("body *").forEach((element) => {
      if (element !== loadingImg && element.tagName !== "SCRIPT" && element.tagName !== "MAIN")
        element.classList.add("blur");
    });
    return;
  }

  loadingImg.style.visibility = "hidden";
  document.querySelectorAll(".blur").forEach((element) => element.classList.remove("blur"));
};
