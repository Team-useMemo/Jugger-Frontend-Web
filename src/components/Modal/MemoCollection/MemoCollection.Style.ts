import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const MemoCollectionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '820px',
  height: '840px',
  background: theme.color.background.normal,
  borderRadius: theme.radius[16],
  zIndex: 1000,
});

export const MemoCollectionHeader = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 0 20px',
});

export const MemoCollectionTitle = styled.div({
  display: 'flex',
  padding: '0 32px',
  gap: '16px',
});

export const MemoCollectionTitleItem = styled.div(
  ({ isFocus }: { isFocus: boolean }) => ({
    ...theme.font.title3[isFocus ? 'bold' : 'regular'],
    color: theme.color.label[isFocus ? 'normal' : 'assistive'],
  }),
  {
    cursor: 'pointer',
    margin: '0',
  },
);

export const MemoCollectionContents = styled.div({
  display: 'flex',
  borderTop: `1px solid ${theme.color.line.normal}`,
  height: '100%',
  overflow: 'hidden',
});

export const MemoCollectionCategories = styled.div({
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  width: '192px',
  background: theme.color.background.alternative,
  height: '100%',
});

export const MemoCollectionCategoryItem = styled.div(
  ({ isFocus, color }: { isFocus: boolean; color: string }) => ({
    background: theme.color.fill[isFocus ? 'strong' : 'alternative'],
    ['span']: {
      background: color,
    },
  }),
  {
    display: 'flex',
    gap: '8px',
    padding: '16px 24px',
    alignItems: 'center',
    cursor: 'pointer',

    ...theme.font.body2normal.semibold,
    color: theme.color.label.normal,

    ['span']: {
      width: '8px',
      height: '8px',
      borderRadius: '4px',
    },
  },
);

export const MemoCollectionBodyContainer = styled.div({
  padding: '32px 24px',
  flexGrow: '1',
  overflow: 'auto',
  ['::-webkit-scrollbar']: {
    display: 'none',
  },
});

export const MemoCollectionBodyTitle = styled.div({
  ...theme.font.headline1.semibold,
  color: theme.color.label.normal,
  paddingBottom: '20px',
  margin: '0',
  display: 'flex',
  gap: '6',
  alignItems: 'center',

  ['svg']: {
    stroke: theme.color.label.alternative,
    width: '20px',
    height: '20px',
  },
});

export const MemoCollectionBodyContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});
