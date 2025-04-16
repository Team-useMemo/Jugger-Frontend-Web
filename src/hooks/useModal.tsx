import { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const useModal = (
  modalName: string,
  Background: ({ children }: { children: React.ReactNode }) => React.ReactNode,
  Component: ({
    closeModal,
    actions,
    props,
  }: {
    closeModal: () => void;
    actions: ((...args: any[]) => void)[];
    props: any;
  }) => React.ReactNode,
  actions: ((...args: any[]) => void)[],
  initialProps?: any,
): [() => React.ReactNode, any, any] => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeModal = window.location.search.indexOf(`${modalName}=true`) != -1;

  const openModal = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      newParams.set(modalName, 'true');
      return newParams;
    });
  };

  const closeModal = () => {
    navigate(-1);
  };

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
    if (!activeModal) return null;

    return (
      <Background>
        <div ref={modalRef}>
          <Component closeModal={closeModal} actions={actions} props={initialProps} />
        </div>
      </Background>
    );
  }, [activeModal, initialProps]);

  return [Modal, openModal, closeModal] as const;
};

export default useModal;
