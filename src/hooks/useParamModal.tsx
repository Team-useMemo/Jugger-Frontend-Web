import { modalState, setModalClose, setModalOpen } from '@stores/modules/modal';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useRedux';

export type ModalComponentProps = {
  closeModal?: () => void;
  props?: any;
};

const useParamModal = (
  modalName: string,
  ModalLayout: ({ children }: { children: React.ReactNode }) => React.ReactNode,
  ModalComponent: (props: ModalComponentProps) => React.ReactNode,
): [({ props }: { props?: any }) => React.ReactNode] => {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const modalSelector = useAppSelector(modalState);
  const modalInfo = modalSelector?.[modalName];
  const [modalProps, setModalProps] = useState();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(modalName, modalInfo);
    if (!modalInfo) return;
    const currentParams = new URLSearchParams(window.location.search);
    const { state, value, to, replace } = modalInfo;
    if (state) {
      if (currentParams.has(modalName)) {
        if (replace) {
          currentParams.delete(modalName);
          currentParams.set(replace.to, 'open');
          setSearchParams(currentParams, { replace: true });
          dispatch(setModalOpen({ name: replace.to, value: replace.value }));
        }
        return;
      }
      currentParams.set(modalName, 'open');
      setSearchParams(currentParams);
    } else {
      if (!currentParams.has(modalName)) return;
      if (modalName != Array.from(currentParams.entries()).at(-1)?.[0]) return;
      if (!to) {
        navigate(-1);
        return;
      }
      if (!replace) {
        navigate(to);
        return;
      }
      navigate(to, { replace: true });
    }
    setModalProps(value);
  }, [modalInfo]);

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
        <div ref={modalRef}>
          <ModalComponent closeModal={closeModal} props={modalProps} />
        </div>
      </ModalLayout>
    );
  }, [closeModal, modalProps]);

  return [Modal];
};

export default useParamModal;
