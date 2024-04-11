import {
  BaseProps,
  ContentProps,
  LoadingProps,
  NewstitlesProps,
  renderNewsContent,
  renderNewstitles,
} from "./Renderer.js";
import { fetchNewsContent, fetchRandomTitles } from "../action/Actions.js";
import { CLASS_NAME } from "../constants.js";

const TIMER_TEXT = "업데이트까지 ";
const TIMER_DELAY = 1000;
const FIRST_INDEX = 0;

let timer: HTMLElement | null = null;
let timerInterval: number | null = null;

export const initializeListeners: () => void = function () {
  const tag = document.querySelector("main");

  tag?.addEventListener("click", handleClick);
};

export const initializeTimer: () => void = function () {
  const tag = document.querySelector(".timer");

  tag?.setAttribute("data-time", "60");
  timerInterval = setInterval(() => {
    updateTimer({ className: CLASS_NAME.TIMER });
  }, TIMER_DELAY) as unknown as number;
};

const resetTimer: () => void = function () {
  if (timerInterval != null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const handleClick: (event: Event) => void = function (event) {
  const target = event.target as HTMLElement;

  if (target && target.tagName === "BUTTON") fetchRandomTitles();
  if (target && target.tagName === "SPAN" && target.textContent) fetchNewsContent(target.textContent);
};

export const updateNewstitles: (props: NewstitlesProps) => void = function (props) {
  const tag = document.querySelector(`.${props.className}`);
  let firstNews: string;

  if (tag && props.titles) {
    tag.outerHTML = renderNewstitles(props);
    firstNews = props.titles[FIRST_INDEX];

    fetchNewsContent(firstNews);
  }
  resetTimer();
  initializeTimer();
};

export const updateNewsContent: (props: ContentProps) => void = function (props) {
  const tag = document.querySelector(`.${props.className}`);

  if (tag && props.title) tag.outerHTML = renderNewsContent(props);
};

export const updateLoading: (props: LoadingProps) => void = function (props) {
  const loadingImg = document.querySelector(`.${props.className}`) as HTMLElement;

  if (props.isLoading === undefined) return;

  if (props.isLoading) {
    loadingImg.style.visibility = "visible";
    document.querySelectorAll("body *:not(script, main)").forEach((element) => {
      if (element !== loadingImg) element.classList.add("blur", "unclickable");
    });
    return;
  }

  loadingImg.style.visibility = "hidden";
  document.querySelectorAll(".blur").forEach((element) => element.classList.remove("blur", "unclickable"));
};

export const updateTimer: (props: BaseProps) => void = function (props) {
  if (!timer) timer = document.querySelector(`.${props.className}`);
  let time = Number(timer?.dataset.time);

  if (!timer || time <= 0) {
    fetchRandomTitles();
    resetTimer();
    initializeTimer();
    return;
  }
  timer.innerText = `${TIMER_TEXT}${time--}초`;
  timer.dataset.time = `${time}`;
};
