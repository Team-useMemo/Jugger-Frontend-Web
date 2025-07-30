import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const JuggerSelectBox = styled.div({
  position: 'relative',

  ['>label']: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px',
    background: theme.color.background.normal,
    border: `1.5px solid ${theme.color.line.normal}`,
    borderRadius: theme.radius[4],
    cursor: 'pointer',

    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,

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
    background: theme.color.background.normal,
    border: `1.5px solid ${theme.color.line.normal}`,
    borderRadius: theme.radius[4],

    ['>li']: {
      padding: '12px 14px',
      ...theme.font.body1normal.medium,
      cursor: 'pointer',

      '&:not(:first-of-type)': {
        borderTop: `1px solid ${theme.color.line.normal}`,
      },

      [':hover']: {
        background: theme.color.background.alternative,
      },
    },
  },
});

export default JuggerSelectBox;
