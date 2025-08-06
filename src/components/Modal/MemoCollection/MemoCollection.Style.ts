import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoCollectionLayout = styled.div({
  maxHeight: '100dvh',
  maxWidth: '100dvw',
  boxSizing: 'border-box',
  padding: '64px',
  display: 'flex',
  overflow: 'hidden',
  height: '100%',
  alignItems: 'center',

  [media[480]]: {
    padding: '0',
    width: '100%',
    height: '100%',
  },
});

const MemoCollectionContainer = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'normal' : 'alternativeinverse'],

    [media[480]]: {
      background: theme.color.background[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    width: '820px',
    maxHeight: '840px',
    height: '100%',
    borderRadius: theme.radius[16],
    overflow: 'hidden',

    [media[480]]: {
      borderRadius: '0',
      maxHeight: '100%',
    },
  },
);

const MemoCollectionHeader = styled.div(
  ({ theme }) => ({
    borderBottom: `1px solid ${theme.mode === 'light' ? theme.color.line.normal : theme.color.label.neutral}`,

    ['>svg']: {
      stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    padding: '32px 32px 20px',

    ['>svg']: {
      cursor: 'pointer',
    },
    [media[480]]: {
      padding: '8px 20px 0',
    },
  },
);

const MemoCollectionHeaderContents = styled.div({
  display: 'flex',
  width: '100%',
  gap: '16px',

  [media[480]]: {
    gap: '0',
  },
});

const MemoCollectionHeaderItem = styled.p(
  ({ theme, isFocused }: { theme?: any; isFocused?: boolean }) => ({
    ...theme.font.title3[isFocused ? 'bold' : 'regular'],
    color: theme.color.label[isFocused ? (theme.mode === 'light' ? 'normal' : 'inverse') : 'assistive'],

    [media[480]]: {
      ...theme.font.body1normal.semibold,
      borderBottom: isFocused ? `2px solid ${theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse']}` : '',
    },
  }),
  {
    margin: '0',
    cursor: 'pointer',
    boxSizing: 'border-box',

    [media[480]]: {
      width: '72px',
      padding: '8px 0',
    },
  },
);

const MemoCollectionContents = styled.div({
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
});

const MemoCollectionSideBar = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'normal' : 'alternativeinverse'],

    [media[480]]: {
      background: theme.color.background[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    width: '180px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',

    [media[768]]: {
      display: 'none',
    },
  },
);

const MemoCollectionSideBarItemContainer = styled.div(
  ({ theme, isFocused, color }: { theme?: any; isFocused: boolean; color: string }) => ({
    background: isFocused ? (theme.mode === 'light' ? theme.palette.blue[99] : theme.palette.coolneutral[22]) : '',
    ['::before']: {
      background: color,
    },
  }),
  {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    padding: '16px 24px',
    cursor: 'pointer',
    ['>p']: {
      ...theme.font.body2normal.semibold,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: '0',
    },

    ['::before']: {
      content: '""',
      display: 'block',
      width: '8px',
      aspectRatio: '1 / 1',
      height: 'auto',
      borderRadius: theme.radius.full,
      flexShrink: '0',
    },
  },
);

const MemoCollectionBodyLayout = styled.div({
  flexGrow: '1',
  height: '100%',
  position: 'relative',
});

const MemoCollectionBodyContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px',
  width: '100%',
  height: '100%',
  overflowY: 'scroll',
  position: 'absolute',
  boxSizing: 'border-box',

  ['::-webkit-scrollbar']: {
    opacity: '0',
    background: '#FFFFFF11',
    width: '12px',
    borderLeft: '1px solid #E8E8E8',
  },

  ['::-webkit-scrollbar-thumb']: {
    background: '#7A7A7A',
    borderRadius: '100px',
    backgroundClip: 'padding-box',
    border: '3px solid transparent',

    [':hover']: {
      background: '#AAAAAA',
      backgroundClip: 'padding-box',
    },
  },

  [media[480]]: {
    padding: '24px 16px',

    ['::-webkit-scrollbar']: {
      display: 'none',
    },
  },
});

const MemoCollectionBodyTitle = styled.div({
  display: 'flex',
  gap: '6px',
  alignItems: 'center',
  padding: '8px 0 20px',

  ['>p']: {
    ...theme.font.headline1.semibold,

    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    margin: '0',
  },

  ['>svg']: {
    stroke: theme.color.label.alternative,
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    flexShrink: '0',
    paddingRight: '120px',
  },
});

export {
  MemoCollectionLayout,
  MemoCollectionContainer,
  MemoCollectionContents,
  MemoCollectionHeader,
  MemoCollectionHeaderContents,
  MemoCollectionHeaderItem,
  MemoCollectionSideBar,
  MemoCollectionSideBarItemContainer,
  MemoCollectionBodyLayout,
  MemoCollectionBodyContainer,
  MemoCollectionBodyTitle,
};
