const ActionTypes = {
  FETCH_NEWS_START: "FETCH_NEWS_START",
  FETCH_NEWS_LOADING: "FETCH_NEWS_LOADING",
  FETCH_NEWS_SUCCESS: "FETCH_NEWS_SUCCESS",
  FETCH_NEWS_FAILURE: "FETCH_NEWS_FAILURE",
};

function fetchNews() {
  Dispatcher.dispatch({
    type: ActionTypes.FETCH_NEWS_START,
  });
}
