import { getModalIsOpen, getModalValue, modalState, setModalClose } from '@stores/modules/modal';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useRedux';

export type ModalComponentProps = {
  closeModal: () => void;
  props?: any;
};

const useParamModal = (
  modalName: string,
  ModalLayout: ({ children }: { children: React.ReactNode }) => React.ReactNode,
  ModalComponent: (props: ModalComponentProps) => React.ReactNode,
): [({ props }: { props?: any }) => React.ReactNode] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const modalSelector = useAppSelector(modalState);
  const modalIsOpen = getModalIsOpen(modalSelector, modalName);
  const modalValue = getModalValue(modalSelector, modalName);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalIsOpen) {
      if (searchParams.has(modalName)) return;
      const newParams = new URLSearchParams(searchParams);
      newParams.set(modalName, 'open');
      setSearchParams(newParams);
    }
  }, [modalIsOpen]);

  const closeModal = useCallback(() => {
    const currentParams = new URLSearchParams(window.location.search);
    if (modalName != Array.from(currentParams.entries()).at(-1)?.[0]) return;
    navigate(-1);
    dispatch(setModalClose(modalName));
  }, []);

  const modalProps = useMemo(() => modalValue, [modalValue]);

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
        <div ref={modalRef}>
          <ModalComponent closeModal={closeModal} props={modalProps} />
        </div>
      </ModalLayout>
    );
  }, [closeModal, modalProps]);

  return [Modal];
};

export default useParamModal;
