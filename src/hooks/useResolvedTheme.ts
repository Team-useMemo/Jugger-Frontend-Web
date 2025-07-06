import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

const useResolvedTheme = (userTheme: ThemeMode): 'light' | 'dark' => {
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (userTheme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => setResolvedTheme(media.matches ? 'dark' : 'light');
      handleChange(); // 초기값
      media.addEventListener('change', handleChange);
      return () => media.removeEventListener('change', handleChange);
    }

    setResolvedTheme(userTheme);
  }, [userTheme]);

  return resolvedTheme;
};

export default useResolvedTheme;
