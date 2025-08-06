import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoDetailScheduleContainer = styled.div({
  width: 'calc(100dvw - 64px * 2)',
  maxWidth: '440px',
  padding: '0 32px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  overflowY: 'auto',

  [media[480]]: {
    width: 'calc(100dvw - 20px * 2)',
    padding: '0 24px',
  },
});

const MemoDetailScheduleContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  [media[480]]: {
    gap: '24px',
  },
});

const MemoDetailScheduleTitleContainer = styled.div({
  paddingBottom: '20px',
  borderBottom: `1px solid ${theme.color.line.normal}`,

  ['>p']: {
    textAlign: 'left',
    margin: '0',
    ...theme.font.headline1.semibold,
  },
});

const MemoDetailScheduleItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const MemoDetailScheduleItemContents = styled.div(
  ({ theme }) => ({
    ['>svg']: {
      stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',

    ['>svg']: {
      width: '28px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },

    ['>p']: {
      margin: '0',
      ...theme.font.body1normal.medium,
    },
  },
);

const MemoDetailScheduleButtonContainer = styled.div({
  display: 'flex',
  gap: '8px',

  ['>button']: {
    flexGrow: '1',
  },
});

export {
  MemoDetailScheduleContainer,
  MemoDetailScheduleContents,
  MemoDetailScheduleTitleContainer,
  MemoDetailScheduleItemContainer,
  MemoDetailScheduleButtonContainer,
  MemoDetailScheduleItemContents,
};
