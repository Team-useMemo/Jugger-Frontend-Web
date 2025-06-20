import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoCollectionScheduleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const MemoCollectionScheduleCalendarContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 24px',
  gap: '32px',
  boxShadow: theme.shadow.emphasize,
  borderRadius: theme.radius[16],
});

const MemoCollectionScheduleCalendarHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-evenly',

  ['>p']: {
    ...theme.font.heading1.semibold,
    color: theme.color.label.normal,
    margin: '0',
    width: '180px',
  },

  ['>svg']: {
    stroke: theme.color.label.alternative,
    width: '24px',
    height: 'auto',
    cursor: 'pointer',
  },

  [media[480]]: {
    justifyContent: 'center',
  },
});

const MemoCollectionScheduleCalendarContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const MemoCollectionScheduleCalendarContentsHeader = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  columnGap: '4px',
  rowGap: '4px',

  [media[480]]: {
    columnGap: '0',
  },
});

const MemoCollectionScheduleCalendarContentsHeaderItem = styled.p({
  ...theme.font.caption1.regular,
  color: theme.color.label.alternative,
  margin: '0',
  textAlign: 'center',
});

const MemoCollectionScheduleCalendarContentsBody = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  columnGap: '4px',
  rowGap: '16px',

  [media[480]]: {
    columnGap: '0',
    rowGap: '12px',
  },
});

const MemoCollectionScheduleCalendarContentsBodyItem = styled.div(
  ({ color, selected, today }: { color: keyof typeof theme.color.label; selected: boolean; today: boolean }) => ({
    ['>p']: {
      color: theme.color.label[color],
      background: selected ? theme.color.primary.normal : '',
      border: today ? `2px dotted ${theme.color.primary.normal}` : '',
    },
  }),
  {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    ['>p']: {
      ...theme.font.body1normal.medium,
      margin: '0',
      padding: '4px',

      height: '32px',
      aspectRatio: '1 / 1',
      boxSizing: 'border-box',
      borderRadius: theme.radius[48],
    },
  },
);

const MemoCollectionScheduleCalendarContentsBodyItemSubContainer = styled.div({
  display: 'flex',
  position: 'absolute',
  top: '100%',
  padding: '3px',
});

const MemoCollectionScheduleCalendarContentsBodyItemSubItem = styled.span(
  ({ color }: { color?: string }) => ({
    background: color,
  }),
  {
    width: '6px',
    aspectRatio: '1 / 1',
    borderRadius: theme.radius.full,
    marginLeft: '-1.5px',

    [':first-of-type']: {
      marginLeft: '0',
    },
  },
);

const MemoCollectionScheduleListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const MemoCollectionScheduleListItemContainer = styled.div({
  display: 'flex',
  padding: '12px 16px',
  background: theme.color.background.alternative,
  borderRadius: theme.radius[12],
  gap: '16px',

  ['.divider']: {
    borderRight: `1px solid ${theme.color.line.normal}`,
  },

  ['.grow']: {
    flexGrow: '1',
  },

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    stroke: theme.color.label.alternative,
    flexShrink: '0',
  },
});

const MemoCollectionScheduleListItemDate = styled.div({
  display: 'flex',
  flexDirection: 'column',

  ...theme.font.heading1.medium,
  color: theme.color.label.alternative,

  ['>span']: {
    ...theme.font.label1normal.regular,
  },
});

const MemoCollectionScheduleListItemTitle = styled.div(
  ({ color }: { color?: string }) => ({
    ['::before']: {
      background: color,
    },
  }),
  {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    overflow: 'hidden',

    ['>p']: {
      ...theme.font.body1normal.semibold,
      color: theme.color.label.normal,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },

    ['::before']: {
      content: '""',
      width: '8px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
      flexShrink: '0',
    },
  },
);

export {
  MemoCollectionScheduleContainer,
  MemoCollectionScheduleCalendarContainer,
  MemoCollectionScheduleCalendarHeader,
  MemoCollectionScheduleCalendarContents,
  MemoCollectionScheduleCalendarContentsHeader,
  MemoCollectionScheduleCalendarContentsHeaderItem,
  MemoCollectionScheduleCalendarContentsBody,
  MemoCollectionScheduleCalendarContentsBodyItem,
  MemoCollectionScheduleCalendarContentsBodyItemSubContainer,
  MemoCollectionScheduleCalendarContentsBodyItemSubItem,
  MemoCollectionScheduleListContainer,
  MemoCollectionScheduleListItemContainer,
  MemoCollectionScheduleListItemDate,
  MemoCollectionScheduleListItemTitle,
};
