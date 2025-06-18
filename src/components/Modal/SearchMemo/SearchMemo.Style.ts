import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const SearchMemoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 32px',
  borderRadius: theme.radius[16],
  background: theme.color.background.normal,
  width: '820px',
  maxWidth: '100vw',
  boxSizing: 'border-box',
  gap: '20px',
});

const SearchMemoInputContainer = styled.label({
  background: theme.color.background.alternative,
  borderRadius: theme.radius[8],
  padding: '11px 14px',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  height: '32px',

  ['input']: {
    flexGrow: '1',
    background: 'transparent',
    border: 'none',
    ...theme.font.headline1.medium,
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

const SearchMemoInputCategory = styled.div(
  ({ color }: { color: string }) => ({
    ['>span']: {
      background: color,
    },

    ['::before']: {
      background: color,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    position: 'relative',
    zIndex: '1',
    borderRadius: theme.radius[48],
    overflow: 'hidden',

    ...theme.font.body1normal.medium,

    ['>span']: {
      width: '8px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
    },

    ['::before']: {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: '0.1',
      left: 0,
      zIndex: '-1',
    },

    ['>svg']: {
      width: '20px',
      height: 'auto',
      aspectRatio: '1 / 1',
      cursor: 'pointer',
      display: 'none',
    },

    [':hover']: {
      ['>svg']: {
        display: 'block',
      },
    },
  },
);

const SearchMemoCategoryContainer = styled.div({
  padding: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  textAlign: 'left',

  ...theme.font.headline1.semibold,
  color: theme.color.label.normal,
});

const SearchMemoCategoryContents = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
});

const SearchMemoCategoryItem = styled.div(
  ({ color }: { color: string }) => ({
    ['>span']: {
      background: color,
    },

    ['::before']: {
      background: color,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    position: 'relative',
    zIndex: '1',
    borderRadius: theme.radius[48],
    overflow: 'hidden',

    ...theme.font.body1normal.medium,

    ['>span']: {
      width: '8px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
    },

    ['::before']: {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: '0.1',
      left: 0,
      zIndex: '-1',
    },
  },
);

const SearchMemoResultContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const SearchMemoResultItemContainer = styled.div({
  display: 'flex',
  gap: '8px',
  padding: '12px 16px',

  ['>svg']: {
    width: '24px',
    aspectRatio: '1 / 1',
  },
});

const SearchMemoResultItemContents = styled.p({
  margin: '0',
  ...theme.font.headline1.medium,
  color: theme.color.label.normal,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  flexGrow: '1',
  textAlign: 'left',
  textOverflow: 'ellipsis',

  ['>span']: {
    color: theme.color.primary.normal,
  },
});

const SearchMemoResultItemCategory = styled.div(
  ({ color }: { color: string }) => ({
    ['>span']: {
      background: color,
    },
  }),
  {
    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,
    padding: '4px',
    gap: '8px',
    display: 'flex',
    alignItems: 'center',

    ['>span']: {
      width: '8px',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
    },
  },
);

export {
  SearchMemoContainer,
  SearchMemoInputContainer,
  SearchMemoInputCategory,
  SearchMemoCategoryContainer,
  SearchMemoCategoryContents,
  SearchMemoCategoryItem,
  SearchMemoResultContainer,
  SearchMemoResultItemContainer,
  SearchMemoResultItemContents,
  SearchMemoResultItemCategory,
};
