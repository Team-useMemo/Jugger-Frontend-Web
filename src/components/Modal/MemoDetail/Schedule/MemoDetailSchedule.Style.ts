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
  gap: '28px',

  [media[480]]: {
    gap: '24px',
  },
});

const MemoDetailScheduleItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  textAlign: 'left',

  ...theme.font.body1normal.semibold,
  color: theme.color.label.normal,

  ['>p']: {
    padding: '8px 0',
    margin: '0',

    borderBottom: `1.5px solid ${theme.color.line.neutral}`,

    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,
  },
});

export { MemoDetailScheduleContainer, MemoDetailScheduleContents, MemoDetailScheduleItemContainer };
