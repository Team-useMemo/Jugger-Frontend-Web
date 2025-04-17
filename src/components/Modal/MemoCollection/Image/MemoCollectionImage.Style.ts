import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const MemoCollectionImageListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});

export const MemoCollectionImageListTitle = styled.div({
  ...theme.font.label1normal.semibold,
  margin: '0',
  padding: '12px 16px',
  color: theme.color.label.neutral,
  boxShadow: theme.shadow.normal,
  borderTopLeftRadius: theme.radius[12],
  borderTopRightRadius: theme.radius[12],
});

export const MemoCollectionImageListContents = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  rowGap: '12px',
  padding: '18px',
  width: '100%',
  boxSizing: 'border-box',
  boxShadow: theme.shadow.emphasize,
  borderRadius: theme.radius[12],
  borderTopLeftRadius: '0',
});

export const MemoColectionImageItemContainer = styled.div({
  width: '172px',
  height: '172px',
  overflow: 'hidden',
  borderRadius: '8px',

  ['img']: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
});
