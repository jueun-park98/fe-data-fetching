import { Action, actionTypes } from "../action/Actions.js";
import { CLASS_NAME } from "../constants.js";
import { dispatcher } from "../dispatcher/Dispatcher.js";

export const newsTitlesStore = (function () {
  let _titles: string[] = [];
  let _loading: boolean = false;
  const _observers = new Set<Function>();
  const notify = (data: Object) => {
    _observers.forEach((observer: Function) => observer(data));
  };

  dispatcher.register(({ type, payload }: Action) => {
    switch (type) {
      case actionTypes.FETCH_UPDATE_START:
        _loading = true;
        break;
      case actionTypes.FETCH_NEWS_TITLES_SUCCESS:
        if (payload?.titles) {
          _titles = payload.titles;
          notify({ className: CLASS_NAME.NEWS_TITLES, titles: _titles });
        }
        _loading = false;
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
    _observers.forEach((observer: Function) => observer(data));
  };

  dispatcher.register(({ type, payload }: Action) => {
    switch (type) {
      case actionTypes.FETCH_UPDATE_START:
        _loading = true;
        break;
      case actionTypes.FETCH_NEWS_CONTENT_SUCCESS:
        if (payload?.title && payload?.content) {
          _newsTitle = payload.title;
          _content = payload.content;
          notify({ className: CLASS_NAME.NEWS_CONTENT, title: _newsTitle, content: _content });
        }
        _loading = false;
        break;
      case actionTypes.FETCH_NEWS_CONTENT_FAILURE:
        _loading = false;
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
