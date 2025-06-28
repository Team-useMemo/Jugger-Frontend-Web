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
import { useIsMobile } from '@hooks/useWindowSize';

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
  const isMobile = useIsMobile();
  const handleOpenCategorySetting = () => {
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



  const shareCalendar = async () => {
    const schedule = memo.content as scheduleProp;
    const title = encodeURIComponent(schedule.title);
    const location = encodeURIComponent(schedule.place);
    const description = encodeURIComponent(schedule.description);
    const formatDate = (date: Date) =>
      date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const start = formatDate(schedule.startDate);
    const end = formatDate(schedule.endDate ?? schedule.startDate);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${location}&details=${description}&dates=${start}/${end}`;
    window.open(googleCalendarUrl, '_blank');
  };

  const shareTextOrLink = async () => {
    const content = memo.content as string;
    if (isMobile && navigator.share) {
      await navigator.share({
        title: memo.type,
        text: content,
        url: memo.type === 'LINK' ? content : undefined,
      });
    } else {
      await navigator.clipboard.writeText(content);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };


  const handleDeleteMemo = () => {
    // TODO: 삭제 확인 모달 또는 삭제 API 호출
    deleteMemo({ chatId: memo.chatId });
  };

  const contextMenuItems = [
    {
      label: '카테고리 변경',
      onClick: handleOpenCategorySetting,
    },
    {
      label: '삭제',
      onClick: handleDeleteMemo,
    },
  ];

  if (memo.type === 'LINK' || memo.type === 'TEXT') {
    contextMenuItems.splice(1, 0, {
      label: '공유',
      onClick: shareTextOrLink,
    });
  } else if (memo.type === 'CALENDAR') {
    contextMenuItems.splice(1, 0, {
      label: '구글 캘린더에 공유',
      onClick: shareCalendar,
    });
  }

  const [ContextMenu, BindContextMenuHandlers] = useContextMenu({
    header: { color: category?.categoryColor || '#FFF', title: category?.categoryName || '' },
    items: contextMenuItems,
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
