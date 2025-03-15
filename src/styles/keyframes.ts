import { keyframes } from '@emotion/react';

export const pop = keyframes({
  ['from']: {
    transform: 'scale(0)',
  },
  ['50%']: {
    transform: 'scale(1.2)',
  },
  ['to%']: {
    transform: 'scale(1)',
  },
});
