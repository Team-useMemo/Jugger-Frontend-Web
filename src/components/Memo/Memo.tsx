import { CategoryProp } from '@ts/Category.Prop';
import { MemoProp, scheduleProp } from '@ts/Memo.Prop';
import { useContextMenu } from '@hooks/useContextMenu';
import MemoImage from './Image/MemoImage';
import MemoLink from './Link/MemoLink';
import { MemoCategoryContainer, MemoContainer, MemoContent } from './Memo.Style';
import MemoSchedule from './Schedule/MemoSchedule';
import MemoText from './Text/MemoText';
import { useDeleteMemoMutation } from '@stores/modules/memo';
import { useDispatch } from 'react-redux';
import { setModalOpen } from '@stores/modules/modal';
import { ModalName } from '@utils/Modal';

const MemoCategory = ({ category }: { category: CategoryProp }) => {
  return (
    <MemoCategoryContainer color={category.categoryColor}>
      <span />
      <p>{category?.categoryName}</p>
    </MemoCategoryContainer>
  );
};

const MemoComponent = ({ memo, category }: { memo: MemoProp; category?: CategoryProp }) => {
  const [deleteMemo] = useDeleteMemoMutation();
  const dispatch = useDispatch();
  const handleOpenCategorySetting = () => {
    // TODO: 카테고리 설정 모달 열기
  };

  const handleEdit = () => {
    dispatch(
      setModalOpen({
        name: ModalName.editMemoCategory,
        value: {
          chatId: memo.chatId,
          categoryId: memo.categoryId,
          type: memo.type,
          content: memo.content
        },
      }),
    );
  };


  const handleDeleteMemo = () => {
    // TODO: 삭제 확인 모달 또는 삭제 API 호출
    deleteMemo({ chatId: memo.chatId });
  };

  const [ContextMenu, BindContextMenuHandlers] = useContextMenu({
    header: { color: category?.categoryColor || '#FFF', title: category?.categoryName || '' },
    items: [
      {
        label: '카테고리 변경',
        onClick: handleOpenCategorySetting,
      },
      {
        label: '수정',
        onClick: handleEdit,
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
        {memo.type == 'TEXT' ? (
          <MemoText content={memo.content as string} />
        ) : memo.type == 'CALENDAR' ? (
          <MemoSchedule content={memo.content as scheduleProp} />
        ) : memo.type == 'PHOTO' ? (
          <MemoImage content={memo.content as string} />
        ) : memo.type == 'LINK' ? (
          <MemoLink content={memo.content as string} />
        ) : (
          ''
        )}
      </MemoContent>
    </MemoContainer>
  );
};

export default MemoComponent;
