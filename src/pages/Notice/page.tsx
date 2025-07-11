import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { formatDate } from '@utils/Date';
import { theme } from '@styles/theme';

const NoticePageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  maxWidth: '1440px',
  width: '100%',
  textAlign: 'left',
});

const NoticePageTitle = styled.p({
  ...theme.font.heading1.semibold,
  color: theme.color.label.normal,
  margin: '0',
});

const NoticePageContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const NoticePageItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',

  [':not(:last-of-type)::after']: {
    content: '""',
    height: '1px',
    background: theme.color.line.normal,
    marginTop: '16px',
  },
});

const NoticePageItemTitle = styled.p({
  ...theme.font.body1normal.medium,
  color: theme.color.label.normal,
  margin: '0',
});

const NoticePageItemDate = styled.p({
  ...theme.font.body2normal.medium,
  color: theme.color.label.assistive,
  margin: '0',
});

const NoticePageEmpty = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '64px 0',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.body1normal.semibold,
    },
    ['&.description']: {
      ...theme.font.label1normal.medium,
      color: theme.color.label.alternative,
    },
  },
});

const NoticePage = () => {
  const [noticeList, setNoticeList] = useState<{ title: string; date: Date }[]>([]);

  useEffect(() => {
    return;
    setNoticeList(
      Array.from({ length: 5 }, () => ({
        title:
          '개인정보보호법에 따라 Jugger에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.',
        date: new Date(),
      })),
    );
  }, []);

  return (
    <NoticePageContainer>
      <NoticePageTitle>공지사항</NoticePageTitle>
      {noticeList.length ? (
        <NoticePageContents>
          {noticeList.map(({ title, date }) => (
            <NoticePageItemContainer>
              <NoticePageItemTitle>{title}</NoticePageItemTitle>
              <NoticePageItemDate>{formatDate(date, '{YYYY}.{MM}.{DD}')}</NoticePageItemDate>
            </NoticePageItemContainer>
          ))}
        </NoticePageContents>
      ) : (
        <NoticePageEmpty>
          <p className="title">아직 공지사항이 없어요</p>
          <p className="description">추후 업데이트 되는 사항을 기대해주세요!</p>
        </NoticePageEmpty>
      )}
    </NoticePageContainer>
  );
};

export default NoticePage;
