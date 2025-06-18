import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export const useIsMobile = () => {
  const width = useWindowSize();
  return width < 480;
};

export default useWindowSize;
