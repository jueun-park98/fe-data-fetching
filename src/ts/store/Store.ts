import { Action, actionTypes } from "../action/Actions.js";
import { CLASS_NAME } from "../constants.js";
import { dispatcher } from "../dispatcher/Dispatcher.js";

const NEWS_CONTENT_ERROR_MESSAGE = "컨텐츠 업데이트 에러!";

export const newsTitlesStore = (function () {
  let _titles: string[] = [];
  let _loading: boolean = false;

  const _observers = new Set<Function>();
  const notify = (data: Object) => {
    _observers.forEach((observer) => observer(data));
  };

  dispatcher.register(({ type, payload }: Action) => {
    switch (type) {
      case actionTypes.UPDATE_START:
        _loading = true;
        notify({ className: CLASS_NAME.LOADING, isLoading: _loading });
        break;
      case actionTypes.FETCH_NEWS_TITLES_SUCCESS:
        if (payload?.titles) {
          _titles = payload.titles;
          _loading = false;
          notify({ className: CLASS_NAME.LOADING, isLoading: _loading });
          notify({ className: CLASS_NAME.NEWS_TITLES, titles: _titles });
        }
        break;
      case actionTypes.FETCH_NEWS_TITLES_FAILURE:
        _loading = false;
        break;
    }
  });

  return {
    subscribe(observer: Function) {
      _observers.add(observer);
    },

    getTitles() {
      return _titles;
    },

    isLoading() {
      return _loading;
    },
  };
})();

export const newsContentStore = (function () {
  let _newsTitle: string = "";
  let _content: string = "";
  let _loading: boolean = false;

  const _observers = new Set<Function>();
  const notify = (data: Object) => {
    _observers.forEach((observer) => observer(data));
  };

  dispatcher.register(({ type, payload }: Action) => {
    switch (type) {
      case actionTypes.UPDATE_START:
        _loading = true;
        notify({ className: CLASS_NAME.LOADING, isLoading: _loading });
        break;
      case actionTypes.FETCH_NEWS_CONTENT_SUCCESS:
        if (payload?.title && payload?.content) {
          _newsTitle = payload.title;
          _content = payload.content;
          _loading = false;
          notify({ className: CLASS_NAME.LOADING, isLoading: _loading });
          notify({ className: CLASS_NAME.NEWS_CONTENT, title: _newsTitle, content: _content });
        }
        break;
      case actionTypes.FETCH_NEWS_CONTENT_FAILURE:
        _newsTitle = NEWS_CONTENT_ERROR_MESSAGE;
        _content = "";
        _loading = false;
        notify({ className: CLASS_NAME.LOADING, isLoading: _loading });
        notify({ className: CLASS_NAME.NEWS_CONTENT, title: _newsTitle, content: _content });
        break;
    }
  });

  return {
    subscribe(observer: Function) {
      _observers.add(observer);
    },

    getNewsTitle() {
      return _newsTitle;
    },

    getContent() {
      return _content;
    },

    isLoading() {
      return _loading;
    },
  };
})();
