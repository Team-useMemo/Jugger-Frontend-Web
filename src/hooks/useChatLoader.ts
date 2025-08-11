import { useLazyGetMemosQuery } from '@stores/modules/memo';
import { useEffect, useRef, useState } from 'react';

const RETRY_INTERVAL = 100; // ms
const MAX_RETRIES = 5;

export const useChatLoader = (categoryId?: string) => {
  const oldestRef = useRef<Date | null>(null);
  const latestRef = useRef<Date | null>(new Date());

  const SIZE = 16;

  // 👉 lazy query (우리가 직접 실행)
  const [triggerGetMemos, { data, isFetching }] = useLazyGetMemosQuery();
  const retryCountRef = useRef(0);
  const isRetryingRef = useRef(false);
  const isEndBeforeLoadRef = useRef(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ 초기 로딩 (최신 채팅)
  useEffect(() => {
    if (!isMounted) return;

    oldestRef.current = null;
    latestRef.current = new Date();
    triggerGetMemos({ categoryId, page: 0, size: SIZE }, true)
      .unwrap()
      .then((initialData) => {
        if (!initialData?.length) return;

        const latestFetched = initialData[0].date.toISOString();
        triggerGetMemos({ categoryId, after: latestFetched, page: 0, size: SIZE }, false);
      });
  }, [categoryId, triggerGetMemos, isMounted]);

  const isFetchingRef = useRef(false);

  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

  // ✅ 과거 채팅 요청 (스크롤 최상단 도달 시)
  const fetchBefore = () => {
    if (isEndBeforeLoadRef.current) return;
    if (isRetryingRef.current) return;

    if (isFetchingRef.current) {
      const tryFetch = () => {
        if (!isFetchingRef.current) {
          retryCountRef.current = 0;
          triggerGetMemos({ categoryId, before: oldestRef.current?.toISOString(), page: 0, size: SIZE })
            .unwrap()
            .then((initialData) => {
              if (data?.length !== initialData?.length) return;

              isEndBeforeLoadRef.current = true;
            });
          isRetryingRef.current = false;
        } else if (retryCountRef.current++ < MAX_RETRIES) {
          setTimeout(tryFetch, RETRY_INTERVAL);
        } else {
          console.warn('fetchBefore: Max retries reached');
          isRetryingRef.current = false;
          retryCountRef.current = 0;
        }
      };

      isRetryingRef.current = true;
      tryFetch();
    } else {
      triggerGetMemos({ categoryId, before: oldestRef.current?.toISOString(), page: 0, size: SIZE })
        .unwrap()
        .then((initialData) => {
          if (data?.length !== initialData?.length) return;

          isEndBeforeLoadRef.current = true;
        });
    }
  };

  // ✅ 최신 채팅 요청 (채팅 전송 직후)
  const fetchAfter = () => {
    if (!latestRef.current || isFetching) return;
    triggerGetMemos({ categoryId, after: latestRef.current?.toISOString(), page: 0, size: SIZE });
  };

  // ✅ 커서 업데이트 (데이터 수신 시)
  useEffect(() => {
    if (!data?.length) return;
    oldestRef.current = data[data.length - 1].date;
    latestRef.current = data[0].date;
  }, [data]);

  return { data, fetchBefore, fetchAfter };
};
