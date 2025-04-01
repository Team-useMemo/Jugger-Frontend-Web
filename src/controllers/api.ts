import categoryMock from './mock/category';

const baseURL = import.meta.env.VITE_BASE_URL;

const Headers = { 'content-type': 'application/json' };

const fetchData = async (path: string) => {
  try {
    const url = `${baseURL}${path}`;
    const res = await fetch(url, { method: 'GET', headers: Headers });
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    // await wait(0);
    return await res.json();
  } catch (error) {
    throw error;
  }
};

const fetchAllMemo = (username: string) => {
  // if (true || enableMock) return fetchScoreMock;
  // return fetchData(`/${id}/score/${country}`);
};

const fetchCategory = (username: string) => {
  if (!username) return [];
  return categoryMock.sort((a, b) => {
    if (a.pinned == b.pinned) {
      return a.lastDate < b.lastDate ? 1 : -1;
    } else if (a.pinned && !b.pinned) return -1;
    return 0;
  });
};

export { fetchAllMemo, fetchCategory };
