import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const CalendarViewDayPickerContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const CalendarViewDayPickerGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  columnGap: '8px',
  rowGap: '8px',
});

const CalendarViewDayPickerDayItem = styled.p({
  ...theme.font.caption1.regular,
  color: theme.color.label.assistive,
  margin: '0',
  textAlign: 'center',
});

const CalendarViewDayPickerDateItem = styled.p(
  ({
    theme,
    color,
    selected,
    today,
  }: {
    theme?: any;
    color: keyof typeof theme.color.label;
    selected: boolean;
    today: boolean;
  }) => ({
    color: theme.color.label[color == 'normal' ? (theme.mode === 'light' ? 'normal' : 'inverse') : color],
    background: selected ? theme.color.primary.normal : '',
    border: today ? `2px dotted ${theme.color.primary.normal}` : '',
  }),
  {
    ...theme.font.body1normal.medium,
    margin: '0',
    aspectRatio: '1 / 1',
    placeContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.full,
    cursor: 'pointer',
  },
);

export {
  CalendarViewDayPickerContainer,
  CalendarViewDayPickerGrid,
  CalendarViewDayPickerDayItem,
  CalendarViewDayPickerDateItem,
};
