import { useEffect, useRef, useState } from 'react';

const imageCache = new Set<string>();

export const useStableImage = (src?: string) => {
  const [displaySrc, setDisplaySrc] = useState<string | undefined>(src && imageCache.has(src) ? src : undefined);
  const [isLoading, setIsLoading] = useState<boolean>(!!src && !imageCache.has(src));
  const lastSrcRef = useRef<string | undefined>(displaySrc);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }
    if (imageCache.has(src)) {
      // 이미 메모리에 로드된 경우 → 즉시 교체 (깜빡임 없음)
      lastSrcRef.current = src;
      setDisplaySrc(src);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let cancelled = false;
    const img = new Image();
    // 필요 시 CORS 상황에서 그리기용(blob 변환 등)을 고려한다면:
    // img.crossOrigin = 'anonymous';
    img.src = src;

    const done = () => {
      if (cancelled) return;
      imageCache.add(src);
      lastSrcRef.current = src;
      setDisplaySrc(src);
      setIsLoading(false);
    };

    // decode()가 더 부드러움 (지원 안되면 onload 사용)
    if ('decode' in img) {
      (img as HTMLImageElement).decode().then(done).catch(done);
    } else {
      (img as HTMLImageElement).onload = done;
      (img as HTMLImageElement).onerror = () => !cancelled && setIsLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [src]);

  return { displaySrc, isLoading };
};
