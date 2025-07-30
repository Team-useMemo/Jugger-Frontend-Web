import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const RadioButtonSize = {
  large: '24px',
  medium: '20px',
  small: '16px',
};

type ButtonSizes = keyof typeof RadioButtonSize;

const JuggerRadioButton = styled.input(
  ({ theme }) => ({
    backgroundColor: theme.mode === 'light' ? theme.color.background.normal : theme.color.label.neutral,
    border: `1px solid ${theme.color.label[theme.mode === 'light' ? 'assistive' : 'alternative']}`,
  }),
  ({ radioSize }: { radioSize: ButtonSizes }) => ({
    width: RadioButtonSize[radioSize],
  }),
  {
    appearance: 'none',
    boxSizing: 'border-box',
    borderRadius: theme.radius.full,
    height: 'auto',
    aspectRatio: '1 / 1',
    margin: '0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    [':checked']: {
      border: `1.5px solid ${theme.color.primary.normal}`,
      ['::after']: {
        position: 'absolute',
        content: '""',
        width: '60%',
        background: theme.color.primary.normal,
        height: 'auto',
        aspectRatio: '1 / 1',
        borderRadius: theme.radius.full,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%);',
      },
    },
  },
);

export default JuggerRadioButton;
