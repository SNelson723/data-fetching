export const get = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // .json method parses the response body as JSON and returns a promise that resolves with the result.
  // If the response body is not valid JSON, the promise will be rejected with a SyntaxError.
  const data = await response.json() as unknown;
  return data;
};