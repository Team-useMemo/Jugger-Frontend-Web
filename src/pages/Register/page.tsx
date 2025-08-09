import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import JuggerCheckBox from '@components/Common/JuggerCheckBox';
import JuggerSelectBox from '@components/Common/JuggerSelectBox';
import { getPostSignup } from '@controllers/api';
import { media, theme } from '@styles/theme';
import CheckBoxSVG from '@assets/checkbox.svg?react';
import CloseSVG from '@assets/icons/close.svg?react';
import DownArrowSVG from '@assets/icons/down_arrow.svg?react';

const RegisterPageLayout = styled.div({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '64px',
  boxSizing: 'border-box',

  [media[480]]: {
    padding: '0px',
  },
});

const RegisterPageContainer = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'normal' : 'alternativeinverse'],

    [media[480]]: {
      background: theme.color.background[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    width: '448px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '32px 32px 40px',
    borderRadius: theme.radius[16],

    [media[480]]: {
      width: '100%',
      height: '100%',
      borderRadius: '0',
      padding: '0px',
    },
  },
);

const RegisterPageHeader = styled.div(
  ({ theme }) => ({
    ['>svg']: {
      stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    display: 'flex',
    justifyContent: 'end',

    ['>svg']: {
      marginLeft: 'auto',
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
      cursor: 'pointer',
    },

    [media[480]]: {
      padding: '14px 12px',
    },
  },
);

const RegisterPageContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

  ['>p']: {
    whiteSpace: 'nowrap',
    textAlign: 'left',
    ...theme.font.title3.bold,
    margin: '0',
  },

  [media[480]]: {
    padding: '24px 20px 32px',
    height: '100%',

    ['>button']: {
      marginTop: 'auto',
    },
  },
});

const RegisterPageTermsContaienr = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  ['>hr']: {
    margin: '0',
    height: '1px',
    border: 'none',
    background: theme.color.line.normal,
  },
});

