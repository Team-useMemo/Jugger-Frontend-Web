import { ThemeProvider } from '@emotion/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { GetLocalStorageItem, SetLocalStorageItem } from '@ts/LocalStorage';
import { theme as baseTheme } from '@styles/theme';

type ThemeMode = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  userTheme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setUserTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('ThemeContext not found');
  return ctx;
};

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeProviderWithSystem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userTheme, setUserTheme] = useState<ThemeMode>(() => {
    return (GetLocalStorageItem('theme') as ThemeMode) || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    userTheme === 'system' ? getSystemTheme() : userTheme,
  );

  useEffect(() => {
    SetLocalStorageItem('theme', userTheme);

    if (userTheme !== 'system') {
      setResolvedTheme(userTheme);
      return;
    }

    const applySystem = () => {
      setResolvedTheme(getSystemTheme());
    };

    applySystem();
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', applySystem);
    return () => media.removeEventListener('change', applySystem);
  }, [userTheme]);

  return (
    <ThemeContext.Provider value={{ userTheme, resolvedTheme, setUserTheme }}>
      <ThemeProvider theme={{ mode: resolvedTheme, ...baseTheme }}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
