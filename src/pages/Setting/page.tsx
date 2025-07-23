import styled from '@emotion/styled';
import { useThemeContext } from '@providers/ThemeContext';
import { setModalOpen } from '@stores/modules/modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetLocalStorageItem, SetLocalStorageItem } from '@ts/LocalStorage';
import { Logout } from '@utils/Auth';
import { ModalName } from '@utils/Modal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import { webPath } from '@router/index';
import JuggerButton from '@components/Common/JuggerButton';
import JuggerSwitch from '@components/Common/JuggerSwitch';
import { media, theme } from '@styles/theme';
import GoogleSVG from '@assets/Login/google.svg?react';
import KakaoSVG from '@assets/Login/kakao.svg?react';
import CheckCircleSVG from '@assets/icons/check_circle.svg?react';
import CrossCircleSVG from '@assets/icons/cross_circle.svg?react';
import DownArrowSVG from '@assets/icons/down_arrow.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';

const SettingContentInner = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
  maxWidth: '1440px',
  width: '100%',

  ['>.divider']: {
    height: '1px',
    background: theme.color.line.normal,
  },

  [media[480]]: {
    gap: '36px',
  },
});

const SettingSectionGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',

  [media[480]]: {
    gap: '28px',
  },
});

const SettingRow = styled.div(
  ({ flexDirection }: { flexDirection: 'column' | 'column-reverse' | 'row' | 'row-reverse' }) => ({
    flexDirection: flexDirection,
  }),
  {
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',

    ...theme.font.headline1.semibold,
    color: theme.color.label.normal,
    textAlign: 'left',

    ['>svg']: {
      stroke: theme.color.label.normal,
      width: '28px',
      height: 'auto',
      aspectRatio: '1 / 1',
      cursor: 'pointer',
    },

    ['>span']: {
      ...theme.font.body1normal.medium,
    },

    [media[480]]: {
      ...theme.font.body1normal.semibold,

      ['>svg']: {
        width: '24px',
      },
    },
  },
);

const AccountInfoBox = styled.div({
  display: 'flex',
  background: theme.color.background.alternative,
  padding: '16px',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: theme.radius[12],

  [media[480]]: {
    padding: '12px',
    borderRadius: theme.radius[4],
  },
});

const AccountProfile = styled.div(
  ({ color }: { color: string }) => ({
    ['>svg']: {
      background: color,
    },
  }),
  {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',

    ...theme.font.body1normal.semibold,
    color: theme.color.label.normal,

    ['>svg']: {
      width: '36px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius[6],
      padding: '4px',
      boxSizing: 'border-box',
    },

    [media[480]]: {
      ...theme.font.body2normal.semibold,
      gap: '12px',
    },
  },
);

