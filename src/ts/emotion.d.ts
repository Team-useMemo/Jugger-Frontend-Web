// emotion.d.ts
import '@emotion/react';
import { theme as baseTheme } from '@styles/theme';

type ThemeMode = 'light' | 'dark';

export type AppTheme = typeof baseTheme & {
  mode: ThemeMode;
};

export const lightTheme = {
  mode: 'light',
  ...baseTheme,
};

declare module '@emotion/react' {
  export interface Theme extends AppTheme {
    __themeBrand?: 'emotion-theme';
  }
}
