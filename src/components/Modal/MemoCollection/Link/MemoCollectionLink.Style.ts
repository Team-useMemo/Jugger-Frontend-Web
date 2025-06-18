import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const MemoCollectionLinkContainer = styled.div({
  display: 'grid',
  gridAutoFlow: 'row',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  columnGap: '12px',
  rowGap: '24px',
});

const MemoCollectionLinkItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.radius[12],
  padding: '12px',
  boxShadow: theme.shadow.emphasize,
  gap: '12px',
});

const MemoCollectionLinkItemImageContainer = styled.div({
  aspectRatio: '4 / 3',
  borderRadius: theme.radius[6],
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',

  ['>img']: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    objectFit: 'cover',
  },

  ['>svg']: {
    position: 'absolute',
    background: theme.color.material.dimmer,
    borderRadius: theme.radius[4],
    right: '0',
    margin: '10px',
    display: 'none',

    [':hover']: {
      background: theme.color.label.alternative,
    },
  },

  [':hover']: {
    ['>svg']: {
      display: 'block',
    },
  },
});

const MemoCollectionLinkItemTextContainer = styled.div({
  width: '100%',
  overflow: 'hidden',

  ['>p']: {
    margin: '0',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',

    ['&.title']: {
      ...theme.font.caption1.semibold,
      color: theme.color.label.neutral,
    },
    ['&.desc']: {
      ...theme.font.caption2.medium,
      color: theme.color.label.assistive,
      margin: '2px 0px 4px',
    },
    ['&.url']: {
      ...theme.font.caption2.medium,
      color: theme.color.label.alternative,
    },
  },
});

const MemoCollectionLinkItemCategoryContainer = styled.div(
  ({ color }: { color?: string }) => ({
    ['>span']: {
      background: color,
    },

    ['::before']: {
      background: color,
    },
  }),
  {
    background: 'white',
    padding: '6px 10px',
    position: 'absolute',
    margin: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: theme.radius[48],
    overflow: 'hidden',
    zIndex: '1',

    ...theme.font.caption1.medium,
    color: theme.color.label.normal,

    ['>span']: {
      width: '6px',
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

export {
  MemoCollectionLinkContainer,
  MemoCollectionLinkItemContainer,
  MemoCollectionLinkItemImageContainer,
  MemoCollectionLinkItemTextContainer,
  MemoCollectionLinkItemCategoryContainer,
};
