import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const CheckBoxSize = {
  large: '24px',
  medium: '20px',
  small: '16px',
};

type CheckboxSizes = keyof typeof CheckBoxSize;

const JuggerCheckBox = styled.label(
  ({ checkboxSize }: { checkboxSize: CheckboxSizes }) => ({
    width: CheckBoxSize[checkboxSize],
  }),
  {
    height: 'auto',
    aspectRatio: '1 / 1',
    boxSizing: 'border-box',

    ['>input[type="checkbox"]']: {
      appearance: 'none',
      width: '0',
      height: '0',
      margin: '0',
      position: 'absolute',
    },

    ['>span.checkmark']: {
      display: 'block',
      width: '100%',
      height: '100%',
      border: `1px solid ${theme.color.line.normal}`,
      boxSizing: 'border-box',
      borderRadius: theme.radius.full,

      ['>svg']: {
        display: 'none',
        width: '100%',
        height: 'auto',
        aspectRatio: '1 / 1',
        stroke: theme.color.label.inverse,
      },
    },

    ['> input[type="checkbox"]:checked + .checkmark']: {
      border: 'none',
      background: theme.color.primary.normal,

      ['>svg']: {
        display: 'block',
      },
    },
  },
);

export default JuggerCheckBox;
