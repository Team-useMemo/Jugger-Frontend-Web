import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export type ModalComponentProps = {
  closeModal: () => void;
  props?: any;
};

const useParamModal = (
  modalName: string,
  ModalLayout: ({ children }: { children: React.ReactNode }) => React.ReactNode,
  ModalComponent: (props: ModalComponentProps) => React.ReactNode,
): [() => void, ({ props }: { props: any }) => React.ReactNode] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(modalName, 'open');
    setSearchParams(newParams);
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

  const Modal = ({ props }: { props: any }) => {
    if (!searchParams.has(modalName)) return null;

    return (
      <ModalLayout>
        <div ref={modalRef}>
          <ModalComponent closeModal={closeModal} props={props} />
        </div>
      </ModalLayout>
    );
  };

  return [openModal, Modal];
};

export default useParamModal;
