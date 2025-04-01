import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const ModalBackground = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: '0',
  top: '0',
  background: '#989BA288',
  width: '100%',
  height: '100%',
});

const useModal = (
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
      <ModalBackground>
        <div ref={modalRef}>
          <Component closeModal={closeModal} actions={actions} props={props} />
        </div>
      </ModalBackground>
    ) : (
      ''
    );

  return [modal, openModal, closeModal];
};

export default useModal;
