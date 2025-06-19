import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const AddImageMemoContainer = styled.div({
  marginTop: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const AddImageMemoImageContainer = styled.div({
  background: theme.color.material.dimmer,
  borderRadius: theme.radius[8],
  display: 'flex',
  overflow: 'hidden',
});

const AddImageMemoEmpty = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.color.label.inverse,
  height: '280px',
  width: '100%',
  gap: '12px',
});

const AddImageMemoImage = styled.img({
  width: '100%',
  maxHeight: '480px',
  objectFit: 'contain',
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
  width: '100%',

  ['>button']: {
    width: '100%',
  },
});

const DetailImageMemoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  marginTop: '24px',
  width: '100%',

  [media[480]]: {
    flexGrow: '1',
    gap: '12px',
    marginTop: '12px',
  },
});

const DetailImageMemoImageContainer = styled.div({
  width: '100%',
  overflow: 'hidden',

  ['>img']: {
    maxHeight: '480px',
    width: '100%',
    objectFit: 'contain',
  },

  [media[480]]: {
    flexGrow: '1',

    display: 'flex',
    position: 'relative',
    background: theme.color.background.alternative,

    ['>img']: {
      position: 'absolute',
      maxHeight: 'none',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  },
});

const DetailImageMemoButtonContainer = styled.div({
  display: 'flex',
  gap: '15px',
  padding: '0 32px',
  ['.grow']: {
    flexGrow: '1',
  },
});

export {
  AddImageMemoContainer,
  AddImageMemoImageContainer,
  AddImageMemoEmpty,
  AddImageMemoImage,
  AddImageMemoDescContainer,
  AddImageMemoButtonContainer,
  DetailImageMemoContainer,
  DetailImageMemoImageContainer,
  DetailImageMemoButtonContainer,
};
