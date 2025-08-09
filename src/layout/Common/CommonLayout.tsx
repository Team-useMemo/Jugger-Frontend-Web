import { ModalName } from '@utils/Modal';
import useParamModal from '@hooks/useParamModal';
import CommonFooter from '@layout/Common/Footer/Footer';
import ModalLayoutGray from '@components/Modal/Layout/ModalLayoutGray';
import WithdrawUser from '@components/Modal/WithdrawUser/WithdrawUser';
import { CommonLayoutContainer, CommonLayoutContents } from './CommonLayout.Style';
import CommonHeader from './Header/Header';

const CommonLayout = ({ children }: { children?: React.ReactNode }) => {
  const [WithdrawUserModal] = useParamModal(ModalName.withdrawUser, ModalLayoutGray, WithdrawUser);

  return (
    <CommonLayoutContainer>
      <WithdrawUserModal />
      <CommonHeader />
      <CommonLayoutContents>{children}</CommonLayoutContents>
      <CommonFooter />
    </CommonLayoutContainer>
  );
};

export default CommonLayout;
