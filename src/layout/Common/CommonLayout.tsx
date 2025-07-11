import CommonFooter from '@layout/Common/Footer/Footer';
import { CommonLayoutContainer, CommonLayoutContents } from './CommonLayout.Style';
import CommonHeader from './Header/Header';

const CommonLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <CommonLayoutContainer>
      <CommonHeader />
      <CommonLayoutContents>{children}</CommonLayoutContents>
      <CommonFooter />
    </CommonLayoutContainer>
  );
};

export default CommonLayout;
