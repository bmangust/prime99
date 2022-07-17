const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export const loadPredictions = async (text: string) => {
  try {
    return fetch(`${API_URL}/predict_all`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ text }),
    }).then((res) => res.json());
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const searchResults = async (text: string, limit = 10, offset = 0) => {
  if (!text || limit < 1) return [];
  try {
    return fetch(
      `${API_URL}/search?` +
        new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString(),
        }),
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ text }),
      }
    ).then((res) => res.json());
  } catch (e) {
    console.log(e);
    return [];
  }
};
