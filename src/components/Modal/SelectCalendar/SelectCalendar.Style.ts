import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const SelectCalendarContainer = styled.div({
  background: theme.color.background.normal,
  borderRadius: theme.radius[12],
  boxShadow: theme.shadow.strong,
  padding: '32px',
  gap: '12px',
  display: 'flex',
  flexDirection: 'column',
});

export const SelectCalendarTitle = styled.div({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',

  ...theme.font.heading1.semibold,
  color: theme.color.label.normal,

  cursor: 'pointer',

  ['svg']: {
    stroke: theme.color.primary.normal,
    width: '24px',
    height: '24px',
  },
});

// SelectCalendarDate

export const SelectCalendarDateGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
});

export const SelectCalendarDayItem = styled.p({
  ...theme.font.caption1.regular,
  color: theme.color.label.assistive,
  margin: '0',
  textAlign: 'center',
});

export const SelectCalendarDateItem = styled.p(
  ({ color, selected }: { color: keyof typeof theme.color.label; selected: boolean }) => ({
    color: theme.color.label[color],
    background: selected ? theme.color.primary.normal : '',
  }),
  {
    ...theme.font.body1normal.medium,
    margin: '0',
    width: '40px',
    height: '40px',
    placeContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.full,
    cursor: 'pointer',
  },
);

// SelectCalendarMonth

export const SelectCalendarMonthContent = styled.div({
  display: 'flex',
  position: 'relative',
  height: '200px',
});

export const SelectCalendarMonthFocus = styled.div({
  position: 'absolute',
  padding: '24px',
  background: theme.color.background.neutral,
  width: '100%',
  boxSizing: 'border-box',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: theme.radius[16],
});

export const SelectCalendarMonthFlexContainer = styled.div({
  position: 'absolute',
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
});

export const SelectCalendarMonthScrollContainer = styled.div({
  overflow: 'auto',
  width: '50%',
  height: '100%',
  alignItems: 'center',
  scrollSnapType: 'y mandatory',
  boxSizing: 'border-box',

  ['::-webkit-scrollbar']: {
    display: 'none',
  },

  ['>div']: {
    height: '50%',
  },
});

export const SelectCalendarMonthScrollItem = styled.p(
  ({ height, isFocused }: { height: number; isFocused: boolean }) => ({
    height: `${height}px`,
    color: theme.color.label[isFocused ? 'normal' : 'assistive'],
  }),
  {
    ...theme.font.heading1.semibold,
    margin: 0,
    scrollSnapAlign: 'center',
    textAlign: 'center',
    placeContent: 'center',
    transition: 'all 0.2s',
  },
);
