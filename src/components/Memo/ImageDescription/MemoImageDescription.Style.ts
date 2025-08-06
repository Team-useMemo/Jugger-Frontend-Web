import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoImageDescriptionContainer = styled.div(
  ({ theme }) => ({
    background: theme.mode === 'light' ? theme.palette.blue[95] : theme.color.background.alternativeinverse,
    ['>p']: {
      color: theme.color.label[theme.mode === 'light' ? 'neutral' : 'assistive'],
    },
  }),
  {
    borderRadius: theme.radius[12],
    maxWidth: '320px',
    padding: '12px 16px',
    boxSizing: 'border-box',
    textAlign: 'left',
    cursor: 'pointer',

    ['>p']: {
      ...theme.font.caption1.medium,
      margin: '0',

      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      WebkitLineClamp: '2',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },

    [media[480]]: {
      maxWidth: '280px',
    },
  },
);

export { MemoImageDescriptionContainer };
