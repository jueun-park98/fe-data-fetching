import { loadNewsContent, loadRandomTitles } from "../api/NewsApi.js";
import { CLASS_NAME } from "../constants.js";
import { dispatcher } from "../dispatcher/Dispatcher.js";

export interface Action {
  type: string;
  payload?: {
    className?: string;
    titles?: string[];
    title?: string;
    content?: string;
  };
}

interface News {
  source?: Object;
  author?: string;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
}

export const actionTypes = {
  UPDATE_START: "UPDATE_START",
  FETCH_NEWS_TITLES_SUCCESS: "FETCH_NEWS_TITLES_SUCCESS",
  FETCH_NEWS_TITLES_FAILURE: "FETCH_NEWS_TITLES_FAILURE",
  FETCH_NEWS_CONTENT_START: "FETCH_NEWS_CONTENT_START",
  FETCH_NEWS_CONTENT_SUCCESS: "FETCH_NEWS_CONTENT_SUCCESS",
  FETCH_NEWS_CONTENT_FAILURE: "FETCH_NEWS_CONTENT_FAILURE",
};

const startUpdate: () => void = function () {
  dispatcher.dispatch({
    type: actionTypes.UPDATE_START,
  });
};

const notifyFail: () => void = function() {
  dispatcher.dispatch({
    type: actionTypes.FETCH_NEWS_CONTENT_FAILURE,
  });
}

export function fetchRandomTitles() {
  startUpdate();

  loadRandomTitles().then((titles) => {
    dispatcher.dispatch({
      type: actionTypes.FETCH_NEWS_TITLES_SUCCESS,
      payload: {
        className: CLASS_NAME.NEWS_TITLES,
        titles,
      },
    });
  });
}

export function fetchNewsContent(title: string) {
  startUpdate();

  loadNewsContent(title)
    .then((news: News) => {
      dispatcher.dispatch({
        type: actionTypes.FETCH_NEWS_CONTENT_SUCCESS,
        payload: {
          className: CLASS_NAME.NEWS_CONTENT,
          title: news.title,
          content: news.content,
        },
      });
    })
    .catch((error) => {
      console.error(`뉴스 컨텐츠 요청 중 에러가 발생 하였습니다. HTTP STATUS CODE ${error.message}`);
      notifyFail();
    });
  }
