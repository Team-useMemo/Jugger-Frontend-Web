import { useLazyGetMemosQuery } from '@stores/modules/memo';
import { useEffect, useState } from 'react';

export const useChatLoader = (categoryId?: string) => {
  const [oldest, setOldest] = useState<string | null>(null);
  const [latest, setLatest] = useState<string | null>(null);

  const SIZE = 16;

  // 👉 lazy query (우리가 직접 실행)
  const [triggerGetMemos, { data, isFetching }] = useLazyGetMemosQuery();

  // ✅ 초기 로딩 (최신 채팅)
  useEffect(() => {
    setOldest(null);
    setLatest(null);
    triggerGetMemos({ categoryId, page: 0, size: SIZE });
  }, [categoryId, triggerGetMemos]);

  // ✅ 과거 채팅 요청 (스크롤 최상단 도달 시)
  const fetchBefore = () => {
    if (isFetching) return;

    triggerGetMemos({ categoryId, before: oldest ?? undefined, page: 0, size: SIZE });
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
