import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postKakaoAuthCode } from '@controllers/api';
import useModal from '@hooks/useModal';
import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import Terms from '@components/Popup/Auth/Term/Term';
import Info from '@components/Popup/Auth/Info/Info';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [checkedTerms, setCheckedTerms] = useState({
    all: false,
    age: false,
    privacy: false,
    terms: false,
    marketing: false,
    ads: false,
    email: '',
    nickname: '',
  });

  const [InfoModal, openInfoModal] = useModal(
    'info',
    FullScreenGray,
    ({ closeModal }) => <Info closeModal={closeModal} checkedTerms={checkedTerms} />,
    [],

  );

  const [TermsModal, openTermsModal] = useModal(
    'terms',
    FullScreenGray,
    ({ closeModal }) => (
      <Terms
        closeModal={closeModal}
        openInfoModal={openInfoModal}
        checked={checkedTerms}
        setChecked={setCheckedTerms}
      />
    ),
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    console.log('인가 코드:', code);

    if (code) {
      postKakaoAuthCode(code)
        .then((data) => {
          console.log('백엔드 응답:', data);
          const accessToken = data.accessToken;
          const refreshToken = data.refreshToken;
          if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            navigate('/');
          }
        })
        .catch((error) => {
          const match = error.message.match(/{.*}/);
          console.log(match);
          const data = JSON.parse(match[0]);

          if (data?.needSignUp && data.userInfo) {
            const { email, nickname } = data.userInfo;
            setCheckedTerms((prev) => ({
              ...prev,
              email,
              nickname,
            }));
            openTermsModal();
          } else {
            console.error('예상치 못한 로그인 실패:', error);
          }
        });
    } else {
      console.error('인가 코드가 없습니다.');
    }
  }, []);

  return (
    <div>
      <TermsModal />
      <InfoModal />
      로그인 처리 중입니다...
    </div>
  );
};

export default KakaoCallback;
