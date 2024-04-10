function isArrayOfString(value: any): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

export const loadNewsTitles: () => Promise<string[]> = async function () {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const titles = await fetch(`/news`, request)
    .then(response => {
      if(!response.ok) throw new Error("Network Error");
      return response.json();
    })
  
  if (!isArrayOfString(titles)) 
    throw new Error("Response is not an array of strings");

  return titles;
}