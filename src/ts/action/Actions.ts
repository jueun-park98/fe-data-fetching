interface Action {
  type: string;
  payload?: any[];
}

const actionTypes = {
  FETCH_NEWS_TITLE_START: "FETCH_NEWS_TITLE_START",
  FETCH_NEWS_TITLE_LOADING: "FETCH_NEWS_TITLE_LOADING",
  FETCH_NEWS_TITLE_SUCCESS: "FETCH_NEWS_TITLE_SUCCESS",
  FETCH_NEWS_TITLE_FAILURE: "FETCH_NEWS_TITLE_FAILURE",
};

function fetchNewstitles() {
  dispatcher.dispatch({
    type: actionTypes.FETCH_NEWS_TITLE_START,
  });
}
