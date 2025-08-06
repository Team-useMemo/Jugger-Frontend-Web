import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const SideMessageContainer = styled.div(
  ({ theme }) => ({
    background: theme.mode === 'light' ? theme.color.background.alternative : theme.color.label.neutral,
  }),
  {
    position: 'relative',
    userSelect: 'none',
  },
);

const SideMessagePinContainer = styled.div(
  ({ theme, isPinned }: { theme?: any; isPinned: boolean }) => ({
    ['>svg']: {
      stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
      fill: isPinned ? theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'] : '',
    },
  }),
  {
    position: 'absolute',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '72px',

    ['>svg']: {
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
);

const SideMessageContents = styled.div(
  ({ theme, showPinIcon, isFocused }: { theme?: any; showPinIcon: boolean; isFocused: boolean }) => ({
    transform: showPinIcon ? 'translateX(72px)' : 'translateX(0)',
    background: isFocused
      ? theme.mode === 'light'
        ? theme.palette.blue[99]
        : theme.palette.coolneutral[22]
      : theme.color.background[theme.mode === 'light' ? 'normal' : 'inverse'],
    [media[480]]: {
      background: isFocused
        ? theme.mode === 'light'
          ? theme.palette.blue[99]
          : theme.palette.coolneutral[22]
        : theme.color.background[theme.mode === 'light' ? 'normal' : 'alternativeinverse'],
    },

    [':hover']: {
      background: theme.mode === 'light' ? theme.palette.blue[99] : theme.palette.coolneutral[22],
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',

    transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

    position: 'relative',
    padding: '16px 20px',
    gap: '6px',
    cursor: 'pointer',
  },
);

const SideMessageHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  gap: '12px',
});

const SideMessageHeaderTitle = styled.div(
  ({ theme }) => ({
    ['>svg']: {
      stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
      fill: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  ({ categoryColor }: { categoryColor: string }) => ({
    ['::before']: {
      background: categoryColor,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    width: '100%',
    minWidth: '0',

    ['>p']: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textAlign: 'left',
      margin: '0',
      ...theme.font.body2normal.semibold,
    },

    ['>svg']: {
      width: '16px',
      height: 'auto',
      aspectRatio: '1 / 1',
      strokeWidth: '2',
      flexShrink: '0',
    },

    ['::before']: {
      content: '""',
      width: '8px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
      flexShrink: '0',
    },

    [media[480]]: {
      ['>p']: {
        ...theme.font.label1normal.semibold,
      },
    },
  },
);

const SideMessageHeaderDate = styled.p({
  ...theme.font.label1normal.medium,
  color: theme.color.label.assistive,
  margin: '0',
  whiteSpace: 'nowrap',

  [media[480]]: {
    ...theme.font.caption1.medium,
  },
});

const SideMessageRecentMessage = styled.p(
  ({ theme }) => ({
    color: theme.color.label[theme.mode === 'light' ? 'neutral' : 'assistive'],
  }),
  {
    whiteSpace: 'wrap',
    WebkitLineClamp: '2',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textAlign: 'left',
    margin: '0',
    wordBreak: 'break-all',

    ...theme.font.label1normal.semibold,
  },
);

export {
  SideMessageContainer,
  SideMessagePinContainer,
  SideMessageContents,
  SideMessageHeader,
  SideMessageHeaderTitle,
  SideMessageHeaderDate,
  SideMessageRecentMessage,
};
