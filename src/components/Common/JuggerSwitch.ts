import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const JuggerSwitch = styled.input(
  ({ toggleSize }: { toggleSize: string }) => ({
    height: toggleSize,
    aspectRatio: '2 / 1',

    ['::before']: {
      width: '20px',
    },
  }),
  {
    boxSizing: 'content-box',
    position: 'relative',
    padding: '2px',
    margin: '0',
    appearance: 'none',
    borderRadius: '32px',
    background: theme.color.primary.normal,
    transition: 'all .1s linear',
    outline: 'none',
    cursor: 'pointer',

    ['::before']: {
      content: '""',
      position: 'absolute',
      aspectRatio: '1 / 1',
      background: theme.color.background.normal,
      left: '50%',
      borderRadius: '24px',
      transform: 'translate(-0%, 0%)',
      transition: 'all .1s linear',
      boxShadow: theme.shadow.normal,
    },
    [':checked']: {
      background: theme.color.label.disable,

      ['::before']: {
        transform: 'translate(-100%, 0%)',
      },
    },
  },
);

export default JuggerSwitch;
