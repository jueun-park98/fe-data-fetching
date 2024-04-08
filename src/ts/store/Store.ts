const NewsStore = (function () {
  let _newsList: any[] = [];
  let _loading: boolean = false;

  Dispatcher.register((action: Action) => {
    switch (action.type) {
      case ActionTypes.FETCH_NEWS_START:
        _loading = true;
        break;
      case ActionTypes.FETCH_NEWS_SUCCESS:
        if (action.newsList) _newsList = action.newsList;
        _loading = false;
        break;
    }
  });

  return {
    getNewsList() {
      return _newsList;
    },

    isLoading() {
      return _loading;
    },
  };
})();
