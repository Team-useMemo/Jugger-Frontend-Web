import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@hooks/useWindowSize';
import { webPath } from '@router/index';
import { media, theme } from '@styles/theme';
import LogoPNG from '@assets/Logo.png';
import LeftArrowSVG from '@assets/icons/left_arrow.svg?react';

const SettingHeader = styled.div({
  display: 'flex',
  padding: '0 24px',
  gap: '10px',
  borderBottom: `1px solid ${theme.color.line.normal}`,
  justifyContent: 'center',

  [media[480]]: {
    padding: '0',
    borderBottom: 'none',
  },
});

const SettingHeaderInner = styled.div({
  maxWidth: '1440px',
  width: '100%',
  display: 'flex',
  padding: '24px 0',

  ['>img']: {
    width: '113px',
  },

  ['>svg, >span']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },

  ['>svg']: {
    cursor: 'pointer',
    stroke: theme.color.label.normal,
  },

  ['>p']: {
    margin: '0',
    ...theme.font.body2normal.semibold,
    color: theme.color.label.normal,
  },

  [media[480]]: {
    padding: '14px 12px',
    justifyContent: 'space-between',
  },
});

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
          <img src={LogoPNG} onClick={handleClickLogo} />
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
