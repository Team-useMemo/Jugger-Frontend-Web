import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const CalendarViewContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  outline: `2px solid ${theme.color.primary.normal}`,
  borderRadius: theme.radius[6],
  padding: '24px',
  gap: '24px',
  outlineOffset: '-2px',
});

const CalendarViewHeader = styled.div({
  display: 'flex',
  gap: '12px',

  ['p']: {
    margin: '0',
    background: theme.color.background.neutral,
    borderRadius: theme.radius[8],
    padding: '11px',
    width: '100%',
    cursor: 'pointer',

    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,
    textAlign: 'center',
  },
});

const CalendarViewTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  ...theme.font.heading1.semibold,
  color: theme.color.label.normal,

  ['svg']: {
    stroke: theme.color.primary.normal,
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },
});

const CalendarViewFooter = styled.div({
  display: 'flex',
  borderTop: `1px solid ${theme.color.line.neutral}`,
  paddingTop: '16px',
  justifyContent: 'space-between',

  ...theme.font.body1normal.semibold,
  color: theme.color.text.onView,
});

export { CalendarViewContainer, CalendarViewHeader, CalendarViewTitle, CalendarViewFooter };
