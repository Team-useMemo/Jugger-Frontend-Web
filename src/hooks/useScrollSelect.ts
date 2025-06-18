import { useEffect, useRef } from 'react';

const useScrollSelect = ({
  scrollItems,
  isInfinite,
  scrollItemHeight,
  selected,
  setSelected,
}: {
  scrollItems: any[];
  isInfinite?: boolean;
  scrollItemHeight: number;
  selected: any;
  setSelected: any;
}): [React.RefObject<HTMLDivElement | null>, any[], any] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollList = !isInfinite
    ? scrollItems
    : (() => {
        const list = [...scrollItems];
        while (list.length < 100) {
          list.push(...scrollItems);
          list.push(...scrollItems);
        }
        return list;
      })();

  const baseY =
    ~~(scrollList.length / scrollItems.length / 2) * scrollItems.length * scrollItemHeight + scrollItemHeight / 2;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: baseY + selected * scrollItemHeight,
      behavior: 'instant',
    });

    const handleScroll = () => {
      const scrollIndex = Math.round((container.scrollTop - scrollItemHeight / 2) / scrollItemHeight);
      setSelected(scrollIndex % scrollItems.length);
    };

    const handleScrollEnd = () => {
      if (!isInfinite) return;

      const scrollIndex =
        Math.round((container.scrollTop - scrollItemHeight / 2) / scrollItemHeight) % scrollItems.length;

      container.scrollTo({
        top: baseY + scrollIndex * scrollItemHeight,
      });
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('scrollend', handleScrollEnd);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('scrollend', handleScrollEnd);
    };
  }, []);

  const handleClickItem = (itemIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: itemIndex * scrollItemHeight + scrollItemHeight / 2,
      behavior: 'smooth',
    });
  };

  return [containerRef, scrollList, handleClickItem];
};

export default useScrollSelect;
