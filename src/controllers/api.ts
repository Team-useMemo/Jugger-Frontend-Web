import { MemoProp } from '@ts/Memo.Prop';
import categoryMock from './mock/category';
import memoMock from './mock/memo';
// import memoMock from './mock/memo';

// const baseURL = import.meta.env.VITE_BASE_URL;

const Headers = { 'content-type': 'application/json' };

const fetchData = async (path: string) => {
  // const url = `${baseURL}${path}`;
  const url = `${path}`;

  const res = await fetch(url, { method: 'GET', headers: Headers });
  if (!res.ok) {
    throw new Error(`${res.status} Error!!`);
  }
  return await res.json();
};

const postData = async (path: string, body: any) => {
  // const url = `${baseURL}${path}`;
  const url = `${path}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: Headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`${res.status} Error!!`);
  }
  return await res.json();
};

let idCounter = 1000;

type ChatItem = {
  data: string;
  timestamp: string;
  calendar?: boolean;
  photo?: string;
  link?: string;
};

type CategoryResponse = {
  categoryId: string;
  chatItems: ChatItem[];
};

const fetchAllMemo = async (username: string) => {
  if (!username) return [];
  const now = new Date().toISOString();
  const result: CategoryResponse[] = await fetchData(`/api/v1/chat/before?before=${now}&size=20`);

  const convertedResult: MemoProp[] = result.flatMap((category) =>
    category.chatItems.map((item) => {
      let type: MemoProp['type'] = 'text';
      let content: MemoProp['content'] = item.data;

      if (item.calendar) {
        type = 'schedule';
        content = {
          title: item.data,
          startDate: new Date(item.timestamp),
          endDate: null,
        };
      } else if (item.photo) {
        type = 'photo';
        content = item.photo;
      } else if (item.link) {
        type = 'link';
        content = item.link;
      }

      return {
        id: idCounter++,
        type,
        content,
        date: new Date(item.timestamp ?? Date.now()),
        categoryId: category.categoryId,
      };
    }),
  );

  // console.log(convertedResult);
  if (convertedResult.length > 0) return convertedResult;
  return memoMock;
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

const postCategory = async (username: string, categoryName: string, color: string) => {
  if (!username) return;
  const result = await postData(`/api/v1/categories`, {
    name: categoryName,
    color,
  });
  console.log(result);
};

export { fetchAllMemo, fetchCategory, postCategory };
