import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { theme } from '@styles/theme';
import LogoPNG from '@assets/Logo.png';

const SettingHeader = styled.div({
  display: 'flex',
  padding: '0 24px',
  gap: '10px',
  borderBottom: `1px solid ${theme.color.line.normal}`,
  justifyContent: 'center',
});

const SettingHeaderInner = styled.div({
  maxWidth: '1440px',
  width: '100%',
  display: 'flex',
  padding: '24px 0',

  ['>img']: {
    width: '113px',
  },
});

const CommonHeader = () => {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate(webPath.memo());
  };

  return (
    <SettingHeader>
      <SettingHeaderInner>
        <img src={LogoPNG} onClick={handleClickLogo} />
      </SettingHeaderInner>
    </SettingHeader>
  );
};

export default CommonHeader;
