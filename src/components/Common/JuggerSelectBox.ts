import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const JuggerSelectBox = styled.div(
  ({ theme }) => ({
    ['>label']: {
      background: theme.color.background[theme.mode === 'light' ? 'normal' : 'inverse'],

      ['>svg']: {
        stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
      },
    },
    ['>ul']: {
      background: theme.color.background[theme.mode === 'light' ? 'normal' : 'inverse'],

      ['>li']: {
        '&:not(:first-of-type)': {
          borderTop: `1px solid ${theme.color.line[theme.mode === 'light' ? 'normal' : 'neutral']}`,
        },

        [':hover']: {
          background: theme.color.background[theme.mode === 'light' ? 'alternative' : 'alternativeinverse'],
        },
      },
    },
  }),
  {
    position: 'relative',

    ['>label']: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 14px',
      borderRadius: theme.radius[4],
      cursor: 'pointer',
      border: `1.5px solid ${theme.color.line.normal}`,

      ...theme.font.body1normal.medium,

      ['>svg']: {
        width: '16px',
        height: 'auto',
        aspectRatio: '1 / 1',
      },

      [':focus']: {
        borderColor: theme.color.primary.normal,
        ['>svg']: {
          transform: 'rotate(180deg);',
        },

        ['+ul']: {
          display: 'block',
          borderColor: theme.color.primary.normal,
        },
      },
    },

    ['>ul']: {
      display: 'none',
      position: 'absolute',
      top: '100%',
      left: '0',
      listStyle: 'none',
      padding: '0',
      margin: '8px 0 0',
      width: '100%',
      zIndex: '1',
      border: `1.5px solid ${theme.color.line.normal}`,
      borderRadius: theme.radius[4],

      ['>li']: {
        padding: '12px 14px',
        ...theme.font.body1normal.medium,
        cursor: 'pointer',
      },
    },
  },
);

export default JuggerSelectBox;
