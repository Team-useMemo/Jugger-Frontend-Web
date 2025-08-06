import { memoApi, useDeleteMemoMutation, usePatchMemoMutation, usePutCalendarMutation } from '@stores/modules/memo';
import { scheduleProp } from '@ts/Memo.Prop';
import { useAppDispatch } from '@hooks/useRedux';

export const useDeleteMemo = () => {
  const dispatch = useAppDispatch();
  const [_deleteMemo] = useDeleteMemoMutation();

  const deleteMemo = async (chatId: string) => {
    await _deleteMemo({ chatId });

    dispatch(memoApi.util.updateQueryData('getMemos', {}, (draft) => draft.filter((m) => m.chatId !== chatId)));
  };

  return { deleteMemo };
};

export const useEditCalendarMemo = () => {
  const dispatch = useAppDispatch();
  const [_putCalendar] = usePutCalendarMutation();

  const editCalendarMemo = async (chatId: string, payload: scheduleProp) => {
    await _putCalendar({
      chatId: chatId,
      ...payload,
      alarm: payload.alarm
        ? new Date(
            (() => {
              const date = new Date(payload.startDate);
              date.setMinutes(date.getMinutes() - payload.alarm.minute);
              return date;
            })(),
          ).toISOString()
        : '',
      startDate: payload.startDate.toISOString(),
      endDate: payload.endDate?.toISOString(),
    }).unwrap;
    console.log(chatId, payload);

    dispatch(
      memoApi.util.updateQueryData('getMemos', {}, (draft) =>
        draft.map((m) =>
          m.chatId === chatId
            ? {
                ...m,
                content: payload,
                updatedAt: new Date(),
              }
            : m,
        ),
      ),
    );
  };

  return { editCalendarMemo };
};

export const useEditCategoryMemo = () => {
  const dispatch = useAppDispatch();
  const [_patchMemo] = usePatchMemoMutation();
  const currentCategory = new URLSearchParams(window.location.search).get('category');

  const editCategoryMemo = async (chatId: string, categoryId: string) => {
    await _patchMemo({ chatId, categoryId });

    dispatch(
      memoApi.util.updateQueryData('getMemos', {}, (draft) => {
        if (currentCategory && currentCategory !== categoryId) {
          return draft.filter((m) => m.chatId !== chatId);
        }

        return draft.map((m) => (m.chatId === chatId ? { ...m, categoryId } : m));
      }),
    );
  };

  return { editCategoryMemo };
};
