import { loadNewsTitles } from "../api/NewsApi.js";
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

export const actionTypes = {
  FETCH_UPDATE_START: "FETCH_UPDATE_START",
  FETCH_NEWS_TITLES_SUCCESS: "FETCH_NEWS_TITLES_SUCCESS",
  FETCH_NEWS_TITLES_FAILURE: "FETCH_NEWS_TITLES_FAILURE",
  FETCH_NEWS_CONTENT_START: "FETCH_NEWS_CONTENT_START",
  FETCH_NEWS_CONTENT_SUCCESS: "FETCH_NEWS_CONTENT_SUCCESS",
  FETCH_NEWS_CONTENT_FAILURE: "FETCH_NEWS_CONTENT_FAILURE",
};

export function fetchNewstitles() {
  loadNewsTitles().then((titles) => {
    dispatcher.dispatch({
      type: actionTypes.FETCH_NEWS_TITLES_SUCCESS,
      payload: {
        className: CLASS_NAME.NEWS_TITLES,
        titles,
      },
    });
  });
}
