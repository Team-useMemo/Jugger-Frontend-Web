import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);
  const propsRef = useRef(initialProps);
  const openModal = (newProps?: any) => {
    if (newProps) {
      propsRef.current = newProps;
    }
    console.log('openModal', modalName, newProps);
    setIsVisible(true);
  };

  const closeModal = (afterClose?: () => void) => {
    setIsVisible(false);
    if (afterClose) {
      setTimeout(afterClose, 0);
    }
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
  }, [initialProps]);

  const Modal = useCallback(() => {
    if (!isVisible) return null;

    return (
      <Background>
        <div ref={modalRef}>
          <Component closeModal={closeModal} actions={actions} props={propsRef.current} />
        </div>
      </Background>
    );
  }, [Background, Component, actions, isVisible]);

  return [Modal, openModal, closeModal];
};

export default useModal;
