import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const RadioButtonSize = {
  large: '24px',
  medium: '20px',
  small: '16px',
};

type ButtonSizes = keyof typeof RadioButtonSize;

const JuggerRadioButton = styled.input(
  ({ radioSize }: { radioSize: ButtonSizes }) => ({
    width: RadioButtonSize[radioSize],
  }),
  {
    height: 'auto',
    aspectRatio: '1 / 1',
    background: 'none',
    accentColor: theme.color.primary.normal,
    colorScheme: 'none',
    margin: '0',
  },
);

export default JuggerRadioButton;
