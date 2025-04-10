import MemoLink from './Link/MemoLink';
import MemoSchedule from './Schedule/MemoSchedule';
import MemoText from './Text/MemoText';
import MemoImage from './Image/MemoImage';
import { MemoCategoryContainer, MemoContainer, MemoContent } from './Memo.Styls';
import { MemoProp, scheduleProp } from '@ts/Memo.Prop';

const MemoCategory = ({ category }: { category: { title: string; color: string } }) => {
  return (
    <MemoCategoryContainer color={category.color}>
      <span />
      {category.title}
    </MemoCategoryContainer>
  );
};

const MemoComponent = ({ memo, category }: { memo: MemoProp; category: any }) => {
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
