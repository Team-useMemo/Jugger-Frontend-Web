export const fetchUrlPreview = async (url: string) => {
  const res = await fetch(`https://og-meta-data-api.vercel.app/api/preview?url=${url}`);
  const data = await res.json();
  return data;
};

export interface OgData {
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
}
