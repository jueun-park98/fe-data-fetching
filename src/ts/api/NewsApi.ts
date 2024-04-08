const SERVER: string = "https://localhost:3000/";

export const loadNews: (path: string) => object = async function(path) {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const news = await fetch(`${SERVER}${path}`, request)
    .then(response => response.json());

  return news;                   
};