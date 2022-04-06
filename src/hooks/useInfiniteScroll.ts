import { useCallback, useRef } from 'react';

export const useInfiniteScroll = (
  addNewRows: () => void,
  hasMore: boolean
) => {
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setTimeout(() => {
            addNewRows();
          }, 2000);
        }
      });
      if (node) observer.current.observe(node);
    },
    [addNewRows, hasMore]
  );
  return { lastElementRef };
};
