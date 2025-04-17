import { MemoProp } from '@ts/Memo.Prop';
// import categoryMock from './mock/category';
import memoMock from './mock/memo';

const baseURL = import.meta.env.VITE_BASE_URL;
const Headers = { 'content-type': 'application/json' };

const fetchData = async (path: string) => {
  const url = `${baseURL}${path}`;

  const res = await fetch(url, { method: 'GET', headers: Headers });
  if (!res.ok) {
    throw new Error(`${res.status} Error!!`);
  }
  return await res.json();
};

const postData = async (path: string, body: any) => {
  const url = `${baseURL}${path}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: Headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`${res.status} Error!!`);
  }
  return await res.status;
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
  categoryName: string;
  categoryColor: string;
  chatItems: ChatItem[];
};

const fetchAllMemo = async (username: string) => {
  if (!username) return [];
  // const now = new Date().toISOString();
  const result: CategoryResponse[] = await fetchData(`/api/v1/chat/before?before=${'2025-04-14T06:25:00Z'}&size=20`);

  const convertedResult: MemoProp[] = result
    .flatMap((category) =>
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
          // content = item.link;
        }

        return {
          id: idCounter++,
          type,
          content,
          date: new Date(item.timestamp ?? Date.now()),
          categoryId: category.categoryId,
        };
      }),
    )
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  console.log(convertedResult);
  // if (convertedResult.length > 0) return convertedResult;
  return memoMock;
};

const fetchCategory = async (username: string) => {
  if (!username) return [];

  const result: CategoryResponse[] = await fetchData(`/api/v1/chat/before?before=${'2025-04-14T06:25:00Z'}&size=20`);

  const convertedResult = result
    .map((category) => ({
      id: category.categoryId,
      title: category.categoryName,
      pinned: false,
      color: category.categoryColor.replace(/^color/, '') || '#000000',
      content: category.chatItems?.[0]?.data ?? '',
      lastDate: new Date(category.chatItems?.[0]?.timestamp ?? Date.now()),
    }))
    .sort((a, b) => b.lastDate.getTime() - a.lastDate.getTime());

  console.log(convertedResult);
  return convertedResult;
};

const postCategory = async (username: string, categoryName: string, color: string) => {
  if (!username) return;
  const result = await postData(`/api/v1/categories`, {
    name: categoryName,
    color,
  });
  console.log(result);
};

const postMemo = async (username: string, memo: string, categoryUuid: string) => {
  if (!username) return;
  const result = await postData(`/api/v1/chat`, {
    text: memo,
    categoryUuid,
  });
  console.log(result);
};

const postCalendar = async (
  username: string,
  memo: string,
  categoryUuid: string,
  startTime: string,
  endTime: string,
) => {
  if (!username) return;
  const result = await postData(`/api/v1/calendar`, {
    name: memo,
    categoryUuid,
    startTime,
    endTime,
  });
  console.log(result);
};
export { fetchAllMemo, fetchCategory, postCategory, postMemo, postCalendar };
