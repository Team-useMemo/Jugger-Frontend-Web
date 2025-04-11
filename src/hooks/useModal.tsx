import { useEffect, useRef, useState } from 'react';

const useModal = (
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
  props?: any,
): [() => React.ReactNode, any, any] => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState(false);

  const openModal = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  });

  const modal = () =>
    activeModal ? (
      <Background>
        <div ref={modalRef}>
          <Component closeModal={closeModal} actions={actions} props={props} />
        </div>
      </Background>
    ) : (
      ''
    );

  return [modal, openModal, closeModal];
};

export default useModal;
