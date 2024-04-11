import { Action, actionTypes } from "../action/Actions.js";
import { CLASS_NAME } from "../constants.js";
import { dispatcher } from "../dispatcher/Dispatcher.js";

export const newsTitlesStore = (function () {
  let _titles: string[] = [];
  let _loading: boolean = false;

  const _observers = new Map<Function, string[]>();
  const notify = (data: Object, type: string) => {
    _observers.forEach((interestedIn, observer) => {
      if (interestedIn.includes(type)) {
        observer(data);
      }
    });
  };

  dispatcher.register(({ type, payload }: Action) => {
    switch (type) {
      case actionTypes.UPDATE_START:
        _loading = true;
        notify({ className: CLASS_NAME.LOADING, isLoading: _loading }, "loading");
        break;
      case actionTypes.FETCH_NEWS_TITLES_SUCCESS:
        _loading = false;
        if (payload?.titles) {
          _titles = payload.titles;
          notify({ className: CLASS_NAME.NEWS_TITLES, titles: _titles }, "titles");
        }
        notify({ className: CLASS_NAME.LOADING, isLoading: _loading }, "loading");
        break;
      case actionTypes.FETCH_NEWS_TITLES_FAILURE:
        _loading = false;
        break;
    }
  });

  return {
    subscribe(observer: Function, interestedIn: string[]) {
      _observers.set(observer, interestedIn);
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

  const _observers = new Map<Function, string[]>();
  const notify = (data: Object, type: string) => {
    _observers.forEach((interestedIn, observer) => {
      if (interestedIn.includes(type)) {
        observer(data);
      }
    });
  };

  dispatcher.register(({ type, payload }: Action) => {
    switch (type) {
      case actionTypes.UPDATE_START:
        _loading = true;
        notify({ className: CLASS_NAME.LOADING, isLoading: _loading }, "loading");
        break;
      case actionTypes.FETCH_NEWS_CONTENT_SUCCESS:
        _loading = false;
        if (payload?.title && payload?.content) {
          _newsTitle = payload.title;
          _content = payload.content;
          notify({ className: CLASS_NAME.NEWS_CONTENT, title: _newsTitle, content: _content }, "content");
        }
        notify({ className: CLASS_NAME.LOADING, isLoading: _loading }, "loading");
        break;
      case actionTypes.FETCH_NEWS_CONTENT_FAILURE:
        _loading = false;
        break;
    }
  });

  return {
    subscribe(observer: Function, interestedIn: string[]) {
      _observers.set(observer, interestedIn);
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
