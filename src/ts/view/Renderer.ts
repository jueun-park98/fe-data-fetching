import { CLASS_NAME } from "../constants.js";

const LOADING_IMG_PATH = "img/loading.gif";
const BUTTON_TEXT = "업데이트";
const EMPTY_TEXT = "";

export interface BaseProps {
  className: string;
}

interface Props extends BaseProps {
  content: string;
}

export interface NewstitlesProps extends BaseProps {
  titles: string[];
}

export interface ContentProps extends BaseProps {
  title: string;
  content: string;
}

export interface LoadingProps extends BaseProps {
  isLoading: boolean;
}

const renderLoading: (props: BaseProps) => string = function (props) {
  return `<img class="${props.className}" src="${LOADING_IMG_PATH}" />`;
};

const renderContainer: (props: Props) => string = function (props) {
  return `<div class="${props.className}">${props.content}</div>`;
};

const renderButton: (props: Props) => string = function (props) {
  return `<button class="${props.className}">${props.content}</button>`;
};

const renderTimer: (props: Props) => string = function (props) {
  return `<p class="${props.className}">${props.content}</p>`;
};

export const renderNewstitles: (props: NewstitlesProps) => string = function (props) {
  const titles = props.titles.map((content) => `<span>${content}</span>`).join("");

  return `<div class="${props.className}">${titles}</div>`;
};

export const renderNewsContent: (props: ContentProps) => string = function (props) {
  return `<div class="${props.className}">
    <h1>${props.title}</h1>
    ${props.content}
  </div>`;
};

export const renderIndex: () => string = function () {
  const loadingImg = renderLoading({ className: CLASS_NAME.LOADING });
  const updateButton = renderButton({ className: CLASS_NAME.UPDATE_BUTTON, content: BUTTON_TEXT });
  const timer = renderTimer({ className: CLASS_NAME.TIMER, content: EMPTY_TEXT });
  const newsTitles = renderNewstitles({ className: CLASS_NAME.NEWS_TITLES, titles: [] });
  const sidebar = renderContainer({ className: CLASS_NAME.SIDE_BAR, content: updateButton + timer + newsTitles });
  const newsContent = renderNewsContent({ className: CLASS_NAME.NEWS_CONTENT, title: EMPTY_TEXT, content: EMPTY_TEXT });

  return loadingImg + sidebar + newsContent;
};
