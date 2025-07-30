import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const LoginPageLayout = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100dvh',
  padding: '0 32px',
});

const LoginPageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '44px',
  width: '100%',
});

const LoginPageTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  ...theme.font.body2normal.medium,
  color: theme.color.label.neutral,

  ['>img']: {
    width: '210px',
  },
});

const LoginPageSocialLoginContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  maxWidth: '320px',
  boxSizing: 'border-box',
});

const LoginPageSocialLoginTitle = styled.div({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',

  ...theme.font.body2normal.medium,
  color: theme.color.label.alternative,

  ['::before,::after']: {
    content: '""',
    flexGrow: '1',
    borderBottom: `1px solid ${theme.color.line.normal}`,
  },
});

const LoginPageSocialLoginButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const LoginPageSocialLoginButton = styled.button(
  ({ textColor, bgColor, borderColor }: { textColor: string; bgColor: string; borderColor: string }) => ({
    color: textColor,
    background: bgColor,
    borderColor: borderColor,
  }),
  {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    padding: '16px',
    borderRadius: theme.radius[6],

    ...theme.font.body1normal.medium,

    position: 'relative',

    ['>svg']: {
      width: '24px',
      height: 'auto',
    },

    [':hover']: {
      opacity: '0.9',
    },

    [':focus']: {
      outline: 'none',
    },
  },
);

const LoginPageRecentSocialLoginBadge = styled.span({
  position: 'absolute',
  top: '-16px',
  left: '32px',
  background: theme.color.label.normal,

  ...theme.font.label1reading.medium,
  color: theme.color.label.inverse,
  borderRadius: theme.radius[32],
  padding: '4px 16px',
  zIndex: '1',

  ['&::after']: {
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: '0',
    height: '0',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '8px solid black',
  },
});

export {
  LoginPageLayout,
  LoginPageContainer,
  LoginPageTitleContainer,
  LoginPageSocialLoginContainer,
  LoginPageSocialLoginTitle,
  LoginPageSocialLoginButtonContainer,
  LoginPageSocialLoginButton,
  LoginPageRecentSocialLoginBadge,
};
