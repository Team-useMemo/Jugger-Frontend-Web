import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const ViewerScheduleMemoContainer = styled.div(
  ({ isDetail }: { isDetail?: boolean }) =>
    !isDetail && {
      marginTop: '36px',
    },
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
    width: '100%',

    [media[480]]: {
      height: '100%',
    },
  },
);

const ViewerScheduleMemoItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

  [media[480]]: {
    flexGrow: '1',
    overflow: 'auto',
  },
});

const ViewerScheduleMemoItemContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const ViewerScheduleMemoItemTitle = styled.p({
  ...theme.font.body1normal.semibold,
  color: theme.color.text.onView,
  margin: '0',
  textAlign: 'left',
});

const ViewerScheduleMemoItemInput = styled.label({
  background: theme.color.background.alternative,
  borderRadius: theme.radius[4],
  padding: '11px 14px',
  display: 'flex',
  alignItems: 'center',
  height: '32px',

  ['input']: {
    flexGrow: '1',
    background: 'transparent',
    border: 'none',
    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,

    [':focus']: {
      outline: 'none',
    },

    ['::placeholder']: {
      color: theme.color.label.alternative,
    },

    ['&[readonly]']: {
      cursor: 'pointer',
    },
  },

  [':has(input:focus)']: {
    outline: `1.5px solid ${theme.color.primary.normal}`,
  },

  [':has(input[readonly])']: {
    cursor: 'pointer',
  },

  ['svg']: {
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    flexShrink: '0',
  },
});

export {
  ViewerScheduleMemoContainer,
  ViewerScheduleMemoItemTitle,
  ViewerScheduleMemoItemContainer,
  ViewerScheduleMemoItemContents,
  ViewerScheduleMemoItemInput,
};
