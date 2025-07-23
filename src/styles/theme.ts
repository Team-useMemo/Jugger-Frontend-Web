import color from './color';
import font from './font';
import palette from './palette';

const radius = {
  4: '4px',
  6: '6px',
  8: '8px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  32: '32px',
  48: '48px',
  full: '999px',
};

const shadow = {
  normal: '0px 5px 15px 0px #00000008, 0px 1px 8px 0px #00000008',
  emphasize: '0px 0px 2px 0px #0000000d, 0px 1px 5px 0px #0000000d, 0px 5px 12px 0px #0000000d',
  strong: '0px 0px 4px 0px #00000014, 0px 4px 8px 0px #00000014, 0px 6px 12px 0px #0000001f',
  heavy: '0px 0px 8px 0px #00000014, 0px 8px 16px 0px #00000014, 0px 16px 20px 0px #0000001f',
};

const theme = {
  palette,
  color,
  font,
  radius,
  shadow,
} as const;

export type themeColor = typeof color;
export type themeFont = typeof font;

const breakpoints = {
  480: 480,
  768: 768,
  1024: 1024,
};

const media = Object.fromEntries(
  Object.entries(breakpoints).map(([key, value]) => [key, `@media (max-width: ${value}px)`]),
);

export { theme, media };
