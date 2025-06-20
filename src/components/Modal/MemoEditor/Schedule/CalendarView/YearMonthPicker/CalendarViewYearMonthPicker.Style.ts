import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const CalendarViewYearMonthPickerContainer = styled.div({
  display: 'flex',
  position: 'relative',
  height: '200px',
});

const CalendarViewYearMonthPickerFocus = styled.div({
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

const CalendarViewYearMonthPickerContents = styled.div({
  position: 'absolute',
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
});

const CalendarViewYearMonthPickerScroll = styled.div({
  overflow: 'auto',
  width: '50%',
  height: '100%',
  alignItems: 'center',
  scrollSnapType: 'y mandatory',
  boxSizing: 'border-box',

  ['::-webkit-scrollbar']: {
    display: 'none',
  },

  ['::after, ::before']: {
    content: '""',
    display: 'block',
    height: '50%',
  },
});

const CalendarViewYearMonthPickerScrollItem = styled.p(
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

export {
  CalendarViewYearMonthPickerContainer,
  CalendarViewYearMonthPickerFocus,
  CalendarViewYearMonthPickerContents,
  CalendarViewYearMonthPickerScroll,
  CalendarViewYearMonthPickerScrollItem,
};
