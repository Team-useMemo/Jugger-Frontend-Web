import { useLazyGetMemosQuery } from '@stores/modules/memo';
import { useEffect, useRef, useState } from 'react';

const RETRY_INTERVAL = 100; // ms
const MAX_RETRIES = 5;

export const useChatLoader = (categoryId?: string) => {
  const [oldest, setOldest] = useState<string | null>(null);
  const [latest, setLatest] = useState<string | null>(null);

  const SIZE = 16;

  // 👉 lazy query (우리가 직접 실행)
  const [triggerGetMemos, { data, isFetching }] = useLazyGetMemosQuery();
  const retryCountRef = useRef(0);
  const isRetryingRef = useRef(false);

  // ✅ 초기 로딩 (최신 채팅)
  useEffect(() => {
    console.log(categoryId);
    setOldest(null);
    setLatest(null);
    triggerGetMemos({ categoryId, page: 0, size: SIZE }, true)
      .unwrap()
      .then((initialData) => {
        console.log(initialData);
        if (!initialData?.length) return;

        const latestFetched = initialData[0].date.toISOString();
        triggerGetMemos({ categoryId, after: latestFetched, page: 0, size: SIZE }, false);
      });
  }, [categoryId, triggerGetMemos]);

  const isFetchingRef = useRef(false);

  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

  // ✅ 과거 채팅 요청 (스크롤 최상단 도달 시)
  const fetchBefore = () => {
    const shouldRetry = isFetchingRef.current && !isRetryingRef.current && retryCountRef.current < MAX_RETRIES;

    const tryFetch = () => {
      if (!isFetchingRef.current) {
        resetRetry();
        triggerGetMemos({ categoryId, before: oldest ?? undefined, page: 0, size: SIZE });
      } else if (retryCountRef.current++ < MAX_RETRIES) {
        setTimeout(tryFetch, RETRY_INTERVAL);
      } else {
        console.warn('fetchBefore: Max retries reached');
        resetRetry();
      }
    };

    const resetRetry = () => {
      isRetryingRef.current = false;
      retryCountRef.current = 0;
    };

    if (shouldRetry) {
      isRetryingRef.current = true;
      tryFetch();
      return;
    }

    if (!isFetchingRef.current) {
      resetRetry();
      triggerGetMemos({ categoryId, before: oldest ?? undefined, page: 0, size: SIZE });
    }
  };

  // ✅ 최신 채팅 요청 (채팅 전송 직후)
  const fetchAfter = () => {
    if (!latest || isFetching) return;
    triggerGetMemos({ categoryId, after: latest, page: 0, size: SIZE });
  };

  // ✅ 커서 업데이트 (데이터 수신 시)
  useEffect(() => {
    if (!data?.length) return;
    const oldestNew = data[data.length - 1].date.toISOString();
    const latestNew = data[0].date.toISOString();

    setOldest((prev) => (prev ? (oldestNew < prev ? oldestNew : prev) : oldestNew));
    setLatest((prev) => (prev ? (latestNew > prev ? latestNew : prev) : latestNew));
  }, [data]);

  return { data, fetchBefore, fetchAfter };
};
