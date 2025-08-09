import { useEffect, useState } from 'react';

const ogCache = new Map<string, OgData>();
const inflight = new Map<string, Promise<OgData>>();

export interface OgData {
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
}

export const fetchUrlPreview = async (url: string) => {
  if (ogCache.has(url)) return ogCache.get(url)!;

  if (inflight.has(url)) return inflight.get(url)!;

  const p = (async () => {
    const res = await fetch(`https://og-meta-data-api.vercel.app/api/preview?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error('Failed to fetch OG');
    const data = (await res.json()) as OgData;
    ogCache.set(url, data);
    return data;
  })();

  inflight.set(url, p);
  try {
    const data = await p;
    return data;
  } finally {
    inflight.delete(url);
  }
};

type State = { data: OgData | null; isLoading: boolean; error: unknown };

export const useOgData = (url: string | null) => {
  const [state, setState] = useState<State>(() => ({
    // ✅ 캐시에 있으면 그걸로 즉시 렌더 → 깜빡임 방지
    data: url ? (ogCache.get(url) ?? null) : null,
    isLoading: url ? !ogCache.has(url) : false,
    error: null,
  }));

  useEffect(() => {
    if (!url) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    // ✅ 새 URL이어도 이전 data는 유지한 채로 로딩만 켬
    setState((prev) => ({
      data: ogCache.get(url) ?? prev.data,
      isLoading: !ogCache.has(url),
      error: null,
    }));

    let cancelled = false;
    fetchUrlPreview(url)
      .then((d) => {
        if (!cancelled) setState({ data: d, isLoading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled) setState((prev) => ({ ...prev, isLoading: false, error: err }));
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state; // { data, isLoading, error }
};
