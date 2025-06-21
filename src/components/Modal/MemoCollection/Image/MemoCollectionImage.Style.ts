import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoCollectionImageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',

  [media[480]]: {
    gap: '28px',
  },
});

const MemoCollectionImageListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const MemoCollectionImageListTitle = styled.p({
  padding: '12px 16px',
  borderTopLeftRadius: theme.radius[12],
  borderTopRightRadius: theme.radius[12],
  boxShadow: theme.shadow.normal,

  ...theme.font.label1normal.semibold,
  color: theme.color.label.neutral,
  margin: '0',
  marginRight: 'auto',
});

const MemoCollectionImageListContents = styled.div({
  display: 'grid',
  gridAutoFlow: 'row',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  padding: '18px',
  columnGap: '16px',
  rowGap: '16px',

  boxShadow: theme.shadow.emphasize,
  borderRadius: theme.radius[12],
  borderTopLeftRadius: '0',
  background: theme.color.background.normal,

  [media[480]]: {
    padding: '16px',
    columnGap: '8px',
    rowGap: '12px',
  },
});

const MemoCollectionImageItemContainer = styled.div({
  display: 'flex',
  width: 'auto',
  aspectRatio: '1 / 1',
  borderRadius: theme.radius[8],
  position: 'relative',
  overflow: 'hidden',

  ['>img']: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export {
  MemoCollectionImageContainer,
  MemoCollectionImageListContainer,
  MemoCollectionImageListTitle,
  MemoCollectionImageListContents,
  MemoCollectionImageItemContainer,
};
