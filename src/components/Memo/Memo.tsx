import styled from '@emotion/styled';
import MemoLink from './Link/MemoLink';
import MemoSchedule from './Schedule/MemoSchedule';
import MemoText from './Text/MemoText';
import MemoImage from './Image/MemoImage';

const MemoContainer = styled.div({
  display: 'flex',
  justifyContent: 'end',
  padding: '0 24px',
  gap: '6px',
  alignItems: 'end',
  width: '100%',
  maxWidth: '1080px',
  boxSizing: 'border-box',
});

const MemoCategoryContainer = styled.div(({ color }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '11px',
  fontWeight: '500',
  lineHeight: '1.27',
  color: '#878A93',

  ['span']: {
    padding: '4px',
    background: color,
    margin: '0',
    borderRadius: '32px',
  },
}));

const MemoContent = styled.div({
  borderRadius: '12px',
  overflow: 'hidden',
});

const MemoCategory = ({ category }: { category: { title: string; color: string } }) => {
  return (
    <MemoCategoryContainer color={category.color}>
      <span />
      {category.title}
    </MemoCategoryContainer>
  );
};

type userMemoType = 'text' | 'schedule' | 'link' | 'photo';

interface scheduleProp {
  title: string;
  startDate: Date;
  endDate: Date | null;
}

interface userMemoProp {
  id: number;
  type: userMemoType;
  content: string | scheduleProp;
  date: Date;
  category: string | null;
}

const MemoComponent = ({ memo, category }: { memo: userMemoProp; category: any }) => {
  return (
    <MemoContainer>
      {category && <MemoCategory category={category} />}
      <MemoContent>
        {memo.type == 'text' ? (
          <MemoText content={memo.content as string} />
        ) : memo.type == 'schedule' ? (
          <MemoSchedule content={memo.content as scheduleProp} />
        ) : memo.type == 'photo' ? (
          <MemoImage content={memo.content as string} />
        ) : memo.type == 'link' ? (
          <MemoLink content={memo.content as string} />
        ) : (
          ''
        )}
      </MemoContent>
    </MemoContainer>
  );
};

export default MemoComponent;
