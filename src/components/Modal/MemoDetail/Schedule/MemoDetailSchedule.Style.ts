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

  [media[480]]: {
    width: 'calc(100dvw - 20px * 2)',
    padding: '0 24px',
  },
});

const MemoDetailScheduleContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

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
  color: theme.color.text.onView,

  ['>p']: {
    padding: '11px 14px',
    borderRadius: theme.radius[4],
    margin: '0',
    background: theme.color.background.alternative,

    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,
  },
});

export { MemoDetailScheduleContainer, MemoDetailScheduleContents, MemoDetailScheduleItemContainer };
