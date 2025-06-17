import { useEffect, useState } from 'react';

const ogCache = new Map<string, OgData>();

export interface OgData {
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
}

export const fetchUrlPreview = async (url: string) => {
  if (ogCache.has(url)) {
    return ogCache.get(url);
  }

  const res = await fetch(`https://og-meta-data-api.vercel.app/api/preview?url=${url}`);
  const data = await res.json();
  ogCache.set(url, data);
  return data;
};

export const useOgData = (url: string) => {
  const [data, setData] = useState<OgData | null>(null);

  useEffect(() => {
    fetchUrlPreview(url).then(setData);
  }, [url]);

  return data;
};