const RegisterPageTermsItem = styled.div(
  ({ theme }) => ({
    ['>p']: {
      color: theme.color.label[theme.mode === 'light' ? 'normal' : 'alternative'],
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',

    ['>p']: {
      margin: '0',
      flexShrink: '0',
      ...theme.font.body1normal.medium,
      cursor: 'pointer',
    },

    [media[480]]: {
      ['>p']: {
        ...theme.font.body2normal.medium,
        color: theme.color.label.alternative,
      },
    },
  },
);

const RegisterPageTermsLabel = styled.label({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 0',
  width: '100%',

  ['>p']: {
    margin: '0',
    ...theme.font.body1normal.medium,

    ['>b']: {
      ...theme.font.body1normal.semibold,
    },
  },
});
type TermKey = 'isAdult' | 'agreePrivacyPolicy' | 'agreeTermsOfService' | 'agreeAdNotification' | 'agreeMarketingUsage';
type TermState = Record<TermKey, boolean>;

interface TermInputItem {
  key: TermKey;
  title: string;
  content: React.ReactElement;
  essential?: boolean;
}
const Terms: TermInputItem[] = [
  {
    key: 'isAdult',
    title: '[필수] 만 14세 이상입니다',
    content: (
      <>
        본인은 Jugger의 회원가입을 위해 만 14세 이상임을 확인합니다.
        <br />만 14세 미만의 아동은 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 및 「아동복지법」 등에 따라
        법정대리인의 동의 없이 회원가입을 할 수 없습니다.
      </>
    ),
    essential: true,
  },
  {
    key: 'agreePrivacyPolicy',
    title: '[필수] 개인정보 수집 및 이용 동의',
    content: (
      <>
        개인정보보호법에 따라 Jugger에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적,
        개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후
        동의하여 주시기 바랍니다.
        <br />
        <br />
        <b>[ 수집하는 개인정보 ]</b>
        <br />
        Jugger는 회원 가입 및 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 이용합니다.수집 항목은 이름, 성별,
        생년월일 등이며, 이는 회원 식별, 고객 응대, 서비스 이용 안내 등을 위해 사용됩니다.개인정보는 회원 탈퇴 시까지
        보관되며, 관련 법령에 따라 일정 기간 동안 추가 보관될 수 있습니다.
        <br />
        <br />
        <b>[ 개인정보 수집 및 이용 동의를 거부할 권리 ]</b>
        <br />
        이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉, 필수
        항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.
      </>
    ),
    essential: true,
  },
  {
    key: 'agreeTermsOfService',
    title: '[필수] 이용약관 동의',
    content: (
      <>
        Jugger의 서비스 이용과 관련된 권리와 의무를 규정한 이용약관에 동의합니다. 이용자는 타인의 정보를 도용하거나
        서비스 운영을 방해하는 등 부정한 행위를 해서는 안 되며, 서비스 이용 중 본 약관을 준수해야 합니다. 자세한 내용은
        전체 이용약관을 통해 확인하실 수 있습니다.
      </>
    ),
    essential: true,
  },
  {
    key: 'agreeAdNotification',
    title: '[선택] 광고성 정보 수신 동의',
    content: (
      <>
        Jugger는 보다 나은 서비스를 제공하기 위해 이용자의 정보를 활용하여 이벤트 및 맞춤형 혜택을 안내할 수 있습니다.
        마케팅 활용에는 이메일, 앱 푸시 등을 통한 정보 제공이 포함되며, 이 동의는 선택사항으로 언제든지 철회하실 수
        있습니다. 동의하지 않으셔도 서비스 이용에는 제한이 없습니다.
      </>
    ),
  },
  {
    key: 'agreeMarketingUsage',
    title: '[선택] 마케팅 활용 동의 ',
    content: (
      <>
        Jugger는 서비스의 마케팅 활동을 목적으로 개인정보를 수집·활용하며, 회원의 소중한 정보를 보호하기 위해 최선을
        다하고 있습니다. 수집되는 항목은 이름, 성별, 생년월일이며, 수집된 정보는 마케팅 목적에 한해 활용됩니다. 해당
        동의는 선택사항이며, 동의하지 않으셔도 서비스 이용에는 제한이 없습니다. 언제든지 수신 거부가 가능합니다.
      </>
    ),
  },
];

const RegisterPageTerm = ({
  terms,
  setTerms,
}: {
  terms: TermState;
  setTerms: React.Dispatch<React.SetStateAction<TermState>>;
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [checkedAll, setCheckedAll] = useState(false);

  const handleClickTermDetail = (termKey: TermKey) => () => {
    console.log(termKey);
    navigate('', {
      state: {
        ...location.state,
        modal: 'detail',
        key: termKey,
      },
    });
  };

  const handleChangeAllCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setCheckedAll(checked);
    if (!checked) return;
    setTerms((prev) => Object.fromEntries(Object.keys(prev).map((key) => [key, true])) as TermState);
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (!checked) setCheckedAll(false);
    setTerms((prev) => ({ ...prev, [name]: checked }));
  };

  const isValid = Terms.reduce((acc, e) => {
    if (!acc) return acc;
    if (!e.essential) return acc;
    if (e.essential && !terms[e.key]) return false;
    return acc;
  }, true);

  const handleClickNextStep = () => {
    navigate('', {
      state: {
        ...location.state,
        modal: 'value',
      },
    });
  };

  return (
    <RegisterPageContents>
      <p>서비스 이용약관에{isMobile && <br />} 동의해주세요</p>
      <RegisterPageTermsContaienr>
        <RegisterPageTermsLabel>
          <JuggerCheckBox checkboxSize="medium">
            <input type="checkbox" checked={checkedAll} onChange={handleChangeAllCheckbox} />
            <span className="checkmark">
              <CheckBoxSVG />
            </span>
          </JuggerCheckBox>
          <p>
            <b>약관 전체 동의</b>
          </p>
        </RegisterPageTermsLabel>
        <hr />
        {Terms.map((e) => (
          <RegisterPageTermsItem>
            <RegisterPageTermsLabel>
              <JuggerCheckBox checkboxSize="medium">
                <input type="checkbox" name={e.key} checked={terms[e.key]} onChange={handleChangeCheckbox} />
                <span className="checkmark">
                  <CheckBoxSVG />
                </span>
              </JuggerCheckBox>
              <p>{e.title}</p>
            </RegisterPageTermsLabel>
            <p onClick={handleClickTermDetail(e.key)}>보기</p>
          </RegisterPageTermsItem>
        ))}
      </RegisterPageTermsContaienr>
      {isValid && (
        <JuggerButton size="medium" color="primary" onClick={handleClickNextStep}>
          다음
        </JuggerButton>
      )}
    </RegisterPageContents>
  );
};

const RegisterPageTermDetailContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',

  ['>p']: {
    textAlign: 'left',
    ...theme.font.body1normal.medium,

    ['>b']: {
      ...theme.font.body1normal.semibold,
    },
  },

  [media[480]]: {
    ['>p']: {
      ...theme.font.body2normal.medium,

      ['>b']: {
        ...theme.font.body2normal.semibold,
      },
    },
  },
});

const RegisterPageTermDetail = ({
  termKey,
  setTerms,
}: {
  termKey: TermKey;
  setTerms: React.Dispatch<React.SetStateAction<TermState>>;
}) => {
  const navigate = useNavigate();
  const selectedTerm = Terms.find((e) => e.key === termKey);

  const handleClickAgreeButton = () => {
    setTerms((prev) => ({ ...prev, [termKey]: true }));
    navigate(-1);
  };

  return (
    <RegisterPageContents>
      <p>{selectedTerm?.title}</p>
      <RegisterPageTermDetailContents>
        <p>{selectedTerm?.content}</p>
      </RegisterPageTermDetailContents>
      <JuggerButton size="medium" color="primary" onClick={handleClickAgreeButton}>
        동의하기
      </JuggerButton>
    </RegisterPageContents>
  );
};

const RegisterPageValueContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',

  gap: '36px',

  ['>p']: {
    textAlign: 'left',
    ...theme.font.title3.bold,
    margin: '0',
  },

  [media[480]]: {
    padding: '24px 20px 32px',
    height: '100%',

    ['>button']: {
      marginTop: 'auto',
    },
  },
});

const RegisterPageValueContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const RegisterPageValueItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ['>p']: {
    textAlign: 'left',
    ...theme.font.body1normal.semibold,
    margin: '0',
  },

  ['>input[type="text"]']: {
    background: 'none',
    outline: 'none',
    border: 'none',
    padding: '8px 0px',
    ...theme.font.body1normal.medium,
    borderBottom: `1.5px solid ${theme.color.line.neutral}`,

    ['::placeholder']: {
      color: theme.color.label.alternative,
    },

    [':focus']: {
      borderBottom: `1.5px solid ${theme.color.primary.normal}`,
    },
  },
});

const Refferrals = ['없음', '인스타그램', '페이스북', '구글', '지인추천'];

type InputKey = 'name' | 'gender' | 'birth' | 'referral';
type InputState = Record<InputKey, string>;

interface InputItem {
  key: InputKey;
  text: string;
  essential?: boolean;
  content: React.ReactElement;
}

const RegisterPageValueButtonContainer = styled.div({
  display: 'flex',
  gap: '8px',
});

const RegisterPageValueButton = styled.button(
  ({ theme, selected }: { theme?: any; selected: boolean }) => ({
    background:
      theme.mode === 'light'
        ? selected
          ? theme.palette.blue[95]
          : theme.color.background.alternative
        : selected
          ? theme.palette.blue[10]
          : theme.color.label.normal,
    color:
      theme.mode === 'light'
        ? selected
          ? theme.color.label.normal
          : theme.color.label.alternative
        : theme.color.label.inverse,
    border: `1.5px solid ${
      selected ? theme.color.primary.normal : theme.mode === 'light' ? 'none' : theme.color.interaction.inactive
    }`,
  }),
  {
    padding: '11px 14px',
    width: '100%',
    height: '54px',
    borderRadius: theme.radius[4],
    boxSizing: 'border-box',

    [':focus']: {
      outline: 'none',
    },
  },
);

const RegisterPageValueItemError = styled.span({
  ...theme.font.caption1.medium,
  color: theme.color.status.error,
  textAlign: 'left',
});

