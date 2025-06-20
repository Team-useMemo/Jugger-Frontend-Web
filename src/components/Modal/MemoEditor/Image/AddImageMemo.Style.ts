import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const AddImageMemoTitle = styled.p({
  margin: '0 0 24px',

  textAlign: 'left',
  ...theme.font.title3.bold,
  color: theme.color.text.onView,
});

const AddImageMemoContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  overflow: 'hidden',

  [media[480]]: {
    padding: '20px',
    height: '100%',
  },
});

const AddImageMemoImageContainer = styled.div({
  background: theme.color.background.alternative,
  borderRadius: theme.radius[8],
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',

  [media[480]]: {
    flexGrow: '1',
    justifyContent: 'center',
  },
});

const AddImageMemoEmptyImageContents = styled.label({
  background: theme.color.material.dimmer,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.color.label.inverse,
  aspectRatio: '5 / 4',
  gap: '12px',
  padding: '48px',

  ...theme.font.label1normal.medium,
  whiteSpace: 'nowrap',

  ['>input']: {
    display: 'none',
  },
});

const AddImageMemoImageContents = styled.div({
  overflow: 'hidden',
  display: 'flex',

  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',

  ['>img']: {
    objectFit: 'contain',
    width: 'auto',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '240px',
    minHeight: '240px',
  },
});

const AddImageMemoDescContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  textAlign: 'left',
  ...theme.font.body1normal.semibold,
  color: theme.color.text.onView,

  ['>input']: {
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${theme.color.line.neutral}`,
    padding: '8px 0',

    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,

    [':focus']: {
      outline: 'none',
    },

    ['::placeholder']: {
      color: theme.color.label.alternative,
    },
  },

  ['>p']: {
    ...theme.font.caption1.regular,
    color: theme.color.label.alternative,

    margin: '0',
    textAlign: 'right',
  },
});

const AddImageMemoButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',

  ['>button']: {
    width: '100%',
  },
});

export {
  AddImageMemoTitle,
  AddImageMemoContents,
  AddImageMemoImageContainer,
  AddImageMemoEmptyImageContents,
  AddImageMemoImageContents,
  AddImageMemoDescContainer,
  AddImageMemoButtonContainer,
};
