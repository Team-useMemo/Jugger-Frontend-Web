import { CategoryProp } from '@ts/Category.Prop';
import { MemoResponseProp, scheduleProp } from '@ts/Memo.Prop';
import { useContextMenu } from '@hooks/useContextMenu';
import MemoImage from './Image/MemoImage';
import MemoLink from './Link/MemoLink';
import { MemoCategoryContainer, MemoContainer, MemoContent } from './Memo.Style';
import MemoSchedule from './Schedule/MemoSchedule';
import MemoText from './Text/MemoText';

const MemoCategory = ({ category }: { category: { name: string; color: string } }) => {
  return (
    <MemoCategoryContainer color={category.color}>
      <span />
      {category?.name}
    </MemoCategoryContainer>
  );
};

const MemoComponent = ({ memo, category }: { memo: MemoResponseProp; category?: CategoryProp }) => {
  const handleOpenCategorySetting = () => {
    // TODO: 카테고리 설정 모달 열기
  };

  const handleShare = () => {
    // TODO: 즐겨찾기 토글 API 연결 예정
  };

  const handleDeleteMemo = () => {
    // TODO: 삭제 확인 모달 또는 삭제 API 호출
  };

  const [ContextMenu, BindContextMenuHandlers] = useContextMenu({
    header: { color: category?.color || '#FFF', title: category?.name || '' },
    items: [
      {
        label: '카테고리 설정',
        onClick: handleOpenCategorySetting,
      },
      {
        label: '공유',
        onClick: handleShare,
      },
      {
        label: '삭제',
        onClick: handleDeleteMemo,
      },
    ],
  });

  return (
    <MemoContainer>
      {category && <MemoCategory category={category} />}
      <ContextMenu />
      <MemoContent {...BindContextMenuHandlers}>
        {memo.type == 'text' ? (
          <MemoText categoryName={category?.name} memoId={memo.id} content={memo.content as string} />
        ) : memo.type == 'schedule' ? (
          <MemoSchedule memoId={memo.id} content={memo.content as scheduleProp} />
        ) : memo.type == 'image' ? (
          <MemoImage memoId={memo.id} content={memo.content as string} />
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
