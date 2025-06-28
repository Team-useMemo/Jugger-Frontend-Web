import { useDeleteCategoryMutation, useTogglePinMutation } from '@stores/modules/category';
import { setModalClose, setModalOpen } from '@stores/modules/modal';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CategoryProp } from '@ts/Category.Prop';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { useContextMenu } from '@hooks/useContextMenu';
import { useAppDispatch } from '@hooks/useRedux';
import useStateRef from '@hooks/useStateRef';
import { useIsMobile } from '@hooks/useWindowSize';
import { webPath } from '@router/index';
import PinSVG from '@assets/icons/pin.svg?react';
import {
  SideMessageContainer,
  SideMessageContents,
  SideMessageHeader,
  SideMessageHeaderDate,
  SideMessageHeaderTitle,
  SideMessagePinContainer,
  SideMessageRecentMessage,
} from './SideMessage.Style';
import { memoApi } from '@stores/modules/memo';

const SideMessage = ({ category }: { category: CategoryProp }) => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const { categoryId, categoryColor, categoryName, isPinned, updateAt, recentMessage } = category;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const [showPinIcon, setShowPinIcon] = useState(false);
  const [startXRef, setStartX] = useStateRef<number | null>(null);
  const [toggleChangedRef, setToggleChanged] = useStateRef<boolean>(false);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [togglePin] = useTogglePinMutation();

  const handleCategoryClick = useCallback(() => {
    if (toggleChangedRef.current) {
      setToggleChanged(false);
      return;
    }

    const to = `?category=${categoryId}`;

    if (!isMobile) {
      if (categoryId == currentCategory) {
        return;
      }
      navigate(to);
      return;
    }

    if (categoryId == currentCategory) {
      dispatch(
        setModalClose({
          name: ModalName.sideBar,
        }),
      );
      return;
    }

    dispatch(
      setModalClose({
        name: ModalName.sideBar,
        to: to,
        replace: true,
      }),
    );
  }, [categoryId, dispatch, navigate, isMobile, currentCategory]);

  const handleCategoryPinClick = useCallback(() => {
    console.log(isPinned);
    togglePin({ id: categoryId, isPinned: !isPinned });
    setShowPinIcon(false);
  }, [categoryId, isPinned, togglePin]);

  const handleCategoryEditClick = () => {
    dispatch(
      setModalOpen({
        name: ModalName.editCategory,
        value: {
          id: categoryId,
          title: categoryName,
          color: categoryColor,
        },
      }),
    );
  };

  const handleCategoryDeleteClick = useCallback(() => {
    deleteCategory(categoryId);

    dispatch(memoApi.util.invalidateTags([{ type: 'Memo', id: 'LIST' }]));
    if (currentCategory == categoryId) navigate(webPath.memo());
  }, [deleteCategory, currentCategory, categoryId]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setStartX(e.clientX);
  };

  const handlePointerMove = (e: Event) => {
    if (startXRef.current === null) return;
    const deltaX = (() => {
      if (!isMobile) {
        const event = e as MouseEvent;
        return event.clientX - startXRef.current;
      } else {
        const event = e as TouchEvent;
        return event.touches[0].clientX - startXRef.current;
      }
    })();

    if (deltaX > 40) {
      setShowPinIcon(true);
      setToggleChanged(true);
    } else if (deltaX < -40) {
      setShowPinIcon(false);
      setToggleChanged(true);
    }
  };

  const handlePointerUp = () => {
    setStartX(null);
  };

  useEffect(() => {
    if (!isMobile) {
      document.addEventListener('pointerup', handlePointerUp);
      document.addEventListener('pointermove', handlePointerMove);
    } else {
      document.addEventListener('touchend', handlePointerUp);
      document.addEventListener('touchmove', handlePointerMove);
    }
    return () => {
      if (!isMobile) {
        document.removeEventListener('pointerup', handlePointerUp);
        document.removeEventListener('pointermove', handlePointerMove);
      } else {
        document.removeEventListener('touchend', handlePointerUp);
        document.removeEventListener('touchmove', handlePointerMove);
      }
    };
  }, [isMobile]);

  const [ContextMenu, BindContextMenuHandlers] = useContextMenu({
    header: { color: categoryColor, title: categoryName },
    items: [
      {
        label: !isPinned ? '즐겨찾기' : '즐겨찾기 해제',
        onClick: handleCategoryPinClick
      },
      {
        label: '카테고리 수정',
        onClick: handleCategoryEditClick,
      },
      {
        label: '삭제',
        onClick: handleCategoryDeleteClick
      },
    ],
  });

  return (
    <SideMessageContainer>
      <ContextMenu />
      <SideMessagePinContainer isPinned={isPinned}>
        <PinSVG onClick={handleCategoryPinClick} />
      </SideMessagePinContainer>
      <SideMessageContents
        isFocused={currentCategory === categoryId}
        showPinIcon={showPinIcon}
        onClick={handleCategoryClick}
        {...BindContextMenuHandlers}
        onPointerDown={handlePointerDown}
      >
        <SideMessageHeader>
          <SideMessageHeaderTitle categoryColor={categoryColor}>
            <p>{categoryName}</p>
            {isPinned && <PinSVG onClick={handleCategoryPinClick} />}
          </SideMessageHeaderTitle>
          <SideMessageHeaderDate>
            {updateAt.toDateString() !== new Date().toDateString()
              ? formatDate(updateAt, '{M}.{DD}')
              : formatDate(updateAt, '{hh}:{mm}')}
          </SideMessageHeaderDate>
        </SideMessageHeader>
        <SideMessageRecentMessage>{recentMessage}</SideMessageRecentMessage>
      </SideMessageContents>
    </SideMessageContainer>
  );
};

export default SideMessage;
