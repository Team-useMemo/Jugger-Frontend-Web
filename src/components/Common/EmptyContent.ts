import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const EmptyContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '72px',

  ...theme.font.body1normal.semibold,

  ['>span']: {
    ...theme.font.label1normal.medium,
    color: theme.color.label.assistive,
  },

  [media[480]]: {
    marginTop: '120px',
  },
});

export default EmptyContent;
