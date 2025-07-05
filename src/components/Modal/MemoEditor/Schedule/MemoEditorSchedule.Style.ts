import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoEditorScheduleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  textAlign: 'left',

  ...theme.font.title3.bold,
  color: theme.color.label.normal,

  overflowY: 'hidden',
});

const MemoEditorScheduleContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  overflowY: 'auto',
  overflowX: 'visible',
  flexGrow: '1',

  ['::-webkit-scrollbar']: {
    display: 'none',
  },
  [media[480]]: {
    padding: '20px 20px 32px',
  },
});

const MemoEditorScheduleItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ...theme.font.body1normal.semibold,
  color: theme.color.label.normal,
});

const MemoEditorScheduleItemContents = styled.label({
  display: 'flex',
  padding: '11px 14px',
  alignItems: 'center',
  background: theme.color.background.alternative,
  borderRadius: theme.radius[6],
  gap: '4px',

  ['>input']: {
    background: 'transparent',
    border: 'none',
    flexGrow: '1',

    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,

    [':focus']: {
      outline: 'none',
    },

    ['::placeholder']: {
      color: theme.color.label.alternative,
    },

    ['&[readonly]']: {
      cursor: 'pointer',
    },
  },

  ['>svg']: {
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    flexShrink: '0',
  },

  [':has(>input:focus)']: {
    outline: `2px solid ${theme.color.primary.normal}`,
    outlineOffset: '-2px',
  },

  [':has(>input[readonly])']: {
    cursor: 'pointer',
  },
});

const MemoEditorScheduleItemButton = styled.input({
  display: 'flex',
  padding: '11px 14px',
  alignItems: 'center',
  background: theme.color.background.alternative,
  borderRadius: theme.radius[6],
  border: 'none',
  flexGrow: '1',

  ...theme.font.body1normal.medium,
  color: theme.color.label.normal,

  [':focus']: {
    outline: 'none',
  },

  ['::placeholder']: {
    color: theme.color.label.alternative,
  },

  ['&[readonly]']: {
    cursor: 'pointer',
  },
});

const MemoEditorScheduleItemErrorText = styled.p({
  ...theme.font.caption1.medium,
  color: theme.color.status.error,
  margin: '0',
});

export {
  MemoEditorScheduleContainer,
  MemoEditorScheduleContents,
  MemoEditorScheduleItemContainer,
  MemoEditorScheduleItemContents,
  MemoEditorScheduleItemButton,
  MemoEditorScheduleItemErrorText,
};
