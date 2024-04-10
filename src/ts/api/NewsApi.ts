const NEWS_TITLES_PATH = "/news";
const SEARCH_PATH = "/search";
const QUERY = "news_title";

function isArrayOfString(value: any): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export const loadRandomTitles: () => Promise<string[]> = async function () {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const titles = await fetch(NEWS_TITLES_PATH, request).then((response) => {
    if (!response.ok) throw new Error("네트워크 에러");
    return response.json();
  });

  if (!isArrayOfString(titles)) throw new Error("응답받은 데이터가 문자열 배열이 아닙니다.");

  return titles;
};

export const loadNewsContent: (title: string) => Promise<Object> = async function (title) {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const encodedTitle = encodeURIComponent(title);
  const news = await fetch(`${SEARCH_PATH}?${QUERY}=${encodedTitle}`, request).then((response) => {
    if (!response.ok) throw new Error(`${response.status} : ${response.statusText}`);
    return response.json();
  });

  return news;
};
