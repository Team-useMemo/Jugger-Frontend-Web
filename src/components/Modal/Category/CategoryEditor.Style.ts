import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const CategoryEditorLayout = styled.div({
  maxHeight: '100dvh',
  maxWidth: '100dvw',
  boxSizing: 'border-box',
  padding: '64px',
  display: 'flex',
  overflow: 'hidden',

  [media[480]]: {
    padding: '20px',
    width: '100%',
  },
});

const CategoryEditorContainer = styled.div(
  ({ maxWidth }: { maxWidth?: string }) => ({
    maxWidth: maxWidth ?? '',
    width: maxWidth ? '100vw' : '',
    [media['480']]: {
      maxWidth: '100dvw',
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    padding: '32px',
    background: theme.color.background.normal,
    borderRadius: theme.radius[16],
    boxSizing: 'border-box',

    ['>svg']: {
      marginLeft: 'auto',
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
      flexShrink: '0',
      cursor: 'pointer',
    },

    [':focus']: {
      outline: 'none',
    },

    [media['480']]: {
      width: '100%',
      height: '100%',

      padding: '32px 24px',
    },
  },
);

const CategoryEditorContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: theme.color.background.normal,
  borderRadius: theme.radius[16],
  boxSizing: 'border-box',
  gap: '36px',

  ['>svg']: {
    cursor: 'pointer',
    marginLeft: 'auto',
  },
});

const CategoryEditorTitle = styled.p({
  ...theme.font.title3.bold,
  color: theme.color.label.normal,
  textAlign: 'left',

  margin: '0',
});

const CategoryEditorItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  gap: '24px',

  ...theme.font.body1normal.semibold,
  color: theme.color.label.normal,
});

const CategoryEditorItemContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const CategoryEditorItemInput = styled.label({
  background: theme.color.background.alternative,
  borderRadius: theme.radius[4],
  padding: '11px 14px',
  display: 'flex',
  alignItems: 'center',
  height: '32px',

  ['input']: {
    flexGrow: '1',
    background: 'transparent',
    border: 'none',
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

  [':has(input:focus)']: {
    outline: `1.5px solid ${theme.color.primary.normal}`,
  },

  [':has(input[readonly])']: {
    cursor: 'pointer',
  },

  ['svg']: {
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
  },
});

const CategoryEditorItemColorContainer = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  gap: '8px',

  [media[480]]: {
    justifyContent: 'flex-start',
    gap: '16px',
    flexWrap: 'wrap',
  },
});

const CategoryEditorItemColorCircle = styled.span(
  ({ color, isFocused }: { color: string; isFocused: boolean }) => ({
    background: color,
    border: `2px solid ${isFocused ? 'black' : 'transparent'}`,
  }),
  {
    width: '36px',
    aspectRatio: '1 / 1',
    borderRadius: theme.radius.full,
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
);

export {
  CategoryEditorLayout,
  CategoryEditorContainer,
  CategoryEditorTitle,
  CategoryEditorContents,
  CategoryEditorItemContainer,
  CategoryEditorItemContents,
  CategoryEditorItemInput,
  CategoryEditorItemColorContainer,
  CategoryEditorItemColorCircle,
};
