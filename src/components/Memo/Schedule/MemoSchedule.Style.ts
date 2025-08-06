import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const MemoScheduleContainer = styled.div(
  ({ theme }) => ({
    background: theme.mode === 'light' ? theme.palette.blue[95] : theme.color.background.alternativeinverse,
  }),
  {
    borderRadius: theme.radius[12],
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
);

export const MemoScheduleContents = styled.div(
  ({ theme }) => ({
    ['>svg']: {
      fill: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    ...theme.font.body2normal.medium,

    margin: '0',
    padding: '12px 16px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',

    ['>svg']: {
      width: '16px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
);

export const MemoMainText = styled.p({
  ...theme.font.body2normal.medium,
  color: theme.color.label.inverse,
  margin: '0',
  whiteSpace: 'pre-wrap',
  padding: '8px 16px',
  background: theme.color.primary.normal,
  textAlign: 'start',
});
