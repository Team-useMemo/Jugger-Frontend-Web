import CommonFooter from '@layout/Common/Footer/Footer';
import CommonHeader from '@layout/Common/Header/Header';

const SettingPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
      }}
    >
      <CommonHeader />
      <div
        style={{
          flexGrow: '1',
        }}
      >
        asd
      </div>
      <CommonFooter />
    </div>
  );
};

export default SettingPage;
