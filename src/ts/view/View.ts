import { CLASS_NAME } from "../constants.js";

const BUTTON_TEXT = "업데이트";
const EMPTY_TEXT = "";

interface BaseProps {
  className: string;
}

interface Props extends BaseProps {
  content: string;
}

interface NewstitlesProps extends BaseProps {
  titles: string[];
}

interface ContentProps extends BaseProps {
  title: string;
  content: string;
}

const renderContainer: (props: Props) => string = function (props) {
  return `<div class="${props.className}">${props.content}</div>`;
};

const renderButton: (props: Props) => string = function (props) {
  return `<button class="${props.className}">${props.content}</button>`;
};

const renderNewstitles: (props: NewstitlesProps) => string = function (props) {
  const titles = props.titles.map((content) => `<span>${content}</span>`).join("");

  return `<div class="${props.className}">${titles}</div>`;
};

const renderNewsContent: (props: ContentProps) => string = function (props) {
  return `<div class="${props.className}">
    <h1>${props.title}</h1>
    ${props.content}
  </div>`;
};

export const renderIndex: () => string = function () {
  const updateButton = renderButton({ className: CLASS_NAME.UPDATE_BUTTON, content: BUTTON_TEXT });
  const newsTitles = renderNewstitles({ className: CLASS_NAME.NEWS_TITLES, titles: [] });
  const sidebar = renderContainer({ className: CLASS_NAME.SIDE_BAR, content: updateButton + newsTitles });
  const newsContent = renderNewsContent({ className: CLASS_NAME.NEWS_CONTENT, title: EMPTY_TEXT, content: EMPTY_TEXT });

  return sidebar + newsContent;
};

export const updateNewstitles: (props: NewstitlesProps) => void = function (props) {
  const tag = document.querySelector(`.${props.className}`);

  if (tag) tag.outerHTML = renderNewstitles(props);
};

export const updateNewsContent: (props: ContentProps) => void = function (props) {
  const tag = document.querySelector(`.${props.className}`);

  if (tag) tag.outerHTML = renderNewsContent(props);
};
