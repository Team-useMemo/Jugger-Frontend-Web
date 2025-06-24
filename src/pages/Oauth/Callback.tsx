import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from '@hooks/useModal';
import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import Terms from '@components/Popup/Auth/Term/Term';
import Info from '@components/Popup/Auth/Info/Info';
import { getPostAuthCode } from '@controllers/api';




const Callback = () => {
  const navigate = useNavigate();
  const [provider, setProvider] = useState(''); // 'kakao', 'google', etc.
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
    ({ closeModal }) => <Info closeModal={closeModal} checkedTerms={checkedTerms} provider={provider} />,
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
    const pathParts = window.location.pathname.split('/');
    const provider = pathParts[pathParts.length - 1]; // 'kakao', 'google', etc.
    console.log(provider);
    console.log('인가 코드:', code);
    setProvider(provider);

    if (code && provider) {
      const postAuthCode = getPostAuthCode(provider);
      if (!postAuthCode) {
        console.error('지원하지 않는 소셜 로그인입니다:', provider);
        return;
      }

      postAuthCode(code)
        .then((data) => {
          console.log('백엔드 응답:', data);
          const accessToken = data.accessToken;
          const refreshToken = data.refreshToken;
          if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            navigate('/');
          }
        })
        .catch((error) => {
          const match = error.message.match(/{.*}/);
          const data = match ? JSON.parse(match[0]) : null;

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
      console.error('인가 코드 또는 provider가 없습니다.');
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

export default Callback;
