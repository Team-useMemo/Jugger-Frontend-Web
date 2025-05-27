import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const IndexLastSectionLayout = styled.div({
  padding: '120px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '56px',

  [media[480]]: {
    padding: '48px 0',
    gap: '20px',
  },
});

const IndexLastSectionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',

  ...theme.font.display1.bold,
  backgroundImage: `linear-gradient(136.66deg, ${theme.palette.blue[20]} 37.16%, ${theme.palette.blue[50]} 57.94%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',

  ['svg']: {
    width: '56px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.palette.blue[20],
  },

  [media[480]]: {
    gap: '12px',

    ...theme.font.title3.bold,

    ['svg']: {
      width: '24px',
    },
  },
});

export { IndexLastSectionLayout, IndexLastSectionContainer };
