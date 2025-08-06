import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const CalendarViewContainer = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'normal' : 'inverse'],
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    // outline: `2px solid ${theme.color.primary.normal}`,
    borderRadius: theme.radius[12],
    padding: '24px 32px',
    gap: '24px',
    outlineOffset: '-2px',
    position: 'absolute',
    top: 'calc(100% + 14px)',
    left: '0',
    width: '100%',
    boxSizing: 'border-box',
    zIndex: '1',
    boxShadow: theme.shadow.strong,

    [media[480]]: {
      padding: '24px 20px',
      gap: '16px',
    },
  },
);

const CalendarViewHeader = styled.div(
  ({ theme }) => ({
    ['>p']: {
      background: theme.color.background[theme.mode === 'light' ? 'neutral' : 'alternativeinverse'],
      color: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    display: 'flex',
    gap: '12px',

    ['>p']: {
      margin: '0',
      borderRadius: theme.radius[8],
      padding: '11px',
      width: '100%',
      cursor: 'pointer',

      ...theme.font.body1normal.medium,
      textAlign: 'center',
    },
  },
);

const CalendarViewTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  ...theme.font.heading1.semibold,

  ['>svg']: {
    stroke: theme.color.primary.normal,
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },

  [media[480]]: {
    ...theme.font.headline1.semibold,
    gap: '0px',
  },
});

const CalendarViewFooter = styled.div({
  display: 'flex',
  borderTop: `1px solid ${theme.color.line.neutral}`,
  paddingTop: '16px',
  justifyContent: 'space-between',

  ...theme.font.body1normal.semibold,
});

export { CalendarViewContainer, CalendarViewHeader, CalendarViewTitle, CalendarViewFooter };
