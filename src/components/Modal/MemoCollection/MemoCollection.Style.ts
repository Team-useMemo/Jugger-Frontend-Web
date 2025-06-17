import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const MemoCollectionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: theme.color.background.normal,
  width: '820px',
  height: '840px',
  borderRadius: theme.radius[16],
});

const MemoCollectionHeader = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  padding: '32px 32px 20px',
  borderBottom: `1px solid ${theme.color.line.normal}`,

  ['>svg']: {
    cursor: 'pointer',
  },
});

const MemoCollectionHeaderContents = styled.div({
  display: 'flex',
  width: '100%',
  gap: '16px',
});

const MemoCollectionHeaderItem = styled.p(
  ({ isFocused }: { isFocused?: boolean }) =>
    isFocused
      ? {
          ...theme.font.title3.bold,
          color: theme.color.label.normal,
        }
      : {
          ...theme.font.title3.regular,
          color: theme.color.label.assistive,
        },
  {
    margin: '0',
    cursor: 'pointer',
  },
);

const MemoCollectionContents = styled.div({
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
});

const MemoCollectionSideBar = styled.div({
  width: '180px',
  background: theme.color.background.alternative,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
});

const MemoCollectionSideBarItemContainer = styled.div(
  ({ isFocused, color }: { isFocused: boolean; color: string }) => ({
    background: isFocused ? theme.color.fill.strong : '',
    ['>span']: {
      background: color,
    },
  }),
  {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    padding: '16px 24px',
    ...theme.font.body2normal.semibold,
    color: theme.color.label.normal,
    cursor: 'pointer',

    ['>span']: {
      display: 'block',
      width: '8px',
      aspectRatio: '1 / 1',
      height: 'auto',
      borderRadius: theme.radius.full,
    },
  },
);

const MemoCollectionBodyContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px',
  flexGrow: '1',
  overflow: 'auto',

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
});

const MemoCollectionBodyTitle = styled.div({
  display: 'flex',
  gap: '6px',
  alignItems: 'center',
  ...theme.font.headline1.semibold,
  color: theme.color.label.normal,
  padding: '8px 0 20px',
  ['>svg']: {
    stroke: theme.color.label.alternative,
  },
});

export {
  MemoCollectionContainer,
  MemoCollectionContents,
  MemoCollectionHeader,
  MemoCollectionHeaderContents,
  MemoCollectionHeaderItem,
  MemoCollectionSideBar,
  MemoCollectionSideBarItemContainer,
  MemoCollectionBodyContainer,
  MemoCollectionBodyTitle,
};
