import { setModalOpen } from '@stores/modules/modal';
import { CategoryProp } from '@ts/Category.Prop';
import { MemoProp, imageProp, scheduleProp } from '@ts/Memo.Prop';
import { ModalName } from '@utils/Modal';
import { useDeleteMemo } from '@hooks/memo/useMemoActions';
import { useContextMenu } from '@hooks/useContextMenu';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import MemoCategory from './Category/MemoCategory';
import MemoImage from './Image/MemoImage';
import MemoImageDescription from './ImageDescription/MemoImageDescription';
import MemoLink from './Link/MemoLink';
import { MemoContainer, MemoContent } from './Memo.Style';
import MemoSchedule from './Schedule/MemoSchedule';
import MemoText from './Text/MemoText';

const MemoComponent = ({ memo, category }: { memo: MemoProp; category?: CategoryProp }) => {
  const isMobile = useIsMobile();

  const { deleteMemo } = useDeleteMemo();

  const dispatch = useAppDispatch();

  const handleOpenCategorySetting = () => {
    dispatch(
      setModalOpen({
        name: ModalName.editMemoCategory,
        value: {
          chatId: memo.chatId,
          categoryId: memo.categoryId,
          type: memo.type,
          content: memo.content,
        },
      }),
    );
  };

  const shareCalendar = async () => {
    const schedule = memo.content as scheduleProp;
    const title = encodeURIComponent(schedule.title);
    const location = encodeURIComponent(schedule.place ?? '');
    const description = encodeURIComponent(schedule.description ?? '');
    const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

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

  const contextMenuItems = [
    {
      label: '카테고리 변경',
      onClick: handleOpenCategorySetting,
    },
    {
      label: '삭제',
      onClick: () => deleteMemo(memo.chatId),
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
    header: category && { color: category?.categoryColor || '#FFF', title: category?.categoryName || '' },
    items: contextMenuItems,
  });

  return (
    <MemoContainer>
      <ContextMenu />
      {memo.type === 'PHOTO' && (memo.content as imageProp).description && (
        <MemoContent {...BindContextMenuHandlers}>
          <MemoImage content={memo.content as imageProp} />
        </MemoContent>
      )}
      <MemoContent {...BindContextMenuHandlers}>
        {category && <MemoCategory category={category} />}
        {memo.type == 'TEXT' ? (
          <MemoText content={memo.content as string} />
        ) : memo.type == 'CALENDAR' ? (
          <MemoSchedule content={memo.content as scheduleProp} chatId={memo.chatId} />
        ) : memo.type == 'PHOTO' ? (
          (memo.content as imageProp).description ? (
            <MemoImageDescription content={memo.content as imageProp} />
          ) : (
            <MemoImage content={memo.content as imageProp} />
          )
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
