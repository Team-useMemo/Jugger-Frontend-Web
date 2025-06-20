import { modalState, setModalClose } from '@stores/modules/modal';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useRedux';

export type ModalComponentProps = {
  closeModal?: () => void;
  props?: any;
  modalRef?: any;
};

const useParamModal = (
  modalName: string,
  ModalLayout: ({ children }: { children: React.ReactNode }) => React.ReactNode,
  ModalComponent: (props: ModalComponentProps) => React.ReactNode,
): [({ props }: { props?: any }) => React.ReactNode] => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const modalSelector = useAppSelector(modalState);
  const modalInfo = modalSelector?.[modalName];
  const [modalProps, setModalProps] = useState<any>();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalInfo) return;

    const { state, value } = modalInfo;
    const currentParams = new URLSearchParams(window.location.search);
    if (state === 'open') {
      if (currentParams.has(modalName)) return;
      currentParams.set(modalName, 'open');
      navigate(
        {
          pathname: location.pathname,
          search: currentParams.toString(),
        },
        {
          state: {
            ...location.state,
            [modalName]: value,
          },
        },
      );
      return;
    } else if (state === 'close') {
      const { to, replace } = modalInfo;
      if (!currentParams.has(modalName)) return;
      if (modalName != Array.from(currentParams.entries()).at(-1)?.[0]) return;

      navigate(to ?? -1, { replace });
      return;
    } else if (state === 'replace') {
      const { to, replace } = modalInfo;
      if (!currentParams.has(modalName)) return;
      if (modalName != Array.from(currentParams.entries()).at(-1)?.[0]) return;
      currentParams.delete(modalName);
      if (currentParams.has(to)) currentParams.delete(to);
      currentParams.set(to, 'open');
      navigate(
        {
          pathname: location.pathname,
          search: currentParams.toString(),
        },
        {
          state: {
            ...location.state,
            [modalName]: null,
            [to]: value,
          },
          replace,
        },
      );
      return;
    } else if (state === 'replaced') {
      return;
    } else if (state === 'set') {
      setModalProps(value);
      setIsLocationSet(window.location.href);
      return;
    }
  }, [modalInfo]);

  const [isLocationSet, setIsLocationSet] = useState<string | null>(null);

  useEffect(() => {
    if (modalProps == location.state?.[modalName]) return;
    if (!isLocationSet) {
      setModalProps(location.state?.[modalName]);
      return;
    }
    if (isLocationSet != window.location.href) {
      setIsLocationSet(null);
      navigate(location, {
        state: {
          ...location.state,
          [modalName]: modalProps,
        },
        replace: true,
      });
      return;
    }
  }, [modalProps, location]);

  const closeModal = useCallback(() => {
    dispatch(setModalClose({ name: modalName }));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const Modal = useCallback(() => {
    const currentParams = new URLSearchParams(window.location.search);
    if (!currentParams.has(modalName)) return null;

    return (
      <ModalLayout>
        <ModalComponent closeModal={closeModal} props={modalProps} modalRef={modalRef} />
      </ModalLayout>
    );
  }, [modalProps]);

  return [Modal];
};

export default useParamModal;
