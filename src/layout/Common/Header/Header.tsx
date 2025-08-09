import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@hooks/useWindowSize';
import { webPath } from '@router/index';
import { media, theme } from '@styles/theme';
import LogoSVG from '@assets/LogoTextFill.svg?react';
import LeftArrowSVG from '@assets/icons/left_arrow.svg?react';

const SettingHeader = styled.div(
  ({ theme }) => ({
    borderBottom: `1px solid ${theme.color.line[theme.mode === 'light' ? 'normal' : 'neutral']}`,
  }),
  {
    display: 'flex',
    padding: '0 24px',
    gap: '10px',
    justifyContent: 'center',

    [media[480]]: {
      padding: '0',
      borderBottom: 'none',
    },
  },
);

const SettingHeaderInner = styled.div(
  ({ theme }) => ({
    ['>svg.logo']: {
      fill: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
    [media[480]]: {
      ['>svg']: {
        stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
      },
    },
  }),
  {
    maxWidth: '1440px',
    width: '100%',
    display: 'flex',
    padding: '24px 0',

    ['>svg']: {
      cursor: 'pointer',

      ['&.logo']: {
        width: '113px',
        aspectRatio: 'auto',
        height: 'auto',
        padding: '0',
      },
    },

    ['>p']: {
      margin: '0',
      ...theme.font.body2normal.semibold,
    },

    [media[480]]: {
      padding: '14px 12px',
      justifyContent: 'space-between',

      ['>svg, >span']: {
        width: '24px',
        height: 'auto',
        aspectRatio: '1 / 1',
      },
    },
  },
);

const CommonHeader = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.pathname == webPath.notice() ? '공지사항' : '';

  const handleClickLogo = () => {
    navigate(webPath.memo());
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <SettingHeader>
      <SettingHeaderInner>
        {!isMobile ? (
          <LogoSVG className="logo" onClick={handleClickLogo} />
        ) : (
          <>
            <LeftArrowSVG onClick={handleClickBack} />
            <p>{title}</p>
            <span />
          </>
        )}
      </SettingHeaderInner>
    </SettingHeader>
  );
};

export default CommonHeader;
