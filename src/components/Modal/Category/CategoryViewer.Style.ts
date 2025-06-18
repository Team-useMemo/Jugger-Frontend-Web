import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const CategoryViewerContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: theme.color.background.normal,
  padding: '32px 32px 40px',
  borderRadius: theme.radius[16],
  // alignItems: 'end',
  width: '420px',
  boxSizing: 'border-box',

  ['>svg']: {
    cursor: 'pointer',
    marginLeft: 'auto',
  },
});

const CategoryViewerTitle = styled.p({
  ...theme.font.title3.bold,
  color: theme.color.text.onView,
  textAlign: 'left',

  margin: '0',
});

const CategoryViewerContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  margin: '36px 0',
  gap: '24px',

  ...theme.font.body1normal.semibold,
  color: theme.color.text.onView,
});

const CategoryViewerItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const CategoryViewerItemInput = styled.label({
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

const CategoryViewerItemColorContainer = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
});

const CategoryViewerItemColorCircle = styled.span(
  ({ color, isFocused }: { color: string; isFocused: boolean }) => ({
    background: color,
    border: `2px solid ${isFocused ? 'black' : 'transparent'}`,
  }),
  {
    width: '32px',
    aspectRatio: '1 / 1',
    borderRadius: theme.radius.full,
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
);

export {
  CategoryViewerContainer,
  CategoryViewerTitle,
  CategoryViewerContents,
  CategoryViewerItemContainer,
  CategoryViewerItemInput,
  CategoryViewerItemColorContainer,
  CategoryViewerItemColorCircle,
};
