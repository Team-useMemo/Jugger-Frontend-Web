import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const MemoViewerScheduleContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  padding: '0 32px',
  width: '450px',
  boxSizing: 'border-box',
  textAlign: 'left',
});

export const MemoViewerScheduleItemListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const MemoViewerScheduleItemContainer = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ...theme.font.body1normal.semibold,
  color: theme.color.label.normal,
  margin: 0,
});

export const MemoViewerScheduleItemContent = styled.div(
  ({ active }: { active?: boolean }) => ({
    cursor: active ? 'pointer' : 'auto',
    ['>p,>input']: {
      cursor: active ? 'pointer' : 'auto',
    },
  }),
  {
    boxSizing: 'border-box',
    background: theme.color.background.alternative,
    padding: '11px 14px',
    borderRadius: theme.radius[4],
    display: 'flex',
    alignItems: 'center',

    ['>p,>input']: {
      ...theme.font.body1normal.medium,
      color: theme.color.label['normal'],
      margin: '0',
      background: 'none',
      outline: 'none',
      border: 'none',
      width: '100%',

      ['::placeholder']: {
        color: theme.color.label.assistive,
      },
    },
  },
);