const RegisterPageValue = ({
  values,
  setValues,
  handleSubmit,
}: {
  values: InputState;
  setValues: React.Dispatch<React.SetStateAction<InputState>>;
  handleSubmit: () => void;
}) => {
  const handleClickSelectItem = (referral: string) => () => {
    setValues((prev) => ({
      ...prev,
      referral: referral,
    }));
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const formatted =
      name === 'birth'
        ? value
            .replace(/\D/g, '')
            .slice(0, 8)
            .replace(/^(\d{4})(\d{0,2})(\d{0,2})$/, (_, y, m, d) => [y, m, d].filter(Boolean).join('-'))
        : value;

    setValues((prev) => ({
      ...prev,
      [name]: formatted,
    }));
  };

  const inputs: InputItem[] = [
    {
      key: 'name',
      text: '이름',
      essential: true,
      content: (
        <input
          type="text"
          name="name"
          value={values.name}
          placeholder="이름을 입력해주세요"
          onChange={handleChangeValue}
        />
      ),
    },
    {
      key: 'gender',
      text: '성별',
      essential: true,
      content: (
        <RegisterPageValueButtonContainer>
          <RegisterPageValueButton
            selected={values.gender === 'MAN'}
            onClick={() => {
              setValues((prev) => ({ ...prev, gender: 'MAN' }));
            }}
          >
            남자
          </RegisterPageValueButton>
          <RegisterPageValueButton
            selected={values.gender === 'WOMAN'}
            onClick={() => {
              setValues((prev) => ({ ...prev, gender: 'WOMAN' }));
            }}
          >
            여자
          </RegisterPageValueButton>
        </RegisterPageValueButtonContainer>
      ),
    },
    {
      key: 'birth',
      text: '생년월일',
      essential: true,
      content: (
        <input
          type="text"
          name="birth"
          value={values.birth}
          placeholder="생년월일을 입력해주세요"
          onChange={handleChangeValue}
        />
      ),
    },
    {
      key: 'referral',
      text: 'Jugger를 알게 된 경로',
      content: (
        <JuggerSelectBox>
          <label
            tabIndex={-1}
            // onMouseDown={handleClickSelectTheme}
          >
            {values.referral || '선택하세요'}
            <DownArrowSVG />
          </label>
          <ul>
            {Refferrals.map((e) => (
              <li key={`referral_${e}`} onMouseDown={handleClickSelectItem(e)}>
                {e}
              </li>
            ))}
          </ul>
        </JuggerSelectBox>
      ),
    },
  ];

  const [errors, setErrors] = useState<InputState>({
    name: '',
    gender: '',
    birth: '',
    referral: '',
  });

  const validate = () => {
    const errors = {
      name: '',
      gender: '',
      birth: '',
      referral: '',
    };

    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!values.name.trim()) errors.name = '이름을 입력해주세요';
    if (!values.gender) errors.gender = '성별을 선택해주세요';

    if (!values.birth) {
      errors.birth = '생년월일을 입력해주세요.';
    } else if (!birthRegex.test(values.birth)) {
      errors.birth = '생년월일 형식을 확인해주세요. (예: 1999-06-23)';
    } else if (new Date(values.birth) > new Date()) {
      errors.birth = '유효한 생년월일을 입력해주세요.';
    }

    return errors;
  };

  const submit = () => {
    const errors = validate();
    setErrors(errors);

    if (Object.values(errors).some((v) => v)) {
      return;
    }

    console.log(123);
    handleSubmit();
  };

  return (
    <RegisterPageValueContainer>
      <p>정보를 입력해주세요</p>
      <RegisterPageValueContents>
        {inputs.map((e) => (
          <RegisterPageValueItemContainer>
            <p>
              {e.text}
              {e.essential && '*'}
            </p>
            {e.content}
            <RegisterPageValueItemError>{errors[e.key]}</RegisterPageValueItemError>
          </RegisterPageValueItemContainer>
        ))}
      </RegisterPageValueContents>
      <JuggerButton size="medium" color="primary" onClick={submit}>
        완료
      </JuggerButton>
    </RegisterPageValueContainer>
  );
};

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [terms, setTerms] = useState<TermState>({
    isAdult: false,
    agreePrivacyPolicy: false,
    agreeTermsOfService: false,
    agreeAdNotification: false,
    agreeMarketingUsage: false,
  });

  const [values, setValues] = useState<InputState>({
    name: '',
    gender: '',
    birth: '',
    referral: '',
  });

  const handleClickClose = () => {
    if (state?.modal === 'value') {
      setValues({
        name: '',
        gender: '',
        birth: '',
        referral: '',
      });
    }
    navigate(-1);
  };

  const { provider, email } = location.state ?? {};

  const handleSubmit = async () => {
    console.log(terms, values);

    try {
      const payload = {
        name: values.name,
        email: email,
        domain: provider,
        gender: values.gender,
        birth: new Date(values.birth),
        terms: {
          ageOver: terms.isAdult,
          privacyPolicy: terms.agreePrivacyPolicy,
          termsOfService: terms.agreeTermsOfService,
          marketing: terms.agreeMarketingUsage,
          termsOfAd: terms.agreeAdNotification,
        },
      };

      console.log(payload);

      const response = await getPostSignup(payload);

      console.log('회원가입 성공:', response.accessToken, response.refreshToken);

      localStorage.setItem('email', email);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      navigate(`/memo`);
    } catch (error) {
      console.error(error);
    }
    //   try {
    // const getSignup = getPostSignup(provider);

    //     const response = await getSignup({
    //       name,
    //       email: checkedTerms.email, // 실제 이메일로 교체 필요
    //       domain: 'kakao',
    //       terms: {
    //         termsOfService: checkedTerms.terms,
    //         privacyPolicy: checkedTerms.privacy,
    //         marketing: checkedTerms.marketing,
    //       },
    //     });

    //     console.log('회원가입 성공:', response.accessToken, response.refreshToken);

    //     localStorage.setItem('username', name);
    //     localStorage.setItem('accessToken', response.accessToken);
    //     localStorage.setItem('refreshToken', response.refreshToken);

    //     navigate(`/memo`);
    //   } catch (error) {
    //     console.error(error);
    //   }
  };

  return (
    <RegisterPageLayout>
      <RegisterPageContainer>
        <RegisterPageHeader>
          <CloseSVG onClick={handleClickClose} />
        </RegisterPageHeader>
        {state?.modal === 'detail' ? (
          <RegisterPageTermDetail termKey={state?.key} setTerms={setTerms} />
        ) : state?.modal === 'value' ? (
          <RegisterPageValue values={values} setValues={setValues} handleSubmit={handleSubmit} />
        ) : (
          <RegisterPageTerm terms={terms} setTerms={setTerms} />
        )}
      </RegisterPageContainer>
    </RegisterPageLayout>
  );
};

export default RegisterPage;