const ThemeDropdownWrapper = styled.div({
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
        // borderColor: theme.color.primary.normal,
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

const ToastWrapper = styled.div(
  ({ toastShow }: { toastShow: boolean }) => ({
    opacity: toastShow ? 1 : 0,
  }),
  {
    position: 'absolute',
    bottom: '0',
    marginBottom: '36px',
    transition: 'opacity 0.5s ease-in-out',
    left: '50%',
    transform: 'translateX(-50%)',
  },
);

const ToastContent = styled.div(
  ({ isSuccess }: { isSuccess: boolean }) => ({
    ['>svg']: {
      fill: theme.color.status[isSuccess ? 'success' : 'error'],
    },
  }),
  {
    display: 'flex',
    gap: '8px',
    padding: '12px 16px',
    background: theme.color.label.normal,
    borderRadius: theme.radius[4],

    ...theme.font.body2reading.medium,
    color: theme.color.label.inverse,

    ['>svg']: {
      width: '16px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
);

// const Tmp = styled.div(({ theme }) => ({
//   background:
//     theme.mode === 'dark' ? theme.color.status.success : theme.mode === 'light' ? theme.color.status.error : 'white',
// }));

type AppThemeKey = 'light' | 'dark' | 'system';

const AppTheme: Record<AppThemeKey, { name: AppThemeKey; text: string }> = {
  light: {
    name: 'light',
    text: '라이트 모드',
  },
  dark: {
    name: 'dark',
    text: '다크 모드',
  },
  system: {
    name: 'system',
    text: '시스템 설정',
  },
};

const Providers: Record<'kakao' | 'google', { svg: React.ReactNode; color: string }> = {
  kakao: {
    svg: <KakaoSVG />,
    color: '#ffe617',
  },
  google: {
    svg: <GoogleSVG />,
    color: '#ffffff',
  },
};

const SettingPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { userTheme, setUserTheme } = useThemeContext();
  const [toastContents, setToastContents] = useState<React.JSX.Element | null>(null);
  const [toastMount, setToastMount] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  const [notification, setNotification] = useState(GetLocalStorageItem('notification') === 'true');

  const provider = Providers[GetLocalStorageItem('provider') as 'kakao' | 'google'];
  const email = GetLocalStorageItem('email');

  const handleClickSelectTheme = (e: React.MouseEvent<HTMLLabelElement>) => {
    const el = e.currentTarget;
    if (document.activeElement === el) {
      e.preventDefault();
      el.blur();
    }
  };

  const handleClickSelectThemeItem = (theme: AppThemeKey) => () => {
    SetLocalStorageItem('theme', theme);
    setUserTheme(theme);
  };

  const handleChangeNotification = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotification(e.target.checked);
    SetLocalStorageItem('notification', e.target.checked);
  };

  const handleClickNotice = () => {
    navigate(webPath.notice());
  };

  const handleClickShareService = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setToastMount(true);
      setToastShow(true);
      setToastContents(
        <ToastContent isSuccess={true}>
          <CheckCircleSVG />
          공유 링크를 복사했어요
        </ToastContent>,
      );
    } catch (err) {
      setToastMount(true);
      setToastShow(true);
      setToastContents(
        <ToastContent isSuccess={false}>
          <CrossCircleSVG />
          공유 링크 복사에 실패했어요
        </ToastContent>,
      );
      console.error(err);
    }
  };

  const dispatch = useAppDispatch();

  const handleClickWithdraw = () => {
    dispatch(setModalOpen({ name: ModalName.withdrawUser }));
  };

  useEffect(() => {
    if (!toastMount) return;

    const fadeOut = setTimeout(() => setToastShow(false), 2500);
    const remove = setTimeout(() => setToastMount(false), 3000);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(remove);
    };
  }, [toastMount]);

  return (
    <SettingContentInner>
      {toastMount && <ToastWrapper toastShow={toastShow}>{toastContents}</ToastWrapper>}
      <SettingSectionGroup>
        <SettingRow flexDirection="column">
          계정 정보
          <AccountInfoBox>
            {provider ? (
              <AccountProfile color={provider.color}>
                {provider.svg}
                {email ?? '계정 정보를 불러오는데 실패했어요'}
              </AccountProfile>
            ) : (
              '계정 정보를 불러오는데 실패했어요'
            )}
            {!isMobile && (
              <JuggerButton color="primary" size="xsmall" onClick={Logout}>
                로그아웃
              </JuggerButton>
            )}
          </AccountInfoBox>
        </SettingRow>
        <SettingRow flexDirection="column">
          테마 설정
          <ThemeDropdownWrapper>
            <label tabIndex={-1} onMouseDown={handleClickSelectTheme}>
              {AppTheme[userTheme].text}
              <DownArrowSVG />
            </label>
            <ul>
              {Object.entries(AppTheme).map(([key, value]) => (
                <li key={`theme_${key}`} onMouseDown={handleClickSelectThemeItem(value.name)}>
                  {value.text}
                </li>
              ))}
            </ul>
          </ThemeDropdownWrapper>
        </SettingRow>
        <SettingRow flexDirection="row">
          알림 설정
          <JuggerSwitch toggleSize="20px" type="checkbox" checked={notification} onChange={handleChangeNotification} />
        </SettingRow>
      </SettingSectionGroup>
      <span className="divider" />
      <SettingRow flexDirection="row" onClick={handleClickNotice}>
        공지사항
        <RightArrowSVG />
      </SettingRow>
      <span className="divider" />
      <SettingSectionGroup>
        <SettingRow flexDirection="row" onClick={handleClickShareService}>
          서비스 공유하기
        </SettingRow>
        <SettingRow flexDirection="row">
          서비스 버전
          <span>1.0.1</span>
        </SettingRow>
        {isMobile && (
          <SettingRow flexDirection="row" onClick={Logout}>
            로그아웃
            <RightArrowSVG />
          </SettingRow>
        )}
        <SettingRow flexDirection="row" onClick={handleClickWithdraw}>
          회원 탈퇴
          <RightArrowSVG />
        </SettingRow>
      </SettingSectionGroup>
    </SettingContentInner>
  );
};

export default SettingPage;
