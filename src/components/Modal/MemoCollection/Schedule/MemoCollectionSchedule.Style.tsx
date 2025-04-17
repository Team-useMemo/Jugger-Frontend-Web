import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const MemoCollectionScheduleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const MemoCollectionScheduleCalendarContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 24px',
  width: '100%',
  boxSizing: 'border-box',
  gap: '32px',
  borderRadius: theme.radius[16],
  boxShadow: theme.shadow.emphasize,
});

export const MemoCollectionScheduleCalendarTitle = styled.div({
  display: 'flex',
  padding: '0 62px',
  justifyContent: 'space-between',
  alignItems: 'center',

  ...theme.font.heading1.semibold,
  color: theme.color.label.normal,

  ['svg']: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    stroke: theme.color.label.alternative,
  },
});

export const MemoCollectionScheduleCalendarContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const MemoCollectionScheduleCalendarDayGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
});

export const MemoCollectionScheduleCalendarDayItem = styled.p({
  ...theme.font.caption1.regular,
  color: theme.color.label.alternative,
  margin: '0',
});

export const MemoCollectionScheduleCalendarDateGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  // rowGap: '12px',
});

export const MemoCollectionScheduleCalendarDateItem = styled.p({
  margin: '0',
  height: '42px',
  placeContent: 'center',
  position: 'relative',
  cursor: 'pointer',
});

export const MemoCollectionScheduleCalendarDateItemText = styled.div(
  ({ isCurrentMonth, isToday, isSelected }: { isCurrentMonth: boolean; isToday: boolean; isSelected: boolean }) => ({
    background: isToday ? theme.color.primary.normal : '',
    color: theme.color.label[isToday ? 'inverse' : isCurrentMonth ? 'normal' : 'assistive'],
    border: isSelected ? `2px dotted ${theme.color.primary.normal}` : '',
  }),
  {
    width: '28px',
    height: '28px',
    borderRadius: theme.radius.full,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    ...theme.font.body1normal.medium,
    placeContent: 'center',
  },
);

export const MemoCollectionScheduleCalendarDateItemContents = styled.div({
  display: 'flex',
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  marginLeft: '2px',
});

export const MemoCollectionScheduleCalendarDateItemContentsDot = styled.span(
  ({ color }: { color?: string }) => ({
    background: color ?? '',
  }),
  {
    width: '6px',
    height: '6px',
    borderRadius: theme.radius.full,
    marginLeft: '-2px',
  },
);

export const MemoCollectionScheduleItemListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const MemoCollectionScheduleItemContainer = styled.div({
  display: 'flex',
  gap: '16px',
  padding: '12px 16px',
  background: theme.color.background.alternative,
  borderRadius: theme.radius[12],
  alignItems: 'stretch',

  ['.divider']: {
    borderLeft: `1px solid ${theme.color.line.normal}`,
    boxSizing: 'border-box',
  },
});

export const MemoCollectionScheduleItemDateTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',

  ['p']: {
    color: theme.color.label.alternative,
    margin: 0,

    ['&.month']: {
      ...theme.font.label1normal.regular,
    },

    ['&.date']: {
      ...theme.font.heading1.medium,
    },
  },
});

export const MemoCollectionScheduleItemDateContents = styled.div(
  ({ color }: { color?: string }) => ({
    ['span']: {
      background: color ?? '',
    },
  }),
  {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    ...theme.font.body1normal.semibold,
    color: theme.color.label.normal,

    ['span']: {
      width: '8px',
      height: '8px',
      borderRadius: theme.radius.full,
    },
  },
);

export const MemoCollectionScheduleItemDateContentsButton = styled.div({
  flexGrow: '1',
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',

  ['svg']: {
    stroke: theme.color.label.alternative,
    width: '24px',
    height: '24px',
  },
});
