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

const fetchAllMemo = async (username: string) => {
  if (true || enableMock) return fetchScoreMock;
  return fetchData(`/${id}/score/${country}`);
};

const fetchCategories = async (username: string) => {};

export { fetchAllMemo, fetchCategories };
