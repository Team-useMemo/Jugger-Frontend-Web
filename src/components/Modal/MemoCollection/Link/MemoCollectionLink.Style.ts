import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const MemoCollectionLinkContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

export const MemoCollectionLinkContents = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  columnGap: '12px',
  rowGap: '24px',
  width: '580px',
  boxSizing: 'border-box',
  borderRadius: theme.radius[12],
  borderTopLeftRadius: '0',
});

export const MemoCollectionLinkItemContainer = styled.div({
  width: 'auto',
  overflow: 'hidden',
  borderRadius: theme.radius[12],
  padding: '12px',
  boxShadow: theme.shadow.emphasize,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  textAlign: 'left',
  cursor: 'pointer',
});

export const MemoCollectionLinkItemThumbnailContainer = styled.div({
  width: '100%',
  height: '200px',
  borderRadius: theme.radius[6],
  overflow: 'hidden',
  position: 'relative',

  ['img']: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
});

export const MemoCollectionLinkItemCategory = styled.div(
  ({ color }: { color: string }) => ({
    ['span']: {
      background: color,
    },
  }),
  {
    position: 'absolute',
    background: 'white',
    left: '8px',
    top: '8px',
    borderRadius: theme.radius[48],
    padding: '6px 10px',
    display: 'flex',
    gap: '4px',
    alignItems: 'center',

    ...theme.font.caption1.medium,
    color: theme.color.label.normal,
    margin: '0',

    ['span']: {
      width: '6px',
      height: '6px',
      borderRadius: theme.radius[6],
    },
  },
);

export const MemoCollectionLinkItemContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',

  ['p']: {
    margin: '0',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    ['&.title']: {
      ...theme.font.caption1.semibold,
      color: theme.color.label.neutral,
    },
    ['&.desc']: {
      ...theme.font.caption2.medium,
      color: theme.color.label.assistive,
      marginBottom: '2px',
    },
    ['&.url']: {
      ...theme.font.caption2.medium,
      color: theme.color.label.alternative,
    },
  },
});
