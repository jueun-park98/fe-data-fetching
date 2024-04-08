const newsStore = (function () {
  let _newsList: any[] = [];
  let _loading: boolean = false;

  dispatcher.register((action: Action) => {
    switch (action.type) {
      case actionTypes.FETCH_NEWS_TITLE_START:
        _loading = true;
        break;
      case actionTypes.FETCH_NEWS_TITLE_SUCCESS:
        if (action.payload) _newsList = action.payload;
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
