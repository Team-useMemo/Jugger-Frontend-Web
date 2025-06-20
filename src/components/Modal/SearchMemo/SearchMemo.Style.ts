import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const SearchMemoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 32px',
  borderRadius: theme.radius[16],
  background: theme.color.background.normal,

  width: 'calc(100dvw - 64px * 2)',
  maxWidth: '820px',
  boxSizing: 'border-box',
  gap: '20px',

  [media[480]]: {
    width: '100%',
    maxWidth: '100dvw',
    padding: '0',
    borderRadius: '0',
    gap: '0px',
  },
});

const SearchMemoInputContainer = styled.div({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  boxSizing: 'border-box',

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    flexShrink: '0',
  },

  [media[480]]: {
    padding: '12px 20px',
  },
});

const SearchMemoInputContents = styled.label({
  background: theme.color.background.alternative,
  borderRadius: theme.radius[8],
  padding: '11px 14px',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  height: '32px',
  overflow: 'hidden',
  width: '100%',

  ['>input']: {
    flexGrow: '1',
    background: 'transparent',
    border: 'none',
    ...theme.font.headline1.medium,
    color: theme.color.label.normal,
    minWidth: '0',
    height: '28px',
    padding: '0',

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

  ['>svg']: {
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    flexShrink: '0',
  },

  [media[480]]: {
    padding: '12px 12px 12px 16px',
    height: 'auto',

    ['>input']: {
      ...theme.font.body2normal.medium,
      minWidth: '0',
    },
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
    maxWidth: '160px',
    flexShrink: '0',

    ['>p']: {
      ...theme.font.body1normal.medium,
      margin: '0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },

    ['>span']: {
      width: '8px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
      flexShrink: '0',
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
      flexShrink: '0',
    },

    [':hover']: {
      ['>svg']: {
        display: 'block',
      },
    },

    [media[480]]: {
      padding: '6px 10px',
      gap: '4px',
      maxWidth: '124px',

      ['>p']: {
        ...theme.font.caption1.medium,
      },

      ['>svg']: {
        width: '16px',
      },

      [':hover']: {
        ['>svg']: {
          display: 'none',
        },
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

  [media[480]]: {
    padding: '12px 20px',
  },
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
    maxWidth: '160px',

    ['>p']: {
      ...theme.font.body1normal.medium,
      margin: '0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },

    ['>span']: {
      width: '8px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
      flexShrink: '0',
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

  [media[480]]: {
    padding: '12px 0',
  },
});

const SearchMemoResultItemContainer = styled.div({
  display: 'flex',
  gap: '24px',
  padding: '12px 16px',

  [media[480]]: {
    gap: '4px',
    padding: '12px 20px',
    flexDirection: 'column',
  },
});

const SearchMemoResultItemContents = styled.div({
  flexGrow: '1',
  display: 'flex',
  overflow: 'hidden',
  gap: '8px',
  alignItems: 'center',

  ['>p']: {
    margin: '0',

    ...theme.font.headline1.medium,
    color: theme.color.label.normal,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textAlign: 'left',
    textOverflow: 'ellipsis',

    ['>span']: {
      color: theme.color.primary.normal,
    },
  },

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    flexShrink: '0',
  },

  [media[480]]: {
    ['>p']: {
      ...theme.font.body1normal.medium,
    },
  },
});

const SearchMemoResultItemCategory = styled.div(
  ({ color }: { color: string }) => ({
    ['::before']: {
      background: color,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    maxWidth: '160px',
    gap: '8px',
    flexShrink: '0',

    ['>p']: {
      ...theme.font.body1normal.medium,
      color: theme.color.label.normal,
      margin: '0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },

    ['::before']: {
      content: '""',
      width: '8px',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
      flexShrink: '0',
    },

    [media[480]]: {
      padding: '4px',

      ['>p']: {
        ...theme.font.label1normal.medium,
        color: theme.color.label.alternative,
      },
    },
  },
);

export {
  SearchMemoContainer,
  SearchMemoInputContainer,
  SearchMemoInputContents,
  SearchMemoInputCategory,
  SearchMemoCategoryContainer,
  SearchMemoCategoryContents,
  SearchMemoCategoryItem,
  SearchMemoResultContainer,
  SearchMemoResultItemContainer,
  SearchMemoResultItemContents,
  SearchMemoResultItemCategory,
};
