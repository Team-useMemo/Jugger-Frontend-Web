import { theme } from '@styles/theme';
import styled from '@emotion/styled';

export const MemoScheduleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.blue[95],
  cursor: 'pointer',
});

export const MemoScheduleContents = styled.div({
  ...theme.font.body2normal.medium,
  color: theme.color.label.normal,
  margin: '0',
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  ['svg']: {
    fill: theme.color.label.normal,
    width: '16px',
    height: '16px',
  },
});

export const MemoMainText = styled.p({
  ...theme.font.body2normal.medium,
  color: theme.color.label.inverse,
  margin: '0',
  whiteSpace: 'pre-wrap',
  padding: '8px 16px',
  background: theme.color.primary.normal,
  textAlign: 'start',
});
