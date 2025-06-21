import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const JuggerButton = styled.button(
  ({ color, size }: { color: 'primary' | 'secondary'; size: 'small' | 'medium' | 'large' }) => ({
    ...(color == 'primary'
      ? {
          background: theme.color.primary.normal,
          color: theme.color.label.inverse,
        }
      : {
          background: theme.palette.coolneutral[98],
          color: theme.color.label.normal,
        }),
    ...(size == 'small'
      ? {
          ...theme.font.body1normal.medium,
          borderRadius: theme.radius[4],
          padding: '8px 16px',
          minWidth: '60px',
          gap: '4px',
        }
      : size == 'medium'
        ? {
            ...theme.font.headline1.medium,
            borderRadius: theme.radius[6],
            padding: '10px 16px',
            minWidth: '80px',
            gap: '6px',
          }
        : {
            ...theme.font.heading1.medium,
            borderRadius: theme.radius[8],
            padding: '12px 24px',
            minWidth: '120px',
            gap: '8px',
          }),

    ['>svg']: {
      stroke: color == 'primary' ? theme.palette.common[100] : theme.color.label.normal,
      width: size == 'small' ? '16px' : size == 'large' ? '20px' : '20px',
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',

    [':focus']: {
      outline: 'none',
    },

    ['>svg']: {
      aspectRatio: '1 / 1',
      flexShrink: '0',
    },

    [':disabled']: {
      background: theme.color.label.disable,
      color: theme.color.label.assistive,
      ['>svg']: {
        stroke: theme.color.label.assistive,
      },
      [':hover']: {
        borderColor: 'transparent',
      },
    },
  },
);

export default JuggerButton;
