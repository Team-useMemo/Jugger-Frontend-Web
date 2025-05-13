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
  });

  const [InfoModal, openInfoModal] = useModal(
    'info',
    FullScreenGray,
    ({ closeModal }) => <Info closeModal={closeModal} checkedTerms={checkedTerms} />,
    [],
    { skipOutsideClose: true },
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
    { skipOutsideClose: true },
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    console.log('인가 코드:', code);

    if (code) {
      postKakaoAuthCode(code)
        .then((data) => {
          console.log('백엔드 응답:', data);
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          navigate('/');
        })
        .catch((err) => {
          console.error('로그인 처리 실패:', err);

          openTermsModal();
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
