import { CategoryProp } from '@ts/Category.Prop';
import { MemoProp, scheduleProp } from '@ts/Memo.Prop';
import { useContextMenu } from '@hooks/useContextMenu';
import MemoImage from './Image/MemoImage';
import MemoLink from './Link/MemoLink';
import { MemoCategoryContainer, MemoContainer, MemoContent } from './Memo.Style';
import MemoSchedule from './Schedule/MemoSchedule';
import MemoText from './Text/MemoText';

const MemoCategory = ({ category }: { category: CategoryProp }) => {
  return (
    <MemoCategoryContainer color={category.categoryColor}>
      <span />
      <p>{category?.categoryName}</p>
    </MemoCategoryContainer>
  );
};

const MemoComponent = ({ memo, category }: { memo: MemoProp; category?: CategoryProp }) => {
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
    header: { color: category?.categoryColor || '#FFF', title: category?.categoryName || '' },
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
          <MemoText content={memo.content as string} />
        ) : memo.type == 'schedule' ? (
          <MemoSchedule content={memo.content as scheduleProp} />
        ) : memo.type == 'image' ? (
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
