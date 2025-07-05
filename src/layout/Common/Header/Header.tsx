import LogoPNG from '@assets/Logo.png';
import { CommonHeaderContainer } from './Header.Style';

const CommonHeader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <CommonHeaderContainer>
      <img src={LogoPNG} />
      {children}
    </CommonHeaderContainer>
  );
};

export default CommonHeader;
