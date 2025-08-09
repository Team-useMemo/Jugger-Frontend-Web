import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

export const MemoLinkContainer = styled.div(
  ({ theme }) => ({
    background: theme.mode === 'light' ? theme.palette.blue[95] : theme.color.background.alternativeinverse,
  }),
  {
    borderRadius: theme.radius[12],
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    width: '320px',

    [media[480]]: {
      width: '280px',
    },
  },
);

export const MemoLinkImage = styled.div({
  aspectRatio: '5 / 3',
  position: 'relative',

  ['img']: {
    position: 'absolute',
    objectFit: 'cover',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  },
});

export const MemoLinkTextContainer = styled.div(
  ({ theme }) => ({
    ['>p']: {
      ['&.desc']: {
        color: theme.color.label[theme.mode === 'light' ? 'neutral' : 'assistive'],
      },
      ['&.url']: {
        color: theme.color.label[theme.mode === 'light' ? 'assistive' : 'alternative'],
      },
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 16px 16px',
    gap: '4px',
    textAlign: 'left',

    ['>p']: {
      wordWrap: 'break-word',
      textOverflow: 'ellipsis',
      whiteSpace: 'normal',
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      margin: 0,

      ['&.title']: {
        ...theme.font.body2normal.semibold,
        WebkitLineClamp: '1',
      },
      ['&.desc']: {
        ...theme.font.caption1.medium,
        WebkitLineClamp: '2',
      },
      ['&.url']: {
        ...theme.font.caption2.medium,
        WebkitLineClamp: '1',
      },
    },
  },
);
