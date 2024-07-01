import { Action, actionTypes } from "../action/Actions.js";
import { CLASS_NAME } from "../constants.js";
import { dispatcher } from "../dispatcher/Dispatcher.js";

const NEWS_CONTENT_ERROR_MESSAGE = "컨텐츠 업데이트 에러!";

export const newsTitlesStore = (function () {
  let titles: string[] = [];
  let isLoading: boolean = false;

  const _observers = new Set<Function>();
  const notify = (data: Object) => {
    _observers.forEach((observer) => observer(data));
  };

  dispatcher.register(({ type, payload }: Action) => {
    switch (type) {
      case actionTypes.UPDATE_START:
        isLoading = true;
        notify({ className: CLASS_NAME.LOADING, isLoading });
        break;
      case actionTypes.FETCH_NEWS_TITLES_SUCCESS:
        if (payload?.titles) {
          titles = payload.titles;
          isLoading = false;
          notify({ className: CLASS_NAME.LOADING, isLoading });
          notify({ className: CLASS_NAME.NEWS_TITLES, titles });
        }
        break;
      case actionTypes.FETCH_NEWS_TITLES_FAILURE:
        isLoading = false;
        break;
    }
  });

  return {
    subscribe(observer: Function) {
      _observers.add(observer);
    },

    getTitles() {
      return titles;
    },

    isLoading() {
      return isLoading;
    },
  };
})();

export const newsContentStore = (function () {
  let title: string = "";
  let content: string = "";
  let isLoading: boolean = false;

  const _observers = new Set<Function>();
  const notify = (data: Object) => {
    _observers.forEach((observer) => observer(data));
  };

  dispatcher.register(({ type, payload }: Action) => {
    switch (type) {
      case actionTypes.UPDATE_START:
        isLoading = true;
        notify({ className: CLASS_NAME.LOADING, isLoading });
        break;
      case actionTypes.FETCH_NEWS_CONTENT_SUCCESS:
        if (payload?.title && payload?.content) {
          title = payload.title;
          content = payload.content;
          isLoading = false;
          notify({ className: CLASS_NAME.LOADING, isLoading });
          notify({ className: CLASS_NAME.NEWS_CONTENT, title, content });
        }
        break;
      case actionTypes.FETCH_NEWS_CONTENT_FAILURE:
        title = NEWS_CONTENT_ERROR_MESSAGE;
        content = "";
        isLoading = false;
        notify({ className: CLASS_NAME.LOADING, isLoading });
        notify({ className: CLASS_NAME.NEWS_CONTENT, title, content });
        break;
    }
  });

  return {
    subscribe(observer: Function) {
      _observers.add(observer);
    },

    getNewsTitle() {
      return title;
    },

    getContent() {
      return content;
    },

    isLoading() {
      return isLoading;
    },
  };
})();
