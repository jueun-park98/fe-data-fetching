export const loadNewsTitles: () => Promise<string[]> = async function () {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "5",
    },
  };

  const response = await fetch(`/news`, request);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const titles = await response.json();

  if (isArrayOfString(titles)) {
    return titles;
  } else {
    throw new Error('The response is not an array of strings');
  }
}

function isArrayOfString(value: any): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}
