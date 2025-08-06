import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoDetailImageContainer = styled.div({
  display: 'inline-flex',
  flexDirection: 'column',
  paddingTop: '24px',
  gap: '24px',
  overflow: 'hidden',

  [media[480]]: {
    paddingTop: '12px',
    gap: '12px',
  },
});

const MemoDetailImageContents = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'alternative' : 'inverse'],
  }),
  {
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
  },
);

const MemoDetailImageButtonContainer = styled.div(
  ({ theme }) => ({
    ['>svg']: {
      stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    padding: '0 32px',
    display: 'flex',

    gap: '15px',
    flexShrink: '0',

    ['>svg']: {
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
      cursor: 'pointer',
    },

    ['.grow']: {
      flexGrow: '1',
    },

    [media[480]]: {
      padding: '0 24px',
    },
  },
);

const MemoTitleContainer = styled.div(
  ({ theme }) => ({
    borderBottom: `1.5px solid ${theme.color.line.neutral}`,
  }),
  {
    margin: '0 24px',
    padding: '8px 0px',

    ['>p']: {
      ...theme.font.body1normal.medium,
      margin: '0',
      textAlign: 'left',
    },

    [media[480]]: {
      margin: '0 24px',
      padding: '4px 0px',
    },
  },
);

export { MemoDetailImageContainer, MemoDetailImageContents, MemoDetailImageButtonContainer, MemoTitleContainer };
