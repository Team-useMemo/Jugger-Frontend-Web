import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const MemoLinkDefaultText = styled.p({
  margin: '0',
  whiteSpace: 'pre-wrap',
  color: 'white',
  fontSize: '15px',
  fontWeight: '500',
  padding: '8px 16px',
  background: '#0054D1',
  textAlign: 'start',
});

export const MemoLinkContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.blue[95],
  cursor: 'pointer',
});

export const MemoLinkImage = styled.img({
  width: '320px',
  height: '180px',
  objectFit: 'cover',
});

export const MemoLinkTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 16px',
  gap: '4px',
  textAlign: 'left',
  width: '288px',

  ['p']: {
    wordWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    margin: 0,

    ['&.title']: {
      ...theme.font.body2normal.semibold,
      color: theme.color.label.normal,
      WebkitLineClamp: '1',
    },
    ['&.desc']: {
      ...theme.font.caption1.medium,
      color: theme.color.label.neutral,
      WebkitLineClamp: '2',
    },
    ['&.url']: {
      ...theme.font.caption2.medium,
      color: theme.color.label.assistive,
      WebkitLineClamp: '1',
    },
  },
});
