import { getModalIsOpen, getModalValue, modalState, setModalClose } from '@stores/modules/modal';
import { useEffect, useRef } from 'react';
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

  const closeModal = () => {
    navigate(-1);
    dispatch(setModalClose(modalName));
  };

  useEffect(() => {
    if (modalIsOpen) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(modalName, 'open');
      setSearchParams(newParams);
    }
  }, [modalIsOpen]);

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

  const Modal = () => {
    if (!searchParams.has(modalName)) return null;

    return (
      <ModalLayout>
        <div ref={modalRef}>
          <ModalComponent closeModal={closeModal} props={modalValue} />
        </div>
      </ModalLayout>
    );
  };

  return [Modal];
};

export default useParamModal;
