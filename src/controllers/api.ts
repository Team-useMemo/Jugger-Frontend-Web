import { MemoResponseProp } from '@ts/Memo.Prop';
import categoryMock from './mock/category';
import memoMock from './mock/memo';

const baseURL = import.meta.env.VITE_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const fetchData = async (path: string) => {
  const url = `${baseURL}${path}`;

  const res = await fetch(url, { method: 'GET', headers: getHeaders() });
  if (!res.ok) {
    throw new Error(`${res.status} Error!!`);
  }
  return await res.json();
};

const postData = async (path: string, body: any) => {
  const url = `${baseURL}${path}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
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

  const now = new Date().toISOString();
  const result: CategoryResponse[] = await fetchData(`/api/v1/chat/before?before=${now}&size=20`);

  const convertedResult: MemoResponseProp[] = result
    .flatMap((category) =>
      category.chatItems.map((item) => {
        let type: MemoResponseProp['type'] = 'text';
        let content: MemoResponseProp['content'] = item.data;

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

  // console.log(convertedResult);
  if (convertedResult.length > 0) return convertedResult;
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
      color: category.categoryColor.replace(/^color/, ''),
      content: category.chatItems[0].data,
      lastDate: new Date(category.chatItems[0].timestamp),
    }))
    .sort((a, b) => b.lastDate.getTime() - a.lastDate.getTime());

  console.log(convertedResult);
  if (convertedResult.length > 0) return convertedResult;
  return categoryMock;
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
const postPhoto = async (username: string, file: File, categoryUuid: string) => {
  if (!username) return;

  const formData = new FormData();
  formData.append('category_uuid', categoryUuid);
  formData.append('file', file);
  const url = `${baseURL}/api/v1/upload/files`;

  const result = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!result.ok) {
    throw new Error(`${result.status} Error!!`);
  }

  console.log(result.url);
};

const postKakaoAuthCode = async (code: string) => {
  const url = `${baseURL}/auth/kakao`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    const errorText = await res.text(); // capture response body for diagnostics
    throw new Error(`${res.status} Error!! - ${errorText}`);
  }

  const data = await res.json();
  return data;
};

type KakaoSignupPayload = {
  name: string;
  email: string;
  domain: 'kakao';
  terms: {
    termsOfService: boolean;
    privacyPolicy: boolean;
    marketing: boolean;
  };
};

const postKakaoSignup = async (payload: KakaoSignupPayload) => {
  const url = `${baseURL}/auth/kakao/signup`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`${response.status} Error`);
  }

  return await response.json();
};
export {
  fetchAllMemo,
  fetchCategory,
  postCategory,
  postMemo,
  postCalendar,
  postPhoto,
  postKakaoAuthCode,
  postKakaoSignup,
};
