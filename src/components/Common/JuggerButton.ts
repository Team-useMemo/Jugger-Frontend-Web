import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const buttonSizeStyles = {
  large: {
    ...theme.font.heading1.medium,
    borderRadius: theme.radius[8],
    padding: '0px 20px',
    minWidth: '140px',
    height: '56px',
    gap: '4px',
    svgSize: '25px',
  },
  medium: {
    ...theme.font.headline1.medium,
    borderRadius: theme.radius[6],
    padding: '0px 16px',
    minWidth: '126px',
    height: '48px',
    gap: '4px',
    svgSize: '25px',
  },
  small: {
    ...theme.font.body1normal.medium,
    borderRadius: theme.radius[4],
    padding: '0px 16px',
    minWidth: '114px',
    height: '44px',
    gap: '4px',
    svgSize: '21.33px',
  },
  xsmall: {
    ...theme.font.body2normal.medium,
    borderRadius: theme.radius[4],
    padding: '0px 16px',
    minWidth: '80px',
    height: '40px',
    gap: '4px',
    svgSize: '21.33px',
  },
};

const buttonColorStyles = {
  primary: {
    color: theme.palette.common[100],
    backgroundColor: theme.color.primary.normal,
  },
  secondary: {
    color: theme.color.label.normal,
    backgroundColor: theme.palette.coolneutral[98],
  },
  error: {
    color: theme.palette.common[100],
    backgroundColor: theme.color.status.error,
  },
};

type ButtonSizes = keyof typeof buttonSizeStyles;
type ButtonColors = keyof typeof buttonColorStyles;

const JuggerButton = styled.button(
  ({ theme, color, size }: { theme?: any; color: ButtonColors; size: ButtonSizes }) => ({
    // ...buttonColorStyles[color],
    ...(color == 'secondary' && theme.mode === 'dark'
      ? {
          background: theme.palette.coolneutral[40],
        }
      : buttonColorStyles[color]),
    ...buttonSizeStyles[size],

    ['>svg']: {
      stroke: buttonColorStyles[color].color,
      width: buttonSizeStyles[size].svgSize,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    minWidth: '0',

    [':focus']: {
      outline: 'none',
    },

    ['>svg']: {
      height: 'auto',
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
